import { Button } from "@/components/lib/Button";
import { FaArrowLeft } from "react-icons/fa";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  backButton?: {
    onClick: () => void;
    ariaLabel?: string;
  };
}

export default function Header({
  title,
  subtitle,
  rightElement,
  backButton,
}: HeaderProps) {
  return (
    <div className="w-full mb-8 flex items-center justify-between flex-wrap gap-4">
      <div className="w-full flex items-center gap-4 max-sm:justify-center">
        {backButton && (
          <Button
            variant="icon"
            onClick={backButton.onClick}
            aria-label={backButton.ariaLabel || "Go back"}
          >
            <FaArrowLeft size={16} />
          </Button>
        )}

        <div className="">
          <h1 className="text-lg font-semibold text-[#06152B] text-start max-sm:text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="text-start font-semibold text-[#99B2C6] text-sm max-sm:text-center">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {rightElement}
    </div>
  );
}
