import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import type { Groomer } from '../types'

const ALL_GROOMERS: Groomer[] = [
  { id: '1', name: 'Sunny Paws Studio', location: 'Austin, TX', neighborhood: 'South Congress', rating: 4.9, reviewCount: 127, services: ['Full Groom', 'Bath & Brush', 'Nail Trim'], priceFrom: 55, badge: 'Top Rated', emoji: '✂️', bio: 'Specializing in breed-specific cuts with a calm, fear-free approach.', experience: '8 years', certifications: ['Pet First Aid'], availableToday: true },
  { id: '2', name: 'The Grooming Loft', location: 'Austin, TX', neighborhood: 'East Austin', rating: 4.8, reviewCount: 94, services: ['Full Groom', 'Puppy First Groom', 'De-shedding'], priceFrom: 60, badge: 'Certified', emoji: '🐾', bio: 'Expert in all breeds with a specialty in double-coat and long-haired dogs.', experience: '12 years', certifications: ['NDGAA Certified'], availableToday: false },
  { id: '3', name: 'Wag & Shine', location: 'Austin, TX', neighborhood: 'Mueller', rating: 4.7, reviewCount: 82, services: ['Bath & Brush', 'Nail Trim', 'Teeth Brushing'], priceFrom: 45, badge: 'Fast Booking', emoji: '🛁', bio: 'Quick, stress-free grooming for dogs of all temperaments.', experience: '5 years', certifications: ['Pet First Aid', 'Fear Free'], availableToday: true },
  { id: '4', name: 'Pampered Pooches', location: 'Austin, TX', neighborhood: 'Domain', rating: 4.9, reviewCount: 211, services: ['Full Groom', 'De-matting', 'Spa Treatments'], priceFrom: 75, badge: 'Premium', emoji: '💎', bio: 'Luxury grooming experience with organic products and spa treatments.', experience: '15 years', certifications: ['NCMG Certified', 'Pet First Aid'], availableToday: true },
  { id: '5', name: 'Fluffy & Fresh', location: 'Austin, TX', neighborhood: 'Hyde Park', rating: 4.6, reviewCount: 58, services: ['Bath & Brush', 'Full Groom', 'Flea Treatment'], priceFrom: 50, badge: 'New', emoji: '🌟', bio: 'Fresh faces and wagging tails — gentle grooming for anxious pups.', experience: '3 years', certifications: ['Fear Free'], availableToday: false },
  { id: '6', name: 'Clip & Cuddle', location: 'Austin, TX', neighborhood: 'Bouldin Creek', rating: 4.8, reviewCount: 145, services: ['Full Groom', 'Show Prep', 'Nail Trim'], priceFrom: 65, badge: 'Verified', emoji: '🏆', bio: 'Show-quality grooming for pets and competitive show dogs alike.', experience: '10 years', certifications: ['NDGAA Certified', 'Pet First Aid'], availableToday: true },
  { id: '7', name: 'Happy Hound Spa', location: 'Austin, TX', neighborhood: 'Westlake', rating: 4.7, reviewCount: 76, services: ['Full Groom', 'Bath & Brush', 'De-shedding'], priceFrom: 58, badge: 'Verified', emoji: '🐩', bio: 'A relaxing spa environment designed to reduce grooming anxiety.', experience: '7 years', certifications: ['Pet First Aid'], availableToday: true },
  { id: '8', name: 'Tails & Trims', location: 'Austin, TX', neighborhood: 'Sunset Valley', rating: 4.5, reviewCount: 43, services: ['Nail Trim', 'Bath & Brush', 'Teeth Brushing'], priceFrom: 40, badge: 'New', emoji: '✨', bio: 'Affordable, friendly grooming for every size and breed.', experience: '2 years', certifications: ['Fear Free'], availableToday: false }
]

const SERVICES = ['All Services', 'Full Groom', 'Bath & Brush', 'Nail Trim', 'De-shedding', 'Teeth Brushing']
const SORT_OPTIONS = ['Top Rated', 'Price: Low to High', 'Price: High to Low', 'Most Reviews']

export default function Browse() {
  const [search, setSearch] = useState('')
  const [selectedService, setSelectedService] = useState('All Services')
  const [sortBy, setSortBy] = useState('Top Rated')
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = ALL_GROOMERS
    .filter(g => {
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.neighborhood.toLowerCase().includes(search.toLowerCase())
      const matchService = selectedService === 'All Services' || g.services.includes(selectedService)
      const matchAvail = !availableOnly || g.availableToday
      return matchSearch && matchService && matchAvail
    })
    .sort((a, b) => {
      if (sortBy === 'Top Rated') return b.rating - a.rating
      if (sortBy === 'Price: Low to High') return a.priceFrom - b.priceFrom
      if (sortBy === 'Price: High to Low') return b.priceFrom - a.priceFrom
      if (sortBy === 'Most Reviews') return b.reviewCount - a.reviewCount
      return 0
    })

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="text-center py-3 text-sm font-medium" style={{ backgroundColor: 'var(--color-accent)', color: '#1F1A15' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Find a dog groomer</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Verified professionals with transparent pricing near you.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <Input placeholder="Search by name or neighborhood..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-12" />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="h-12 px-4 rounded-lg border text-sm font-medium" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <Button variant="outline" onClick={() => setAvailableOnly(v => !v)} className="h-12 gap-2" style={{ borderColor: availableOnly ? 'var(--color-primary)' : 'var(--color-border)', color: availableOnly ? 'var(--color-primary)' : 'var(--color-text)' }}>
              <SlidersHorizontal size={16} /> Available today
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {SERVICES.map(s => (
            <button key={s} onClick={() => setSelectedService(s)} className="px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[44px]" style={{ backgroundColor: selectedService === s ? 'var(--color-primary)' : 'var(--color-bg-surface)', color: selectedService === s ? '#ffffff' : 'var(--color-text-secondary)', borderColor: selectedService === s ? 'var(--color-primary)' : 'var(--color-border)' }}>
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{filtered.length} groomers found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="text-4xl mb-4">🐾</div>
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No groomers match your filters</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(g => (
              <Link to={`/groomers/${g.id}`} key={g.id} className="block">
                <Card className="h-full border transition-shadow hover:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{g.emoji}</span>
                      <Badge style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{g.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{g.name}</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{g.neighborhood} · {g.experience} experience</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="fill-current" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{g.rating}</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({g.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {g.services.slice(0, 2).map(s => <span key={s} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{s}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: 'var(--color-text)' }}>From {formatCurrency(g.priceFrom)}</span>
                      {g.availableToday && <span className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--color-success)' }}><Clock size={12} />Today</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
