"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bug, HelpCircle, MessagesSquare, Shield } from "lucide-react";
import { DiscussionModal } from "./discussion-modal";
import { useAuth } from "@/lib/auth-context";

export function DiscussionBanner() {
  const pathname = usePathname();
  const { isSuperAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDiscussion = () => setIsModalOpen(true);

  return (
    <>
      <div className="bg-neutral-900 border-b border-neutral-800 text-neutral-300 w-full z-40 relative flex flex-col sm:flex-row items-center justify-between px-4 py-2 text-xs md:text-sm shadow-md backdrop-blur-md bg-opacity-90">
        
        {/* Left side: Context */}
        <div className="flex items-center gap-2 font-mono text-neutral-400 mb-2 sm:mb-0">
          <span className="text-red-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
            Alpha
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-neutral-700"></span>
          <span className="truncate max-w-[200px] md:max-w-md">
            {pathname}
          </span>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-4 sm:gap-6 font-medium">
          <span className="hidden md:inline text-neutral-500">
            Internal Dev Tools:
          </span>

          {isSuperAdmin && (
            <Link 
              href="/admin"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Superadmin Control Panel"
            >
              <Shield size={14} className="text-purple-400" />
              <span>Control Panel</span>
            </Link>
          )}
          
          <button 
            onClick={openDiscussion}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="Community Discussion"
          >
            <MessagesSquare size={14} className="text-blue-400" />
            <span>Discuss</span>
          </button>

          <button 
            onClick={openDiscussion}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="Report Bug on this page"
          >
            <Bug size={14} className="text-orange-400" />
            <span>Bug</span>
          </button>

          <button 
            onClick={openDiscussion}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="Ask a Question"
          >
            <HelpCircle size={14} className="text-emerald-400" />
            <span>Q/A</span>
          </button>
        </div>
      </div>

      <DiscussionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pathname={pathname || "/"} 
      />
    </>
  );
}
