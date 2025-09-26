import { useState } from "react"
import Link from "next/link"
import { Dice6, Menu } from "lucide-react"
import { Navigation } from "./navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function SiteHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dice6 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{"Adventurer's Codex"}</h1>
            </div>
          </Link>

          <div className="hidden md:flex">
            <Navigation />
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="[&>button]:hidden">
                <Navigation isMobile closeMobileNav={() => setIsMobileNavOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
