import { Button } from "@/components/ui/button"
import { Phone, Calendar } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play } from "lucide-react"

export function PricingCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Guided Setup</h2>

        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Fully guided onboarding, reusable license for the purchaser, client handover & editability, and 12 months of safe
          app‑code updates that never overwrite your content or database. Talk to us to pick the right package.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
            <a href="/contact" aria-label="Contact Sales">
              <span className="inline-flex items-center"><Phone className="mr-2 h-5 w-5" />Contact Sales</span>
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            asChild
          >
            <a href="/contact" aria-label="Schedule a demo">
              <span className="inline-flex items-center"><Calendar className="mr-2 h-5 w-5" />Schedule Demo</span>
            </a>
          </Button>
        </div>
        <div className="text-center mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-green-600 to-yellow-600 hover:opacity-90">
                        <Play className="mr-2 h-5 w-5" />
                        Watch Installation Video
                        <br />
                        <p className="text-sm text-blue-100">(Shortened Version)</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl w-full p-0">
                      <DialogHeader className="px-6 pt-6">
                        <DialogTitle>Installation Video</DialogTitle>
                      </DialogHeader>
                      <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                          src="https://www.youtube.com/embed/pi3Nk0-_NsU"
                          title="Fluxedita Installation Guide"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

      </div>
    </section>
  )
}
