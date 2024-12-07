"use client";
import { useAppKitAccount } from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Navbar = () => {
  const { isConnected, address } = useAppKitAccount();

  return (
    <nav className="bg-[#F7F3E9] text-black shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">WGS</div>
        <ul className="flex space-x-6">
          <appkit-button className="text-black" />
          {isConnected && (
            <div className="flex ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {address}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Orginization</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {address}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
