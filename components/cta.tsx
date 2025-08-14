import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>One platform. Four packages. Full freedom.</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Web Presence?</h2>

        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          This isn't just a site editor — it's a creative ecosystem that removes friction, empowers non-technical users,
          and gives developers room to expand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <a href="/products">
              See our range of packages to suit all needs
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
            <a href="/contact">
              Contact Us
            </a>
          </Button>
        </div>

        <p className="text-sm text-blue-200 mt-6">
          No more skills gap. No more hidden interfaces. Just you, your site, and your vision.
        </p>
      </div>
      
      <div className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Watch Our Tutorials</h3>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Learn how to get started with our platform through these helpful video guides.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:opacity-90">
                  <Play className="mr-2 h-5 w-5" />
                  Installation Guide - Short
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-full p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>Installation Video - Short</DialogTitle>
                </DialogHeader>
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/pi3Nk0-_NsU"
                    title="Fluxedita Installation Guide - Short Version"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <h4 className="mt-4 font-semibold">Getting Started - Short Version</h4>
            <p className="text-sm text-blue-100 mt-1">Quick installation and setup guide</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:opacity-90">
                  <Play className="mr-2 h-5 w-5" />
                  Install Guide - Full
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-full p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>Install Guide - Full</DialogTitle>
                </DialogHeader>
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/pi3Nk0-_NsU"
                    title="Fluxedita Installation Guide - Full Version"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <h4 className="mt-4 font-semibold">Getting Started - Full Version</h4>
            <p className="text-sm text-blue-100 mt-1">Full installation and setup guide</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:opacity-90">
                  <Play className="mr-2 h-5 w-5" />
                  Editing Basics
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-full p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>How to Edit - Part One</DialogTitle>
                </DialogHeader>
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/SgIpb1kG6xQ"
                    title="How to Edit - Part One"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <h4 className="mt-4 font-semibold">How to Edit - Basic Fundamentals</h4>
            <p className="text-sm text-blue-100 mt-1">Learn the fundamentals of our editor</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:opacity-90">
                  <Play className="mr-2 h-5 w-5" />
                  Advanced Features
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-full p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>How to Edit - Part Two</DialogTitle>
                </DialogHeader>
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/c10uP2uwuLo"
                    title="How to Edit - Part Two"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <h4 className="mt-4 font-semibold">How to Edit -Advanced Features</h4>
            <p className="text-sm text-blue-100 mt-1">Explore powerful customization options</p>
          </div>
        </div>
      </div>
    </section>
  )
}
