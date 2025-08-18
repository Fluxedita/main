'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function PromoVideo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01] hover:shadow-3xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors duration-300"></div>
              <div className="relative z-10 text-center p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                </p>
              </div>
            </div>
            
            <>
              <img
                src={`https://img.youtube.com/vi/A7EKEwLvKXA/maxresdefault.jpg`}
                alt="Fluxedita Demo Video"
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
              {/* Play button overlay */}
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="absolute inset-0 flex items-center justify-center group outline-none focus:outline-none"
                aria-label="Play video"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <div className="w-0 h-0 border-t-12 border-b-12 border-l-20 border-t-transparent border-b-transparent border-l-white border-l-20 ml-1"></div>
                </div>
              </button>
            </>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Fluxedita Demo</DialogTitle>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/A7EKEwLvKXA?autoplay=1&rel=0&modestbranding=1"
              title="Fluxedita Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-b-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Cards Section removed per request */}
    </section>
  );
}
