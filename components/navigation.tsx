"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Scroll, Dice6 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  isMobile?: boolean
  closeMobileNav?: () => void
}

const navigation = [
  { name: "Party", href: "/", icon: Users },
  { name: "Adventures", href: "/adventures", icon: Scroll },
  { name: "Dice Roller", href: "/dice", icon: Dice6 },
]

export function Navigation({ isMobile, closeMobileNav }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-6", isMobile && "flex-col space-x-0 space-y-4")}>
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
              isMobile && "w-full justify-start",
            )}
            onClick={isMobile ? closeMobileNav : undefined}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
