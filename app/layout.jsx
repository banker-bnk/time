import "./globals.css";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import MainNav from "@/components/nav/Nav";
import Header from "@/components/common/User";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="grid grid-cols-12">
            <div className="col-span-3 relative">
              <MainNav />
            </div>
            <div className="col-span-9 pl-8">
              {/* <Header useUser={useUser} /> */}
              {children}
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
