"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ViewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, searchTerm, filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        filter: filter
      });

      const response = await fetch(`/api/admin/kundli-submissions?${params}`);
      const data = await response.json();
      
      setSubmissions(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getPlanStatus = (hasPlan, currentPlan) => {
    if (!hasPlan) return { text: "No Plan", color: "red" };
    return { text: currentPlan?.planName || "Active Plan", color: "green" };
  };

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
          <Link href="/admin/view-submissions" style={{ color: "#fff", fontWeight: "bold" }}>📋 Kundli Submissions</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <h1>Kundli Submissions</h1>

        {/* Search and Filter */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          marginBottom: "20px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="Search by name, city, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              minWidth: "300px"
            }}
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          >
            <option value="all">All Submissions</option>
            <option value="withPlan">With Plan</option>
            <option value="withoutPlan">Without Plan</option>
          </select>

          <button
            onClick={fetchSubmissions}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Refresh
          </button>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: "20px" }}>
          <p>Showing {submissions.length} of {pagination.total || 0} submissions</p>
        </div>

        {/* Submissions Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading submissions...</p>
          </div>
        ) : (
          <div style={{ overflow: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>ID</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Name</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Gender</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Birth Date</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Birth Time</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Birth Place</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Email</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Plan Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const planStatus = getPlanStatus(submission.hasPlan, submission.currentPlan);
                  return (
                    <tr key={submission.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "15px" }}>{submission.id}</td>
                      <td style={{ padding: "15px", fontWeight: "bold" }}>{submission.name}</td>
                      <td style={{ padding: "15px" }}>{submission.gender}</td>
                      <td style={{ padding: "15px" }}>{formatDate(submission.birthDate)}</td>
                      <td style={{ padding: "15px" }}>{submission.birthTime}</td>
                      <td style={{ padding: "15px" }}>
                        {submission.birthCity}, {submission.birthCountry}
                      </td>
                      <td style={{ padding: "15px" }}>
                        {submission.email || "Not provided"}
                      </td>
                      <td style={{ padding: "15px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: planStatus.color === "green" ? "#d4edda" : "#f8d7da",
                          color: planStatus.color === "green" ? "#155724" : "#721c24"
                        }}>
                          {planStatus.text}
                        </span>
                      </td>
                      <td style={{ padding: "15px" }}>
                        <button
                          style={{
                            padding: "6px 12px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "5px"
                          }}
                          onClick={() => alert(`View details for ${submission.name}`)}
                        >
                          View
                        </button>
                        <button
                          style={{
                            padding: "6px 12px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                          onClick={() => alert(`Edit ${submission.name}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
      </div>
    </div>
  );
} 