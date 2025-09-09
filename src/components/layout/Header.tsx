interface HeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export default function Header({ title, subtitle, rightElement }: HeaderProps) {
  return (
    <div className="w-full mb-8 flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-lg font-semibold text-[#06152B]">{title}</h1>
        {subtitle && (
          <p className="text-start font-semibold text-[#99B2C6] text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement}
    </div>
  );
}
