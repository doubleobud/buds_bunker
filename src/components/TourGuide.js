import React, { useEffect, useState } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const TourGuide = ({ steps }) => {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    if (!steps?.length) return;

    const shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' },
        classes: 'shepherd-theme-arrows',
      },
      useModalOverlay: true,
    });

    steps.forEach((step, idx) => {
      shepherd.addStep({
        ...step,
        buttons: [
          ...(idx > 0 ? [{ text: 'Back', action: shepherd.back }] : []),
          ...(idx < steps.length - 1
            ? [{ text: 'Next', action: shepherd.next }]
            : [{ text: 'Done', action: shepherd.complete }]),
        ],
      });
    });

    setTour(shepherd);
    // Expose globally so we can restart from IdentityCenter
    window.profileTour = shepherd;

    if (!localStorage.getItem('tour-profile-seen')) {
      shepherd.start();
      localStorage.setItem('tour-profile-seen', 'true');
    }

    return () => shepherd.cancel();
  }, [steps]);

  return null;
};

export default TourGuide;
