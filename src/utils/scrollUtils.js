// Scroll utility functions for smooth navigation and auto-scroll to sections

export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  })
}

export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export const scrollToSection = (sectionName, offset = 80) => {
  // Common section mappings
  const sectionMap = {
    'features': 'features-section',
    'about': 'about-section',
    'how-it-works': 'how-it-works-section',
    'testimonials': 'testimonials-section',
    'contact': 'contact-section',
    'faq': 'faq-section',
    'download': 'download-section'
  }
  
  const elementId = sectionMap[sectionName] || sectionName
  scrollToElement(elementId, offset)
}

// Hook for auto-scroll on route change
export const useAutoScroll = () => {
  const scrollToTopOnRouteChange = () => {
    // Scroll to top with a slight delay to ensure the component has rendered
    setTimeout(() => {
      scrollToTop()
    }, 100)
  }
  
  return { scrollToTopOnRouteChange }
}

// Hook for section navigation within a page
export const useSectionNavigation = () => {
  const navigateToSection = (section, offset = 80) => {
    scrollToSection(section, offset)
  }
  
  return { navigateToSection }
}

export default {
  scrollToTop,
  scrollToElement,
  scrollToSection,
  useAutoScroll,
  useSectionNavigation
}
