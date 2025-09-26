"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, MapPin, Sword, Edit2, Save, X } from "lucide-react"

interface AdventureLog {
  id: string
  title: string
  date: string
  location: string
  participants: string[]
  content: string
  session: number
  timestamp: number
}

export default function AdventuresPage() {
  const [logs, setLogs] = useState<AdventureLog[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newLog, setNewLog] = useState({
    title: "",
    location: "",
    participants: "",
    content: "",
  })

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("dnd-adventure-logs")
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs))
    }
  }, [])

  // Save logs to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem("dnd-adventure-logs", JSON.stringify(logs))
  }, [logs])

  const handleCreateLog = () => {
    if (!newLog.title.trim() || !newLog.content.trim()) return

    const log: AdventureLog = {
      id: Date.now().toString(),
      title: newLog.title,
      date: new Date().toLocaleDateString(),
      location: newLog.location || "Unknown Location",
      participants: newLog.participants
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
      content: newLog.content,
      session: logs.length + 1,
      timestamp: Date.now(),
    }

    setLogs((prev) => [log, ...prev])
    setNewLog({ title: "", location: "", participants: "", content: "" })
    setIsCreating(false)
  }

  const handleEditLog = (id: string, updatedLog: Partial<AdventureLog>) => {
    setLogs((prev) => prev.map((log) => (log.id === id ? { ...log, ...updatedLog } : log)))
    setEditingId(null)
  }

  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Adventure Chronicles</h1>
              <p className="text-muted-foreground">Keep track of your party's epic journeys and memorable moments</p>
            </div>
          </div>

          {/* Create New Log Form */}
          {isCreating && (
            <Card className="mb-6 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  New Adventure Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Session Title *</label>
                    <Input
                      placeholder="e.g., The Goblin Ambush"
                      value={newLog.title}
                      onChange={(e) => setNewLog((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                    <Input
                      placeholder="e.g., Whispering Woods"
                      value={newLog.location}
                      onChange={(e) => setNewLog((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Participants (comma-separated)
                  </label>
                  <Input
                    placeholder="e.g., Thorin, Elara, Gareth, Zara"
                    value={newLog.participants}
                    onChange={(e) => setNewLog((prev) => ({ ...prev, participants: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Adventure Log *</label>
                  <Textarea
                    placeholder="Describe what happened in this session..."
                    value={newLog.content}
                    onChange={(e) => setNewLog((prev) => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateLog} disabled={!newLog.title.trim() || !newLog.content.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Adventure Logs Thread */}
          <div className="space-y-6">
            {logs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Sword className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Adventures Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start documenting your party's epic journeys and memorable moments
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Entry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              logs.map((log, index) => (
                <Card key={log.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Session {log.session}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {log.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{log.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {log.location}
                          </div>
                          {log.participants.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {log.participants.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(editingId === log.id ? null : log.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingId === log.id ? (
                      <EditLogForm
                        log={log}
                        onSave={(updatedLog) => handleEditLog(log.id, updatedLog)}
                        onCancel={() => setEditingId(null)}
                        onDelete={() => handleDeleteLog(log.id)}
                      />
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">{log.content}</p>
                      </div>
                    )}
                  </CardContent>
                  {index < logs.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function EditLogForm({
  log,
  onSave,
  onCancel,
  onDelete,
}: {
  log: AdventureLog
  onSave: (updatedLog: Partial<AdventureLog>) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editData, setEditData] = useState({
    title: log.title,
    location: log.location,
    participants: log.participants.join(", "),
    content: log.content,
  })

  const handleSave = () => {
    onSave({
      title: editData.title,
      location: editData.location,
      participants: editData.participants
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
      content: editData.content,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={editData.title}
          onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Session title"
        />
        <Input
          value={editData.location}
          onChange={(e) => setEditData((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Location"
        />
      </div>
      <Input
        value={editData.participants}
        onChange={(e) => setEditData((prev) => ({ ...prev, participants: e.target.value }))}
        placeholder="Participants (comma-separated)"
      />
      <Textarea
        value={editData.content}
        onChange={(e) => setEditData((prev) => ({ ...prev, content: e.target.value }))}
        rows={6}
      />
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel} size="sm">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete} size="sm">
          Delete
        </Button>
      </div>
    </div>
  )
}
