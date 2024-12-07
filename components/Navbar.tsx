"use client";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect } from "react";

const Navbar = () => {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  useEffect(() => {
    if (!isConnected) {
      open();
    }
  }, []);

  useEffect(() => {}, [address]);
  return (
    <nav className="bg-[#F7F3E9] text-black shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">WGS</div>
        <ul className="flex space-x-6">
          <appkit-button className="text-black" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">sfds</DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Orginization</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">sfds</DialogContent>
          </Dialog>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
