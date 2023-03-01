import { useState, createContext } from "react";

export const AnimalContext = createContext();

export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const getAnimals = () => {
    return fetch(
      `http://localhost:8088/animals?_expand=location&_expand=customer&_sort=location.id`
    )
      .then((response) => response.json())
      .then(setAnimals);
  };

  const getAnimalById = (animalId) => {
    return fetch(
      `http://localhost:8088/animals/${animalId}?_expand=location&_expand=customer&_sort=location.id`
    ).then((response) => response.json());
  };

  const addAnimal = (animalObj) => {
    return fetch(`http://localhost:8088/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalObj),
    }).then(getAnimals);
  };

  const updateAnimal = (animalObj) => {
    return fetch(`http://localhost:8088/animals/${animalObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalObj),
    }).then(getAnimals);
  };

  const releaseAnimal = (animalId) => {
    return fetch(`http://localhost:8088/animals/${animalId}`, {
      method: "DELETE",
    }).then(getAnimals);
  };

  return (
    <AnimalContext.Provider
      value={{
        animals,
        getAnimals,
        getAnimalById,
        addAnimal,
        updateAnimal,
        releaseAnimal,
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </AnimalContext.Provider>
  );
};
