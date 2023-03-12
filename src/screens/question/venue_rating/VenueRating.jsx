import React from "react";
import { useVenue } from "../../../hooks/useVenue";
import { STEP_2_QUESTIONS } from "../../../data/Screens";
import { Instructions } from "../../onboarding";
import { PlaceRating } from "./PlaceRating";
import AppointmentIntroduction from "../../appointment/AppointmentIntroduction";
import AppointmentScheduler from "../../appointment/AppointmentScheduler";
import Note from "../../../components/question/Note";
import { LEAVE_A_NOTE } from "../../../data/Screens";

export function VenueRating() {
  //
  const { selectedVenues, venueRating, setPlaceRating } = useVenue();

  return (
    <div className="h-auto relative snap-center">
      {selectedVenues.map((item) => {
        const venue = STEP_2_QUESTIONS[item].instructions;
        const controlInstructions = STEP_2_QUESTIONS.controlsIntructions;

        return (
          <section key={item} className="relative snap-center">
            <Instructions
              id={item}
              title={venue.title}
              subtitle={venue.subtitle}
              imageUrl={venue.imageUrl}
            />
            <PlaceRating
              places={STEP_2_QUESTIONS[item].places}
              onRatePlace={(placeId, answer) => {
                setPlaceRating(item, placeId, answer);
              }}
              placeRatings={venueRating[item]}
              venueTitle={venue.title}
            />
            <Instructions id={item} title={controlInstructions.text} />
          </section>
        );
      })}
      <AppointmentIntroduction />
      <AppointmentScheduler />
      <Note
        title={LEAVE_A_NOTE.title}
        subtitle={LEAVE_A_NOTE.subtitle}
        id={LEAVE_A_NOTE.id}
        placeholder={LEAVE_A_NOTE.placeholder}
        image={LEAVE_A_NOTE.image}
      />
    </div>
  );
}
