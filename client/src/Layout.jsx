import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-40 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content with left margin to avoid overlap */}
      <div className="ml-64 flex-1 min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
