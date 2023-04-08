"use client";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { createEmployee } from "../../services/employee.service";
import { EmployeesContext } from "../../context/employeeContext";
import { IEmployee } from "../../models/employee.model";

function Form() {
  const formInitialState = { id: 0, name: "", salary: 0, age: 18 };
  const { actions, employee } = useContext(EmployeesContext);
  const [formData, setFormData] = useState<IEmployee>(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.id !== 0) {
      actions.updateEmployee(formData);
    } else {
      createEmployee(formData)
        .then((res) => {
          alert(res.message);
          actions.addEmployee(res.data);
        })
        .catch((err) => alert(err));
      console.log(formData);
    }
  };

  const handleReset = () => {
    setFormData(formInitialState);
    actions.setEmployeeForm(formInitialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ID">ID</label>
        {<input type="text" readOnly placeholder={formData.id !== 0? String(formData.id) : ""} />}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          autoComplete="off"
          value={formData.name}
        />
      </div>
      <div>
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="salary"
          onChange={handleChange}
          autoComplete="off"
          value={formData.salary}
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          autoComplete="off"
          value={formData.age}
        />
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleReset}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default Form;
