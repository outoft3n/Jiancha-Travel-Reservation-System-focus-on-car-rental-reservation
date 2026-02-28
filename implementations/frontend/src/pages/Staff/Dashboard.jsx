import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'

function Dashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, availableCars: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/staff/dashboard')
      .then(res => setStats(res.data))
      .catch(() => setError('Failed to load dashboard'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Staff Dashboard</h1>
        {error && <p className="text-destructive mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{stats.totalBookings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">฿{stats.totalRevenue}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Available Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{stats.availableCars}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
