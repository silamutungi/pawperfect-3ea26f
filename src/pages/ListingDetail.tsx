import { useParams, Link } from 'react-router-dom'
import { Star, Shield, Clock, CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { formatCurrency, formatShortDate } from '../lib/utils'
import type { Groomer, Review } from '../types'

const ALL_GROOMERS: Groomer[] = [
  { id: '1', name: 'Sunny Paws Studio', location: 'Austin, TX', neighborhood: 'South Congress', rating: 4.9, reviewCount: 127, services: ['Full Groom', 'Bath & Brush', 'Nail Trim'], priceFrom: 55, badge: 'Top Rated', emoji: '✂️', bio: 'Sunny Paws Studio has been pampering Austin dogs for over 8 years. We specialize in breed-specific cuts with a calm, fear-free approach. Every dog gets individual attention in a one-on-one setting — no cage drying, no rush.', experience: '8 years', certifications: ['Pet First Aid', 'Fear Free Certified'], availableToday: true },
  { id: '2', name: 'The Grooming Loft', location: 'Austin, TX', neighborhood: 'East Austin', rating: 4.8, reviewCount: 94, services: ['Full Groom', 'Puppy First Groom', 'De-shedding'], priceFrom: 60, badge: 'Certified', emoji: '🐾', bio: 'Expert in all breeds with a specialty in double-coat and long-haired dogs. NDGAA certified with 12 years of professional experience. We offer a calm, cage-free environment with natural, hypoallergenic products.', experience: '12 years', certifications: ['NDGAA Certified', 'Pet First Aid'], availableToday: false },
  { id: '3', name: 'Wag & Shine', location: 'Austin, TX', neighborhood: 'Mueller', rating: 4.7, reviewCount: 82, services: ['Bath & Brush', 'Nail Trim', 'Teeth Brushing'], priceFrom: 45, badge: 'Fast Booking', emoji: '🛁', bio: 'Quick, stress-free grooming for dogs of all temperaments. We specialize in anxious dogs and have completed Fear Free certification training. Affordable, transparent pricing — what you see is what you pay.', experience: '5 years', certifications: ['Pet First Aid', 'Fear Free'], availableToday: true },
  { id: '4', name: 'Pampered Pooches', location: 'Austin, TX', neighborhood: 'Domain', rating: 4.9, reviewCount: 211, services: ['Full Groom', 'De-matting', 'Spa Treatments'], priceFrom: 75, badge: 'Premium', emoji: '💎', bio: 'Luxury grooming experience with organic, cruelty-free products and full spa treatments. NCMG certified with 15 years of experience serving Austin\'s most discerning pet owners. One dog at a time. Always.', experience: '15 years', certifications: ['NCMG Certified', 'Pet First Aid', 'Fear Free'], availableToday: true },
  { id: '5', name: 'Fluffy & Fresh', location: 'Austin, TX', neighborhood: 'Hyde Park', rating: 4.6, reviewCount: 58, services: ['Bath & Brush', 'Full Groom', 'Flea Treatment'], priceFrom: 50, badge: 'New', emoji: '🌟', bio: 'Fresh faces and wagging tails — gentle grooming for anxious and rescue pups. Fear Free certified and dedicated to making every visit a positive experience for your dog.', experience: '3 years', certifications: ['Fear Free'], availableToday: false },
  { id: '6', name: 'Clip & Cuddle', location: 'Austin, TX', neighborhood: 'Bouldin Creek', rating: 4.8, reviewCount: 145, services: ['Full Groom', 'Show Prep', 'Nail Trim'], priceFrom: 65, badge: 'Verified', emoji: '🏆', bio: 'Show-quality grooming for pets and competitive show dogs alike. NDGAA certified with 10 years of experience. We serve everything from the family Lab to the Westminster contender.', experience: '10 years', certifications: ['NDGAA Certified', 'Pet First Aid'], availableToday: true }
]

const SEED_REVIEWS: Review[] = [
  { id: 'r1', groomerId: '1', authorName: 'Sarah M.', authorDog: 'Golden Retriever, Biscuit', rating: 5, body: 'Absolutely love Sunny Paws! Biscuit always comes home looking and smelling amazing. The groomer is so patient with him and the booking process was effortless. Pricing was exactly what was shown — no surprises at checkout.', date: '2024-11-15' },
  { id: 'r2', groomerId: '1', authorName: 'James T.', authorDog: 'Doodle mix, Charlie', rating: 5, body: 'Best groomer we have ever used. Charlie is anxious around strangers but he was calm and happy when I picked him up. They messaged me updates throughout the appointment. Five stars, no question.', date: '2024-10-28' },
  { id: 'r3', groomerId: '1', authorName: 'Priya K.', authorDog: 'Shih Tzu, Mochi', rating: 5, body: 'Mochi has sensitive skin and I was nervous trying a new groomer. They asked all the right questions beforehand and used gentle, hypoallergenic products. She came back with the most adorable cut. Already rebooked!', date: '2024-10-10' }
]

const SERVICE_PRICES: Record<string, number> = {
  'Full Groom': 65,
  'Bath & Brush': 45,
  'Nail Trim': 20,
  'De-shedding': 55,
  'Puppy First Groom': 50,
  'Teeth Brushing': 15,
  'De-matting': 60,
  'Spa Treatments': 85,
  'Flea Treatment': 35,
  'Show Prep': 120
}

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const groomer = ALL_GROOMERS.find(g => g.id === id) ?? ALL_GROOMERS[0]

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          <ArrowLeft size={16} /> Back to browse
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-8 mb-6 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{groomer.emoji}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{groomer.name}</h1>
                    <Badge style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{groomer.badge}</Badge>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{groomer.neighborhood} · {groomer.location}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-current" style={{ color: 'var(--color-accent)' }} />
                      <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{groomer.rating}</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({groomer.reviewCount} reviews)</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{groomer.experience} experience</span>
                    {groomer.availableToday && <span className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--color-success)' }}><Clock size={14} /> Available today</span>}
                  </div>
                </div>
              </div>
              <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{groomer.bio}</p>
              <div className="flex flex-wrap gap-2">
                {groomer.certifications.map(c => (
                  <span key={c} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-success)', border: '1px solid var(--color-border)' }}>
                    <Shield size={12} /> {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Services offered</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groomer.services.map(s => (
                  <div key={s} className="flex items-center justify-between p-4 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />
                      <span className="font-medium" style={{ color: 'var(--color-text)' }}>{s}</span>
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{formatCurrency(SERVICE_PRICES[s] ?? 50)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>What dog owners say</h2>
              <div className="flex flex-col gap-4">
                {SEED_REVIEWS.map(r => (
                  <Card key={r.id} className="border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{r.authorName}</p>
                          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{r.authorDog}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} className="fill-current" style={{ color: 'var(--color-accent)' }} />)}
                          <span className="text-xs ml-1" style={{ color: 'var(--color-text-secondary)' }}>{formatShortDate(r.date)}</span>
                        </div>
                      </div>
                      <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{r.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="border sticky top-24" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
              <CardContent className="p-6">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-secondary)' }}>Starting from</p>
                <p className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{formatCurrency(groomer.priceFrom)}</p>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>All prices shown upfront — no surprise fees.</p>
                <Link to="/signup">
                  <Button className="w-full mb-3 h-12 font-semibold text-base" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Book this groomer</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="w-full h-12 font-medium gap-2" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <MessageCircle size={16} /> Send a message
                  </Button>
                </Link>
                <div className="mt-6 flex flex-col gap-3">
                  {[['No booking fees', 'The price you see is final.'], ['Instant confirmation', 'Confirmed in real time.'], ['Easy cancellation', 'Cancel up to 24h before.']].map(([title, desc]) => (
                    <div key={title} className="flex gap-2">
                      <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{title}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
