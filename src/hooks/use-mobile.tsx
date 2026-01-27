
"use client";

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    // Mark component as mounted
    setIsMounted(true)
    
    // Set the initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Create handler for window resize with debounce
    let timeoutId: number | null = null
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, 100) // Reduced from 150ms to 100ms for slightly faster response
    }

    // Add event listener
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Only return the true isMobile value when component is mounted
  // This prevents hydration mismatch issues
  return isMounted ? isMobile : false
}
