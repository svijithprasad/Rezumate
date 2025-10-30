

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import ResumeList from "@/components/dashboard/ResumeList";
import ResumeBuilder from "@/components/dashboard/ResumeBuilder";

export default function Dashboard() {

  return (
    <ResumeList />
  );
}
