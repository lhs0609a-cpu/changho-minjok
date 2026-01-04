'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MAIN_NAV, COMPANY_INFO } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Top Bar */}
      <div className={cn(
        'border-b transition-all duration-300',
        isScrolled ? 'border-gray-100' : 'border-white/10'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className={cn(
              'hidden md:flex items-center gap-4',
              isScrolled ? 'text-gray-600' : 'text-white/80'
            )}>
              <span>스마트 팩토리 직영 | 공장 직접 견적</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className={cn(
                  'flex items-center gap-1 font-medium',
                  isScrolled ? 'text-gray-900' : 'text-white'
                )}
              >
                <Phone className="w-4 h-4" />
                {COMPANY_INFO.phone}
              </a>
              <Link
                href="/partner"
                className={cn(
                  'hidden md:block',
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                )}
              >
                파트너 로그인
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={cn(
              'text-xl md:text-2xl font-bold transition-colors',
              isScrolled ? 'text-gray-900' : 'text-white'
            )}>
              창호의<span className="text-blue-600">민족</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {MAIN_NAV.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.href)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md',
                    isScrolled
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10',
                    activeMenu === item.href && (isScrolled ? 'bg-gray-100' : 'bg-white/10')
                  )}
                >
                  {item.title}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeMenu === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant={isScrolled ? 'default' : 'secondary'}>
              <Link href="/estimate">무료 견적받기</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? 'text-gray-900' : 'text-white'}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {MAIN_NAV.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-lg font-medium text-gray-900 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="pl-4 border-l-2 border-gray-100 ml-2 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block text-gray-600 hover:text-gray-900 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/estimate" onClick={() => setIsMobileMenuOpen(false)}>
                      무료 견적받기
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
