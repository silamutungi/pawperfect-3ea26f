import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, Clock, CheckCircle, XCircle, Plus, PawPrint } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatDate } from '../lib/utils'
import type { Booking } from '../types'

const SEED_BOOKINGS: Booking[] = [
  { id: 'b1', userId: 'u1', groomerId: '4', groomerName: 'Pampered Pooches', service: 'Full Groom', date: '2025-02-14', time: '10:00 AM', status: 'confirmed', price: 75, dogName: 'Biscuit', notes: 'Sensitive ears — please be gentle.' },
  { id: 'b2', userId: 'u1', groomerId: '1', groomerName: 'Sunny Paws Studio', service: 'Bath & Brush', date: '2025-01-28', time: '2:00 PM', status: 'completed', price: 55, dogName: 'Biscuit', notes: '' },
  { id: 'b3', userId: 'u1', groomerId: '3', groomerName: 'Wag & Shine', service: 'Nail Trim', date: '2025-01-10', time: '11:00 AM', status: 'completed', price: 20, dogName: 'Biscuit', notes: '' }
]

const STATUS_STYLES: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  confirmed: { bg: 'rgba(22,163,74,0.1)', color: 'var(--color-success)', icon: <CheckCircle size={14} /> },
  pending: { bg: 'rgba(217,119,6,0.1)', color: 'var(--color-warning)', icon: <Clock size={14} /> },
  completed: { bg: 'rgba(37,99,235,0.1)', color: 'var(--color-info)', icon: <CalendarCheck size={14} /> },
  cancelled: { bg: 'rgba(220,38,38,0.1)', color: 'var(--color-error)', icon: <XCircle size={14} /> }
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('there')

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setBookings(SEED_BOOKINGS)
        setLoading(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const email = session.user.email ?? ''
        setUserName(email.split('@')[0] ?? 'there')
        const { data } = await supabase.from('bookings').select('*').eq('user_id', session.user.id).is('deleted_at', null).order('date', { ascending: false })
        setBookings((data as Booking[]) ?? [])
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="text-center py-3 text-sm font-medium" style={{ backgroundColor: 'var(--color-accent)', color: '#1F1A15' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Hello, {userName}</h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>Here are your upcoming and past grooming appointments.</p>
          </div>
          <Link to="/browse">
            <Button className="gap-2 h-12 px-6 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              <Plus size={16} /> Book appointment
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24">
            <PawPrint size={48} className="mx-auto mb-4" style={{ color: 'var(--color-border)' }} />
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No bookings yet</h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>Find a groomer and book your first appointment.</p>
            <Link to="/browse"><Button style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button></Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => {
              const s = STATUS_STYLES[b.status]
              return (
                <Card key={b.id} className="border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{b.groomerName}</h3>
                          <Badge style={{ backgroundColor: s.bg, color: s.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {s.icon} {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>{b.service} · {b.dogName}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{formatDate(b.date)} at {b.time}</p>
                        {b.notes && <p className="text-sm mt-2 italic" style={{ color: 'var(--color-text-secondary)' }}>Note: {b.notes}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{formatCurrency(b.price)}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Total charged</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
