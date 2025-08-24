"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDetail() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${params.id}`);
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        height: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p style={{ color: "white", fontSize: "18px" }}>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: "flex", 
        height: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>User not found</h2>
          <button 
            onClick={() => router.back()}
            style={{
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
            background: "rgba(255, 255, 255, 0.05)",
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
            background: "rgba(255, 255, 255, 0.1)",
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <button 
            onClick={() => router.back()}
            style={{
              padding: "10px 15px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ← Back
          </button>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold",
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            User Details
          </h1>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              color: "white",
              marginRight: "20px"
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ 
                fontSize: "2rem", 
                fontWeight: "bold",
                marginBottom: "5px",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {user.name}
              </h2>
              <p style={{ color: "#666", fontSize: "1.1rem" }}>User ID: {user.id}</p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px"
          }}>
            <div style={{
              background: "rgba(102, 126, 234, 0.1)",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid rgba(102, 126, 234, 0.2)"
            }}>
              <h3 style={{ 
                fontSize: "1.3rem", 
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#667eea"
              }}>
                Personal Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Name:</span>
                  <span style={{ color: "#666" }}>{user.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Gender:</span>
                  <span style={{ 
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "15px",
                    background: user.gender === 'Male' ? "#3b82f6" : "#ec4899",
                    fontSize: "0.9rem"
                  }}>
                    {user.gender}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Email:</span>
                  <span style={{ color: "#666" }}>{user.email || "Not provided"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Mobile:</span>
                  <span style={{ color: "#666" }}>{user.mobile || "Not provided"}</span>
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 193, 7, 0.1)",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid rgba(255, 193, 7, 0.2)"
            }}>
              <h3 style={{ 
                fontSize: "1.3rem", 
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#f59e0b"
              }}>
                Birth Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Date of Birth:</span>
                  <span style={{ color: "#666" }}>{formatDate(user.birthDate)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Time of Birth:</span>
                  <span style={{ color: "#666" }}>{user.birthTime}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Birth City:</span>
                  <span style={{ color: "#666" }}>{user.birthCity}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Birth Country:</span>
                  <span style={{ color: "#666" }}>{user.birthCountry}</span>
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(34, 197, 94, 0.1)",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid rgba(34, 197, 94, 0.2)"
            }}>
              <h3 style={{ 
                fontSize: "1.3rem", 
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#22c55e"
              }}>
                Account Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>User ID:</span>
                  <span style={{ color: "#666" }}>{user.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Created:</span>
                  <span style={{ color: "#666" }}>{formatDate(user.createdAt)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#333" }}>Last Updated:</span>
                  <span style={{ color: "#666" }}>{formatDate(user.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: "30px",
            padding: "25px",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "15px",
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            <h3 style={{ 
              fontSize: "1.3rem", 
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#ef4444"
            }}>
              Actions
            </h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <button style={{
                padding: "12px 24px",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "16px",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                View Kundli Analysis
              </button>
              <button style={{
                padding: "12px 24px",
                background: "linear-gradient(45deg, #f59e0b, #f97316)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "16px",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                Edit User
              </button>
              <button style={{
                padding: "12px 24px",
                background: "linear-gradient(45deg, #ef4444, #dc2626)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "16px",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                Delete User
              </button>
            </div>
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