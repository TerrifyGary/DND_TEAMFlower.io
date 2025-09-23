import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sampleCharacters } from "@/lib/characters"
import nextConfig from "@/next.config.mjs"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">{"Welcome to the Party"}</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            {
              "Meet our legendary adventurers, each with their own unique story, abilities, and quest for glory. Click on any character to explore their detailed profile."
            }
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCharacters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 group-hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={`${nextConfig.basePath || ""}${character.image || "/placeholder.svg"}`}
                      alt={character.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {character.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Level {character.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {character.class}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {character.race}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">{character.background}</p>
                      <p className="line-clamp-2">{character.backstory}</p>
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                      <span>AC {character.armorClass}</span>
                      <span>
                        HP {character.hitPoints.current}/{character.hitPoints.maximum}
                      </span>
                      <span>Speed {character.speed}ft</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
