import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TradePilot</h3>
            <p className="text-gray-300">
              Connecting buyers with skilled sellers for project collaboration.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Mayankkamriya" className="cursor-pointer text-gray-300 hover:text-white">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/mayank-kamriya/" className="cursor-pointer text-gray-300 hover:text-white">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#bids" className="text-gray-300 hover:text-white">
                  Bids
                </Link>
              </li>
              <li>
                <Link href="/Profile" className="cursor-pointer text-gray-300 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#cookies" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-300">support@TradePilot.com</li>
              <li className="text-gray-300">+91 825 303 8815</li>
              <li className="text-gray-300">73, Alkapuri</li>
              <li className="text-gray-300"> Ratlam (M.P.)</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} TradePilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;