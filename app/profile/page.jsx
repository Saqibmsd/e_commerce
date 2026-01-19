"use client";

import React, { useState } from "react";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import ProfileDashboard from "@/app/components/pages/profile/ProfileDashboard";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProfileDashboard />
      <Footer />
    </div>
  );
}
