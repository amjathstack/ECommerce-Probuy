"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardMenu from "@/components/DashboardMenu";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardMenu/>
        {children}
    </div>
  );
}
