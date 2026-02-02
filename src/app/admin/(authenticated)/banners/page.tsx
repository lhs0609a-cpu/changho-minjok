import Link from 'next/link';
import Image from 'next/image';
import { getAllBanners } from '@/lib/banner-db';
import { deleteBannerAction, toggleBannerStatusAction } from './actions';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  MapPin,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const locationLabels: Record<string, string> = {
  main: '메인',
  sub: '서브',
  landing: '랜딩',
};

export default async function AdminBannersPage() {
  const banners = await getAllBanners();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">배너 관리</h1>
          <p className="text-gray-500 mt-1">슬라이드 배너를 관리합니다.</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 배너
        </Link>
      </div>

      {/* Content */}
      {banners.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">등록된 배너가 없습니다.</p>
          <Link
            href="/admin/banners/new"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 배너 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image Preview */}
              <div className="relative w-full md:w-64 h-40 bg-gray-100 flex-shrink-0">
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{banner.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {locationLabels[banner.location] || banner.location}
                    </span>
                    <span>순서: {banner.display_order}</span>
                  </div>
                  {banner.link_url && (
                    <a
                      href={banner.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-600 hover:underline mt-1 block"
                    >
                      {banner.link_url}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Toggle */}
                  <form action={toggleBannerStatusAction}>
                    <input type="hidden" name="id" value={banner.id} />
                    <input type="hidden" name="is_active" value={String(banner.is_active)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                        banner.is_active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {banner.is_active ? (
                        <>
                          <Eye className="w-4 h-4" />
                          활성
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          비활성
                        </>
                      )}
                    </button>
                  </form>

                  {/* Edit */}
                  <Link
                    href={`/admin/banners/${banner.id}`}
                    className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="수정"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete */}
                  <form action={deleteBannerAction}>
                    <input type="hidden" name="id" value={banner.id} />
                    <button
                      type="submit"
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="삭제"
                      onClick={(e) => {
                        if (!confirm('정말 삭제하시겠습니까?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
