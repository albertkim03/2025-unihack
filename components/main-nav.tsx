"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { validateSession } from "@/app/login/auth.action"

export function MainNav() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkSession = async () => {
    const {isValid} = await validateSession()
    setIsLoggedIn(isValid)
  }

  useEffect(() => {
    checkSession()
    // Listen for auth changes
    window.addEventListener('auth-change', checkSession)
    return () => {
      window.removeEventListener('auth-change', checkSession)
    }
  }, [pathname])

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      showAlways: true,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      showAlways: false,
    },
    {
      href: "/create-test",
      label: "Create Test",
      active: pathname === "/create-test",
      showAlways: false,
    },
    {
      href: "/myspace",
      label: "My Space",
      active: pathname === "/myspace",
      showAlways: false,
    },
    {
      href: "/classrooms",
      label: "Classrooms",
      active: pathname === "/classrooms" || pathname.startsWith("/classrooms/"),
      showAlways: false,
    },
    {
      href: "/results",
      label: "Results",
      active: pathname === "/results",
      showAlways: false,
    },
  ]

  // Only show Home nav when not logged in
  const filteredRoutes = routes.filter(route => 
    route.showAlways || isLoggedIn
  )

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {filteredRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

