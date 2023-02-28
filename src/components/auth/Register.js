import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomerContext } from "../customer/CustomerProvider"

export const Register = () => {
    const { addCustomer } = useContext(CustomerContext)
    
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        address: ""
    })

    const navigate = useNavigate()

    const handleControlledInputChange = (evt) => {
        const newCustomer = {...customer}
        newCustomer[evt.target.id] = evt.target.value
        setCustomer(newCustomer)
    }

    const handleClickSaveCustomer = (evt) => {
        evt.preventDefault()

        const newCustomer = {
            name: customer.name,
            email: customer.email,
            address: customer.address
        }

        return addCustomer(newCustomer)
            .then(createdCustomer => {
              console.log(createdCustomer)
              if (createdCustomer.hasOwnProperty("id")) {
                localStorage.setItem("kennel_customer", JSON.stringify({
                  id: createdCustomer.id
                }))
              }

              navigate("/")
            })
    }

    const checkForDupes = (evt) => {
      evt.preventDefault()
      return fetch(`http://localhost:8088/customers?email=${customer.email}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            window.alert("Account with that email address already exists")
          } else {
            handleClickSaveCustomer(evt)
          }
        })
    }

    return (
        <form className="customerForm">
          <h2 className="customerForm__title">Register Customer</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Customer name:</label>
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer name" value={customer.name} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="email">Customer address:</label>
              <input type="email" id="email" required autoFocus className="form-control" placeholder="Email address" value={customer.email} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="address">Customer address:</label>
              <input type="text" id="address" required autoFocus className="form-control" placeholder="Customer address" value={customer.address} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={checkForDupes}>
            Register Customer
              </button>
        </form>
      )
}