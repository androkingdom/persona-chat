import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/StoreProvider.jsx";
import PageTransitionWrapper from "@/app/components/pages/PageTransitionWrapper.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Persona Chat - Learn with AI Mentors",
  description: "Chat with Hitesh Choudhary and Piyush Garg AI personas",
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <div className="min-h-screen bg-gray-50 overflow-hidden">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </div>
        </body>
      </html>
    </Provider>
  );
}
