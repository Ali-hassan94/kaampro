import Navbar from "./components/layout/Navbar";
import "./globals.css";
import Footer from "./components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar/>
        
      <body>{children}</body>
      <Footer/>
    </html>
  );
}