gsap.registerPlugin(ScrollTrigger)
lucide.createIcons();
// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle")
const themeToggleMobile = document.querySelector(".theme-toggle-mobile")
const body = document.body

function toggleTheme() {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    body.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
  body.classList.remove("dark")
}

themeToggle.addEventListener("click", toggleTheme)
themeToggleMobile.addEventListener("click", toggleTheme)

// Mobile menu toggle
const menuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const menuIcon = document.querySelector(".menu-icon")
const closeIcon = document.querySelector(".close-icon")

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden")
  menuIcon.classList.toggle("hidden")
  closeIcon.classList.toggle("hidden")
})

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll(".mobile-nav-item")
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden")
    menuIcon.classList.remove("hidden")
    closeIcon.classList.add("hidden")
  })
})

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Scroll progress indicator
const scrollIndicator = document.querySelector(".scroll-indicator")
window.addEventListener("scroll", () => {
  const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrollPosition = window.scrollY
  const scrollPercentage = (scrollPosition / totalScroll) * 100
  scrollIndicator.style.width = `${scrollPercentage}%`
})

// Create particles in hero section
const particlesContainer = document.querySelector(".particles-container")
for (let i = 0; i < 50; i++) {
  const particle = document.createElement("div")
  particle.classList.add("particle")

  // Random size between 2px and 6px
  const size = Math.random() * 4 + 2
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`

  // Random position
  particle.style.left = `${Math.random() * 100}%`
  particle.style.top = `${Math.random() * 100}%`

  // Random opacity
  particle.style.opacity = `${Math.random() * 0.5 + 0.3}`

  particlesContainer.appendChild(particle)

  // Animate each particle
  gsap.to(particle, {
    x: `${(Math.random() - 0.5) * 200}`,
    y: `${(Math.random() - 0.5) * 200}`,
    duration: Math.random() * 10 + 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })
}

// Hero animations
gsap.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

gsap.fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 })

// Parallax effect on hero content
gsap.to(".hero-content", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
  y: 200,
  opacity: 0,
})

// Section animations
const sections = [
  { trigger: ".quantum-title", element: ".quantum-title" },
  { trigger: ".quantum-cards", element: ".quantum-card", stagger: 0.2 },
  { trigger: ".quantum-image", element: ".quantum-image" },
  { trigger: ".physics-title", element: ".physics-title" },
  { trigger: ".physics-cards", element: ".physics-card", stagger: 0.2 },
  { trigger: ".research-title", element: ".research-title" },
  { trigger: ".paper-container", element: ".paper-container" },
  { trigger: ".paper-content", element: ".paper-content > *", stagger: 0.1 },
]

sections.forEach((section) => {
  gsap.fromTo(
    section.element,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: section.stagger || 0,
      scrollTrigger: {
        trigger: section.trigger,
        start: "top 80%",
      },
    },
  )
})

// Wave animation on canvas
const canvas = document.getElementById("wave-canvas")
const ctx = canvas.getContext("2d")

function setupCanvas() {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

setupCanvas()
window.addEventListener("resize", setupCanvas)

const waves = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
}

const strokeColor = {
  h: 250,
  s: 50,
  l: 50,
  a: 0.5,
}

let increment = waves.frequency

function animateWaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  ctx.moveTo(0, canvas.height / 2)

  for (let i = 0; i < canvas.width; i++) {
    ctx.strokeStyle = `hsla(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%, ${strokeColor.a})`
    ctx.lineTo(i, waves.y + Math.sin(i * waves.length + increment) * waves.amplitude * Math.sin(increment))
  }

  ctx.stroke()
  increment += waves.frequency

  requestAnimationFrame(animateWaves)
}

animateWaves()
