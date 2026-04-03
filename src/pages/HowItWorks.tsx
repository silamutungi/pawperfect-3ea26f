import { Link } from 'react-router-dom'
import { Search, CalendarCheck, Star, Scissors, DollarSign, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function HowItWorks() {
  const ownerSteps = [
    { icon: <Search size={32} />, step: '01', title: 'Find your groomer', desc: 'Browse verified, certified groomers in your area. Filter by service type, price range, dog size, and real-time availability. Every profile shows credentials upfront.' },
    { icon: <CalendarCheck size={32} />, step: '02', title: 'Book instantly', desc: 'Select your preferred date and time from the live availability calendar. Add your dog profile — breed, size, any special needs — and confirm with fully transparent, upfront pricing. No hidden fees, ever.' },
    { icon: <Star size={32} />, step: '03', title: 'Drop off and enjoy', desc: 'Your groomer gets notified the instant you confirm. Receive booking confirmation immediately. Message your groomer directly with any questions. Leave a review to help other dog owners.' }
  ]

  const groomerSteps = [
    { icon: <Users size={32} />, step: '01', title: 'Create your profile', desc: 'Sign up, complete verification, and build your professional profile. Showcase your certifications, years of experience, service menu, and photos. Your profile is your storefront.' },
    { icon: <DollarSign size={32} />, step: '02', title: 'Set your prices and availability', desc: 'You control your schedule and service pricing. Update your live calendar anytime. We display your prices honestly to customers — what you set is what they pay, minus a flat, transparent platform fee.' },
    { icon: <Scissors size={32} />, step: '03', title: 'Grow your business', desc: 'Accept or manage bookings from your dashboard. Communicate with clients through in-app messaging. Build your reputation through verified reviews. Get paid reliably after every completed appointment.' }
  ]

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>How PawPerfect works</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text)', lineHeight: '1.1' }}>Simple, honest, and built for trust.</h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Whether you are a dog owner looking for your next groomer, or a professional ready to grow your client base — here is exactly how it works.</p>
        </div>

        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>For dog owners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {ownerSteps.map(s => (
              <div key={s.step}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>{s.icon}</span>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-border)' }}>{s.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/browse"><Button className="h-12 px-8 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing groomers</Button></Link>
          </div>
        </div>

        <div className="border-t pt-24" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-2xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>For professional groomers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {groomerSteps.map(s => (
              <div key={s.step}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>{s.icon}</span>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-border)' }}>{s.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/for-groomers"><Button className="h-12 px-8 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Join as a groomer</Button></Link>
          </div>
        </div>

        <div className="mt-24 rounded-2xl p-10 text-center border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Have more questions?</h2>
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>Our team is here to help you get started — for dog owners and groomers alike.</p>
          <Link to="/signup"><Button className="h-12 px-8 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Get started today</Button></Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
