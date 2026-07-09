import Link from 'next/link'
import { ArrowRight, BookOpenText, BriefcaseBusiness, CheckCircle2, FileText, Mail, Rocket, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function FeatureArticle({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-md border border-[#cfe0eb] bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)] lg:grid-cols-[1fr_0.86fr]">
      <div className="relative min-h-[320px] overflow-hidden bg-[#dcecf5]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-5 top-5 rounded-md bg-[var(--slot4-accent)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#061133]">{getEditableCategory(post)}</span>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0b965d]">Featured article</p>
        <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal text-[#101827] sm:text-4xl">{post.title}</h3>
        <p className="mt-4 line-clamp-4 text-base leading-8 text-[#526173]">{getEditableExcerpt(post, 220)}</p>
      </div>
    </Link>
  )
}

function CompactArticle({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 rounded-md border border-[#d9e4ec] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#0b62d8]">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#e8f3ff] text-lg font-extrabold text-[#0b62d8]">{String(index + 1).padStart(2, '0')}</div>
      <div className="min-w-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0b965d]">{getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-lg font-extrabold leading-snug text-[#101827] group-hover:text-[#0b62d8]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#526173]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-md border border-[#d9e4ec] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.12)]">
      <div className="aspect-[16/10] overflow-hidden bg-[#dcecf5]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0b965d]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight text-[#101827]">{post.title}</h3>
      </div>
    </Link>
  )
}

function RailCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group w-[280px] shrink-0 overflow-hidden rounded-md border border-[#d9e4ec] bg-white shadow-sm transition hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden bg-[#dcecf5]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
      </div>
      <div className="p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0b62d8]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const top = pool[0]

  return (
    <section>
      <div className="editable-network-bg relative overflow-hidden border-b-4 border-[var(--slot4-accent)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(0,214,255,0.26),transparent_28%),linear-gradient(90deg,rgba(5,13,47,0.96)_0%,rgba(7,19,58,0.86)_52%,rgba(7,19,58,0.68)_100%)]" />
        <div className={`relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.12fr_0.88fr] ${container}`}>
          <div className="text-white">
            <div className="editable-float mb-5 inline-flex h-14 w-14 items-center justify-center rounded-md bg-white/95 text-[#061133] shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <Rocket className="h-8 w-8" />
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Discover practical knowledge for every professional journey.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
              Find clear ideas, useful resources, and fresh perspectives shared across the {SITE_CONFIG.name} community.
            </p>
            <div className="mt-7 grid max-w-3xl gap-3 text-sm font-semibold text-white sm:grid-cols-2">
              {['Ideas for work and learning', 'Knowledge from active professionals', 'Fast and simple discovery', 'Fresh community submissions'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 fill-[var(--slot4-accent)] text-[#061133]" /> {item}</span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/search" className="inline-flex items-center gap-3 rounded-md border-2 border-[var(--slot4-accent)] px-7 py-4 text-sm font-extrabold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[#061133]">
                <BookOpenText className="h-5 w-5" /> Explore Knowledge
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-md border-2 border-[var(--slot4-accent)] px-7 py-4 text-sm font-extrabold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[#061133]">
                <BriefcaseBusiness className="h-5 w-5" /> Discover People
              </Link>
            </div>
          </div>

          <div className="rounded-md bg-white p-7 text-center shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-10">
            <h2 className="text-3xl font-extrabold text-[#315cf4]">Join the lacerdapro circle today.</h2>
            <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-[#3f4854]">Search the community or create an account to share something useful.</p>
            <form action="/search" className="mt-6 grid gap-4">
              <label className="flex items-center gap-3 rounded-md border border-[#d4dce5] px-4 py-3 text-left">
                <Search className="h-5 w-5 text-[#526173]" />
                <input name="q" placeholder="Topic, professional, or company" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              </label>
              <button className="rounded-md bg-[#0b965d] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-95">Get started</button>
            </form>
            <div className="mt-6 border-t border-[#d4dce5] pt-5 text-sm text-[#526173]">
              Already a member? <Link href="/login" className="font-bold text-[#315cf4] hover:underline">Login here</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--slot4-cream)]">
        <div className={`grid gap-8 py-9 text-center sm:grid-cols-2 lg:grid-cols-4 ${container}`}>
          {[['150K+', 'Knowledge seekers'], ['50K+', 'Monthly discoveries'], ['80+', 'Topic categories'], ['500+', 'Fresh submissions']].map(([value, label]) => (
            <div key={label}>
              <p className="text-4xl font-light text-[#101827]">{value}</p>
              <p className="mt-1 text-sm font-medium text-[#344054]">{label}</p>
            </div>
          ))}
        </div>
      </div>
      {top ? <div className="sr-only">Featured: {top.title}</div> : null}
    </section>
  )
}

export function EditableStoryRail(_props: HomeSectionProps) {
  return null
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const [featured, ...rest] = pool
  return (
    <section className="bg-white">
      <div className={`py-16 ${container}`}>
        <div className="mb-9 text-center">
          <h2 className="text-3xl font-extrabold tracking-normal text-[#101827]"><FileText className="mr-2 inline h-8 w-8" /> Latest Knowledge</h2>
          <p className="mt-3 text-[#526173]">A practical reading feed shaped by the newest posts.</p>
        </div>
        <FeatureArticle post={featured} href={postHref(primaryTask, featured, primaryRoute)} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.slice(0, 6).map((post, index) => <CompactArticle key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...timeSections.flatMap((section) => section.posts), ...posts]).slice(0, 12)
  if (!pool.length) return null
  const railItems = [...pool, ...pool]
  return (
    <>
      <section className="overflow-hidden bg-[#eef7fc]">
        <div className={`py-16 ${container}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-normal text-[#101827]">Image-first discovery</h2>
              <p className="mt-3 text-[#526173]">Visual cards keep recent articles and profiles easy to scan.</p>
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-md bg-[#0b965d] px-5 py-3 text-sm font-extrabold text-white">Explore all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pool.slice(0, 4).map((post) => <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white">
        <div className="py-14">
          <div className={`${container}`}>
            <h2 className="text-center text-3xl font-extrabold tracking-normal text-[#101827]">Endless latest-post slider</h2>
          </div>
          <div className="mt-8 flex w-max gap-5 editable-auto-rail px-5">
            {railItems.map((post, index) => <RailCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`py-16 ${container}`}>
        <div className="rounded-md border border-[#d9e4ec] bg-[var(--slot4-cream)] p-8 text-center shadow-sm sm:p-10">
          <Mail className="mx-auto h-10 w-10 text-[#0b965d]" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-normal text-[#101827]">Publish something useful on {SITE_CONFIG.name}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#526173]">Create an article or profile with clear details, images, and a readable summary.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/create" className="rounded-md bg-[#0b965d] px-7 py-3 text-sm font-extrabold text-white">Create</Link>
            <Link href="/contact" className="rounded-md border border-[#0b62d8] px-7 py-3 text-sm font-extrabold text-[#0b62d8]">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
