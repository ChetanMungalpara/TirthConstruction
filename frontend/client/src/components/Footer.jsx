import {
  Facebook,
  Linkedin,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  const socialIcons = [
    { name: 'Facebook', href: 'https://www.facebook.com/pravinmungalpara.patel/', icon: <Facebook size={16} /> },
    { name: 'Instagram', href: 'https://www.instagram.com/', icon: <FaInstagram size={16} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: <Linkedin size={16} /> },
    { name: 'WhatsApp', href: 'https://www.whatsapp.com/', icon: <FaWhatsapp size={16} /> },
  ];

  return (
    <footer className="bg-[#5c5c5c] text-gray-100 rounded-lg overflow-hidden mt-10">
      {/* Main Footer */}
      <div className="flex flex-col md:flex-row justify-between px-10 py-10 gap-8">
        {/* Useful Links */}
        <div className="w-fit">
          <h3 className="text-base font-semibold text-white mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/contractors" className="hover:text-white transition">Contractors</Link></li>
            <li><Link to="/projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">ContactUs</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div className="w-full md:w-[50%]">
          <h3 className="text-base font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm leading-relaxed mb-4 text-gray-200">
            We are a team of passionate professionals dedicated to transforming the construction industry through innovative solutions. Our mission is to elevate your construction projects and streamline your operations. From groundbreaking technologies to tailored services, we deliver excellence at every step. Partner with us and experience the difference as we build the future together.
          </p>
          <p className="text-sm leading-relaxed text-gray-200">
            Small but mighty, our services are finely tuned to elevate your business. From strategic guidance to hands-on support, we're here to amplify your potential.
          </p>
        </div>

        {/* Connect With Us */}
        <div className="w-fit">
          <h3 className="text-base font-semibold text-white mb-4">Connect with Us</h3>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-300" />
              Contact Us
            </li>
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-300" />
              <a
                href="mailto:tirth.construction.company@gmail.com"
                className="hover:text-white transition"
              >
                tirth.construction.company@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-300" />
              <a
                href="tel:+919724297825"
                className="hover:text-white transition"
              >
                +91 9724297825
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-6 border-t border-gray-400 pt-4 flex space-x-4">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="bg-white text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="bg-[#454545] px-8 py-3 text-sm flex flex-col sm:flex-row justify-between items-center text-gray-200">
        <p>Copyright &copy; {new Date().getFullYear()} Tirth-Construction. All rights reserved</p>
        <select className="bg-[#454545] flex m-1 items-center space-x-1 rounded-[5%]">
          <option>English</option>
          <option>ગુજરાતી</option>
        </select>

      </div>
    </footer>
  );
};

export default Footer;
