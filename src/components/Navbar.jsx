import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="xxxsm:py-6 relative z-10">
      <div className="xxxsm: mx-xxxsm flex flex-row justify-between">
        <motion.div 
          whileHover={{
            scale: 1.19,
            transition: { duration: 0.4 }
          }}
          >
          <Link to="/"><img src={Logo} alt="logo" className="xxxsm:w-25 h-6"/></Link>  
        </motion.div>
        <RxHamburgerMenu className="xxxsm:text-white text-2xl"/>
      </div>
    </nav>
  )
}

export default Navbar