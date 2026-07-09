'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Link2, Lock, Send, UserRound } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'w-full rounded-md border border-[#cfdae5] bg-white px-4 py-3.5 text-sm font-semibold text-[#172033] outline-none transition placeholder:text-[#8a96a5] focus:border-[#0b62d8] focus:ring-2 focus:ring-[#0b62d8]/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const task = (SITE_CONFIG.tasks.find((item) => item.enabled)?.key || 'article') as TaskKey
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] px-4 py-16 text-[var(--editable-page-text,#2f1d16)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2.8rem] border border-[var(--editable-border)] bg-white/75 p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[2rem] bg-[var(--editable-page-text,#2f1d16)] text-[var(--editable-page-bg,#fff7ee)]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-page-text,#2f1d16)] px-6 py-3 text-sm font-black text-[var(--editable-page-bg,#fff7ee)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="overflow-hidden rounded-lg border border-[#d7e2eb] bg-white shadow-[0_24px_70px_rgba(15,49,86,0.12)]">
            <header className="relative overflow-hidden bg-[#07163f] px-6 py-9 text-white sm:px-10 lg:px-12">
              <div className="editable-network-bg absolute inset-0 opacity-30" />
              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ffc83d]">{pagesContent.create.hero.badge}</p>
                  <h1 className="mt-3 text-4xl font-extrabold tracking-normal sm:text-5xl">Create a new post</h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">Share useful knowledge, professional insight, and resources with the Lacerdapro community.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
                  <UserRound className="h-4 w-4 text-[#ffc83d]" /> {session.name}
                </span>
              </div>
            </header>

            <form onSubmit={submit} className="bg-[#eef8ff] p-6 sm:p-10 lg:p-12">
              <div className="mb-7 flex items-center gap-3 border-b border-[#cedde8] pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0b62d8] text-white"><FileText className="h-5 w-5" /></span>
                <div>
                  <h2 className="text-2xl font-extrabold tracking-normal text-[#172033]">{pagesContent.create.formTitle}</h2>
                  <p className="mt-1 text-sm text-[#627083]">Complete the information below to prepare your post.</p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <label className="lg:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-[#334155]">Post title</span>
                  <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter a clear, descriptive title" required />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-[#334155]">Category</span>
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Choose a relevant category" />
                </label>
                <label>
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#334155]"><Link2 className="h-4 w-4 text-[#0b62d8]" /> Website or source URL</span>
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" />
                </label>
                <label className="lg:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#334155]"><ImageIcon className="h-4 w-4 text-[#0b62d8]" /> Featured image URL</span>
                  <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Add an optional image URL" />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-[#334155]">Short summary</span>
                  <textarea className={`${fieldClass} min-h-40 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Give readers a concise overview" required />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold text-[#334155]">Main content</span>
                  <textarea className={`${fieldClass} min-h-40 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write the full content, details, or description" required />
                </label>
              </div>

              {created ? (
                <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0a925f] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_25px_rgba(10,146,95,0.2)] transition hover:-translate-y-0.5 hover:bg-[#08784f]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
