import React, { useState, useEffect } from "react"

const Promo = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check if user has seen the announcement before
    const hasSeenAnnouncement = localStorage.getItem('lehna-announcement-seen')
    const lastVisit = localStorage.getItem('lehna-last-visit')
    const currentTime = Date.now()
    const oneDayInMs = 24 * 60 * 60 * 1000 // 24 hours
    
    // Show announcement if:
    // 1. First time visitor (never seen announcement)
    // 2. Or if it's been more than 24 hours since last visit
    // 3. Or if it's a special promotion period
    const shouldShow = !hasSeenAnnouncement || 
                      !lastVisit || 
                      (currentTime - parseInt(lastVisit)) > oneDayInMs ||
                      isSpecialPromotionPeriod()
    
    if (shouldShow) {
      setIsVisible(true)
    }
    
    // Update last visit time
    localStorage.setItem('lehna-last-visit', currentTime.toString())
  }, [])

  // Check if it's a special promotion period (you can customize this logic)
  const isSpecialPromotionPeriod = () => {
    const now = new Date()
    const month = now.getMonth() + 1 // 1-12
    const day = now.getDate()
    
    // Show during special periods like:
    // - Black Friday (November)
    // - New Year (January 1-7)
    // - Summer Sale (June-July)
    return (
      (month === 11) || // November (Black Friday)
      (month === 1 && day <= 7) || // First week of January
      (month >= 6 && month <= 7) // June-July (Summer Sale)
    )
  }

  const handleClose = () => {
    setIsVisible(false)
    // Mark as seen for this session/period
    localStorage.setItem('lehna-announcement-seen', 'true')
    localStorage.setItem('lehna-announcement-closed-at', Date.now().toString())
  }

  // Don't render on server side or if not visible
  if (!isClient || !isVisible) return null

  return (
    <div className="lehna-topbar">
      <div className="lehna-topbar-content">
        <div className="lehna-topbar-message">
          UdharLo – Rent, Lend & Slay Designer Looks Without Breaking the Bank!
        </div>
        <button
          onClick={handleClose}
          className="lehna-topbar-close"
          aria-label="Close announcement"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Promo
