import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { signIn } from "@/lib/auth";

const Navbar04Page = () => {
  return (
    <nav className="bg-background fixed top-6 inset-x-4 h-16 border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full z-50 shadow-lg">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <Button className="rounded-full">Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar04Page;
