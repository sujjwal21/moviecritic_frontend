
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto flex-grow mb-5 mt-5">{children}</div>
      
    </div>
  );
}
