import "./Kennel.css"
import { NavBar } from "./nav/NavBar.js"
import { ApplicationViews } from "./ApplicationViews.js"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationProvider } from "./location/LocationProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"

export const Kennel = () => (
    <>
    <AnimalProvider>
    <LocationProvider>
    <CustomerProvider>
    <EmployeeProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={
                <Authorized>
                    <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                </Authorized>

            } />
	    </Routes>
    </EmployeeProvider>
    </CustomerProvider>
    </LocationProvider>
    </AnimalProvider>
    </>
)