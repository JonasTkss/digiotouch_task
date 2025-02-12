"use client";
import { ReactFlowCanvas } from "@/components/canvas/ReactFlowCanvas";
import SideBar from "@/components/sidebar/SideBar";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <SideBar />
      <ReactFlowCanvas />
    </main>
  );
}
