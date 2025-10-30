import React from "react";
import Sidebar from "./Sidebar";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        {/* <Sidebar /> */}
        <div className="flex items-center justify-between">
          <Button className="text-xl ">
            {user?.firstName}&apos;s Rezumate
          </Button>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
