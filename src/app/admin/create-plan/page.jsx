"use client";
import { useState } from "react";

export default function CreatePlanPage() {
  const [formData, setFormData] = useState({
    planName: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/plan/create-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: formData.planName,
          description: formData.description,
          price: parseFloat(formData.price),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Plan created successfully!");
        setFormData({ planName: "", description: "", price: "" });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      {/* Sidebar (persistent like dashboard) */}
      <div style={{
        width: "250px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
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
          }}>⭐</div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Admin Panel</h2>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <a href="/admin" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(255,255,255,0.05)", textDecoration: "none" }}>📊 Dashboard</a>
          <a href="/admin/create-plan" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(255,255,255,0.1)", textDecoration: "none" }}>➕ Create Plan</a>
          <a href="/admin/manage-plans" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(255,255,255,0.05)", textDecoration: "none" }}>⚙️ Manage Plans</a>
          <a href="/admin/view-submissions" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(255,255,255,0.05)", textDecoration: "none" }}>📋 Kundli Submissions</a>
          <a href="/admin/view-users" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(255,255,255,0.05)", textDecoration: "none" }}>👥 View All Users</a>
          <a href="/" style={{ color: "#fff", padding: "12px 15px", borderRadius: 8, background: "rgba(239,68,68,0.2)", textDecoration: "none", marginTop: "auto" }}>🚪 Logout</a>
        </nav>
      </div>

      {/* Main Panel */}
      <div style={{ flex: 1, padding: "30px", overflow: "auto" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "24px"
          }}>
            ⭐
          </div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "10px"
          }}>Create New Plan</h1>
          <p style={{ color: "#666", fontSize: "14px" }}>Add a new subscription plan for users</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: "600", 
              marginBottom: "8px",
              color: "#333"
            }}>
              Plan Name
            </label>
            <input 
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              placeholder="Enter plan name..."
              required 
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid #e1e5e9",
                borderRadius: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                background: "rgba(255, 255, 255, 0.9)"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: "600", 
              marginBottom: "8px",
              color: "#333"
            }}>
              Description
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter plan description..."
              rows="4"
              required 
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid #e1e5e9",
                borderRadius: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                background: "rgba(255, 255, 255, 0.9)",
                fontFamily: "inherit"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: "600", 
              marginBottom: "8px",
              color: "#333"
            }}>
              Price (₹)
            </label>
            <input 
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price..."
              required 
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid #e1e5e9",
                borderRadius: "10px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                background: "rgba(255, 255, 255, 0.9)"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{
              background: loading 
                ? "linear-gradient(45deg, #ccc, #999)" 
                : "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              marginTop: "10px",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid transparent",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}></div>
                Creating Plan...
              </span>
            ) : (
              "Create Plan"
            )}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "500",
            background: message.startsWith("✅")
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            color: message.startsWith("✅")
              ? "#166534"
              : "#dc2626",
            border: `1px solid ${message.startsWith("✅") ? "#22c55e" : "#ef4444"}`
          }}>
            {message}
          </div>
        )}

        <div style={{ 
          textAlign: "center", 
          marginTop: "20px",
          padding: "15px",
          background: "rgba(102, 126, 234, 0.1)",
          borderRadius: "10px",
          border: "1px solid rgba(102, 126, 234, 0.2)"
        }}>
          <p style={{ 
            fontSize: "14px", 
            color: "#667eea",
            margin: 0
          }}>
            💡 Tip: Create attractive plans to increase user engagement
          </p>
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
