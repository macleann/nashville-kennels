import { Routes, Route } from "react-router-dom";
import { AnimalDetail } from "./animal/AnimalDetail";
import { AnimalForm } from "./animal/AnimalForm";
import { AnimalList } from "./animal/AnimalList";
import { AnimalSearch } from "./animal/AnimalSearch";
import { CustomerList } from "./customer/CustomerList";
import { EmployeeDetail } from "./employee/EmployeeDetail";
import { EmployeeForm } from "./employee/EmployeeForm";
import { EmployeeList } from "./employee/EmployeeList";
import { LocationDetail } from "./location/LocationDetail";
import { LocationForm } from "./location/LocationForm";
import { LocationList } from "./location/LocationList";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/locations" element={<LocationList />} />
        <Route path="/locations/add" element={<LocationForm />} />
        <Route
          path="/locations/detail/:locationId"
          element={<LocationDetail />}
        />
        <Route path="/locations/edit/:locationId" element={<LocationForm />} />
        <Route
          path="/animals"
          element={
            <>
              <AnimalSearch />
              <AnimalList />
            </>
          }
        />
        <Route path="/animals/create" element={<AnimalForm />} />
        <Route path="/animals/detail/:animalId" element={<AnimalDetail />} />
        <Route path="/animals/edit/:animalId" element={<AnimalForm />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/hire" element={<EmployeeForm />} />
        <Route
          path="/employees/detail/:employeeId"
          element={<EmployeeDetail />}
        />
        <Route path="/employees/edit/:employeeId" element={<EmployeeForm />} />
      </Routes>
    </>
  );
};
