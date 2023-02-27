import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState([])
    const navigate = useNavigate()

    const handleLogin = (evt) => {
        evt.preventDefault()

        return fetch(`http://localhost:8088/customers?email=${email}`)
            .then(response => response.json())
            .then(foundCustomers => {
                if (foundCustomers.length === 1) {
                    const customer = foundCustomers[0]
                    localStorage.setItem("kennel_customer", JSON.stringify({
                        id: customer.id
                    }))

                    navigate("/")
                } else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Nashville Kennels</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}