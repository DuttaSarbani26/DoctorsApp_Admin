import { usePathname } from 'next/navigation';
import React from 'react'

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
      {/* <Sidebar/> */}

      <div className="flex flex-col flex-1 ml-72">

        {/* <Navbar/> */}

        <div className="p-6 flex-1">
            {children}
        </div>

      </div>
    </div>
  )
}
