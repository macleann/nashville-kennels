import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const navigate = useNavigate()

    useEffect(() => {
        getAnimals()
    }, [])

    return <>
        <h2>Animals</h2>
        <button onClick={
            () => navigate("/animals/create")
        }>
            Add Animal
        </button>
        <section className="animals">
        {
            animals.map(animal => {
                return (
                    <div className="animal" key={`animal--${animal.id}`}>
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
            )
        })
    }
        </section>
    </>
}