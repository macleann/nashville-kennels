import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../customer/CustomerProvider";
import { LocationContext } from "../location/LocationProvider";
import { AnimalContext } from "./AnimalProvider";

export const AnimalForm = () => {
  const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { customers, getCustomers } = useContext(CustomerContext);
  const [animal, setAnimal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { animalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers()
      .then(getLocations())
      .then(() => {
        if (animalId) {
          getAnimalById(animalId).then((animal) => {
            setAnimal(animal);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  const handleControlledInputChange = (evt) => {
    const newAnimal = { ...animal };
    newAnimal[evt.target.id] = evt.target.value;
    setAnimal(newAnimal);
  };

  const handleClickSaveAnimal = (evt) => {
    evt.preventDefault();

    if (
      parseInt(animal.locationId) === 0 ||
      parseInt(animal.customerId) === 0
    ) {
      window.alert("Please select a customer and a location");
    } else {
      setIsLoading(true);
      if (animalId) {
        updateAnimal({
          id: animal.id,
          name: animal.name,
          breed: animal.breed,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId),
        }).then(() => navigate(`/animals/detail/${animal.id}`));
      } else {
        const newAnimal = {
          name: animal.name,
          breed: animal.breed,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId),
        };

        addAnimal(newAnimal).then(() => navigate("/animals"));
      }
    }
  };

  return (
    <form className="animalForm">
      {animalId ? (
        <h2 className="animalForm__title">Update {animal.name}</h2>
      ) : (
        <h2 className="animalForm__title">New Animal</h2>
      )}
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal name:</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="Animal name"
            value={animal.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal breed:</label>
          <input
            type="text"
            id="breed"
            required
            autoFocus
            className="form-control"
            placeholder="Animal breed"
            value={animal.breed}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select
            name="locationId"
            id="locationId"
            className="form-control"
            value={animal.locationId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="customerId">Customer: </label>
          <select
            name="customer"
            id="customerId"
            className="form-control"
            value={animal.customerId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(evt) => {
          evt.preventDefault();
          handleClickSaveAnimal(evt);
        }}
      >
        {animalId ? <>Update Animal</> : <>Add Animal</>}
      </button>
    </form>
  );
};
