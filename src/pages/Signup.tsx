import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent } from '../components/ui/card'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      navigate('/dashboard')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center px-6 py-20">
          <Card className="w-full max-w-md border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <CardContent className="p-8 text-center">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Check your email</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and start booking.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="flex items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Join PawPerfect</h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Create your free account and start booking verified groomers.</p>
            </div>
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid var(--color-error)' }}>
                <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-error)' }} />
                <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-12" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} required className="h-12" />
              </div>
              <Button type="submit" disabled={loading} className="h-12 font-semibold gap-2" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                <UserPlus size={16} /> {loading ? 'Creating account...' : 'Create free account'}
              </Button>
            </form>
            <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
            </p>
            <p className="text-center text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
