import Link from "next/link"
import { Icon } from "@/components/icon"
import { Screen } from "@/components/screen"

export default function NotFound() {
  return (
    <Screen>
      <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-lime text-ink">
          <Icon name="search" size={28} />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight">
          Wrong turn.
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          This page doesn&rsquo;t exist. Your money is still exactly where you
          left it.
        </p>
        <Link
          href="/today"
          className="press mt-6 flex h-12 items-center justify-center rounded-full bg-ink px-8 font-heading text-sm font-bold text-paper"
        >
          Back to Today
        </Link>
      </div>
    </Screen>
  )
}
