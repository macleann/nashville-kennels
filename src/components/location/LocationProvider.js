import { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    return fetch(
      `http://localhost:8088/locations?_embed=employees&_embed=animals`
    )
      .then((response) => response.json())
      .then(setLocations);
  };

  const getLocationById = (locationId) => {
    return fetch(
      `http://localhost:8088/locations/${locationId}?_embed=employees&_embed=animals`
    ).then((response) => response.json());
  };

  const addLocation = (locationObj) => {
    return fetch(`http://localhost:8088/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationObj),
    }).then(getLocations);
  };

  const updateLocation = (locationObj) => {
    return fetch(`http://localhost:8088/locations/${locationObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationObj),
    }).then(getLocations);
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations,
        getLocationById,
        addLocation,
        updateLocation,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
