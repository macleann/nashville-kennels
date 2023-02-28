import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"

export const AnimalList = () => {
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    const [filteredAnimals, setFiltered] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAnimals()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return <>
        <h2>Animals</h2>
        <button onClick={
            () => navigate("/animals/create")
        }>
            Add Animal
        </button>
        <section className="animals">
        {
            filteredAnimals.map(animal => {
                return <Link to={`/animals/detail/${animal.id}`} key={`animal--${animal.id}`} className="animal">{animal.name}</Link>
        })
    }
        </section>
    </>
}