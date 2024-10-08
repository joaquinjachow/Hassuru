import Navbar from './NavBar'; 
import Footer from './Footer';
import { FaWhatsapp } from 'react-icons/fa'

const Layout = ({ children }) => {
  const whatsappNumber = "3512591212"
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed z-50 p-3 text-white bg-green-500 rounded-full shadow-lg bottom-5 right-5"
      >
        <FaWhatsapp size={32} />
      </a>
      <Footer />
    </div>
  );
};

export default Layout;
