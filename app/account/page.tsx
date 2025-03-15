import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AccountStats } from "@/components/account-stats"
import {getUser} from "@/lib/lucia";

export default function AccountPage() {
  const user = getUser()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm">Change Avatar</Button>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="user" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Teacher" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" defaultValue="Springfield High School" />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="utc-8">Pacific Time (UTC-8)</option>
                    <option value="utc-5">Eastern Time (UTC-5)</option>
                    <option value="utc+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="utc+1">Central European Time (UTC+1)</option>
                    <option value="utc+8">China Standard Time (UTC+8)</option>
                  </select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Theme Preferences</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-full rounded-md bg-background border"></div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-full rounded-md bg-slate-950 border"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-full rounded-md bg-gradient-to-b from-background to-slate-950 border"></div>
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <AccountStats />
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="test-completion" className="flex-1">
                      Test completion notifications
                    </Label>
                    <input
                      type="checkbox"
                      id="test-completion"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="classroom-updates" className="flex-1">
                      Classroom updates
                    </Label>
                    <input
                      type="checkbox"
                      id="classroom-updates"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-invitations" className="flex-1">
                      New classroom invitations
                    </Label>
                    <input
                      type="checkbox"
                      id="new-invitations"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing" className="flex-1">
                      Marketing and product updates
                    </Label>
                    <input
                      type="checkbox"
                      id="marketing"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-test" className="flex-1">
                      Test completion notifications
                    </Label>
                    <input
                      type="checkbox"
                      id="in-app-test"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-classroom" className="flex-1">
                      Classroom updates
                    </Label>
                    <input
                      type="checkbox"
                      id="in-app-classroom"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-invitations" className="flex-1">
                      New classroom invitations
                    </Label>
                    <input
                      type="checkbox"
                      id="in-app-invitations"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>
                <p className="text-sm text-muted-foreground">Manage your active sessions across devices.</p>
                <Button variant="outline">Manage Sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

