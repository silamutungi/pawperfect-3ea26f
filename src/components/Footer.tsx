import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t py-16" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3" style={{ color: 'var(--color-text)' }}>
              <PawPrint size={20} style={{ color: 'var(--color-primary)' }} />
              PawPerfect
            </Link>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>The marketplace for trusted, verified dog groomers. Transparent pricing, instant booking.</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Explore</p>
            <div className="flex flex-col gap-3">
              <Link to="/browse" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Browse groomers</Link>
              <Link to="/how-it-works" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>How it works</Link>
              <Link to="/for-groomers" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>For groomers</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Account</p>
            <div className="flex flex-col gap-3">
              <Link to="/signup" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
              <Link to="/login" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
              <Link to="/dashboard" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Legal</p>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Privacy Policy</Link>
              <Link to="/" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Terms of Service</Link>
              <Link to="/" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>&copy; {new Date().getFullYear()} PawPerfect. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Made with care for dogs and their people.</p>
        </div>
      </div>
    </footer>
  )
}
