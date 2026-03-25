import { unstable_noStore as noStore } from 'next/cache';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import AdvisorWidget from '@/components/shared/AdvisorWidget';
import PopupModal from '@/components/shared/PopupModal';
import { getActivePopups } from '@/lib/popup-db';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();
  const popups = await getActivePopups();

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AdvisorWidget />
      {popups.length > 0 && <PopupModal popups={popups} />}
    </>
  );
}
