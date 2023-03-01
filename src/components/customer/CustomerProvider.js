import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    return fetch(`http://localhost:8088/customers?_embed=animals`)
      .then((response) => response.json())
      .then(setCustomers);
  };

  const addCustomer = (customerObj) => {
    return fetch(`http://localhost:8088/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerObj),
    }).then((response) => response.json());
  };

  return (
    <CustomerContext.Provider value={{ customers, getCustomers, addCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  );
};
