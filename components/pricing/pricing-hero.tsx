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
              <span>Simple, Transparent Pricing</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            Empower your online presence with our straightforward pricing plans, designed to fit every stage of your
            growth.
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
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-700">
                <li>All packages include free updates for 12 months from your purchase date.</li>
                <li>Updates can be accessed and seamlessly integrated via GitHub, so you always have the latest features and improvements.</li>
                <li>Your website content and database are never overwritten—updates only affect the app code, not your data.</li>
                <li>Enjoy peace of mind knowing your site stays secure and up-to-date, with no disruption to your content or users. Should you choose to update your plan.</li>
                <li>You will be notified via email of any updates to your plan. Then you can decide whether to update your plan or not.</li>
              </ul>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
