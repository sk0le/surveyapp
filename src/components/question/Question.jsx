import React, { useEffect } from "react";
import Confirm from "../buttons/Confirm";
import Choice from "../choice/Choice";
import Error from "../error/Error";
import { useInView } from "react-intersection-observer";
import { useVenue } from "../../hooks/useVenue";
import { MediaViewer } from "../MediaViewer/MediaViewer";

export function Question({
  id,
  title,
  errorText,
  showError,
  subtitle,
  description,
  options,
  type,
  onMakeSelection,
  selectedValues,
  selectedValue,
  attachment,
  superId,
  venueTitle,
  imageUrl,
  videoUrl,
}) {
  const { ref, inView: myElementIsVisible } = useInView({
    threshold: 0.2,
  });
  const { selectedVenues, setHasError } = useVenue();

  useEffect(() => {
    const handle = (e) => {
      console.log(myElementIsVisible, selectedVenues.length);
      if (selectedVenues.length < 2 && myElementIsVisible) {
        e.preventDefault();
        e.stopPropagation();

        // ref.current.scrollIntoView({
        //   behavior: "smooth",
        //   block: "center",
        //   inline: "start",
        // });

        document.body.style.overflow = "hidden";
        setHasError(true);
      }
    };
    window.addEventListener("scroll", handle);

    return () => {
      window.removeEventListener("scroll", handle);
    };
  }, [selectedVenues.length, myElementIsVisible, setHasError, ref]);

  // useEffect(() => {
  //   console.log(id);
  //   if (myElementIsVisible) {
  //     setQuestion(id);
  //   }
  // }, [myElementIsVisible, id, setQuestion]);

  return (
    <section
      ref={ref}
      id={id}
      className="h-screen w-screen flex items-center justify-center relative snap-center"
    >
      <div className="w-1/2 p-24 h-auto flex flex-col justify-between">
        <p className=" text-5xl font-normal  mb-6">{title}</p>
        {subtitle && (
          <p className="text-sm  font-sans text-primarybtn">{subtitle}</p>
        )}

        {description && <p className="text-2xl mb-6">{description}</p>}
        {attachment && <a href={attachment.link}>{attachment.text}</a>}
        <div className="w-64 flex flex-col gap-2">
          {options.map((option) => {
            return (
              <Choice
                key={option.id}
                id={superId ? superId + ":" + option.id : option.id}
                onChange={() => onMakeSelection(option.id)}
                type={type}
                label={option.text}
                listId={option.label}
                name={id}
                isChecked={
                  type === "multi_select"
                    ? selectedValues.includes(option.id)
                    : selectedValue === option.id
                }
              />
            );
          })}
        </div>
        {!showError && <Confirm />}
        <Error text={errorText} visible={showError} />
      </div>
      <div className="w-1/2 flex align-middle justify-center">
        <MediaViewer videoUrl={videoUrl} imageUrl={imageUrl} />
      </div>
    </section>
  );
}
