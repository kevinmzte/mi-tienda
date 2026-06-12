import {
  ChevronRight,
} from "lucide-react";

type CardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    bg: string;
    iconBg: string;
    buttonBg: string;
  };
  
  export default function DashboardCard({
    icon,
    title,
    description,
    bg,
    iconBg,
    buttonBg,
  }: CardProps) {
    return (
      <div
      className={`
            ${bg}
            rounded-[32px]
            p-6
            min-h-[260px]
            flex
            flex-col
            items-center
            justify-between
            shadow-sm
        
            transition-all
            duration-200
        
            active:scale-95
            hover:shadow-md
        `}
      >
        <div
          className={`
            ${iconBg}
            w-28
            h-28
            rounded-[30px]
            flex
            items-center
            justify-center
          `}
        >
          {icon}
        </div>
  
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {title}
          </h2>
  
          <p className="text-gray-500 mt-2">
            {description}
          </p>
        </div>
  
        <div
          className={`
            ${buttonBg}
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            text-white
          `}
        >
          <ChevronRight
            size={20}
            className="text-white-600"
          />
        </div>
      </div>
    );
  }