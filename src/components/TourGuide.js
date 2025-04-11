import React, { useEffect, useState } from 'react'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'

const TourGuide = () => {
  const [tour, setTour] = useState(null)

  useEffect(() => {
    const shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' },
        classes: 'shepherd-theme-arrows',
      },
      useModalOverlay: true,
    })

    shepherd.addStep({
      id: 'display-name',
      text: 'This is your public display name. You can change it here.',
      attachTo: { element: '[data-tour="display-name"]', on: 'bottom' },
      buttons: [
        {
          text: 'Next',
          action: shepherd.next,
        },
      ],
    })

    shepherd.addStep({
      id: 'stats',
      text: 'Here you can monitor your character’s stats.',
      attachTo: { element: '[data-tour="stats"]', on: 'top' },
      buttons: [
        {
          text: 'Back',
          action: shepherd.back,
        },
        {
          text: 'Next',
          action: shepherd.next,
        },
      ],
    })

    shepherd.addStep({
      id: 'sign-out',
      text: 'Use this button to sign out.',
      attachTo: { element: '[data-tour="sign-out"]', on: 'bottom' },
      buttons: [
        {
          text: 'Back',
          action: shepherd.back,
        },
        {
          text: 'Done',
          action: shepherd.complete,
        },
      ],
    })

    setTour(shepherd)

    if (!localStorage.getItem('tour-profile-seen')) {
      shepherd.start()
      localStorage.setItem('tour-profile-seen', 'true')
    }
  }, [])

  const handleRestart = () => {
    if (tour) tour.start()
  }

  return (
    <div className="text-right mb-4">
      <button onClick={handleRestart} className="btn btn-outline">
        📘 Show Tour Again
      </button>
    </div>
  )
}

export default TourGuide
