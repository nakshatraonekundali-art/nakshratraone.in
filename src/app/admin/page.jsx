'use client'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', { cache: 'no-store' })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load users')
        setUsers(data.users || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Admin Dashboard</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Name</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Gender</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Birth Date</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Birth Time</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Birthplace</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Mobile</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Email</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '8px 6px' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.name}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.gender}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{new Date(u.birthDate).toLocaleDateString()}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.birthTime}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.birthCity}, {u.birthCountry}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.mobile || '-'}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.email || '-'}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: '8px 6px' }}>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>No users yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


