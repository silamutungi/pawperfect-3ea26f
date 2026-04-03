import { Link } from 'react-router-dom'
import { CheckCircle, DollarSign, Calendar, Star, Shield, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function ForGroomers() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <div className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>For professional groomers</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text)', lineHeight: '1.1' }}>Grow your grooming business on your terms.</h1>
            <p className="text-xl mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Join PawPerfect and reach thousands of dog owners in your area. You set your prices, your hours, and your services. We handle discovery, booking, and payments.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup"><Button className="h-12 px-8 font-semibold text-base" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>List for free</Button></Link>
              <Link to="/how-it-works"><Button variant="outline" className="h-12 px-8 font-medium text-base" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>See how it works</Button></Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
              { icon: <DollarSign size={28} />, title: 'Transparent flat fee', desc: 'We charge a simple, flat platform fee on each booking — clearly disclosed before you accept. No surprise deductions, no hidden percentages.' },
              { icon: <Calendar size={28} />, title: 'You own your calendar', desc: 'Set your availability, block off days, and manage your schedule entirely from your dashboard. Sync with your existing calendar in one click.' },
              { icon: <TrendingUp size={28} />, title: 'Reliable, growing income', desc: 'Access new clients actively searching for groomers in your area. Build your reputation through verified reviews and grow your client base month over month.' }
            ].map(f => (
              <Card key={f.title} className="border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                <CardContent className="p-6">
                  <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Pricing that is honest, always.</h2>
              <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Unlike other platforms, we believe you should know exactly what you earn before you accept a booking. Our pricing model is simple:</p>
              <div className="flex flex-col gap-4">
                {[
                  'You set your service prices — full control, no floors or ceilings.',
                  'A flat platform fee is displayed clearly on every booking.',
                  'You receive payment directly after appointment completion.',
                  'No surprise deductions. No retroactive fee changes. Ever.'
                ].map(item => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    <p className="text-base" style={{ color: 'var(--color-text)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--color-primary)' }}>Example earnings</p>
              {[['Full Groom (standard)', '$65', '$6.50', '$58.50'], ['Bath & Brush', '$45', '$4.50', '$40.50'], ['De-shedding Treatment', '$55', '$5.50', '$49.50']].map(([svc, price, fee, earn]) => (
                <div key={svc} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>{svc}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Platform fee: {fee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{price} listed</p>
                    <p className="font-bold" style={{ color: 'var(--color-success)' }}>{earn} earned</p>
                  </div>
                </div>
              ))}
              <p className="text-xs mt-4" style={{ color: 'var(--color-text-secondary)' }}>10% flat platform fee shown for illustration. Exact rate disclosed at sign-up.</p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Why groomers choose PawPerfect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Shield size={20} />, title: 'Verified community', desc: 'Every groomer is vetted. Clients know they are booking from a trusted, credentialed pool — which means they trust you from day one.' },
                { icon: <Star size={20} />, title: 'Reputation that compounds', desc: 'Reviews build over time and boost your visibility in search results. Quality work turns into consistent bookings automatically.' },
                { icon: <CheckCircle size={20} />, title: 'No double-booking', desc: 'Real-time calendar sync prevents double-bookings entirely. Clients can only book slots you have actually marked as available.' },
                { icon: <DollarSign size={20} />, title: 'Reliable payment', desc: 'Payments are processed at the time of booking and transferred to you after appointment completion. No chasing clients.' }
              ].map(f => (
                <div key={f.title} className="flex gap-4 p-6 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="shrink-0" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center rounded-2xl p-12 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Ready to grow your client base?</h2>
            <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>Creating your groomer profile is free. No monthly fees. No commitment required to get started.</p>
            <Link to="/signup">
              <Button className="h-12 px-10 font-semibold text-base" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Join the marketplace — free</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
