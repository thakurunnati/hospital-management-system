import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalesAnalytics from "./SalesAnalytics";
import "../stylesheets/PurchaseHistory.css";

export default function PurchaseHistory() {
  const purchaseHistory = useSelector((state) => state.purchaseHistory);
  const [filterPatient, setFilterPatient] = useState("");

  const filteredPurchases = filterPatient
    ? purchaseHistory.filter((p) => p.patientId === filterPatient)
    : purchaseHistory;

  const handlePrint = (purchase) => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>Purchase Receipt - ${purchase.patientName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt-container { max-width: 600px; margin: 0 auto; }
            .receipt-header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .receipt-header h1 { margin: 0; }
            .receipt-header p { margin: 5px 0; color: #666; }
            .info-section { margin: 20px 0; display: flex; justify-content: space-between; }
            .info-block { flex: 1; }
            .info-block label { font-weight: bold; color: #666; font-size: 12px; }
            .info-block p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #f0f0f0; padding: 10px; text-align: left; border-bottom: 1px solid #ddd; font-weight: bold; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            .total-section { text-align: right; font-weight: bold; font-size: 18px; padding-top: 20px; border-top: 2px solid #333; }
            .receipt-footer { text-align: center; margin-top: 30px; color: #999; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <h1>Hospital Management System</h1>
              <p>Medicine Purchase Receipt</p>
            </div>
            
            <div class="info-section">
              <div class="info-block">
                <label>Patient:</label>
                <p>${purchase.patientName}</p>
              </div>
              <div class="info-block">
                <label>Date:</label>
                <p>${purchase.date}</p>
              </div>
              <div class="info-block">
                <label>Time:</label>
                <p>${purchase.time}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${purchase.medicines.map((med) => `
                  <tr>
                    <td>${med.name}</td>
                    <td>${med.quantity}</td>
                    <td>₹${med.price}</td>
                    <td>₹${med.subtotal}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>

            <div class="total-section">
              <div>Total Amount: ₹${purchase.totalAmount}</div>
            </div>

            <div class="receipt-footer">
              <p>Thank you for shopping with us!</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="purchase-history-container">
      <SalesAnalytics />
      
      <div className="purchase-history">
        <h2>Purchase History</h2>

      {purchaseHistory.length > 0 && (
        <div className="filter-section">
          <label>Filter by Patient:</label>
          <select
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
          >
            <option value="">All Patients</option>
            {[...new Map(purchaseHistory.map((p) => [p.patientId, p])).values()].map(
              (p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.patientName}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {filteredPurchases.length === 0 ? (
        <p className="no-data">No purchases found</p>
      ) : (
        <div className="purchases-list">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="purchase-card">
              <div className="purchase-header">
                <div>
                  <h3>{purchase.patientName}</h3>
                  <p className="purchase-date">
                    {purchase.date} • {purchase.time}
                  </p>
                </div>
                <div className="purchase-total">₹{purchase.totalAmount}</div>
              </div>

              <div className="purchase-body">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.medicines.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.name}</td>
                        <td>{med.quantity}</td>
                        <td>₹{med.price}</td>
                        <td>₹{med.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="purchase-footer">
                <button
                  className="btn-print-receipt"
                  onClick={() => handlePrint(purchase)}
                >
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}