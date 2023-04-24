import React, { Component } from "react"
import Particles from "react-tsparticles"

class ParticleSettings extends Component {
  render() {
    return (
      <div>
        <Particles
          height="1000px"
          width="100vw"
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#5f9ea0"
              }
            },
            fpslimit: 60,
            interactivity: {
              detect_on: "canvas",
              events: {
                onClick: {
                  enable: "true",
                  mode: "push"
                },
                onHover: {
                  enable: "true",
                  mode: "repulse"
                },
                resize: "true"
              },
              modes: {
                bubble: {
                  distance: 100,
                  duration: 2,
                  opacity: 0.2,
                  size: 20
                },
                push: {
                  quantity: 2
                },
                repulse: {
                  distance: 40,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff"
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.5,
                width: 0.5
              },
              collisions: {
                enable: true
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  value_area: 1400
                },
                value: 80
              },
              opacity: {
                value: 0.2
              },
              shape: {
                type: "circle"
              },
              size: {
                random: true,
                value: 2
              }
            }
          }}
        />
      </div>
    )
  }
}

export default ParticleSettings
