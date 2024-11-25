// import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar";

export const metadata = {
  title: "TestSavant AI",
  description: "TestSavant AI",
};

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className="font-rubik"
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Navbar children={children}/>
            
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
