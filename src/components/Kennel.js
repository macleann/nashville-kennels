import "./Kennel.css"
import { NavBar } from "./nav/NavBar.js"
import { ApplicationViews } from "./ApplicationViews.js"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"

export const Kennel = () => (
    <>
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
    </>
)