
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  url: string;
  className?: string;
  style?: CSSProperties;
}

export function ServiceCard({
  title,
  description,
  icon,
  url,
  className,
  style,
}: ServiceCardProps) {
  return (
    <Link
      href={url}
      className={cn(
        "group bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full animate-fade-in",
        className
      )}
      style={style}
    >
      {icon && <div className="text-primary mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-primary font-medium">
        <span>Learn more</span>
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
