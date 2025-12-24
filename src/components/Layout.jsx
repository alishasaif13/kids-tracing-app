
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200">
      
      {/* Header / Navbar */}
    <Navbar/>

      {/* Page Content */}
      <main className="flex-grow px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
