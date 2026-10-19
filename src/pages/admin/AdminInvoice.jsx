import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import InvoiceDocument from '../../components/InvoiceDocument';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminInvoice } from '../../services/adminService';
import { enrichInvoiceClient } from '../../services/invoiceService';

function AdminInvoice() {
  const { orderId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !orderId) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    fetchAdminInvoice(orderId)
      .then((data) => {
        if (mounted) {
          setInvoice(enrichInvoiceClient(data));
        }
      })
      .catch((fetchError) => {
        if (mounted) {
          setError(fetchError?.message || 'Could not load invoice');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [user, orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (authLoading || loading) {
    return (
      <div className="invoice-page">
        <p className="account-loading">
          <Loader2 size={18} className="spin-icon" aria-hidden /> Loading invoice…
        </p>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <SEOHead
        title={invoice ? `Invoice ${invoice.invoiceNumber}` : 'Invoice'}
        description="Admin invoice view"
        noindex
      />

      <div className="invoice-page-toolbar no-print">
        <Link to="/admin" className="auth-back-link">
          <ArrowLeft size={16} aria-hidden />
          Back to admin
        </Link>
        {invoice && (
          <button type="button" className="btn btn-primary" onClick={handlePrint}>
            <Download size={16} aria-hidden />
            Download / Print
          </button>
        )}
      </div>

      {error && (
        <div className="subscribe-alert subscribe-alert--error" role="alert">
          {error}
        </div>
      )}

      {invoice && <InvoiceDocument invoice={invoice} />}
    </div>
  );
}

export default AdminInvoice;
