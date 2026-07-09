'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info, LogOut, Mail, Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const authLinks = session
    ? [{ label: 'Create', href: '/create' }]
    : [{ label: 'Sign In', href: '/login' }, { label: 'Join Free', href: '/signup' }]

  return (
    <header className="sticky top-0 z-50 bg-white text-[var(--editable-nav-text)] shadow-[0_1px_0_rgba(15,23,42,0.08)]">
      <nav className="mx-auto flex min-h-[70px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block max-w-[230px] truncate text-2xl font-bold leading-none tracking-normal text-[#3e4248]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link href="/" className={`inline-flex items-center gap-1 text-sm font-medium transition ${pathname === '/' ? 'text-[#0b62d8]' : 'text-[#575f6b] hover:text-[#0b62d8]'}`}>
            <Home className="h-4 w-4 text-[#0b62d8]" /> Home
          </Link>
          <Link href="/about" className="inline-flex items-center gap-1 text-sm font-medium text-[#575f6b] transition hover:text-[#0b62d8]">
            <Info className="h-4 w-4 text-[#16b7dd]" /> About
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-[#575f6b] transition hover:text-[#0b62d8]">
            <Mail className="h-4 w-4 text-[#0b62d8]" /> Contact
          </Link>
          <form action="/search" className="flex items-center gap-1.5 text-[#575f6b]">
            <Search className="h-5 w-5" />
            <input name="q" type="search" placeholder="Search" aria-label="Search" className="w-16 bg-transparent text-sm outline-none transition-[width] placeholder:text-[#575f6b] focus:w-24" />
          </form>
          {session ? (
            <>
              <span className="max-w-28 truncate text-sm font-semibold text-[#3e4248]" title={session.name}>
                Hi, {session.name}
              </span>
              <Link href="/create" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0b62d8] transition hover:text-[#094ca8]"><PlusCircle className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="inline-flex items-center gap-1 text-sm font-semibold text-[#575f6b] transition hover:text-[#0b62d8]"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-[#575f6b] transition hover:text-[#0b62d8]">Sign In</Link>
              <Link href="/signup" className="rounded-md bg-[#0a925f] px-3 py-2 text-sm font-bold text-white transition hover:bg-[#08784f]">Sign Up</Link>
            </>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
          {session ? <span className="max-w-[120px] truncate text-sm font-semibold text-[#0b62d8]">{session.name}</span> : null}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md border border-[var(--editable-border)] bg-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div className="h-1 bg-[var(--slot4-accent)]" />

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 rounded-md border border-[var(--editable-border)] px-3 py-2">
            <Search className="h-4 w-4 text-[#0b62d8]" />
            <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...authLinks].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-semibold ${active ? 'bg-[#e8f3ff] text-[#0b62d8]' : 'text-[#4b5563] hover:bg-[#f4f8fb]'}`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-md px-4 py-3 text-left text-sm font-semibold text-[#4b5563] hover:bg-[#f4f8fb]">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
