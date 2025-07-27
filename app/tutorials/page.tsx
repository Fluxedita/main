'use client'

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PlayCircle, Download, Code, Settings, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function TutorialsPage() {
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string} | null>(null)
  const tutorials = [
    {
      id: 'installation',
      title: 'Installation Video Tutorial',
      tagline: 'Get started with Fluxedita in minutes',
      description: 'Follow along as we guide you through the installation process, from downloading the template to running it locally on your machine. Perfect for beginners!',
      icon: <Download className="w-6 h-6 text-blue-600" />,
      videoId: 'C2usSihBXTU', // YouTube video ID
    },
    {
      id: 'editing',
      title: 'How To Edit Video Tutorial - Part One',
      tagline: 'Learn the basics of content editing',
      description: 'Learn how to customize your Fluxedita template with our intuitive editing tools. Change text, images, and layouts with ease.',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      videoId: 'tmi_oVQ2rvQ', // YouTube video ID
      reverse: true
    },
    {
      id: 'installation_short',
      title: 'Installation Video Tutorial (Shortened Version)',
      tagline: 'Get started with Fluxedita in minutes',
      description: 'Follow along with the shortened version of the installation process, edited to show just the essentials. If you are already familiar with the process, this is the perfect video for you!',
      icon: <Download className="w-6 h-6 text-blue-600" />,
      videoId: 'd-vhR_wzNho', // YouTube video ID
    },
    {
      id: 'advanced_editing',
      title: 'Advanced Editing Techniques',
      tagline: 'Take your skills to the next level',
      description: 'Discover advanced tips and tricks for customizing your Fluxedita template. Learn about advanced features and customization options.',
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      videoId: 'ewtlIWV7y_I', // YouTube video ID
      reverse: true
    },
    {
      id: 'advanced_editing_short',
      title: 'Advanced Editing Techniques (Shortened Version)',
      tagline: 'Take your skills to the next level',
      description: 'Discover advanced tips and tricks for customizing your Fluxedita template. Learn about advanced features and customization options. If you are already familiar with the process, this is the perfect video for you!',
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      videoId: 'ewtlIWV7y_I', // YouTube video ID
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
            <PlayCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Video Tutorials</span>
          </div>
          <h1>&nbsp;</h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Fluxedita: Build It. Own It.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          <b>A complete tutorial series to install, edit, and scale your site — with zero fluff and full control.</b>
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Step-by-step video guides to help you master Fluxedita
          </p>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tutorials.map((tutorial, index) => (
            <div 
              key={tutorial.id}
              className={`flex flex-col ${tutorial.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24 last:mb-0`}
            >
              {/* Content */}
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 mr-3">
                    {tutorial.icon}
                  </div>
                  <span className="text-sm font-medium text-blue-600">{tutorial.tagline}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{tutorial.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{tutorial.description}</p>
                <Button 
                  variant="outline" 
                  className="group"
                  onClick={() => setSelectedVideo({ id: tutorial.videoId, title: tutorial.title })}
                >
                  <PlayCircle className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors" />
                  Watch Tutorial
                </Button>
              </div>
              
              {/* Video Embed */}
              <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${tutorial.videoId}?rel=0&showinfo=0`}
                    title={tutorial.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to start building?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get instant access to all our templates, components, and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="installation">Get Started</a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="pricing">View Pricing</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Video Lightbox */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || 'Video Player'}
          </DialogTitle>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-10 right-0 text-white hover:bg-white/20"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </Button>
            {selectedVideo && (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  )
}
