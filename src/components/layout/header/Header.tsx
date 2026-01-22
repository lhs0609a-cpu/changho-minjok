'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone, ChevronDown, ArrowRight } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - 배민 스타일 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#2AC1BC] flex items-center justify-center text-white font-extrabold text-xl">
              창
            </div>
            <span className="text-xl font-extrabold text-[#1E1E1E] tracking-tight">
              창호의<span className="text-[#2AC1BC]">민족</span>
            </span>
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
                    'flex items-center gap-1 px-4 py-2 text-[15px] font-bold transition-colors rounded-xl',
                    item.highlight
                      ? 'bg-[#FF6F0F] text-white hover:bg-[#E5630D] shadow-md shadow-[#FF6F0F]/20'
                      : 'text-[#4A4A4A] hover:text-[#2AC1BC] hover:bg-[#E8F8F7]',
                    !item.highlight && activeMenu === item.href && 'text-[#2AC1BC] bg-[#E8F8F7]'
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

                {/* Dropdown - 배민 스타일 */}
                <AnimatePresence>
                  {item.children && activeMenu === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#EEEEEE] py-2 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 text-[#4A4A4A] hover:text-[#2AC1BC] hover:bg-[#E8F8F7] transition-colors font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C4C4C4]" />
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
          <div className="flex items-center gap-4">
            {/* Phone */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hidden md:flex items-center gap-2 text-[#4A4A4A] hover:text-[#2AC1BC] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-bold">{COMPANY_INFO.phone}</span>
            </a>

            {/* CTA Button - 배민 스타일 */}
            <Button
              asChild
              className="hidden lg:flex bg-[#2AC1BC] hover:bg-[#1FA9A5] text-white font-bold rounded-xl px-5"
            >
              <Link href="/estimate" className="flex items-center gap-2">
                무료 견적
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-[#E8F8F7]">
                  <Menu className="h-5 w-5 text-[#1E1E1E]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm p-0 border-l-2 border-[#EEEEEE]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b-2 border-[#EEEEEE]">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-[#2AC1BC] flex items-center justify-center text-white font-extrabold text-xl">
                        창
                      </div>
                      <span className="text-xl font-extrabold text-[#1E1E1E] tracking-tight">
                        창호의<span className="text-[#2AC1BC]">민족</span>
                      </span>
                    </Link>
                  </div>

                  <nav className="flex-1 overflow-y-auto py-4 px-4">
                    {MAIN_NAV.map((item) => (
                      <div key={item.href} className="mb-2">
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between p-3 rounded-xl font-bold transition-colors',
                            item.highlight
                              ? 'bg-[#FF6F0F] text-white hover:bg-[#E5630D]'
                              : 'text-[#1E1E1E] hover:bg-[#E8F8F7] hover:text-[#2AC1BC]'
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                          <ArrowRight className={cn('w-4 h-4', item.highlight ? 'text-white' : 'text-[#C4C4C4]')} />
                        </Link>
                        {item.children && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2 p-2 text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C4C4C4]" />
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="p-6 border-t-2 border-[#EEEEEE] space-y-3 bg-[#F5F5F5]">
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-[#EEEEEE]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#E8F8F7] flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#2AC1BC]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#767676] font-medium">전화 상담</p>
                        <p className="font-extrabold text-[#1E1E1E]">{COMPANY_INFO.phone}</p>
                      </div>
                    </a>
                    <Button
                      asChild
                      className="w-full h-14 bg-[#2AC1BC] hover:bg-[#1FA9A5] text-white font-bold rounded-xl text-lg"
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
  );
}
