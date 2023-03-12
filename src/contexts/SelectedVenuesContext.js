import React, { createContext, useState, useEffect } from "react";
import { INITIAL_PLACES_RANKING } from "../data/Screens";

export const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [venueRating, setVenueRating] = useState(INITIAL_PLACES_RANKING);
  const [section, setSection] = useState("onboarding");
  const [question, setQuestion] = useState("");
  const [venueAvailability, setVenueAvailability] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [note, setNote] = useState("");

  const handleErrorChange = (b) => setHasError(b)

  // handle date input
  function handleDayChange(event) {
    setDay(event.target.value);
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }
  function handleNoteChange(event) {
    setNote(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  const handleOptionChange = (event) => {
    setVenueAvailability(event.target.value);
  };

  // const tryNavigation = useCallback((event) => {
  //   const scrollPosition = window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const maxScrollPosition = document.body.scrollHeight - windowHeight;
  //   const delta = event.deltaY;
  //   const scrollAmount =
  //     delta > 0
  //       ? Math.min(maxScrollPosition - scrollPosition, windowHeight)
  //       : Math.max(-scrollPosition, -windowHeight);

  //   if (question === "__select_venue__" && scrollAmount > 0) {
  //     event.preventDefault()
  //     console.log(question, "question");
  //     // check that venue has been selected before going forward
  //     if (selectedVenues.length < 2) {
  //       setHasError(true);
  //       return false;
  //     }
  //   } else if (question && scrollAmount > 0) {
  //     event.preventDefault()
  //     if (!venueRating[section][question]) {
  //       setHasError(true);
  //       return false;
  //     }
  //   }

  //   return true;

  // }, [question, section, selectedVenues.length, venueRating])

  useEffect(() => {

    // window.addEventListener("wheel", tryNavigation, { passive: false });
    // return () => {
    //   window.removeEventListener("wheel", tryNavigation, { passive: false });
    // };
  }, []);

  // useEffect(() => {
  //   const handle = (e) => {
  //     console.log(question)
  //     if (selectedVenues.length < 2 && question === "__select_venue__") {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //   };
  //   document.addEventListener("scroll", handle);

  //   return () => {
  //     document.removeEventListener("scroll", handle);
  //   };
  // }, [question, selectedVenues.length]);




  const scrollDown = () => {
    if (question === "__select_venue__") {
      console.log(question, "question");
      // check that venue has been selected before going forward
      if (selectedVenues.length < 2) {
        setHasError(true);
        return false;
      }
    } else if (question) {
      if (!venueRating[section][question]) {
        setHasError(true);
        return false;
      }
    }
    window.scrollBy(0, window.innerHeight); // scroll down by 100vh
  };

  const scrollUp = () => {
    window.scrollBy(0, -window.innerHeight); // scroll up by 100vh
  };

  return (
    <VenuesContext.Provider
      value={{
        selectedVenues,
        setSelectedVenues,
        hasError,
        setHasError,
        venueRating,
        setVenueRating,
        section,
        setSection,
        question,
        setQuestion,
        scrollDown,
        scrollUp,
        venueAvailability,
        handleOptionChange,
        handleDayChange,
        handleMonthChange,
        handleYearChange,
        handleNoteChange,
        day,
        month,
        year,
        note,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};
