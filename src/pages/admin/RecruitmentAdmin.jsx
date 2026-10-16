import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  RotateCcw,
  Shield,
  X,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { useAuth } from '../../context/AuthContext';
import {
  downloadPanPhoto,
  fetchRecruitmentSubmission,
  fetchRecruitmentSubmissions,
  formatDuration,
} from '../../services/recruitmentAdminService';
import { downloadRecruitmentExcel } from '../../utils/recruitmentExport';
import './RecruitmentAdmin.css';

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'All experience' },
  { value: 'fresher', label: 'Fresher (0 years)' },
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1–2 years' },
  { value: '2-3', label: '2–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5+', label: '5+ years' },
];

const SCORE_OPTIONS = [
  { value: '', label: 'Any score' },
  { value: '70', label: '70% and above' },
  { value: '50', label: '50% and above' },
  { value: '30', label: '30% and above' },
];

const EMPTY_FILTERS = {
  search: '',
  experience: '',
  minScore: '',
  govtInstitute: '',
  lshCertificate: '',
  dateFrom: '',
  dateTo: '',
};

const PAGE_SIZE_OPTIONS = [25, 50, 100];

function SubmissionPagination({ page, pageSize, totalItems, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  const pageNumbers = [];
  const windowRadius = 2;
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || (p >= safePage - windowRadius && p <= safePage + windowRadius)) {
      pageNumbers.push(p);
    } else if (pageNumbers[pageNumbers.length - 1] !== '…') {
      pageNumbers.push('…');
    }
  }

  return (
    <nav className="recruitment-admin-pagination" aria-label="Submission pages">
      <div className="recruitment-admin-pagination-summary">
        {totalItems === 0 ? (
          'No rows'
        ) : (
          <>
            Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{totalItems}</strong>
          </>
        )}
      </div>

      <div className="recruitment-admin-pagination-controls">
        <label className="recruitment-admin-pagination-size">
          Per page
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="recruitment-admin-page-btn"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        <div className="recruitment-admin-page-numbers">
          {pageNumbers.map((token, index) =>
            token === '…' ? (
              <span key={`ellipsis-${index}`} className="recruitment-admin-page-ellipsis" aria-hidden>
                …
              </span>
            ) : (
              <button
                key={token}
                type="button"
                className={`recruitment-admin-page-btn${
                  token === safePage ? ' recruitment-admin-page-btn--active' : ''
                }`}
                onClick={() => onPageChange(token)}
                aria-current={token === safePage ? 'page' : undefined}
              >
                {token}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          className="recruitment-admin-page-btn"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </nav>
  );
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
}

function formatExperience(value) {
  const labels = {
    fresher: 'Fresher (0 years)',
    '0-1': 'Less than 1 year',
    '1-2': '1–2 years',
    '2-3': '2–3 years',
    '3-5': '3–5 years',
    '5+': '5+ years',
  };
  return labels[value] || value || '—';
}

function formatSubmissionType(row) {
  if (row.autoSubmitted) {
    const reason = String(row.securityReason || '').trim();
    return reason ? `Auto-submitted — ${reason}` : 'Auto-submitted';
  }
  return 'Manual';
}

function formatProctoringEventTime(at) {
  if (!at) return '—';
  const date = new Date(at);
  if (Number.isNaN(date.getTime())) return at;
  return date.toLocaleString();
}

function formatProctoringType(type) {
  return String(type || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ProctoringErrorList({ title, errors }) {
  const items = Array.isArray(errors) ? errors : [];

  return (
    <div className="recruitment-admin-proctor-log">
      <h4>
        {title} ({items.length})
      </h4>
      {items.length === 0 ? (
        <p className="recruitment-admin-proctor-empty">No events recorded.</p>
      ) : (
        <ul className="recruitment-admin-proctor-list">
          {items.map((err, index) => (
            <li key={`${err.at || 't'}-${index}`} className="recruitment-admin-proctor-item">
              <span className="recruitment-admin-proctor-time">{formatProctoringEventTime(err.at)}</span>
              <span className="recruitment-admin-proctor-type">{formatProctoringType(err.type)}</span>
              <p className="recruitment-admin-proctor-msg">{err.message}</p>
              {(err.confidence != null || err.faceCount != null || err.strike != null) && (
                <p className="recruitment-admin-proctor-meta">
                  {err.confidence != null ? `Confidence ${Math.round(Number(err.confidence) * 100)}%` : ''}
                  {err.confidence != null && (err.faceCount != null || err.strike != null) ? ' · ' : ''}
                  {err.faceCount != null ? `${err.faceCount} faces` : ''}
                  {err.faceCount != null && err.strike != null ? ' · ' : ''}
                  {err.strike != null ? `Strike ${err.strike}` : ''}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function scoreClass(percentage) {
  if (percentage >= 70) return 'admin-score-good';
  if (percentage >= 50) return 'admin-score-mid';
  return 'admin-score-low';
}

function matchesDateRange(submittedAt, from, to) {
  if (!from && !to) return true;
  const time = submittedAt ? Date.parse(submittedAt) : NaN;
  if (Number.isNaN(time)) return false;

  if (from) {
    const fromTime = new Date(`${from}T00:00:00`).getTime();
    if (time < fromTime) return false;
  }

  if (to) {
    const toTime = new Date(`${to}T23:59:59.999`).getTime();
    if (time > toTime) return false;
  }

  return true;
}

function filterSubmissions(rows, filters) {
  const query = filters.search.trim().toLowerCase();

  return rows.filter((row) => {
    if (query) {
      const haystack = `${row.name} ${row.email} ${row.mobile} ${row.id}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.experience && row.experience !== filters.experience) return false;

    if (filters.minScore && Number(row.scorePercentage || 0) < Number(filters.minScore)) {
      return false;
    }

    if (filters.govtInstitute === 'yes' && !row.studiedInGovt) return false;
    if (filters.govtInstitute === 'no' && row.studiedInGovt) return false;

    if (filters.lshCertificate === 'yes' && !row.hasLshCertificate) return false;
    if (filters.lshCertificate === 'no' && row.hasLshCertificate) return false;

    if (!matchesDateRange(row.submittedAt, filters.dateFrom, filters.dateTo)) return false;

    return true;
  });
}

function hasActiveFilters(filters) {
  return Object.values(filters).some((value) => Boolean(value));
}

function RecruitmentAdmin() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [listTruncated, setListTruncated] = useState(false);
  const [listLimit, setListLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const loadSubmissions = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const { submissions: rows, totalCount: total, truncated, limit } =
        await fetchRecruitmentSubmissions();
      setSubmissions(rows);
      setTotalCount(total);
      setListTruncated(truncated);
      setListLimit(limit ?? null);
    } catch (err) {
      setError(err.message || 'Unable to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [user?.uid]);

  useEffect(() => {
    if (!selectedId) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedId('');
        setDetail(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedId]);

  const filteredSubmissions = useMemo(
    () => filterSubmissions(submissions, filters),
    [submissions, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const paginatedSubmissions = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredSubmissions.slice(start, start + pageSize);
  }, [filteredSubmissions, safePage, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [filters, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const openDetail = async (id) => {
    setSelectedId(id);
    setDetail(null);
    setDetailLoading(true);

    try {
      const submission = await fetchRecruitmentSubmission(id);
      setDetail(submission);
    } catch (err) {
      setError(err.message || 'Could not load submission details.');
      setSelectedId('');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedId('');
    setDetail(null);
  };

  const handleExport = () => {
    if (filteredSubmissions.length === 0) {
      setError('No submissions match the current filters to export.');
      return;
    }

    setError('');
    downloadRecruitmentExcel(filteredSubmissions, {
      formatExperience,
      formatDate,
      formatDuration,
    });
  };

  const averageScore =
    filteredSubmissions.length > 0
      ? Math.round(
          filteredSubmissions.reduce((sum, row) => sum + Number(row.scorePercentage || 0), 0) /
            filteredSubmissions.length
        )
      : 0;

  const filtersActive = hasActiveFilters(filters);

  return (
    <>
      <SEOHead
        title="Assessment L1 Admin | LearnStackHub"
        description="Review Assessment L1 submissions"
        noindex
      />

      <div className="admin-dashboard recruitment-admin">
        <div className="admin-dashboard-header">
          <div>
            <Link to="/admin" className="admin-back-link">
              <ArrowLeft size={16} aria-hidden />
              Back to admin
            </Link>
            <h1>
              <Briefcase size={28} aria-hidden />
              Assessment L1 submissions
            </h1>
            <p>Signed in as {user?.email}</p>
          </div>
          <div className="recruitment-admin-header-actions">
            <button
              type="button"
              className="btn btn-secondary recruitment-admin-export-btn"
              onClick={handleExport}
              disabled={loading || filteredSubmissions.length === 0}
            >
              <FileSpreadsheet size={16} aria-hidden />
              Download Excel
            </button>
            <button
              type="button"
              className="btn btn-primary admin-refresh-btn"
              onClick={loadSubmissions}
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'spin-icon' : ''} aria-hidden />
              Refresh
            </button>
          </div>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <Shield size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">
                {filtersActive ? filteredSubmissions.length : totalCount || submissions.length}
              </span>
              <span className="admin-stat-label">
                {filtersActive
                  ? `Filtered (${filteredSubmissions.length} of ${submissions.length} loaded)`
                  : listTruncated
                    ? `Total in database (${submissions.length} most recent loaded)`
                    : 'Total submissions'}
              </span>
            </div>
          </div>
          <div className="admin-stat-card">
            <Briefcase size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">{averageScore}%</span>
              <span className="admin-stat-label">Average score</span>
            </div>
          </div>
        </div>

        <section className="recruitment-admin-filters" aria-label="Submission filters">
          <div className="recruitment-admin-filters-head">
            <h2>
              <Filter size={16} aria-hidden style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
              Filters
            </h2>
            <p className="recruitment-admin-filters-count">
              {filteredSubmissions.length} match filters · {submissions.length} loaded
              {totalCount > submissions.length
                ? ` · ${totalCount} total in database`
                : totalCount > 0 && totalCount !== submissions.length
                  ? ` · ${totalCount} total`
                  : ''}
            </p>
          </div>

          <div className="recruitment-admin-filters-grid">
            <label className="recruitment-admin-filter recruitment-admin-filter--wide">
              Search
              <input
                type="search"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                placeholder="Name, email, mobile, or ID"
              />
            </label>

            <label className="recruitment-admin-filter">
              Experience
              <select
                value={filters.experience}
                onChange={(e) => setFilter('experience', e.target.value)}
              >
                {EXPERIENCE_OPTIONS.map((option) => (
                  <option key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="recruitment-admin-filter">
              Min. score
              <select
                value={filters.minScore}
                onChange={(e) => setFilter('minScore', e.target.value)}
              >
                {SCORE_OPTIONS.map((option) => (
                  <option key={option.value || 'any'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="recruitment-admin-filter">
              Govt institute
              <select
                value={filters.govtInstitute}
                onChange={(e) => setFilter('govtInstitute', e.target.value)}
              >
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="recruitment-admin-filter">
              LSH certificate
              <select
                value={filters.lshCertificate}
                onChange={(e) => setFilter('lshCertificate', e.target.value)}
              >
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="recruitment-admin-filter">
              From date
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilter('dateFrom', e.target.value)}
              />
            </label>

            <label className="recruitment-admin-filter">
              To date
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilter('dateTo', e.target.value)}
              />
            </label>
          </div>

          <div className="recruitment-admin-filters-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearFilters}
              disabled={!filtersActive}
            >
              <RotateCcw size={15} aria-hidden />
              Clear filters
            </button>
            <button
              type="button"
              className="btn btn-primary recruitment-admin-export-btn"
              onClick={handleExport}
              disabled={filteredSubmissions.length === 0}
            >
              <FileSpreadsheet size={15} aria-hidden />
              Export filtered ({filteredSubmissions.length})
            </button>
          </div>
        </section>

        {error && <div className="form-error admin-error">{error}</div>}
        {listTruncated && !loading && (
          <div className="recruitment-admin-truncate-notice" role="status">
            {totalCount - submissions.length} older submission
            {totalCount - submissions.length === 1 ? '' : 's'} not shown. Displaying the most recent{' '}
            {submissions.length} of {totalCount} total (limit {listLimit ?? submissions.length}).
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Score</th>
                <th>Submission</th>
                <th>Govt institute</th>
                <th>LSH cert.</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="admin-table-empty">
                    Loading submissions…
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="admin-table-empty">
                    {submissions.length === 0
                      ? 'No Assessment L1 submissions yet.'
                      : 'No submissions match the current filters.'}
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.name}</strong>
                      <div className="admin-table-sub" title={row.id}>
                        {row.id.slice(0, 10)}…
                      </div>
                    </td>
                    <td>
                      <div>{row.email}</div>
                      <div className="admin-table-sub">{row.mobile}</div>
                    </td>
                    <td>{formatExperience(row.experience)}</td>
                    <td>
                      <span className={`admin-score-pill ${scoreClass(row.scorePercentage)}`}>
                        {row.scoreCorrect}/{row.scoreTotal} ({row.scorePercentage}%)
                      </span>
                      <div className="admin-table-sub">{formatDuration(row.timeTakenSeconds)}</div>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          row.autoSubmitted ? 'admin-badge-auto' : 'admin-badge-manual'
                        }`}
                      >
                        {row.autoSubmitted ? 'Auto' : 'Manual'}
                      </span>
                      {row.securityReason ? (
                        <div className="admin-table-sub" title={row.securityReason}>
                          {row.securityReason}
                        </div>
                      ) : null}
                    </td>
                    <td>{row.studiedInGovt ? row.govtInstitutionName || 'Yes' : 'No'}</td>
                    <td>{row.hasLshCertificate ? row.lshCertificateId || 'Yes' : 'No'}</td>
                    <td>{formatDate(row.submittedAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-icon-btn"
                        onClick={() => openDetail(row.id)}
                        title="View details"
                      >
                        <Eye size={16} aria-hidden />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredSubmissions.length > 0 && (
          <SubmissionPagination
            page={safePage}
            pageSize={pageSize}
            totalItems={filteredSubmissions.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {selectedId && (
        <div className="admin-modal-backdrop" role="presentation" onClick={closeDetail}>
          <div
            className="admin-modal recruitment-admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruitment-detail-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2 id="recruitment-detail-title">Submission details</h2>
              <button type="button" className="admin-icon-btn" onClick={closeDetail} aria-label="Close">
                <X size={18} aria-hidden />
              </button>
            </div>

            {detailLoading ? (
              <p className="admin-modal-body">Loading…</p>
            ) : detail ? (
              <div className="admin-modal-body">
                <div className="recruitment-admin-modal-score">
                  <div className="recruitment-admin-modal-score-main">
                    <strong>
                      {detail.scoreCorrect}/{detail.scoreTotal} ({detail.scorePercentage}%)
                    </strong>
                    <span>Assessment score</span>
                  </div>
                  <div className="recruitment-admin-modal-meta">
                    <span className="recruitment-admin-meta-pill">
                      {formatDuration(detail.timeTakenSeconds)}
                    </span>
                    <span className="recruitment-admin-meta-pill">
                      {formatExperience(detail.experience)}
                    </span>
                    <span
                      className={`recruitment-admin-meta-pill${
                        detail.autoSubmitted ? ' recruitment-admin-meta-pill--warn' : ''
                      }`}
                    >
                      {formatSubmissionType(detail)}
                    </span>
                  </div>
                </div>

                <div className="recruitment-admin-detail-section">
                  <h3>Candidate</h3>
                  <div className="admin-detail-grid">
                    <div>
                      <strong>Name</strong>
                      <p>{detail.name}</p>
                    </div>
                    <div>
                      <strong>Email</strong>
                      <p>{detail.email}</p>
                    </div>
                    <div>
                      <strong>Mobile</strong>
                      <p>{detail.mobile}</p>
                    </div>
                    <div>
                      <strong>Submitted</strong>
                      <p>{formatDate(detail.submittedAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="recruitment-admin-detail-section">
                  <h3>Submission</h3>
                  <div className="admin-detail-grid">
                    <div>
                      <strong>Submission type</strong>
                      <p>{formatSubmissionType(detail)}</p>
                    </div>
                    <div>
                      <strong>Security</strong>
                      <p>
                        Warnings {detail.securityWarnings} · Tab switches {detail.tabSwitchCount}
                      </p>
                    </div>
                    {(detail.webcamChecks > 0 || detail.webcamNoFaceEvents > 0) && (
                      <div>
                        <strong>Webcam monitoring</strong>
                        <p>
                          {detail.webcamFaceVisible}/{detail.webcamChecks} face-visible checks
                          {detail.webcamNoFaceEvents > 0
                            ? ` · ${detail.webcamNoFaceEvents} no-face`
                            : ''}
                          {detail.webcamMultipleFaceEvents > 0
                            ? ` · ${detail.webcamMultipleFaceEvents} multi-face`
                            : ''}
                          {detail.webcamMobileEvents > 0
                            ? ` · ${detail.webcamMobileEvents} mobile`
                            : ''}
                          {detail.webcamCameraOffEvents > 0
                            ? ` · ${detail.webcamCameraOffEvents} camera off`
                            : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  {(detail.webcamChecks > 0 ||
                    detail.webcamFaceErrorLogCount > 0 ||
                    detail.webcamMobileErrorLogCount > 0) && (
                    <div className="recruitment-admin-proctor-logs">
                      <ProctoringErrorList
                        title="Face errors"
                        errors={detail.webcamFaceErrors}
                      />
                      <ProctoringErrorList
                        title="Mobile errors"
                        errors={detail.webcamMobileErrors}
                      />
                    </div>
                  )}
                </div>

                <div className="recruitment-admin-detail-section">
                  <h3>Background</h3>
                  <div className="admin-detail-grid">
                    <div>
                      <strong>Government institute</strong>
                      <p>{detail.studiedInGovt ? detail.govtInstitutionName || 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <strong>LSH certificate</strong>
                      <p>{detail.hasLshCertificate ? detail.lshCertificateId || 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {detail.panPhotoDataUrl ? (
                  <div className="recruitment-admin-pan-card">
                    <div className="recruitment-admin-pan-head">
                      <strong>PAN verification photo</strong>
                      <button
                        type="button"
                        className="btn btn-secondary admin-download-btn"
                        onClick={() =>
                          downloadPanPhoto(detail.panPhotoDataUrl, detail.name, detail.id)
                        }
                      >
                        <Download size={16} aria-hidden />
                        Download photo
                      </button>
                    </div>
                    <div className="recruitment-admin-pan-preview-wrap">
                      <img
                        src={detail.panPhotoDataUrl}
                        alt={`PAN verification for ${detail.name}`}
                        className="recruitment-admin-pan-preview"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="admin-table-sub">PAN photo not available for this submission.</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default RecruitmentAdmin;
