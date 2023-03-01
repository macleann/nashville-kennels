import { useContext } from "react";
import { AnimalContext } from "./AnimalProvider";

export const AnimalSearch = () => {
  const { setSearchTerms } = useContext(AnimalContext);

  return (
    <>
      Animal search:
      <input
        type="text"
        className="input--wide"
        onKeyUp={(evt) => setSearchTerms(evt.target.value)}
        placeholder="Search for an animal..."
      />
    </>
  );
};
