import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Shield, Heart, Zap, Sword, Book, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { sampleCharacters } from "@/lib/characters"

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params
  const character = sampleCharacters.find((c) => c.id === id)

  if (!character) {
    notFound()
  }

  const getModifier = (score: number) => {
    return Math.floor((score - 10) / 2)
  }

  const formatModifier = (modifier: number) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Party
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{character.name}</h1>
            <p className="text-lg text-muted-foreground">
              Level {character.level} {character.race} {character.class} • {character.background}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Character Portrait & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Portrait */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Level {character.level}</Badge>
                    <Badge variant="outline">{character.class}</Badge>
                    <Badge variant="outline">{character.race}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {character.background} • {character.alignment}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Combat Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Combat Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{character.armorClass}</div>
                    <div className="text-xs text-muted-foreground">Armor Class</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">{character.speed}ft</div>
                    <div className="text-xs text-muted-foreground">Speed</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Heart className="w-4 h-4 text-destructive" />
                      Hit Points
                    </span>
                    <span className="text-sm">
                      {character.hitPoints.current} / {character.hitPoints.maximum}
                    </span>
                  </div>
                  <Progress value={(character.hitPoints.current / character.hitPoints.maximum) * 100} className="h-2" />
                </div>

                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold text-foreground">{formatModifier(character.proficiencyBonus)}</div>
                  <div className="text-xs text-muted-foreground">Proficiency Bonus</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ability Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Ability Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {Object.entries(character.stats).map(([ability, score]) => {
                    const modifier = getModifier(score)
                    return (
                      <div key={ability} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs font-medium text-muted-foreground uppercase mb-1">
                          {ability.slice(0, 3)}
                        </div>
                        <div className="text-2xl font-bold text-foreground">{score}</div>
                        <div className="text-sm text-primary">{formatModifier(modifier)}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {character.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sword className="w-5 h-5" />
                    Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {character.equipment.map((item, index) => (
                      <div key={index} className="text-sm text-foreground">
                        • {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spells (if applicable) */}
            {character.spells && character.spells.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Spells
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {character.spells.map((spell) => (
                      <Badge key={spell} variant="outline" className="text-xs">
                        {spell}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Character Details */}
            <Card>
              <CardHeader>
                <CardTitle>Character Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Backstory</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{character.backstory}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Personality</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{character.personality}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Ideals</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{character.ideals}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Bonds</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{character.bonds}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Flaws</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{character.flaws}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
