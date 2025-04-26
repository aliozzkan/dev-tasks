import UserMenu from "@/features/auth/user-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-8">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="ml-auto flex justify-end items-center gap-4">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
