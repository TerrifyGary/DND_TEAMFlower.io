"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Scroll, Dice6 } from "lucide-react"
import { cn, getBasePath } from "@/lib/utils"

const navigation = [
  { name: "Party", href: getBasePath() + "/", icon: Users },
  { name: "Adventures", href: getBasePath() + "/adventures", icon: Scroll },
  { name: "Dice Roller", href: getBasePath() + "/dice", icon: Dice6 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
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
            )}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
