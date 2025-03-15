"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { AtSign, Lock, ArrowRight, Github, ChromeIcon as Google } from "lucide-react"
import { toast } from 'sonner'
import { signIn } from './auth.action'
import { z } from "zod"
import SignInForm from "@/app/login/SignInForm";
import SignUpForm from "@/app/login/SignUpForm";

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
      <div className="flex min-h-[calc(100vh-8rem)] min-w-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <SignInForm></SignInForm>
            </TabsContent>

            <TabsContent value="signup">
              <SignUpForm></SignUpForm>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
  )
}

