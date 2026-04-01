import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/";

  if (hideNavbar) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      <div className="flex flex-col flex-1 md:ml-[270px]">
        <div className="p-3 sm:p-4 md:p-6 flex-1 mt-[70px] md:mt-[90px]">{children}</div>
      </div>
    </div>
  );
}
