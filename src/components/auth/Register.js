import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomerContext } from "./CustomerProvider"

export const Register = () => {
    const { addCustomer } = useContext(CustomerContext)
    
    const [customer, setCustomer] = useState({
        name: "",
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
            address: customer.address
        }

        addCustomer(newCustomer)
            .then(() => navigate("/"))
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
              <label htmlFor="name">Customer address:</label>
              <input type="text" id="address" required autoFocus className="form-control" placeholder="Customer address" value={customer.address} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveCustomer}>
            Register Customer
              </button>
        </form>
      )
}