import Link from "next/link"
import { Dice6 } from "lucide-react"
import { Navigation } from "./navigation"
import { getBasePath } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={getBasePath()} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dice6 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{"Adventurer's Codex"}</h1>
            </div>
          </Link>

          <Navigation />
        </div>
      </div>
    </header>
  )
}
