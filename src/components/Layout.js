import Navbar from './NavBar'; 
import Footer from './Footer';
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
  const router = useRouter();
  const showLayout = router.pathname !== '/admin';
  
  return (
    <div>
      {showLayout && <Navbar />}
        <main>
          {children}
        </main>
      {showLayout && <Footer />}
    </div>
  );
};

export default Layout;
