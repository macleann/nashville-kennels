import { useState, createContext } from "react"

export const AnimalContext = createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch(`http://localhost:8088/animals?_expand=location&_expand=customer&_sort=location.id`)
            .then(response => response.json())
            .then(setAnimals)
    }

    const addAnimal = (animalObj) => {
        return fetch(`http://localhost:8088/animals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalObj)
        })
            .then(getAnimals)
    }

    return (
        <AnimalContext.Provider value={ {animals, getAnimals, addAnimal} }>
            {props.children}
        </AnimalContext.Provider>
    )
}