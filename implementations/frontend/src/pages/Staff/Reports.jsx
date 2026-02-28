import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'

function Reports() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/staff/reports/reservations')
      .then(res => setRows(res.data))
      .catch(() => setError('Failed to load reports'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Reservation Reports</h1>
        {error && <p className="text-destructive mb-4">{error}</p>}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Return</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.user_name}</TableCell>
                    <TableCell>{r.user_email}</TableCell>
                    <TableCell>{r.brand} {r.model}</TableCell>
                    <TableCell>{r.pickup_date?.split('T')[0]}</TableCell>
                    <TableCell>{r.return_date?.split('T')[0]}</TableCell>
                    <TableCell>฿{r.total_price}</TableCell>
                    <TableCell>{r.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Reports
