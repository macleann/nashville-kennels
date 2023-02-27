import { Routes, Route } from "react-router-dom";
import { AnimalForm } from "./animal/AnimalForm";
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerForm } from "./customer/CustomerForm";
import { CustomerList } from "./customer/CustomerList"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeForm } from "./employee/EmployeeForm";
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { LocationForm } from "./location/LocationForm";
import { LocationList } from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"

export const ApplicationViews = () => {
    return <>
        <AnimalProvider>
        <LocationProvider>
        <CustomerProvider>
        <EmployeeProvider>
            <Routes>
                <Route path="/locations" element={<LocationList />} />
                <Route path="/locations/add" element={<LocationForm />} />
                <Route path="/animals" element={<AnimalList />} />
                <Route path="/animals/create" element={<AnimalForm />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/register" element={<CustomerForm />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/hire" element={<EmployeeForm />} />
            </Routes>
        </EmployeeProvider>
        </CustomerProvider>
        </LocationProvider>
        </AnimalProvider>
    </>
}