# Ana Garcia's Developer Portfolio

Welcome to my developer portfolio! This website showcases my skills, projects, and experience in software development. Feel free to explore the different sections to learn more about my work. You can check it out [here!](https://anagarcia.vercel.app/)



## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [License](#license)

## Introduction

Welcome to my developer portfolio! This site is a showcase of my professional journey as a software developer. It features the technologies I work with, the projects I've developed, and the skills I've acquired over time. Feel free to navigate through the sections and check out my projects, including live demos and source code links. If you'd like to get in touch for collaborations or opportunities, don't hesitate to contact me.

## Features

- **Responsive Design:** The portfolio is designed to be accessible and visually appealing across various devices and screen sizes.

- **Skills Section:** Contains a dedicated section to showcase my skills and proficiency in different programming languages, frameworks, and tools.

- **Project Showcase:** Displays my  projects with detailed information including technologies used, project descriptions, and live demo & github links.

- **Contact Form:** An interactive contact form allowing visitors to reach out to me directly.

## Installation
To run this portfolio locally, follow these steps:

1. Clone the repository: `git clone https://github.com/anagarcia3174/portfolio-website.git`

2. Navigate to the project directory: `cd portfolio-website`

3. Install dependencies: `npm install`

4. Add a .env file with your own environment variables (see .env.example for the structure).

5. Start the development server: `npm run dev`

6. Open your browser and visit the url stated in your terminal.

## Technologies Used
- Vite + React: Vite is the build tool that provides fast development and optimized production builds, and React is the JavaScript library used to build the user interface.
- Plain CSS design tokens + inline-styled React components, ported from a Claude Design system (retro desktop-OS look). Icons from Lucide, fonts from Google Fonts.
- EmailJS: powers the contact form.

## Project Structure

The project structure follows a standard React application layout. Key directories include:

- `src/components`: The desktop layout (`Desktop.jsx`), phone layout (`Phone.jsx`), and pieces shared by both (`shared.jsx`).
- `src/data/portfolio.js`: All site content — profile, projects, skills, experience, education, and the resume.
- `src/nocturne`: Design tokens and the UI components (windows, buttons, dock, etc.).
- `src/assets`: Images and the resume PDF.
- `public`: Static assets

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out my developer portfolio! If you have any questions or feedback, feel free to reach out.