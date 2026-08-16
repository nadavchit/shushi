import { Link, Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-10 border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/80">
        <div
          className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3"
          style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
        >
          <Link
            to="/"
            className="rounded-lg text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          >
            אימון שחקים
          </Link>
          <Link
            to="/history"
            className="rounded-full px-3 py-1.5 text-sm text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
          >
            היסטוריה
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
