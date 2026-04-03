import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, PawPrint, LogOut } from 'lucide-react'
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

  const navLinks = [
    { to: '/browse', label: 'Browse' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/for-groomers', label: 'For groomers' }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }} role="navigation" aria-label="Main navigation">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-text)' }} aria-label="PawPerfect home">
            <PawPrint size={24} style={{ color: 'var(--color-primary)' }} />
            PawPerfect
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-medium transition-colors hover:underline" style={{ color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>{l.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {authed ? (
              <>
                <Link to="/dashboard"><Button variant="outline" className="h-10" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Dashboard</Button></Link>
                <Button variant="outline" className="h-10 gap-2" onClick={handleSignOut} style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><LogOut size={14} />Sign out</Button>
              </>
            ) : (
              <>
                <Link to="/login"><Button variant="outline" className="h-10" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Sign in</Button></Link>
                <Link to="/signup"><Button className="h-10 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button></Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} style={{ minWidth: '44px', minHeight: '44px' }}>
            {open ? <X size={20} style={{ color: 'var(--color-text)' }} /> : <Menu size={20} style={{ color: 'var(--color-text)' }} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium py-2" style={{ color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>{l.label}</Link>
          ))}
          {authed ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}><Button variant="outline" className="w-full h-12">Dashboard</Button></Link>
              <Button variant="outline" className="w-full h-12 gap-2" onClick={handleSignOut}><LogOut size={14} />Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full h-12">Sign in</Button></Link>
              <Link to="/signup" onClick={() => setOpen(false)}><Button className="w-full h-12 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start browsing</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
