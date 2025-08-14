'use client';

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type VideoCard = {
  title: string;
  description: string;
  videoId: string;
  buttonText: string;
  dialogTitle: string;
};

const videoCards: VideoCard[] = [
  {
    title: "Getting Started - Short Version",
    description: "Quick installation and setup guide",
    videoId: "pi3Nk0-_NsU",
    buttonText: "Installation Guide - Short",
    dialogTitle: "Installation Video - Short"
  },
  {
    title: "Install Guide - Full",
    description: "Complete installation walkthrough",
    videoId: "pi3Nk0-_NsU",
    buttonText: "Install Guide - Full",
    dialogTitle: "Install Guide - Full"
  },
  {
    title: "Page Editor Tutorial",
    description: "Learn how to use our page editor",
    videoId: "SgIpb1kG6xQ", // Replace with actual video ID
    buttonText: "Page Editor Guide",
    dialogTitle: "Page Editor Tutorial"
  },
  {
    title: "Advanced Features",
    description: "Explore advanced platform features",
    videoId: "c10uP2uwuLo", // Replace with actual video ID
    buttonText: "Advanced Features",
    dialogTitle: "Advanced Features Walkthrough"
  }
];

export function VideoCards() {
  return (
    <div className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Watch Our Tutorials</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to get started with our platform through these helpful video guides.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videoCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                  <Play className="mr-2 h-5 w-5" />
                  {card.buttonText}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-full p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>{card.dialogTitle}</DialogTitle>
                </DialogHeader>
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${card.videoId}`}
                    title={card.dialogTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <h4 className="mt-4 font-semibold text-gray-900 dark:text-white">{card.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
