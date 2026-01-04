'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">2024 스마트 팩토리 오픈 기념</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">견적 시 10% 특별 할인</span>
          <Link href="/estimate" className="ml-2 underline underline-offset-2 hover:no-underline font-semibold">
            바로가기 <ArrowRight className="inline w-3 h-3" />
          </Link>
        </div>
      </div>

      <header
        className={cn(
          'fixed top-[36px] left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-gray-100'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg transition-all duration-300',
                  isScrolled
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                    : 'bg-white text-blue-600'
                )}>
                  창
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
              </div>
              <div className={cn(
                'transition-colors duration-300',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}>
                <span className="text-xl lg:text-2xl font-bold tracking-tight">창호의</span>
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-blue-600">민족</span>
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
                      'flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl',
                      isScrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10',
                      activeMenu === item.href && (isScrolled ? 'text-gray-900 bg-gray-50' : 'text-white bg-white/10')
                    )}
                  >
                    {item.title}
                    {item.children && (
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeMenu === item.href && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 pt-3"
                      >
                        <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 min-w-[220px] overflow-hidden">
                          {item.children.map((child, index) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-3 px-4 py-3 text-[15px] text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
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

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className={cn(
                  'hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200',
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-50'
                    : 'text-white/90 hover:bg-white/10'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  isScrolled ? 'bg-blue-100' : 'bg-white/20'
                )}>
                  <Phone className={cn('w-4 h-4', isScrolled ? 'text-blue-600' : 'text-white')} />
                </div>
                <span className="font-semibold">{COMPANY_INFO.phone}</span>
              </a>

              {/* CTA Button */}
              <Button
                asChild
                className={cn(
                  'hidden lg:flex h-11 px-6 rounded-xl font-semibold transition-all duration-300',
                  isScrolled
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25'
                    : 'bg-white text-blue-600 hover:bg-white/90 shadow-lg shadow-black/10'
                )}
              >
                <Link href="/estimate" className="flex items-center gap-2">
                  무료 견적받기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'w-10 h-10 rounded-xl',
                      isScrolled
                        ? 'text-gray-900 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    )}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="p-6 border-b border-gray-100">
                      <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-lg">
                          창
                        </div>
                        <div>
                          <span className="text-xl font-bold tracking-tight text-gray-900">창호의</span>
                          <span className="text-xl font-bold tracking-tight text-blue-600">민족</span>
                        </div>
                      </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4">
                      {MAIN_NAV.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="mb-2"
                        >
                          <Link
                            href={item.href}
                            className="flex items-center justify-between p-4 rounded-2xl text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.title}
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </Link>
                          {item.children && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </nav>

                    {/* Mobile Footer */}
                    <div className="p-6 border-t border-gray-100 space-y-4">
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">전화 상담</p>
                          <p className="text-lg font-bold text-gray-900">{COMPANY_INFO.phone}</p>
                        </div>
                      </a>
                      <Button
                        asChild
                        className="w-full h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25"
                      >
                        <Link href="/estimate" onClick={() => setIsMobileMenuOpen(false)}>
                          무료 견적받기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header + announcement bar */}
      <div className="h-[36px]" />
    </>
  );
}
