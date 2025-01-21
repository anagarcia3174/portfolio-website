import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import DownArrow from "./components/DownArrow";
import Projects from "./components/Projects";
import commentsLogo from './assets/comments.png';
import folioLogo from './assets/folio.png';
import chasingTimeLogo from './assets/chasingTime.png';
import ContactForm from "./components/ContactForm";

function App() {
  const projects = [
    {
      name: "Comments!",
      about:
        "Movie companion web app with timestamp-specific commenting, allowing users to post and view comments on movies at specific timestamps. Features real-time database integration, TMDB API integration, and Firebase Authentication.",
      link: "https://movie-app-client-seven.vercel.app/",
      github: "https://github.com/anagarcia3174/movie-app",
      stack: [
        "React",
        "Firebase",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
      ],
      image: commentsLogo
    },
    {
      name: "Folio",
      about:
        "Mobile app connecting service-based professionals with local clients, featuring robust authentication, real-time messaging, and location-based portfolio discovery",
      link: "",
      github:
        "https://github.com/UTRGV-CSCI-Senior-Project/senior_final_project",
      stack: ["Flutter", "Firebase", "Dart"],
      image: folioLogo
    },
    {
      name: "Chasing Time",
      about:
        "Endless runner game featuring procedural generation, optimized object pooling, and dynamic player animations. Awarded top 3 out of all games in the UTRGV Game Dev course in Spring 2024.",
      link: "https://play.unity.com/en/games/1ad98862-c125-4a72-91dc-cf366fe2f2d5/chasing-time",
      github: "",
      stack: ["C#", "Unity"],
      image: chasingTimeLogo,
    },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-500 via-orange-500 to-gray-500 flex flex-col overflow-y-auto">
      <Navbar />
      <section id="home"></section>
      <Hero id="home"/>
      <section id="skills"></section>
      <DownArrow />
      <Skills />
      <section id="projects"></section>
      <DownArrow />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {projects.map((project) => (
          <Projects
            key={project.name}
            name={project.name}
            about={project.about}
            link={project.link}
            github={project.github}
            stack={project.stack}
            image={project.image}
          />
        ))}
      </div>
      <section id="contact"></section>
      <DownArrow />
      <ContactForm id = "contact"/>
    </div>
  );
}

export default App;
