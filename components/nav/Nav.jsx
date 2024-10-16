'use client';
import { HomeIcon, BarsArrowUpIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import User from "@/components/common/User";
const MainNav = () => {
  return (
    <div className="h-screen flex flex-col bg-black p-8 text-white">
      <div className="flex-grow">
        <strong className="block text-3xl mb-5">Time Project.</strong>
        <nav className="space-y-4">
          <a href="/" className="block">
            <div className="flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </div>
          </a>
          <a href="/lines" className="block">
            <div className="flex items-center">
              <BarsArrowUpIcon className="h-5 w-5 mr-2" />
              Lines
            </div>
          </a>
          <a href="/my-lines" className="block">
            <div className="flex items-center">
              <QrCodeIcon className="h-5 w-5 mr-2" />
              My Lines
            </div>
          </a>
        </nav>
      </div>
      <div className="mt-auto">
        <User useUser={useUser}/>
      </div>
    </div>
  );
};

export default MainNav;