import { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#9b87f5",
          },
          links: {
            enable: true,
            color: "#9b87f5",
            opacity: 0.5,
          },
          move: {
            enable: true,
            speed: 2,
          },
          size: {
            value: 3,
          },
          opacity: {
            value: 0.7,
          },
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        detectRetina: true,
      }}
    />
  );
};