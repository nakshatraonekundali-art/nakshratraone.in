"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    paymentReceived: 0,
    withPlan: 0,
    withoutPlan: 0,
  });

  useEffect(() => {
    // Backend API se data fetch karo
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#222",
        color: "#fff",
        padding: "20px",
      }}>
        <h2>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/admin" style={{ color: "#fff" }}>📊 Dashboard</Link>
          <Link href="/admin/create-plan" style={{ color: "#fff" }}>➕ Create Plan</Link>
          <Link href="/admin/view-users" style={{ color: "#fff" }}>👥 View All Users</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Dashboard</h1>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Payment Received" value={`₹${stats.paymentReceived}`} />
          <StatCard title="Users With Plan" value={stats.withPlan} />
          <StatCard title="Users Without Plan" value={stats.withoutPlan} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{
      background: "#f4f4f4",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
