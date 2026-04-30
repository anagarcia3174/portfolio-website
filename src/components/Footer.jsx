import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="w-full mt-16 backdrop-blur-sm bg-white/10 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/60 text-sm font-body">
          © {new Date().getFullYear()} Ana Garcia. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          {["home", "skills", "projects", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="capitalize text-white/70 hover:text-[#F05023] transition-colors font-body"
            >
              {id}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/anagarcia17/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[#F05023] transition-colors"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://github.com/anagarcia3174"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[#F05023] transition-colors"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
