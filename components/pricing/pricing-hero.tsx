"use client"
import { DollarSign } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function PricingHero() {
  const [open, setOpen] = useState(false)
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              <span>All-in-one, Fully Guided Plans</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Guided, All‑in‑One
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plans for Every Stage
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            All packages are fully guided (beginner → expert), include reusable licenses for the purchaser, client
            handover & editability, and 12 months of app‑code updates that never overwrite your content or database.
          </p>
          <div className="mb-8">
            <button
              className="text-blue-700 underline font-medium hover:text-blue-900 transition-colors text-base focus:outline-none"
              onClick={() => setOpen(true)}
              aria-label="Learn more about free updates"
            >
              Free updates for 12 months
            </button>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Free Updates for 12 Months</DialogTitle>
            <DialogDescription asChild>
              <div>
                <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-700">
                  <li>All packages include free updates for 12 months from your purchase date.</li>
                  <li>Updates will appear in your <strong>Account → Downloads</strong> section for each entitled package.</li>
                  <li>You choose when to apply an update. We’ll email you when updates are available so you can review and install at your convenience.</li>
                  <li>Delivered as downloadable updates in your account with safe app‑code changes only—your content and database are never overwritten.</li>
                  <li>Peace of mind: stay secure and up to date without disrupting your site or users.</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
