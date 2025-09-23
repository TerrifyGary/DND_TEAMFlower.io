"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit3, Save, Calendar } from "lucide-react"

export function GameLog() {
  const [isEditing, setIsEditing] = useState(false)
  const [logEntry, setLogEntry] = useState("")
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Load saved log from localStorage on component mount
  useEffect(() => {
    const savedLog = localStorage.getItem("dnd-game-log")
    const savedDate = localStorage.getItem("dnd-game-log-date")
    if (savedLog) {
      setLogEntry(savedLog)
    }
    if (savedDate) {
      setLastUpdated(savedDate)
    }
  }, [])

  const handleSave = () => {
    const now = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    localStorage.setItem("dnd-game-log", logEntry)
    localStorage.setItem("dnd-game-log-date", now)
    setLastUpdated(now)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to saved version
    const savedLog = localStorage.getItem("dnd-game-log") || ""
    setLogEntry(savedLog)
    setIsEditing(false)
  }

  return (
    <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl text-foreground">Journey Log</CardTitle>
            {lastUpdated && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {lastUpdated}
              </Badge>
            )}
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Log
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={logEntry}
            onChange={(e) => setLogEntry(e.target.value)}
            placeholder="Record your latest adventure... What happened in your last session? Where is the party headed next? Any important discoveries or plot developments?"
            className="min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-primary/50"
            autoFocus
          />
        ) : (
          <div className="min-h-[120px] p-4 rounded-md bg-background/30 border border-border/30">
            {logEntry ? (
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{logEntry}</p>
            ) : (
              <p className="text-muted-foreground italic">
                No journey entries yet. Click "Edit Log" to record your latest adventure!
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
