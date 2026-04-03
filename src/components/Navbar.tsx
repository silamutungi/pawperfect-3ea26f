import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PawPrint, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(Boolean(session))
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session))
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  function closeDrawer() {
    setOpen(false)
  }

  const navLinks = [
    { to: '/browse', label: 'Browse' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/for-groomers', label: 'For groomers' }
  ]

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-lg"
              style={{ color: 'var(--color-text)' }}
              aria-label="PawPerfect home"
            >
              <PawPrint size={24} style={{ color: 'var(--color-primary)' }} />
              PawPerfect
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-medium transition-colors hover:underline"
                  style={{ color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              {authed ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="h-10" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Dashboard</Button>
                  </Link>
                  <Button variant="outline" className="h-10 gap-2" onClick={handleSignOut} style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <LogOut size={14} />Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="h-10" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Sign in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="h-10 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="flex md:hidden flex-col justify-center items-center gap-[5px] p-2 rounded-lg"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: open ? 'translateY(7px) rotate(45deg)' : 'none'
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  opacity: open ? 0 : 1
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none'
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay — closes drawer on outside click */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(31, 26, 21, 0.40)' }}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Slide-in mobile drawer */}
      <div
        id="mobile-drawer"
        className="fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col pt-6 pb-8 px-6 shadow-2xl"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderLeft: '1px solid var(--color-border)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg"
            style={{ color: 'var(--color-text)' }}
            onClick={closeDrawer}
          >
            <PawPrint size={22} style={{ color: 'var(--color-primary)' }} />
            PawPerfect
          </Link>
          <button
            className="flex flex-col justify-center items-center gap-[5px] p-2 rounded-lg"
            onClick={closeDrawer}
            aria-label="Close menu"
            style={{ minWidth: '40px', minHeight: '40px' }}
          >
            <span
              className="block w-5 h-0.5"
              style={{
                backgroundColor: 'var(--color-text)',
                transform: 'translateY(7px) rotate(45deg)'
              }}
            />
            <span
              className="block w-5 h-0.5"
              style={{
                backgroundColor: 'var(--color-text)',
                opacity: 0
              }}
            />
            <span
              className="block w-5 h-0.5"
              style={{
                backgroundColor: 'var(--color-text)',
                transform: 'translateY(-7px) rotate(-45deg)'
              }}
            />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(l => {
            const isActive = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeDrawer}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive ? 'rgba(200, 90, 31, 0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent'
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer CTA buttons */}
        <div className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          {authed ? (
            <>
              <Link to="/dashboard" onClick={closeDrawer}>
                <Button variant="outline" className="w-full h-12" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Dashboard</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full h-12 gap-2"
                onClick={() => { closeDrawer(); handleSignOut() }}
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <LogOut size={14} />Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeDrawer}>
                <Button variant="outline" className="w-full h-12" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Sign in</Button>
              </Link>
              <Link to="/signup" onClick={closeDrawer}>
                <Button className="w-full h-12 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
