interface HeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export default function Header({ title, subtitle, rightElement }: HeaderProps) {
  return (
    <div className="w-full mb-8 flex items-center justify-between flex-wrap gap-4">
      <div className="w-full">
        <h1 className="text-lg font-semibold text-[#06152B] text-start max-sm:text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-start font-semibold text-[#99B2C6] text-sm max-sm:text-center">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement}
    </div>
  );
}
