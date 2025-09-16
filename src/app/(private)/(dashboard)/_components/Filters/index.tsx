"use client";
import { useFilterStore } from "@/store/filterStore";

export default function Filters() {
  const { month, year, setMonth, setYear } = useFilterStore();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const selectClasses = `
    border border-gray-300 
    rounded-md 
    px-3 py-2 
    bg-white 
    text-gray-700 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-blue-500
  `;

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  return (
    <div className="flex gap-2 items-center">
      <select
        className={selectClasses}
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {monthNames.map((name, index) => (
          <option key={index} value={index + 1}>
            {name}
          </option>
        ))}
      </select>

      <select
        className={selectClasses}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
