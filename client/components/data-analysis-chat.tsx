"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Menu, X, Upload, Code, Image as ImageIcon, BarChart, Table, Play, Plus, MessageSquare, Trash2, ChevronLeft, Maximize2, Minimize2 } from "lucide-react"
import Papa from "papaparse"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Resizable } from "re-resizable"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ApiError extends Error {
  code?: string
  status?: number
}

// Mock data service with proper error handling
const mockDataService = {
  async analyzeData(query: string, data: any[]): Promise<AnalysisResult> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (!data || data.length === 0) {
        throw new Error("No data provided for analysis")
      }
      return {
        result: `Analysis result for query: "${query}"`,
        code: `import pandas as pd\n\ndf = pd.DataFrame(${JSON.stringify(data)})\nresult = df.describe()\nprint(result)`,
        chart: data.slice(0, 5).map(row => ({
          name: row[Object.keys(row)[0]] || 'Unknown',
          value: parseFloat(row[Object.keys(row)[1]]) || 0
        }))
      }
    } catch (error) {
      const apiError = new Error("Failed to analyze data") as ApiError
      apiError.code = "ANALYSIS_ERROR"
      apiError.cause = error
      throw apiError
    }
  },

  async executeCode(code: string, data: any[]): Promise<ExecutionResult> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (!code) {
        throw new Error("No code provided for execution")
      }
      return {
        result: "Code execution completed successfully",
        chart: data.slice(0, 5).map(row => ({
          name: row[Object.keys(row)[0]] || 'Unknown',
          value: parseFloat(row[Object.keys(row)[1]]) || 0
        }))
      }
    } catch (error) {
      const apiError = new Error("Failed to execute code") as ApiError
      apiError.code = "EXECUTION_ERROR"
      apiError.cause = error
      throw apiError
    }
  }
}

interface AnalysisResult {
  result: string
  code: string
  chart: any[]
}

interface ExecutionResult {
  result: string
  chart: any[]
}

interface Artifact {
  id: string
  title: string
  type: "code" | "table" | "chart" | "image"
  content: any
  preview: string
  code?: string
}

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  artifacts?: Artifact[]
  suggestions?: string[]
  timestamp: number
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  data: { [key: string]: any[] }
  lastUpdated: number
}

export function DataAnalysisChat() {
  const [chats, setChats] = useState<Chat[]>([{
    id: "initial",
    title: "New Chat",
    messages: [{
      id: "welcome",
      role: "assistant",
      content: "Hello! I can help you analyze data. Please upload a CSV file to get started.",
      timestamp: Date.now()
    }],
    data: {},
    lastUpdated: Date.now()
  }])
  const [currentChatId, setCurrentChatId] = useState("initial")
  const [input, setInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [editableCode, setEditableCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New Chat",
      messages: [{
        id: "welcome",
        role: "assistant",
        content: "Hello! I can help you analyze data. Please upload a CSV file to get started.",
        timestamp: Date.now()
      }],
      data: {},
      lastUpdated: Date.now()
    }
    setChats(prevChats => [...prevChats, newChat])
    setCurrentChatId(newChat.id)
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prevChats => {
      const newChats = prevChats.filter(chat => chat.id !== chatId)
      if (chatId === currentChatId && newChats.length > 0) {
        setCurrentChatId(newChats[0].id)
      }
      return newChats
    })
  }

  const handleChatTitleChange = (chatId: string, newTitle: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, title: newTitle, lastUpdated: Date.now() }
          : chat
      )
    )
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files
      if (!files) return

      const currentChat = chats.find(chat => chat.id === currentChatId)
      if (!currentChat) throw new Error("No active chat found")

      const newData = { ...currentChat.data }
      const uploadMessages: Message[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type !== "text/csv") continue

        const result = await new Promise<Papa.ParseResult<any>>((resolve, reject) => {
          Papa.parse(file, {
            complete: resolve,
            error: reject,
            header: true
          })
        })

        if (!result.data || result.data.length === 0) {
          throw new Error(`File ${file.name} is empty or invalid`)
        }

        newData[file.name] = result.data

        uploadMessages.push({
          id: `upload-${Date.now()}-${i}`,
          role: "user",
          content: `Uploaded ${file.name}`,
          artifacts: [{
            id: `csv-${Date.now()}-${i}`,
            title: file.name,
            type: "table",
            content: result.data,
            preview: `CSV with ${result.data.length} rows and ${Object.keys(result.data[0] || {}).length} columns`
          }],
          timestamp: Date.now()
        })
      }

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? {
              ...chat,
              data: newData,
              messages: [...chat.messages, ...uploadMessages],
              lastUpdated: Date.now()
            }
            : chat
        )
      )

      const datasetNames = Object.keys(newData)
      if (datasetNames.length > 0) {
        const datasetMessage: Message = {
          id: `datasets-${Date.now()}`,
          role: "assistant",
          content: `You have ${datasetNames.length} dataset${datasetNames.length > 1 ? 's' : ''} associated with this chat: ${datasetNames.join(", ")}. You can now ask questions about this data.`,
          suggestions: [
            "Show me a summary of the data",
            "What are the column names?",
            "Show me the first 5 rows",
            "Calculate basic statistics"
          ],
          timestamp: Date.now()
        }
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, datasetMessage] }
              : chat
          )
        )
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to upload file")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | string) => {
    try {
      if (typeof e !== 'string') {
        e.preventDefault()
      }
      const query = typeof e === 'string' ? e : input
      if (!query.trim()) return

      const currentChat = chats.find(chat => chat.id === currentChatId)
      if (!currentChat || Object.keys(currentChat.data).length === 0) {
        throw new Error("Please upload a CSV file first")
      }

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: query,
        timestamp: Date.now()
      }

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              lastUpdated: Date.now()
            }
            : chat
        )
      )
      setInput("")

      const analysis = await mockDataService.analyzeData(query, Object.values(currentChat.data)[0])

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: analysis.result,
        artifacts: [
          {
            id: `chart-${Date.now()}`,
            title: "Analysis Chart",
            type: "chart",
            content: analysis.chart,
            preview: "Chart visualization of analysis",
            code: analysis.code
          }
        ],
        suggestions: [
          "Can you show me the trend over time?",
          "What's the distribution of values?",
          "Show me the outliers",
          "Compare this with another column"
        ],
        timestamp: Date.now()
      }

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      )
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to analyze data")
    }
  }

  const handleCodeExecution = async () => {
    try {
      if (!selectedArtifact || !editableCode) {
        throw new Error("No code selected for execution")
      }

      const currentChat = chats.find(chat => chat.id === currentChatId)
      if (!currentChat || Object.keys(currentChat.data).length === 0) {
        throw new Error("No data available for code execution")
      }

      const userMessage: Message = {
        id: `code-user-${Date.now()}`,
        role: "user",
        content: "Execute code:\n" + editableCode,
        timestamp: Date.now()
      }

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
        )
      )

      const result = await mockDataService.executeCode(editableCode, Object.values(currentChat.data)[0])

      const executionMessage: Message = {
        id: `code-result-${Date.now()}`,
        role: "assistant",
        content: "Here's the result of the code execution:",
        artifacts: [{
          id: `execution-${Date.now()}`,
          title: "Code Execution Result",
          type: "chart",
          content: result.chart,
          preview: "Result visualization",
          code: editableCode
        }],
        suggestions: [
          "Can you modify this to show percentages?",
          "Can you add error bars?",
          "Show this as a line chart instead",
          "Add a trend line"
        ],
        timestamp: Date.now()
      }

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: [...chat.messages, executionMessage],
              lastUpdated: Date.now()
            }
            : chat
        )
      )

      setIsPreviewOpen(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to execute code")
    }
  }

  const currentChat = chats.find(chat => chat.id === currentChatId)

  const PreviewPanel = () => {
    if (!selectedArtifact) return null

    return (
      <div className={cn(
        "h-full border-l border-border bg-background transition-all duration-300",
        isPreviewFullscreen ? "fixed inset-0 z-50" : "relative"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="text-lg font-semibold">{selectedArtifact.title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}>
              {isPreviewFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              {selectedArtifact.code && <TabsTrigger value="code">Code</TabsTrigger>}
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              {selectedArtifact.type === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>

                        {Object.keys(selectedArtifact.content[0] || {}).map((header, i) => (
                          <th key={i} className="border border-border p-2 text-left">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedArtifact.content.slice(0, 10).map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((cell: any, j) => (
                            <td key={j} className="border border-border p-2">{String(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {selectedArtifact.type === "chart" && (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={selectedArtifact.content}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
              {selectedArtifact.type === "image" && (
                <Image
                  src={selectedArtifact.content}
                  alt={selectedArtifact.title}
                  width={500}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </TabsContent>
            {selectedArtifact.code && (
              <TabsContent value="code" className="mt-4">
                <Textarea
                  value={editableCode}
                  onChange={(e) => setEditableCode(e.target.value)}
                  className="w-full h-[200px] mb-4 font-mono"
                />
                <Button onClick={handleCodeExecution}>
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </Button>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <div className={cn(
        "w-64 border-r border-border bg-background transition-all duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-border">
          <Button onClick={handleNewChat} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2 space-y-2">
            {chats.sort((a, b) => b.lastUpdated - a.lastUpdated).map(chat => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  chat.id === currentChatId ? "bg-accent" : ""
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <Input
                  value={chat.title}
                  onChange={(e) => handleChatTitleChange(chat.id, e.target.value)}
                  className="h-auto border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8 opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteChat(chat.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <main className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b border-border flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Data Analysis Chat</h1>
            {!isPreviewOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsPreviewOpen(true)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg">
                  {error}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => setError(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "assistant" ? "bg-muted/50" : ""
                    } p-4 rounded-lg`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${message.role === "assistant"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                    }`}>
                    {message.role === "assistant" ? "AI" : "U"}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.artifacts?.map(artifact => (
                      <button
                        key={artifact.id}
                        onClick={() => {
                          setSelectedArtifact(artifact)
                          setIsPreviewOpen(true)
                          setEditableCode(artifact.code || "")
                        }}
                        className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md w-fit hover:bg-muted"
                      >
                        {artifact.type === "code" && <Code className="h-4 w-4" />}
                        {artifact.type === "table" && <Table className="h-4 w-4" />}
                        {artifact.type === "chart" && <BarChart className="h-4 w-4" />}
                        {artifact.type === "image" && <ImageIcon className="h-4 w-4" />}
                        <span>{artifact.preview}</span>
                      </button>
                    ))}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSubmit(suggestion)}
                            className="text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1 rounded-full"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask a question about your data..."
                  className="min-h-[60px] resize-none pr-12"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-12 bottom-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bottom-2"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {isPreviewOpen && (
          <Resizable
            defaultSize={{ width: '33%', height: '100%' }}
            minWidth="250px"
            maxWidth="50%"
            enable={{ left: true }}
          >
            <PreviewPanel />
          </Resizable>
        )}
      </main>
    </div>
  )
}