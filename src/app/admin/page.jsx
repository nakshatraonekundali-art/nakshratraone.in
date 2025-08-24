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
    // Fetch kundli analysis statistics
    fetch("/api/admin/kundli-stats")
      .then(res => res.json())
      .then(data => setStats({
        totalUsers: data.totalUsers,
        paymentReceived: data.totalRevenue,
        withPlan: data.usersWithPlans,
        withoutPlan: data.usersWithoutPlans,
        recentSubmissions: data.recentSubmissions,
        genderStats: data.genderStats,
        topCities: data.topCities
      }))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "#ff8c00",
        padding: "20px",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            ⭐
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#ff8c00" }}>Admin Panel</h2>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link href="/admin" style={{ 
            color: "#ff8c00", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>📊 Dashboard</Link>
          <Link href="/admin/create-plan" style={{ 
            color: "#ff8c00", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>➕ Create Plan</Link>
        
          <Link href="/admin/view-users" style={{ 
            color: "#ff8c00", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>👥 View All Users</Link>
          <Link href="/" style={{ 
            color: "#ff8c00", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.2)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            marginTop: "auto"
          }}>🚪 Logout</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", overflow: "auto" }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          marginBottom: "30px",
          color: "#ff8c00",
          textAlign: "center"
        }}>Dashboard</h1>
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
          <StatCard title="Recent Submissions" value={stats.recentSubmissions} />
        </div>

        {/* Additional Analytics */}
        {stats.genderStats && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ marginBottom: "20px", color: "#ff8c00" }}>Gender Distribution</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px"
            }}>
              {stats.genderStats.map((stat, index) => (
                <div key={index} style={{
                  background: "#f4f4f4",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <h3 style={{ color: "#ff8c00" }}>{stat.gender}</h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ff8c00" }}>
                    {stat._count.gender}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats.topCities && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ marginBottom: "20px", color: "#ff8c00" }}>Top Birth Cities</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px"
            }}>
              {stats.topCities.map((city, index) => (
                <div key={index} style={{
                  background: "#f4f4f4",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <h3 style={{ color: "#ff8c00" }}>{city.birthCity}</h3>
                  <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ff8c00" }}>
                    {city._count.birthCity} users
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
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
      <h3 style={{ color: "#ff8c00" }}>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ff8c00" }}>{value}</p>
    </div>
  );
}