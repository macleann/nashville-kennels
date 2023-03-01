import { useContext, useEffect } from "react";
import { EmployeeContext } from "./EmployeeProvider";
import "./Employee.css";
import { Link, useNavigate } from "react-router-dom";

export const EmployeeList = () => {
  const { employees, getEmployees } = useContext(EmployeeContext);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <h2>Employees</h2>
      <button onClick={() => navigate("/employees/hire")}>Hire Employee</button>
      <section className="employees">
        {employees.map((employee) => {
          return (
            <Link
              to={`/employees/detail/${employee.id}`}
              className="employee"
              key={`employee--${employee.id}`}
            >
              {employee.name}
            </Link>
          );
        })}
      </section>
    </>
  );
};
