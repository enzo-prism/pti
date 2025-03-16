
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

    // Create handler for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Only return the true isMobile value when component is mounted
  // This prevents hydration mismatch issues
  return isMounted ? isMobile : false
}
