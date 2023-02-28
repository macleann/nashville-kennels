import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Animal.css"
import { AnimalContext } from "./AnimalProvider"

export const AnimalDetail = () => {
    const { animals, releaseAnimal } = useContext(AnimalContext)
    const { animalId } = useParams()
    const [animal, setAnimal] = useState({ location: {}, customer: {} })
    const navigate = useNavigate()

    useEffect(() => {
        if (animals.length > 0) {
            const thisAnimal = animals.find(a => a.id === parseInt(animalId))
            setAnimal(thisAnimal)
        }
    }, [animalId])

    const handleRelease = () => {
        releaseAnimal(animal.id)
            .then(() => navigate("/animals"))
    }

    return <>
        <div className="animal">
            <button onClick={() => {
                navigate(`/animals/edit/${animal.id}`)
            }}>Edit</button>
            <button onClick={handleRelease}>
                Release {animal.name} to {animal.customer.name}
            </button>
            <header className="animal__header line__item">
                { animal.name }
            </header>
            <div className="line__item">
                Breed: { animal.breed }
            </div>
            <div className="line__item">
                Owner: { animal.customer.name }
            </div>
            <footer className="animal__footer line__item">
                Being cared for at { animal.location.name } location
            </footer>
        </div>
    </>
}