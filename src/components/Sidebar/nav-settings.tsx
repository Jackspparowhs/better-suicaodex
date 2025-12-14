"use client";

import { CloudOff } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeCustomizer } from "../Theme/theme-customizer";
import { ContentCustomizer } from "../Theme/content-customizer";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function NavSettings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="gap-2">
        {/* CHANGED: Translated 'Tuỳ chỉnh' */}
        <span>Settings</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <CloudOff size={18} className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            {/* CHANGED: Translated tooltip warning */}
            <p>
              These settings only apply to this device and do not sync with your account!
            </p>
          </TooltipContent>
        </Tooltip>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeCustomizer />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <ContentCustomizer />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
