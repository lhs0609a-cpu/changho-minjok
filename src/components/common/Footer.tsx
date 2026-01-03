import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* 회사 정보 */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">창호의민족</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              프리미엄 창호 전문 기업<br />
              공장 직영으로 최저가 보장<br />
              10년 무상 품질보증
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-bold text-lg mb-4">연락처</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="tel:1668-1453" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-white font-bold">1668-1453</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@changhominjok.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>경기도 화성시 팔탄면 창호로 123</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>평일 09:00~18:00 / 토 09:00~13:00</span>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="font-bold text-lg mb-4">바로가기</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">회사소개</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold transition-colors">제품소개</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors">시공사례</Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-gold transition-colors">견적문의</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">오시는 길</Link>
              </li>
            </ul>
          </div>

          {/* SNS & 법적 */}
          <div>
            <h4 className="font-bold text-lg mb-4">SNS</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://blog.naver.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">이용약관</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="mt-12 pt-8 border-t border-white/10 text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p>상호: 창호의민족 | 대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
              <p className="mt-1">통신판매업신고: 제2024-경기화성-0000호</p>
            </div>
            <p className="text-gray-600">
              &copy; 2024 창호의민족. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
