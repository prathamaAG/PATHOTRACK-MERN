import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Billing.css';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    clientAddress: '',
    clientZip: '',
    clientCountry: '',
    tests: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? checked
          ? [...prevData.tests, value]
          : prevData.tests.filter(test => test !== value)
        : value
    }));
  };

  const createPdf = (data) => {
    const doc = new jsPDF();

    // Add title and client details
    doc.setFontSize(20);
    doc.text('Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${data.patientName}`, 20, 30);
    doc.text(`Email Address: ${data.patientEmail}`, 20, 40);
    doc.text(`Address: ${data.clientAddress}`, 20, 50);
    doc.text(`Zip: ${data.clientZip}`, 20, 60);
    doc.text(`Country: ${data.clientCountry}`, 20, 70);

    // Add table with tests
    const headers = [['Description', 'Price']];
    const rows = data.tests.map(test => {
      const [description, price] = test.split('|');
      return [description, `₹${parseFloat(price).toFixed(2)}`];
    });

    doc.autoTable({
      startY: 80,
      head: headers,
      body: rows,
      theme: 'grid',
    });

    // Add total amount
    const total = data.tests.reduce((sum, test) => {
      const [, price] = test.split('|');
      return sum + parseFloat(price);
    }, 0);
    doc.text(`Total: ₹${total.toFixed(2)}`, 20, doc.autoTable.previous.finalY + 10);

    return doc;
  };

  const handleSendInvoice = async () => {
    setLoading(true);
    setError(null);

    try {
      const doc = createPdf(formData);
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      console.log('Sending email with:', { email: formData.patientEmail, pdfBase64 });
      
      const response = await fetch('http://localhost:30002/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.patientEmail, pdfBase64 })
      });

      if (!response.ok) {
        throw new Error(`Failed to send invoice. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        alert('Invoice sent successfully!');
      } else {
        alert('Failed to send invoice.');
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      setError('An error occurred while sending the invoice. Please check your network connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    const doc = createPdf(formData);
    doc.save('invoice.pdf');
  };

  return (
    <div className="invoice-form">
      <h2>Invoice Form</h2>
      <form id="invoiceForm">
        {/* Form Fields */}
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </label><br />
        <label>
          Email Address:
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
          />
        </label><br />
        <label>
          Address:
          <input
            type="text"
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleChange}
          />
        </label><br />
        <label>
          Zip:
          <input
            type="text"
            name="clientZip"
            value={formData.clientZip}
            onChange={handleChange}
          />
        </label><br />
        <label>
          Country:
          <input
            type="text"
            name="clientCountry"
            value={formData.clientCountry}
            onChange={handleChange}
          />
        </label><br />

        {/* Test Options */}
        <label>
          <input
            type="checkbox"
            name="tests"
            value="Blood Test|500"
            checked={formData.tests.includes("Blood Test|500")}
            onChange={handleChange}
          /> Blood Test - ₹500
        </label><br />
        <label>
          <input
            type="checkbox"
            name="tests"
            value="X-Ray|1500"
            checked={formData.tests.includes("X-Ray|1500")}
            onChange={handleChange}
          /> X-Ray - ₹1500
        </label><br />
        <label>
          <input
            type="checkbox"
            name="tests"
            value="Ultrasound|2000"
            checked={formData.tests.includes("Ultrasound|2000")}
            onChange={handleChange}
          /> Ultrasound - ₹2000
        </label><br />
        <label>
          <input
            type="checkbox"
            name="tests"
            value="ECG|2500"
            checked={formData.tests.includes("ECG|2500")}
            onChange={handleChange}
          /> ECG - ₹2500
        </label><br />

        <button type="button" onClick={handleSendInvoice} disabled={loading}>
          {loading ? 'Sending...' : 'Send Invoice'}
        </button>

        <button type="button" onClick={handleDownloadInvoice}>
          Download Invoice
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};
export default InvoiceForm;