"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw } from "lucide-react"

const diceTypes = [
  { sides: 4, name: "d4", color: "bg-red-600" },
  { sides: 6, name: "d6", color: "bg-blue-600" },
  { sides: 8, name: "d8", color: "bg-green-600" },
  { sides: 10, name: "d10", color: "bg-yellow-600" },
  { sides: 12, name: "d12", color: "bg-purple-600" },
  { sides: 20, name: "d20", color: "bg-orange-600" },
  { sides: 100, name: "d100", color: "bg-pink-600" },
]

interface RollResult {
  dice: string
  rolls: number[]
  total: number
  modifier: number
  timestamp: Date
}

export default function DiceRollerPage() {
  const [rollHistory, setRollHistory] = useState<RollResult[]>([])
  const [customDice, setCustomDice] = useState("")
  const [modifier, setModifier] = useState(0)

  const rollDice = (sides: number, count = 1, diceName: string) => {
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
    const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier

    const result: RollResult = {
      dice: count > 1 ? `${count}${diceName}` : diceName,
      rolls,
      total,
      modifier,
      timestamp: new Date(),
    }

    setRollHistory((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 rolls
  }

  const rollCustomDice = () => {
    const match = customDice.match(/^(\d*)d(\d+)$/i)
    if (match) {
      const count = Number.parseInt(match[1]) || 1
      const sides = Number.parseInt(match[2])
      if (sides > 0 && count > 0 && count <= 20) {
        rollDice(sides, count, `d${sides}`)
      }
    }
  }

  const clearHistory = () => {
    setRollHistory([])
  }

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
    const Icon = icons[Math.min(value - 1, 5)]
    return Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-bold">{value}</span>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-balance mb-2">Dice Roller</h1>
        <p className="text-muted-foreground text-balance">Roll dice for your D&D adventures</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dice Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Dice</CardTitle>
            <CardDescription>Click any die to roll it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {diceTypes.map((dice) => (
                <Button
                  key={dice.name}
                  variant="outline"
                  className="h-16 flex flex-col gap-1 bg-transparent"
                  onClick={() => rollDice(dice.sides, 1, dice.name)}
                >
                  <div
                    className={`w-6 h-6 rounded ${dice.color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {dice.sides}
                  </div>
                  <span className="text-xs">{dice.name}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="modifier" className="text-sm">
                  Modifier:
                </Label>
                <Input
                  id="modifier"
                  type="number"
                  value={modifier}
                  onChange={(e) => setModifier(Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  placeholder="0"
                />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g., 2d6, d20"
                  value={customDice}
                  onChange={(e) => setCustomDice(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && rollCustomDice()}
                />
                <Button onClick={rollCustomDice} disabled={!customDice.match(/^\d*d\d+$/i)}>
                  Roll
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roll History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Roll History</CardTitle>
              <CardDescription>Your recent rolls</CardDescription>
            </div>
            {rollHistory.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearHistory}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {rollHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No rolls yet. Click a die to get started!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {rollHistory.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-mono">
                        {result.dice}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {result.rolls.map((roll, rollIndex) => (
                          <div key={rollIndex} className="flex items-center gap-1">
                            {getDiceIcon(roll)}
                            <span className="text-sm font-medium">{roll}</span>
                          </div>
                        ))}
                        {result.modifier !== 0 && (
                          <span className="text-sm text-muted-foreground">
                            {result.modifier > 0 ? `+${result.modifier}` : result.modifier}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{result.total}</div>
                      <div className="text-xs text-muted-foreground">{result.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
