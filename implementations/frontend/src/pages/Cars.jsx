import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

function Cars() {
  const [cars, setCars] = useState([])
  const [form, setForm] = useState({ pickup_date: '', return_date: '' })
  const [selectedCar, setSelectedCar] = useState(null)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/cars').then(res => setCars(res.data))
  }, [])

  const handleBook = async (carId) => {
    if (!localStorage.getItem('token')) return navigate('/login')
    try {
      const res = await api.post('/bookings', { car_id: carId, ...form })
      setMessage(`Booking confirmed! Total: ฿${res.data.total_price}`)
      setSelectedCar(null)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Available Cars</h1>
        <span className="text-muted-foreground mb-8 block">Select a car and choose your rental dates</span>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary text-primary">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <span className="text-muted-foreground">Loading cars...</span>
            </div>
          ) : (
            cars.map(car => (
              <Card key={car.id} className="overflow-hidden hover:border-primary transition">
                <div className="h-40 bg-muted flex items-center justify-center text-4xl">
                  🚗
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{car.brand} {car.model}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <span className="block">Type: {car.type}</span>
                    <span className="block">Location: {car.location}</span>
                    <span className="block font-semibold text-primary">฿{car.price_per_day}/day</span>
                  </div>

                  {selectedCar === car.id ? (
                    <div className="space-y-3 pt-2">
                      <Input
                        type="date"
                        value={form.pickup_date}
                        onChange={e => setForm({...form, pickup_date: e.target.value})}
                      />
                      <Input
                        type="date"
                        value={form.return_date}
                        onChange={e => setForm({...form, return_date: e.target.value})}
                      />
                      <Button className="w-full" onClick={() => handleBook(car.id)}>
                        Confirm Booking
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedCar(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full mt-2" onClick={() => setSelectedCar(car.id)}>
                      Book Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Cars
