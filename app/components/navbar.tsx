import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/app/components/ui/button"

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matching", label: "Matching" },
  { href: "/connections", label: "Connections" },
  // { href: "/profile", label: "Profile" }, // Uncomment if you add a profile page
]

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-black sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-bold text-xl text-white tracking-tight">
          Forged
        </Link>
        <div className="hidden sm:flex gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <Button variant="default">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
} 