import React, { ReactNode } from 'react';

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="w-64 h-full border-r border-gray-800 p-2">
      {children}
    </aside>
  )
}

export default Sidebar
