import { CardProps } from "./types";

export default function Card({ title, value, icon, colorIcon }: CardProps) {
  return (
    <div className="p-6 rounded-[10px] border-[#F3F6FD] border-1 flex-1 max-w-72 shadow min-w-[244px]">
      <div style={{ color: colorIcon || "inherit" }} className="p-3 border-1 border-[#F3F6FD] w-fit rounded-[8px] text-2xl shadow">{icon}</div>
      <p className="text-sm font-semibold text-[#99B2C6] mt-3">{title.toUpperCase()}</p>
      <p className="text-2xl font-bold mt-1 text-[#06152B]">{value}</p>
    </div>
  );
}
