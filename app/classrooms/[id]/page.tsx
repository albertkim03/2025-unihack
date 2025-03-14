"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Settings, Users, FileText, BarChart3, Mail, UserPlus, Share } from "lucide-react"
import { ClassroomMembers } from "@/components/classroom-members"
import { ClassroomTests } from "@/components/classroom-tests"
import { ClassroomSettings } from "@/components/classroom-settings"

export default function ClassroomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isOwner, setIsOwner] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock classroom data
  const classroom = {
    id: params.id,
    name: "Physics 101",
    description: "Introductory physics course covering mechanics, thermodynamics, and waves",
    subject: "Physics",
    createdAt: "Jan 15, 2025",
    owner: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    memberCount: 24,
    testCount: 8,
    averageScore: 78,
    completionRate: 92,
    recentActivity: "Test 'Mechanics Quiz' assigned on Mar 14, 2025",
  }

  // Simulate loading and permission check
  useEffect(() => {
    const checkPermission = async () => {
      // In a real app, this would be an API call to check if the user owns this classroom
      setTimeout(() => {
        setIsOwner(true) // Set to true for demo purposes
        setIsLoading(false)
      }, 1000)
    }

    checkPermission()
  }, [params.id])

  // Redirect if not the owner
  useEffect(() => {
    if (!isLoading && !isOwner) {
      router.push("/classrooms")
    }
  }, [isLoading, isOwner, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading classroom...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{classroom.name}</h1>
          <p className="text-muted-foreground">{classroom.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Invite
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Assign Test
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">
            <Users className="mr-2 h-4 w-4 hidden sm:inline" />
            Members
          </TabsTrigger>
          <TabsTrigger value="tests">
            <FileText className="mr-2 h-4 w-4 hidden sm:inline" />
            Tests
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4 hidden sm:inline" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classroom.memberCount}</div>
                <div className="flex mt-2 -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                      <AvatarFallback>S{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  {classroom.memberCount > 5 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +{classroom.memberCount - 5}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classroom.testCount}</div>
                <p className="text-xs text-muted-foreground mt-2">{classroom.completionRate}% completion rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classroom.averageScore}%</div>
                <p className="text-xs text-muted-foreground mt-2">Across all tests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subject</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classroom.subject}</div>
                <p className="text-xs text-muted-foreground mt-2">Created on {classroom.createdAt}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in this classroom</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New test assigned</p>
                      <p className="text-xs text-muted-foreground">"Mechanics Quiz" was assigned to all members</p>
                      <p className="text-xs text-muted-foreground mt-1">Mar 14, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <UserPlus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New members joined</p>
                      <p className="text-xs text-muted-foreground">3 new students joined the classroom</p>
                      <p className="text-xs text-muted-foreground mt-1">Mar 12, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Test completed</p>
                      <p className="text-xs text-muted-foreground">"Thermodynamics Basics" completed by 22 students</p>
                      <p className="text-xs text-muted-foreground mt-1">Mar 10, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=1" />
                        <AvatarFallback>EM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Emma Miller</p>
                        <p className="text-xs text-muted-foreground">8 tests completed</p>
                      </div>
                    </div>
                    <Badge>95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=2" />
                        <AvatarFallback>JC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">James Chen</p>
                        <p className="text-xs text-muted-foreground">7 tests completed</p>
                      </div>
                    </div>
                    <Badge>92%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=3" />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sophia Patel</p>
                        <p className="text-xs text-muted-foreground">8 tests completed</p>
                      </div>
                    </div>
                    <Badge>89%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=4" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Michael Johnson</p>
                        <p className="text-xs text-muted-foreground">6 tests completed</p>
                      </div>
                    </div>
                    <Badge>87%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <ClassroomMembers classroomId={params.id} />
        </TabsContent>

        <TabsContent value="tests">
          <ClassroomTests classroomId={params.id} />
        </TabsContent>

        <TabsContent value="settings">
          <ClassroomSettings classroomId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

