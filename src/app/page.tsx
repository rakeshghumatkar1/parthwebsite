export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Portfolio
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-10 px-6 py-20">
        <div className="space-y-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Hello, I&apos;m
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Parth Ghumatkar
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Personal website — projects, experience, and contact. Content and
            design will be added as we build this out.
          </p>
        </div>

        <nav className="flex flex-wrap gap-3">
          <a
            href="#about"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            About
          </a>
          <a
            href="#projects"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Contact
          </a>
        </nav>

        <section
          id="about"
          className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder section — add bio, skills, and resume details here.
          </p>
        </section>

        <section
          id="projects"
          className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder section — showcase work and links here.
          </p>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder section — email and social links will go here.
          </p>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} Parth Ghumatkar
      </footer>
    </div>
  );
}
