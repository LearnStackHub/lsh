import { CheckCircle2 } from 'lucide-react';
import logoImage from '../assets/LSH.png';
import { formatInvoiceAmount, formatInvoiceDate } from '../services/invoiceService';

function InvoiceDocument({ invoice }) {
  if (!invoice) {
    return null;
  }

  return (
    <article className="invoice-document" id="invoice-print-area">
      <div className="invoice-document-accent" aria-hidden />

      <header className="invoice-document-header">
        <div className="invoice-document-brand-block">
          <img src={logoImage} alt="" className="invoice-document-logo" />
          <div>
            <p className="invoice-document-brand">{invoice.sellerName || 'LearnStackHub'}</p>
            <p className="invoice-document-meta">{invoice.sellerEmail}</p>
            <p className="invoice-document-meta">EdTech learning platform</p>
          </div>
        </div>
        <div className="invoice-document-title-block">
          <span className="invoice-document-type">Tax Invoice</span>
          <h1>{invoice.invoiceNumber}</h1>
          <span className="invoice-document-status">
            <CheckCircle2 size={14} aria-hidden />
            Paid
          </span>
        </div>
      </header>

      <section className="invoice-document-section">
        <div className="invoice-document-party">
          <h2>Billed to</h2>
          <p className="invoice-document-party-name">{invoice.customerName}</p>
          {invoice.customerEmail && <p>{invoice.customerEmail}</p>}
        </div>
        <div className="invoice-document-party invoice-document-party--right">
          <h2>Invoice details</h2>
          <p>
            <span>Issue date</span>
            <strong>{formatInvoiceDate(invoice.issuedAt)}</strong>
          </p>
          <p>
            <span>Plan</span>
            <strong>{invoice.planLabel}</strong>
          </p>
          <p>
            <span>Currency</span>
            <strong>{invoice.currency || 'INR'}</strong>
          </p>
        </div>
      </section>

      <div className="invoice-document-table-wrap">
        <table className="invoice-document-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Duration</th>
              <th className="invoice-document-amount-col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{invoice.planLabel}</strong>
                <span className="invoice-document-item-note">{invoice.description}</span>
              </td>
              <td>{invoice.durationLabel || (invoice.durationDays ? `${invoice.durationDays} days` : '—')}</td>
              <td className="invoice-document-amount-col">{formatInvoiceAmount(invoice)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total paid</td>
              <td className="invoice-document-amount-col invoice-document-total">
                {formatInvoiceAmount(invoice)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <section className="invoice-document-payments">
        <h2>Payment reference</h2>
        <dl className="invoice-document-ref-list">
          <div>
            <dt>Order ID</dt>
            <dd>{invoice.orderId}</dd>
          </div>
          <div>
            <dt>Payment ID</dt>
            <dd>{invoice.paymentId || '—'}</dd>
          </div>
        </dl>
      </section>

      <footer className="invoice-document-footer">
        <p>Thank you for subscribing to LearnStackHub.</p>
        <p>This is a computer-generated invoice and does not require a signature.</p>
      </footer>
    </article>
  );
}

export default InvoiceDocument;
