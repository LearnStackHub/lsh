import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import InvoiceDocument from '../components/InvoiceDocument';
import { useAuth } from '../context/AuthContext';
import { fetchInvoice } from '../services/invoiceService';

function Invoice() {
  const { orderId } = useParams();
  const { user, loading: authLoading, openLoginModal } = useAuth();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !orderId) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    fetchInvoice(orderId)
      .then((data) => {
        if (mounted) {
          setInvoice(data);
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
        <p className="account-loading">Loading invoice…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="invoice-page">
        <SEOHead title="Invoice" description="View your LearnStackHub invoice." />
        <div className="account-card account-card--prompt">
          <h1>Sign in to view invoice</h1>
          <button type="button" className="btn btn-primary" onClick={openLoginModal}>
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <SEOHead
        title={invoice ? `Invoice ${invoice.invoiceNumber}` : 'Invoice'}
        description="View and download your LearnStackHub subscription invoice."
      />

      <div className="invoice-page-toolbar no-print">
        <Link to="/account" className="auth-back-link">
          <ArrowLeft size={16} aria-hidden />
          Back to account
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

export default Invoice;
