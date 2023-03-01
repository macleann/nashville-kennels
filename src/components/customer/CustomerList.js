import { useContext, useEffect } from "react";
import { CustomerContext } from "./CustomerProvider";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

export const CustomerList = () => {
  const { customers, getCustomers } = useContext(CustomerContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <h2>Customers</h2>
      <section className="customers">
        {customers.map((customer) => {
          return (
            <div className="customer" key={`customer--${customer.id}`}>
              <div className="customer__name line__item">{customer.name}</div>
              <div className="customer__address line__item">
                Address: {customer.address}
              </div>
              <div className="customer__pets line__item">
                Pets:
                <ul>
                  {customer.animals.map((animal) => {
                    return (
                      <li key={`animal--${animal.id}`}>
                        {animal.name}, <i>{animal.breed}</i>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
