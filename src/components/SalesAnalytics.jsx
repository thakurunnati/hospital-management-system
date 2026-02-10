import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import "../stylesheets/SalesAnalytics.css";

export default function SalesAnalytics() {
  const bills = useSelector((state) => state.bills) || [];
  const purchaseHistory = useSelector((state) => state.purchaseHistory) || [];

  const calculateCollectionData = () => {
    let doctorFeesTotal = 0;
    let medicinesTotal = 0;

    bills.forEach((bill) => {
      doctorFeesTotal += bill.doctorFee || 0;
      if (bill.medicines && bill.medicines.length > 0) {
        bill.medicines.forEach((med) => {
          medicinesTotal += med.price || 0;
        });
      }
    });

    purchaseHistory.forEach((purchase) => {
      if (purchase.medicines && purchase.medicines.length > 0) {
        purchase.medicines.forEach((med) => {
          medicinesTotal += med.subtotal || 0;
        });
      }
    });

    const totalCollection = doctorFeesTotal + medicinesTotal;

    if (totalCollection === 0) {
      return [];
    }

    return [
      {
        name: "Doctor Fees",
        value: Math.round(doctorFeesTotal),
        percentage: Math.round((doctorFeesTotal / totalCollection) * 100),
      },
      {
        name: "Medicines Sale",
        value: Math.round(medicinesTotal),
        percentage: Math.round((medicinesTotal / totalCollection) * 100),
      },
    ];
  };

  const data = calculateCollectionData();
  const totalCollection = data.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ["#667eea", "#764ba2"];

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="pie-label"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="sales-analytics">
      <h2>Hospital Revenue Analytics</h2>

      {data.length === 0 ? (
        <div className="no-data-analytics">
          <p>No sales data available yet</p>
        </div>
      ) : (
        <>
          <div className="analytics-container">
            <div className="chart-section">
              <h3>Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => (
                      <CustomLabel
                        {...props}
                        percentage={props.payload.percentage}
                      />
                    )}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) =>
                      `${entry.payload.name} (${entry.payload.percentage}%)`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="summary-section">
              <h3>Collection Summary</h3>
              <div className="summary-cards">
                {data.map((item, index) => (
                  <div key={index} className="summary-card">
                    <div
                      className="card-color"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <div className="card-content">
                      <h4>{item.name}</h4>
                      <p className="card-amount">₹{item.value.toLocaleString()}</p>
                      <p className="card-percentage">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="total-collection">
                <label>Total Hospital Collection:</label>
                <p className="total-amount">₹{totalCollection.toLocaleString()}</p>
              </div>

              <div className="breakdown-table">
                <h4>Detailed Breakdown</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Revenue Source</th>
                      <th>Amount</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>₹{item.value.toLocaleString()}</td>
                        <td>{item.percentage}%</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td>Total</td>
                      <td>₹{totalCollection.toLocaleString()}</td>
                      <td>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}