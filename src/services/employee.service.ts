import { IEmployee } from "../models/employee.model";

const API_URL = {
  GET: "https://dummy.restapiexample.com/api/v1/employees",
  POST: "https://dummy.restapiexample.com/api/v1/create",
  PUT: "https://dummy.restapiexample.com/api/v1/update/21/", //{id}
  DELETE: "https://dummy.restapiexample.com/api/v1/delete/2/", //{id}
};

const getEmployees = async () => {
  try {
    const res = await fetch(API_URL.GET);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

type FormData = {
  name:string,
  salary: number,
  age: number
}

const createEmployee = async (params: FormData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(API_URL.POST, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (params: IEmployee) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${API_URL.PUT}${String(params.id)}`, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (id: number) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${API_URL.PUT}${String(id)}`, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { getEmployees, createEmployee, updateEmployee, deleteEmployee };
