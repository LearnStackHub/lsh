import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Download,
  Eye,
  RefreshCw,
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

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
}

function scoreClass(percentage) {
  if (percentage >= 70) return 'admin-score-good';
  if (percentage >= 50) return 'admin-score-mid';
  return 'admin-score-low';
}

function RecruitmentAdmin() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const loadSubmissions = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const rows = await fetchRecruitmentSubmissions();
      setSubmissions(rows);
    } catch (err) {
      setError(err.message || 'Unable to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [user?.uid]);

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

  const averageScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((sum, row) => sum + Number(row.scorePercentage || 0), 0) /
            submissions.length
        )
      : 0;

  return (
    <>
      <SEOHead
        title="Recruitment Admin | LearnStackHub"
        description="Review recruitment exam submissions"
        noindex
      />

      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <div>
            <Link to="/admin" className="admin-back-link">
              <ArrowLeft size={16} aria-hidden />
              Back to admin
            </Link>
            <h1>
              <Briefcase size={28} aria-hidden />
              Recruitment submissions
            </h1>
            <p>Signed in as {user?.email}</p>
          </div>
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

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <Shield size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">{submissions.length}</span>
              <span className="admin-stat-label">Total submissions</span>
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

        {error && <div className="form-error admin-error">{error}</div>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Contact</th>
                <th>Score</th>
                <th>Govt institute</th>
                <th>LSH cert.</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="admin-table-empty">
                    Loading submissions…
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-table-empty">
                    No recruitment exam submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.name}</strong>
                      <div className="admin-table-sub">{row.id}</div>
                    </td>
                    <td>
                      <div>{row.email}</div>
                      <div className="admin-table-sub">{row.mobile}</div>
                    </td>
                    <td>
                      <span className={`admin-score-pill ${scoreClass(row.scorePercentage)}`}>
                        {row.scoreCorrect}/{row.scoreTotal} ({row.scorePercentage}%)
                      </span>
                      <div className="admin-table-sub">{formatDuration(row.timeTakenSeconds)}</div>
                    </td>
                    <td>
                      {row.studiedInGovt ? row.govtInstitutionName || 'Yes' : 'No'}
                    </td>
                    <td>
                      {row.hasLshCertificate ? row.lshCertificateId || 'Yes' : 'No'}
                    </td>
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
      </div>

      {selectedId && (
        <div className="admin-modal-backdrop" role="presentation" onClick={closeDetail}>
          <div
            className="admin-modal"
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
                    <strong>Score</strong>
                    <p>
                      {detail.scoreCorrect}/{detail.scoreTotal} ({detail.scorePercentage}%)
                    </p>
                  </div>
                  <div>
                    <strong>Government institute</strong>
                    <p>
                      {detail.studiedInGovt
                        ? detail.govtInstitutionName || 'Yes'
                        : 'No'}
                    </p>
                  </div>
                  <div>
                    <strong>LSH certificate</strong>
                    <p>
                      {detail.hasLshCertificate ? detail.lshCertificateId || 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <strong>Time taken</strong>
                    <p>{formatDuration(detail.timeTakenSeconds)}</p>
                  </div>
                  <div>
                    <strong>Security</strong>
                    <p>
                      Warnings {detail.securityWarnings} · Tab switches {detail.tabSwitchCount}
                      {detail.autoSubmitted ? ' · Auto-submitted' : ''}
                    </p>
                  </div>
                  <div>
                    <strong>Submitted</strong>
                    <p>{formatDate(detail.submittedAt)}</p>
                  </div>
                </div>

                {detail.panPhotoDataUrl ? (
                  <div className="admin-pan-block">
                    <div className="admin-pan-head">
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
                    <img
                      src={detail.panPhotoDataUrl}
                      alt={`PAN verification for ${detail.name}`}
                      className="admin-pan-preview"
                    />
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
