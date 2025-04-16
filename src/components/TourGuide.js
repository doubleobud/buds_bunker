import React, { useEffect, useState } from 'react'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import { useHistory } from '@docusaurus/router'
import useBaseUrl from '@docusaurus/useBaseUrl'

const TourGuide = ({ steps }) => {
  const [tour, setTour] = useState(null)
  const history = useHistory()
  // Updated baseUrl: point to /docs/chronological-narrative
  const baseUrl = useBaseUrl('/timeline/origin')

  useEffect(() => {
    if (!steps || steps.length === 0) return

    const shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' },
        classes: 'shepherd-theme-arrows',
      },
      useModalOverlay: true,
    })

    steps.forEach((step, index) => {
      shepherd.addStep({
        ...step,
        buttons: getStepButtons(shepherd, index, steps.length),
      })
    })

    setTour(shepherd)

    if (!localStorage.getItem('tour-profile-seen')) {
      shepherd.start()
      localStorage.setItem('tour-profile-seen', 'true')
    }

    return () => {
      shepherd.cancel()
    }
  }, [steps])

  const getStepButtons = (shepherd, index, total) => {
    const buttons = []
    if (index > 0) {
      buttons.push({ text: 'Back', action: shepherd.back })
    }
    if (index < total - 1) {
      buttons.push({ text: 'Next', action: shepherd.next })
    } else {
      buttons.push({ text: 'Done', action: shepherd.complete })
    }
    return buttons
  }

  const handleRestart = () => {
    if (tour) {
      localStorage.removeItem('tour-profile-seen')
      tour.start()
    }
  }

  // Use window.location.href for navigation with a proper base URL.
  const handleContinue = () => {
    window.location.href = baseUrl
  }

  return (
    <div className="text-right mb-4 flex items-center justify-end space-x-2">
      <button
        data-tour="continue-narrative"
        className="btn btn-outline"
        onClick={handleContinue}
        type="button"
      >
        📘 Continue Narrative
      </button>
      <button
        data-tour="show-tour"
        onClick={handleRestart}
        className="btn btn-outline"
        type="button"
      >
        📘 Show Tour Again
      </button>
    </div>
  )
}

export default TourGuide
