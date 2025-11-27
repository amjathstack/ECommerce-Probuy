"use client";
import DashboardMenu from "@/components/DashboardMenu";
import React from "react";

export default function AdminLayout({ children }) {

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardMenu/>
        {children}
    </div>
  );
}
