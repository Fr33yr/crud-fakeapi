"use client";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { createEmployee } from "../../services/employee.service";
import { EmployeesContext } from "../../context/employeeContext";


interface IFormState {
  name: string;
  salary: number;
  age: number;
}

function Form() {
  const formInitialState = { name: "", salary: 0, age: 18 };
  const [formData, setFormData] = useState<IFormState>(formInitialState);
  const {actions} = useContext(EmployeesContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name

    setFormData({...formData, [name]: value})
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createEmployee(formData).then((res) => {
      alert(res.message)
      actions.addEmployee(res.data)
    }).catch(err => alert(err))
    console.log(formData);
  };

  const handleReset = () => {
    setFormData(formInitialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ID">ID</label>
        <input type="text" readOnly />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} autoComplete="off" value={formData.name}/>
      </div>
      <div>
        <label htmlFor="salary">Salary</label>
        <input type="number" name="salary" onChange={handleChange} autoComplete="off" value={formData.salary}/>
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" name="age" onChange={handleChange} autoComplete="off" value={formData.age}/>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleReset}>Clear</button>
      </div>
    </form>
  );
}

export default Form;
