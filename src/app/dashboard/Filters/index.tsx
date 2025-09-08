"use client"
import { useFilterStore } from "@/store/filterStore";

export default function Filters() {
  const { month, year, setMonth, setYear } = useFilterStore();

  return (
    <div className="flex gap-2 items-center">
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {[2023, 2024, 2025].map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
