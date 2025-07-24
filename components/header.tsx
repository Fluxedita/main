"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              FluxEdita
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  Key Docs <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/installation" className="w-full text-gray-700 hover:text-blue-600 transition-colors">
                    Installation Guide
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/tutorials" className="w-full text-gray-700 hover:text-blue-600 transition-colors">
                    Tutorials
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/legal" className="w-full text-gray-700 hover:text-blue-600 transition-colors">
                    Legal Documents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/documentation" className="text-gray-700 hover:text-blue-600 transition-colors">
              Documentation
            </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/learning" className="text-gray-700 hover:text-blue-600 transition-colors">
              Learning With FluxEdita
            </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              Frequently Asked Questions
            </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/help" className="text-gray-700 hover:text-blue-600 transition-colors">
              Help
            </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/products">Get Started</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <div className="px-3 py-2 text-gray-500 text-sm font-medium">Home Sections</div>
              <a href="#features" className="block px-6 py-2 text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#packages" className="block px-6 py-2 text-gray-700 hover:text-blue-600">
                Packages
              </a>
              <a href="#tech" className="block px-6 py-2 text-gray-700 hover:text-blue-600">
                Tech Stack
              </a>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Products
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Pricing
              </Link>
              <Link href="/installation" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Installation Guide
              </Link>
              <Link href="/help" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Help
              </Link>
              <Link href="/documentation" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Documentation
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Contact
              </Link>
              <div className="pt-4 pb-2 space-y-2">
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/products">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
