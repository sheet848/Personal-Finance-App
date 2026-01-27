'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // OAuth signup
  const signUpWithProvider = async (
    provider: "github"
  ) => {
    setLoading(true)
    setError('')
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  };

  // Email signup
  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message)
      } else {
        alert("Check your email for verification link");
        router.push('/auth/login')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-lg p-6 space-y-6">

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">
            Create account
          </h1>
          <p className="text-sm text-gray-500">
            Join us today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* GitHub Auth */}
        <button
          onClick={() => signUpWithProvider("github")}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-black text-white py-2.5 font-medium
                 hover:bg-gray-900 transition disabled:opacity-50
                 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {/* Optional GitHub icon */}
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.78 0-1.28.45-2.33 1.19-3.15-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.2a10.8 10.8 0 0 1 2.9-.4c.99 0 1.99.14 2.9.4 2.21-1.51 3.18-1.2 3.18-1.2.63 1.65.23 2.87.11 3.17.74.82 1.19 1.87 1.19 3.15 0 4.5-2.69 5.48-5.25 5.77.41.36.78 1.07.78 2.16v3.2c0 .3.2.65.79.54A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
          </svg>
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              or continue with email
            </span>
          </div>
        </div>

        {/* Email signup form */}
        <form onSubmit={signUpWithEmail} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up with Email'}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
