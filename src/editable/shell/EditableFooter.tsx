'use client'

import Link from 'next/link'
import { LogOut, Rocket } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[#f7fafc] text-[var(--editable-footer-text)]">
      <section className="border-y-4 border-[var(--slot4-accent)] bg-[#315cf4]">
        <div className="mx-auto grid max-w-[var(--editable-container)] items-center gap-8 px-4 py-14 text-white sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-normal sm:text-4xl">Grow your presence with {SITE_CONFIG.name}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/78">
              Share articles, publish professional profiles, and help readers find useful expertise in one connected place.
            </p>
          </div>
          <Link href="/create" className="inline-flex items-center justify-center gap-3 rounded-md bg-[var(--slot4-accent)] px-10 py-4 text-base font-extrabold text-black shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:brightness-105">
            <Rocket className="h-5 w-5" /> Create a post
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#526173]">
          <Link href="/" className="transition hover:text-[#0b62d8]">Home</Link>
          <span>|</span>
          <Link href="/about" className="transition hover:text-[#0b62d8]">About</Link>
          <span>|</span>
          <Link href="/contact" className="transition hover:text-[#0b62d8]">Contact</Link>
          <span>|</span>
          <Link href="/search" className="transition hover:text-[#0b62d8]">Search</Link>
          {session ? (
            <>
              <span>|</span>
              <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 transition hover:text-[#0b62d8]"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <>
              <span>|</span>
              <Link href="/login" className="transition hover:text-[#0b62d8]">Sign in</Link>
              <span>|</span>
              <Link href="/signup" className="transition hover:text-[#0b62d8]">Sign up</Link>
            </>
          )}
        </div>

        <div>
          <Link href="/" className="inline-flex flex-col items-center">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-16 w-16 object-contain" />
            <span className="mt-2 text-2xl font-extrabold tracking-normal text-[#2f3640]">{SITE_CONFIG.name}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
