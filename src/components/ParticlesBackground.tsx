import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export const ParticlesBackground = () => {
  useEffect(() => {
    console.log("Initializing particles");
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: false,
          },
          size: {
            value: 5,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.6,
            width: 2
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
        },
        retina_detect: true,
      });
      console.log("Particles initialized");
    }
  }, []);

  return null;
};