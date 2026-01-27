
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{ts,tsx}",
		"./src/app/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#06437A', // Updated primary blue
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#D6EEF0', // Keep existing accent color
					foreground: '#333333'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans: ['var(--font-inter)', 'sans-serif'],
				heading: ['var(--font-montserrat)', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			aspectRatio: {
				'4/3': '4 / 3',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 10px, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(-20px, 0, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 30px, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale3d(0.9, 0.9, 1)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale3d(1, 1, 1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'50%': {
						transform: 'translate3d(0, -10px, 0)'
					}
				},
				'parallax-slow': {
					'0%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'100%': {
						transform: 'translate3d(0, -50px, 0)'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'reveal-text': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 20px, 0) rotateX(90deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0) rotateX(0deg)'
					}
				},
				// Hero Text Animations
				'text-reveal': {
					'0%': { 
						opacity: '0', 
						transform: 'translate3d(0, 30px, 0) rotateX(90deg)',
						transformOrigin: 'center bottom'
					},
					'100%': { 
						opacity: '1', 
						transform: 'translate3d(0, 0, 0) rotateX(0deg)',
						transformOrigin: 'center bottom'
					}
				},
				'char-reveal': {
					'0%': { 
						opacity: '0', 
						transform: 'translate3d(0, 20px, 0) scale(0.8)',
						filter: 'blur(10px)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'translate3d(0, 0, 0) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'cursor-blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'word-slide': {
					'0%': { 
						opacity: '0', 
						transform: 'translate3d(-20px, 0, 0) scale(0.95)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'translate3d(0, 0, 0) scale(1)'
					}
				},
				// Interactive Effects
				'particle-drift': {
					'0%': { transform: 'translate3d(-100vw, 0, 0)' },
					'100%': { transform: 'translate3d(100vw, -20px, 0)' }
				},
				'magnetic-hover': {
					'0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
					'100%': { transform: 'translate3d(var(--mouse-x, 0), var(--mouse-y, 0), 0) scale(1.05)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.8)',
						transform: 'scale(1.02)'
					}
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'scale(4)', 
						opacity: '0' 
					}
				},
				// Background Animations
				'mesh-morph': {
					'0%, 100%': { 
						transform: 'rotate(0deg) scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'33%': { 
						transform: 'rotate(120deg) scale(1.1)',
						filter: 'hue-rotate(60deg)'
					},
					'66%': { 
						transform: 'rotate(240deg) scale(0.9)',
						filter: 'hue-rotate(120deg)'
					}
				},
				'shape-rotate': {
					'0%': { transform: 'rotate(0deg) translate3d(100px, 0, 0) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translate3d(100px, 0, 0) rotate(-360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Enhanced scroll reveal animations
				'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-in': 'slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-up-subtle': 'slide-up-subtle 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-up-strong': 'slide-up-strong 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-down': 'slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-left': 'slide-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-right': 'slide-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				
				// New elegant animations
				'scale-elegant': 'scale-elegant 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'blur-reveal': 'blur-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'elastic-bounce': 'elastic-bounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'soft-bounce': 'soft-bounce 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'parallax-float': 'parallax-float 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'magnetic-rise': 'magnetic-rise 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'morphing-reveal': 'morphing-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				
				// Background and interactive animations  
				'float': 'float 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
