import Link from "next/link";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";

interface EmptyStateProps {
  title?: string;
  message?: string;
  link?: string;
  linkText?: string;
  icon?: string;
}

export function EmptyState({
  title,
  message,
  link,
  linkText,
  icon = "dumbbell",
}: EmptyStateProps) {
  const IconComponent = iconNames.includes(icon as any)
    ? (icon as any)
    : "dumbbell";

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="text-4xl mb-4 w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center">
        <DynamicIcon name={IconComponent} size={38} color="gray" />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-center">
        {title || "Parece que não tem nada aqui"}
      </h2>
      <p className="text-gray-600 text-center">
        {message ||
          "Atualmente não há dados para exibir. Adicione alguns dados para começar."}
      </p>
      {link && linkText && (
        <Link href={link} className="mt-4 text-blue-500 hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
}
