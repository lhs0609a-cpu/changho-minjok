'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/landing" className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#2AC1BC] flex items-center justify-center text-white font-extrabold text-lg md:text-xl">
                  창
                </div>
                <span className="text-lg md:text-xl font-extrabold text-[#1E1E1E] tracking-tight">
                  창호의<span className="text-[#2AC1BC]">민족</span>
                </span>
              </Link>

              {/* Trust Points (Desktop) */}
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E8F8F7] rounded-full">
                  <span className="text-[#2AC1BC] font-bold">✓</span>
                  <span className="text-[#1E1E1E] font-semibold">평균 200만원 절약</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#767676]">
                  <span className="text-[#2AC1BC]">✓</span> 10년 무상 A/S
                </span>
                <span className="flex items-center gap-1.5 text-[#767676]">
                  <span className="text-[#2AC1BC]">✓</span> 전문건설업 면허
                </span>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="hidden md:flex h-11 px-5 rounded-xl border-2 border-[#1E1E1E] text-[#1E1E1E] font-bold hover:bg-[#1E1E1E] hover:text-white"
                >
                  <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {COMPANY_INFO.phone}
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-11 px-5 md:px-6 bg-[#FF6F0F] hover:bg-[#E5630D] text-white rounded-xl font-bold shadow-lg shadow-[#FF6F0F]/20"
                >
                  <a href="#contact-form" className="flex items-center gap-2">
                    30초 견적 받기
                    <ArrowRight className="w-4 h-4 hidden md:block" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
