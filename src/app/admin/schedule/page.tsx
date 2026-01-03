"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User } from "lucide-react";

// 더미 데이터
const schedules = [
  { id: 1, date: "2024-01-15", time: "09:00", type: "실측", customer: "김철수", address: "서울시 강남구 삼성동", status: "예정" },
  { id: 2, date: "2024-01-15", time: "14:00", type: "시공", customer: "이영희", address: "경기도 수원시 영통구", status: "예정" },
  { id: 3, date: "2024-01-16", time: "10:00", type: "시공", customer: "박민수", address: "서울시 송파구 잠실동", status: "예정" },
  { id: 4, date: "2024-01-16", time: "15:00", type: "A/S", customer: "최동훈", address: "인천시 연수구", status: "예정" },
  { id: 5, date: "2024-01-17", time: "09:00", type: "실측", customer: "정수진", address: "경기도 성남시 분당구", status: "예정" },
];

const typeColors: Record<string, string> = {
  "실측": "bg-blue-100 text-blue-700 border-blue-200",
  "시공": "bg-green-100 text-green-700 border-green-200",
  "A/S": "bg-orange-100 text-orange-700 border-orange-200",
};

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

export default function AdminSchedulePage() {
  const [currentDate] = useState(new Date(2024, 0, 15)); // 2024년 1월 15일
  const [view, setView] = useState<"week" | "month">("week");

  // 해당 주의 날짜들 계산
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return schedules.filter((s) => s.date === dateStr);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">시공 일정</h1>
          <p className="text-muted mt-1">2024년 1월</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setView("week")}
              className={"px-4 py-2 text-sm font-medium transition-colors " + (view === "week" ? "bg-gold text-white" : "bg-white text-ink hover:bg-gray-50")}
            >
              주간
            </button>
            <button
              onClick={() => setView("month")}
              className={"px-4 py-2 text-sm font-medium transition-colors " + (view === "month" ? "bg-gold text-white" : "bg-white text-ink hover:bg-gray-50")}
            >
              월간
            </button>
          </div>
          <button className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
            <Plus className="w-5 h-5" />
            일정 추가
          </button>
        </div>
      </div>

      {/* 캘린더 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-ink">
            2024년 1월 14일 - 1월 20일
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 주간 캘린더 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {weekDates.map((date, index) => {
            const isToday = date.toISOString().split("T")[0] === "2024-01-15";
            return (
              <div
                key={index}
                className={"p-4 text-center border-r last:border-r-0 " + (isToday ? "bg-gold/5" : "")}
              >
                <p className="text-sm text-muted">{weekDays[index]}</p>
                <p className={"text-2xl font-bold mt-1 " + (isToday ? "text-gold" : "text-ink")}>
                  {date.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 min-h-[400px]">
          {weekDates.map((date, index) => {
            const daySchedules = getSchedulesForDate(date);
            const isToday = date.toISOString().split("T")[0] === "2024-01-15";
            return (
              <div
                key={index}
                className={"p-2 border-r last:border-r-0 " + (isToday ? "bg-gold/5" : "")}
              >
                <div className="space-y-2">
                  {daySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={"p-2 rounded-lg border text-sm cursor-pointer hover:shadow-md transition-shadow " + typeColors[schedule.type]}
                    >
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {schedule.time}
                      </div>
                      <p className="font-bold mt-1">{schedule.type}</p>
                      <div className="flex items-center gap-1 text-xs mt-1 opacity-80">
                        <User className="w-3 h-3" />
                        {schedule.customer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 오늘의 일정 상세 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-ink text-lg mb-4">오늘의 일정</h3>
        <div className="space-y-4">
          {schedules
            .filter((s) => s.date === "2024-01-15")
            .map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center gap-4 p-4 bg-hanji rounded-lg"
              >
                <div className={"w-16 h-16 rounded-lg flex flex-col items-center justify-center " + typeColors[schedule.type].replace("border-", "")}>
                  <span className="text-xs font-medium">{schedule.type}</span>
                  <span className="text-lg font-bold">{schedule.time}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-ink">{schedule.customer}</p>
                  <div className="flex items-center gap-2 text-sm text-muted mt-1">
                    <MapPin className="w-4 h-4" />
                    {schedule.address}
                  </div>
                </div>
                <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium">
                  {schedule.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
