'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdvisorRecord, getDisplayPhone } from '@/lib/advisor-db';
import {
  createAdvisorAction,
  updateAdvisorAction,
  deleteAdvisorAction,
  toggleAdvisorActiveAction,
} from './actions';
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  X,
  Loader2,
  UserCheck,
  Phone,
  Mail,
} from 'lucide-react';

interface AdvisorManagerProps {
  initialAdvisors: AdvisorRecord[];
}

export default function AdvisorManager({ initialAdvisors }: AdvisorManagerProps) {
  const router = useRouter();
  const [advisors, setAdvisors] = useState(initialAdvisors);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<AdvisorRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAdvisors(initialAdvisors);
  }, [initialAdvisors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    let result;
    if (editingAdvisor) {
      formData.append('id', editingAdvisor.id);
      result = await updateAdvisorAction(formData);
    } else {
      result = await createAdvisorAction(formData);
    }

    setIsLoading(false);

    if (result.success) {
      setIsFormOpen(false);
      setEditingAdvisor(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleEdit = (advisor: AdvisorRecord) => {
    setEditingAdvisor(advisor);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const formData = new FormData();
    formData.append('id', id);
    await deleteAdvisorAction(formData);
    router.refresh();
  };

  const handleToggleActive = async (id: string, is_active: boolean) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('is_active', String(is_active));
    await toggleAdvisorActiveAction(formData);
    router.refresh();
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAdvisor(null);
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="inline-flex items-center gap-2 bg-[#EF4444] text-white px-4 py-2.5 rounded-xl hover:bg-[#DC2626] transition-colors"
      >
        <Plus className="w-5 h-5" />
        새 어드바이저
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingAdvisor ? '어드바이저 수정' : '새 어드바이저 등록'}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingAdvisor?.name || ''}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editingAdvisor ? getDisplayPhone(editingAdvisor) : ''}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingAdvisor?.email || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직급
                </label>
                <input
                  type="text"
                  name="position"
                  defaultValue={editingAdvisor?.position || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                  placeholder="사원, 팀장, 대표 등"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    활성 상태
                  </label>
                  <select
                    name="is_active"
                    defaultValue={editingAdvisor?.is_active !== false ? 'true' : 'false'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                  >
                    <option value="true">활성</option>
                    <option value="false">비활성</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    표시 순서
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingAdvisor?.display_order || 0}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
                    min={0}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-[#EF4444] text-white px-4 py-2.5 rounded-xl hover:bg-[#DC2626] disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advisor List */}
      {advisors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">등록된 어드바이저가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {advisors.map((advisor) => (
            <div
              key={advisor.id}
              className={`bg-white rounded-2xl shadow-sm p-6 ${
                !advisor.is_active ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900 text-lg">{advisor.name}</span>
                    {advisor.position && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                        {advisor.position}
                      </span>
                    )}
                    {advisor.is_active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[#E0F7F6] text-[#2AC1BC] rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        활성
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-400 rounded-full">
                        <XCircle className="w-3 h-3" />
                        비활성
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      {getDisplayPhone(advisor)}
                    </span>
                    {advisor.email && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        {advisor.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(advisor.id, advisor.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      advisor.is_active
                        ? 'text-[#2AC1BC] bg-[#E0F7F6] hover:bg-[#2AC1BC]/20'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={advisor.is_active ? '비활성화' : '활성화'}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(advisor)}
                    className="p-2 text-gray-500 hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    title="수정"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(advisor.id)}
                    className="p-2 text-gray-500 hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
