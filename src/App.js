import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 88 },
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'DBMS', level: 78 },
  { name: 'MySQL', level: 82 },
  { name: 'Linux', level: 70 },
  { name: 'Git', level: 85 },
];

const projects = [
  { name: 'Kounter', description: 'A Basketball Score Counter', image: 'https://m.media-amazon.com/images/I/71MCjwbqzpL.jpg'},
  { name: 'Project Beta', description: 'Blockchain-based decentralized marketplace', image: 'https://placehold.co/600x400' },
  { name: 'Project Gamma', description: 'Real-time collaborative code editor with WebRTC', image: 'https://placehold.co/600x400' },
];

const SocialIcon = ({ children, href }) => (
  <a href={href} className="text-gray-400 hover:text-indigo-500 transition-colors duration-300 group">
    <span className="inline-block w-12 h-12 text-center leading-12 bg-gray-800 rounded-full text-xl group-hover:bg-indigo-600 transition-all duration-300 transform group-hover:rotate-12">
      {children}
    </span>
  </a>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      setActiveSection(entry.target.id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(handleIntersection);
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-40">
        {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`w-3 h-3 mb-4 rounded-full transition-all duration-300 ${
              activeSection === section ? 'bg-indigo-500 scale-150' : 'bg-gray-500 hover:bg-indigo-400'
            }`}
            aria-label={`Navigate to ${section} section`}
          ></a>
        ))}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
              Farzaan Fayaz
            </span>
          </h1>
          <p className="text-2xl mb-8 animate-fade-in-up animation-delay-150">Web Developer Extraordinaire!</p>
          <a 
            href="#about" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 animate-fade-in-up animation-delay-300"
          >
            Discover My Portfolio.
          </a>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-50"></div>
          <div 
            className="w-full h-full bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: "url('https://wallpapers.com/images/hd/dark-blue-plain-i9qpxppg33tuxltq.jpg')" }}
          ></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-indigo-400">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="https://avatars.githubusercontent.com/u/92666402?v=4" alt="Your Name" className="rounded-full w-64 h-64 mx-auto object-cover border-4 border-indigo-500 animate-float" />
            </div>
            <div className="md:w-1/2">
              <p className="text-xl leading-relaxed mb-6 animate-fade-in">
                I'm a visionary web developer with a passion for crafting digital experiences that push the boundaries of what's possible on the web. With expertise in cutting-edge technologies and a keen eye for design, I bring ideas to life through clean, efficient code and stunning user interfaces.
              </p>
              <p className="text-xl leading-relaxed animate-fade-in animation-delay-150">
                My journey in tech has led me to master a diverse set of skills, from front-end frameworks to back-end systems. I thrive on challenges and constantly seek to innovate, believing that the best solutions come from a blend of creativity and technical prowess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-indigo-400">Skills Mastery</h2>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skills}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="level" stroke="#8884d8" strokeWidth={2} dot={{ r: 8 }} activeDot={{ r: 10, stroke: '#FFF', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full animate-skill-progress" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-indigo-400">Signature Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-full">View Project</button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-300">{project.name}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-indigo-400">Let's Connect</h2>
          <p className="text-xl mb-8 animate-fade-in">Ready to start a project or just want to chat? Reach out!</p>
          <div className="flex justify-center space-x-6 mb-12">
            <SocialIcon href="https://github.com/farzaanfayaz7">G</SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/farzaanfayaz7/">in</SocialIcon>
            <SocialIcon href="mailto:farzanfayaz07@gmail.com">@</SocialIcon>
          </div>
          <form className="max-w-lg mx-auto">
            <input type="text" placeholder="Your Name" className="w-full mb-4 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Your Email" className="w-full mb-4 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="Your Message" rows="5" className="w-full mb-4 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-6">
        <p className="text-gray-400">&copy; 2024 Farzaan Fayaz. Crafted with passion and code.</p>
      </footer>
    </div>
  );
}

export default App;