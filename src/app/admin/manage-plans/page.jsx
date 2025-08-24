"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editForm, setEditForm] = useState({
    planName: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/plan/plan-list');
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setEditForm({
      planName: plan.planName,
      description: plan.description,
      price: plan.price.toString()
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/plan/update/${editingPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        alert('Plan updated successfully!');
        setEditingPlan(null);
        fetchPlans();
      } else {
        alert('Failed to update plan');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Error updating plan');
    }
  };

  const handleDelete = async (planId) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      const response = await fetch(`/api/plan/delete/${planId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Plan deleted successfully!');
        fetchPlans();
      } else {
        alert('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Error deleting plan');
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      {/* Animated Background Stars */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: "pulse 3s infinite",
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "20px",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        zIndex: 10
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
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Admin Panel</h2>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link href="/admin" style={{ 
            color: "#fff", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>📊 Dashboard</Link>
          <Link href="/admin/create-plan" style={{ 
            color: "#fff", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>➕ Create Plan</Link>
          <Link href="/admin/manage-plans" style={{ 
            color: "#fff", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>⚙️ Manage Plans</Link>
          <Link href="/admin/view-submissions" style={{ 
            color: "#fff", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>📋 Kundli Submissions</Link>
          <Link href="/admin/view-users" style={{ 
            color: "#fff", 
            padding: "12px 15px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>👥 View All Users</Link>
          <Link href="/" style={{ 
            color: "#fff", 
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
      <div style={{ 
        flex: 1, 
        padding: "30px", 
        overflow: "auto",
        position: "relative",
        zIndex: 10
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          marginBottom: "30px",
          background: "linear-gradient(45deg, #ff6b6b, #feca57)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}>Manage Plans</h1>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }}></div>
            <p style={{ color: "white", fontSize: "18px" }}>Loading plans...</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {plans.map((plan) => (
              <div key={plan.id} style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <h3 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    {plan.planName}
                  </h3>
                  <div style={{
                    background: "linear-gradient(45deg, #ff6b6b, #feca57)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                  }}>
                    ₹{plan.price}
                  </div>
                </div>
                
                <p style={{ 
                  color: "#666", 
                  marginBottom: "20px",
                  lineHeight: "1.6"
                }}>
                  {plan.description}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(plan)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "linear-gradient(45deg, #ef4444, #dc2626)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {plans.length === 0 && !loading && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📋</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#333" }}>No Plans Found</h3>
            <p style={{ color: "#666", marginBottom: "30px" }}>Create your first plan to get started</p>
            <Link href="/admin/create-plan">
              <button style={{
                padding: "12px 24px",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "16px"
              }}>
                Create First Plan
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
          }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              fontWeight: "bold",
              marginBottom: "20px",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Edit Plan
            </h2>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Plan Name
              </label>
              <input
                type="text"
                value={editForm.planName}
                onChange={(e) => setEditForm({...editForm, planName: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Description
              </label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows="4"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  resize: "vertical",
                  transition: "border-color 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={editForm.price}
                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
              />
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "16px"
                }}
              >
                Update Plan
              </button>
              <button
                onClick={() => setEditingPlan(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "16px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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