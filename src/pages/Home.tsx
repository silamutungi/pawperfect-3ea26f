import { Link } from 'react-router-dom'
import { Star, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import type { Groomer } from '../types'

const SEED_GROOMERS: Groomer[] = [
  { id: '1', name: 'Sunny Paws Studio', location: 'Austin, TX', neighborhood: 'South Congress', rating: 4.9, reviewCount: 127, services: ['Full Groom', 'Bath & Brush', 'Nail Trim'], priceFrom: 55, badge: 'Top Rated', emoji: '✂️', bio: '', experience: '8 years', certifications: ['Pet First Aid'], availableToday: true },
  { id: '2', name: 'The Grooming Loft', location: 'Austin, TX', neighborhood: 'East Austin', rating: 4.8, reviewCount: 94, services: ['Full Groom', 'Puppy First Groom', 'De-shedding'], priceFrom: 60, badge: 'Certified', emoji: '🐾', bio: '', experience: '12 years', certifications: ['NDGAA Certified'], availableToday: false },
  { id: '3', name: 'Wag & Shine', location: 'Austin, TX', neighborhood: 'Mueller', rating: 4.7, reviewCount: 82, services: ['Bath & Brush', 'Nail Trim', 'Teeth Brushing'], priceFrom: 45, badge: 'Fast Booking', emoji: '🛁', bio: '', experience: '5 years', certifications: ['Pet First Aid', 'Fear Free'], availableToday: true },
  { id: '4', name: 'Pampered Pooches', location: 'Austin, TX', neighborhood: 'Domain', rating: 4.9, reviewCount: 211, services: ['Full Groom', 'De-matting', 'Spa Treatments'], priceFrom: 75, badge: 'Premium', emoji: '💎', bio: '', experience: '15 years', certifications: ['NCMG Certified', 'Pet First Aid'], availableToday: true },
  { id: '5', name: 'Fluffy & Fresh', location: 'Austin, TX', neighborhood: 'Hyde Park', rating: 4.6, reviewCount: 58, services: ['Bath & Brush', 'Full Groom', 'Flea Treatment'], priceFrom: 50, badge: 'New', emoji: '🌟', bio: '', experience: '3 years', certifications: ['Fear Free'], availableToday: false },
  { id: '6', name: 'Clip & Cuddle', location: 'Austin, TX', neighborhood: 'Bouldin Creek', rating: 4.8, reviewCount: 145, services: ['Full Groom', 'Show Prep', 'Nail Trim'], priceFrom: 65, badge: 'Verified', emoji: '🏆', bio: '', experience: '10 years', certifications: ['NDGAA Certified', 'Pet First Aid'], availableToday: true }
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="text-center py-3 text-sm font-medium" style={{ backgroundColor: 'var(--color-accent)', color: '#1F1A15' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}

      <section
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1619333774887-4cbaf126f5df?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwcHJvZmVzc2lvbmFsbHklMjBncm9vbWVkJTIwZ29sZGVuJTIwcmV0cmlldmVyJTIwc2l0dGluZyUyMGNvbnRlbnRlZGx8ZW58MHwwfHx8MTc3NTI1MzQ3Mnww&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <Badge className="mb-6 text-sm font-semibold" style={{ backgroundColor: 'var(--color-accent)', color: '#1F1A15' }}>200+ verified groomers</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Find trusted groomers<br />your dog will love.
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-xl" style={{ lineHeight: '1.6' }}>
            Transparent pricing. Verified professionals. Instant booking confirmation — no phone tag, no hidden fees.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/browse">
              <Button size="lg" className="text-base font-semibold min-h-[52px] px-8" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button>
            </Link>
            <Link to="/for-groomers">
              <Button size="lg" variant="outline" className="text-base font-semibold min-h-[52px] px-8 border-white/60 text-white hover:bg-white/10">List for free</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-10">
            {['No hidden fees', 'Certified groomers', 'Instant confirmation'].map(t => (
              <div key={t} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <CheckCircle size={16} className="text-green-400" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Featured Groomers</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Top-rated near you</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEED_GROOMERS.map(g => (
              <Link to={`/groomers/${g.id}`} key={g.id} className="block group">
                <Card className="h-full border transition-shadow hover:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{g.emoji}</span>
                      <Badge style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{g.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{g.name}</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{g.neighborhood} · {g.location}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={14} className="fill-current" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{g.rating}</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({g.reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {g.services.slice(0, 2).map(s => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>From {formatCurrency(g.priceFrom)}</span>
                      {g.availableToday && <span className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--color-success)' }}><Clock size={12} />Available today</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/browse">
              <Button variant="outline" className="gap-2" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>View all groomers <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Services</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Every service your dog needs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '✂️', label: 'Full Groom', desc: 'Bath, dry, cut & style' },
              { emoji: '🛁', label: 'Bath & Brush', desc: 'Clean coat, no haircut' },
              { emoji: '💅', label: 'Nail Trim', desc: 'Quick and stress-free' },
              { emoji: '🦷', label: 'Teeth Brushing', desc: 'Dental health care' }
            ].map(c => (
              <Link to="/browse" key={c.label}>
                <div className="rounded-xl p-6 text-center border transition-shadow hover:shadow-md" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  <div className="text-4xl mb-3">{c.emoji}</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{c.label}</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{c.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>How It Works</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Book in three easy steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', emoji: '🔍', title: 'Find your groomer', desc: 'Browse verified, certified groomers in your area. Filter by service, price, availability, and dog size.' },
              { step: '02', emoji: '📅', title: 'Book instantly', desc: 'Select your date and time, add your dog\'s details, and confirm with transparent, upfront pricing. No surprises.' },
              { step: '03', emoji: '🐕', title: 'Drop off and relax', desc: 'Your groomer is notified immediately. You get a confirmation and can message them directly anytime.' }
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="text-4xl font-bold shrink-0" style={{ color: 'var(--color-border)' }}>{s.step}</div>
                <div>
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                  <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Why PawPerfect</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Built for trust, not transactions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={32} />, title: 'Verified groomers', desc: 'Every groomer on PawPerfect completes identity verification, background checks, and qualification review. No shortcuts.' },
              { icon: <CheckCircle size={32} />, title: 'No hidden fees', desc: 'The price you see is the price you pay. We charge a flat platform fee — always disclosed before you confirm.' },
              { icon: <Clock size={32} />, title: 'Instant confirmation', desc: 'Real-time calendar sync means no double-bookings. You get a confirmed appointment the moment you book.' }
            ].map(f => (
              <div key={f.title}>
                <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
