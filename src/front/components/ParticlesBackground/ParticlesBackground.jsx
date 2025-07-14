import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export const ParticlesBackground = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);

    const particlesConfig = {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#E6E6FA"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.4,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 2,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#ADD8E6",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    };
    const particlesConfigNebula = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 1200
                }
            },
            "color": {
                "value": ["#E0BBE4", "#957DAD", "#D291BC"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.8,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 100,
                "color": "#C4A7E7",
                "opacity": 0.1,
                "width": 0.5
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                }
            }
        },
        "retina_detect": true
    };
    const particlesConfigNeuralNet = {
        "particles": {
            "number": {
                "value": 70,
                "density": {
                    "enable": true,
                    "value_area": 900
                }
            },
            "color": {
                "value": ["#8BE8FF", "#4FC3F7", "#2196F3"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0
                }
            },
            "opacity": {
                "value": 0.6,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 2.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8BE8FF",
                "opacity": 0.5,
                "width": 1.5
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 0.8
                    }
                }
            }
        },
        "retina_detect": true
    };
    const particlesConfigMysticBubbles = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#BB86FC", "#D0BCFF", "#A020F0"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.3,
                    "opacity_min": 0.2,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "size_min": 1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 150,
                    "size": 10,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                }
            }
        },
        "retina_detect": true
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfigMysticBubbles}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                backgroundColor: "#1a1e2b"
            }}
        />
    );
}