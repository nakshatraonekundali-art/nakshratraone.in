"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm
      });

      const response = await fetch(`/api/user/all?${params}`);
      const data = await response.json();
      
      setUsers(data.users || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
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
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          marginBottom: "30px",
          background: "linear-gradient(45deg, #ff6b6b, #feca57)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}>All Users</h1>

        {/* Search */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          marginBottom: "20px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="Search by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "15px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              minWidth: "300px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              color: "#333",
              fontSize: "16px"
            }}
          />
          
          <button
            onClick={fetchUsers}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "16px",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Refresh
          </button>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "15px",
          borderRadius: "10px",
          backdropFilter: "blur(10px)"
        }}>
          <p style={{ color: "white", margin: 0, fontSize: "16px" }}>
            Showing {users.length} of {pagination.total || 0} users
          </p>
        </div>

                {/* Users Table */}
        {loading ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }}></div>
            <p style={{ color: "white", fontSize: "18px" }}>Loading users...</p>
          </div>
        ) : (
          <div style={{ overflow: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <thead>
                <tr style={{ 
                  background: "rgba(102, 126, 234, 0.1)",
                  borderBottom: "2px solid rgba(102, 126, 234, 0.2)"
                }}>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>ID</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Name</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Gender</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Birth Date</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Birth Time</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Birth Place</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Mobile</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Email</th>
                  <th style={{ 
                    padding: "20px 15px", 
                    textAlign: "left", 
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} style={{ 
                    borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
                    background: index % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.8)",
                    transition: "background 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(102, 126, 234, 0.1)"}
                  onMouseLeave={(e) => e.target.style.background = index % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.8)"}>
                    <td style={{ padding: "15px", fontWeight: "500" }}>{user.id}</td>
                    <td style={{ padding: "15px", fontWeight: "bold", color: "#667eea" }}>{user.name}</td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        background: user.gender === 'Male' ? "#3b82f6" : "#ec4899"
                      }}>
                        {user.gender}
                      </span>
                    </td>
                    <td style={{ padding: "15px" }}>{formatDate(user.birthDate)}</td>
                    <td style={{ padding: "15px" }}>{user.birthTime}</td>
                    <td style={{ padding: "15px" }}>
                      {user.birthCity}, {user.birthCountry}
                    </td>
                    <td style={{ padding: "15px" }}>{user.mobile || "-"}</td>
                    <td style={{ padding: "15px" }}>
                      {user.email || "Not provided"}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <Link href={`/admin/view-users/${user.id}`}>
                        <button
                          style={{
                            padding: "8px 16px",
                            background: "linear-gradient(45deg, #28a745, #20c997)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            marginRight: "8px",
                            fontWeight: "500",
                            transition: "transform 0.2s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        >
                          View
                        </button>
                      </Link>
                      <button
                        style={{
                          padding: "8px 16px",
                          background: "linear-gradient(45deg, #007bff, #0056b3)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "500",
                          transition: "transform 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        onClick={() => alert(`Edit ${user.name}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px"
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                background: currentPage === 1 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer"
              }}
            >
              Previous
            </button>
            
            <span style={{ padding: "8px 16px" }}>
              Page {currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={currentPage === pagination.totalPages}
              style={{
                padding: "8px 16px",
                background: currentPage === pagination.totalPages ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: currentPage === pagination.totalPages ? "not-allowed" : "pointer"
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px"
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "12px 20px",
                background: currentPage === 1 ? "rgba(255, 255, 255, 0.2)" : "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: "500",
                fontSize: "16px",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) e.target.style.transform = "scale(1)";
              }}
            >
              Previous
            </button>
            
            <span style={{ 
              padding: "12px 20px",
              color: "white",
              fontWeight: "500",
              fontSize: "16px"
            }}>
              Page {currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={currentPage === pagination.totalPages}
              style={{
                padding: "12px 20px",
                background: currentPage === pagination.totalPages ? "rgba(255, 255, 255, 0.2)" : "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: currentPage === pagination.totalPages ? "not-allowed" : "pointer",
                fontWeight: "500",
                fontSize: "16px",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (currentPage !== pagination.totalPages) e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if (currentPage !== pagination.totalPages) e.target.style.transform = "scale(1)";
              }}
            >
              Next
            </button>
          </div>
        )}
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