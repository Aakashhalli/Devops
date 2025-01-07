const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-orange-500 py-8 border-t border-orange-500">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-sm text-[#CED0CE] leading-relaxed">
              We aim to provide high-quality resources and tools to help
              students learn algorithms and data structures visually. Join us in
              making learning interactive and fun!
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm text-[#CED0CE]">
              Email: akashhalli2468@gmail.com
            </p>
            <p className="text-sm text-[#CED0CE]">Phone: +91 7411034037</p>
            <p className="text-sm text-[#CED0CE]">
              Address: KLE Technological University, Belagavi
            </p>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-black transition-all"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>{" "}
                <span className="hidden md:inline">Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-black transition-all"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>{" "}
                <span className="hidden md:inline">Twitter</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-black transition-all"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>{" "}
                <span className="hidden md:inline">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm   pt-4 text-[#CED0CE]">
          <p>
            &copy; {new Date().getFullYear()} AlgoVisual. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
