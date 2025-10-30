import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "./mode-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { DoorOpen, Loader2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const { user, isLoaded } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-bold text-foreground transition-transform group-hover:scale-105">
                Rezumate
              </span>
              <span className="w-2 h-2 rounded-full bg-primary"></span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground/70"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isLoaded ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:inline-flex cursor-pointer"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="shadow-sm cursor-pointer">
                      Get started
                    </Button>
                  </SignUpButton>
                  <ModeToggle />
                </SignedOut>

                <SignedIn>
                  <Link to={"/dashboard"} className="cursor-pointer">
                    <Button size="sm" className="shadow-sm cursor-pointer">
                      <DoorOpen />
                      Enter
                    </Button>
                  </Link>
                  <UserButton />
                  <ModeToggle />
                </SignedIn>
              </>
            ) : (
              <Loader2 className="animate-spin infinite" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
