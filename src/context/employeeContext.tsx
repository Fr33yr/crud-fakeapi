"use client";
import { useState, useEffect, createContext, ReactNode } from "react";
import { IEmployee } from "../models/employee.model";
import { getEmployees } from "../services/employee.service";
import { employeesAdapter } from "../utils/employeesAdapter";

type EmployeesContext = {
  data: IEmployee[];
  employee: IEmployee;
  actions: {
    addEmployee: Function;
    removeEmployee: Function;
    updateEmployee: Function;
    setEmployeeForm: Function;
  };
};

const employeesInitialState = {
  data: [],
  employee: {
    id: 0,
    name: "",
    salary: 0,
    age: 18,
  },
  actions: {
    addEmployee: (params: IEmployee) => {},
    removeEmployee: (id: number) => {},
    updateEmployee: (params: IEmployee) => {},
    setEmployeeForm: (params: IEmployee) => {},
  },
};

export const EmployeesContext = createContext<EmployeesContext>(employeesInitialState);

type Children = {
  children: ReactNode;
};

export function EmployeesProvider({ children }: Children) {
  const [employees, setEmployees] = useState<EmployeesContext>({
    data: [],
    employee: {
      id: 0,
      name: "",
      salary: 0,
      age: 18,
    },
    actions: {
      addEmployee: (params: IEmployee) => {
        setEmployees((prevState) => ({
          ...prevState,
          data: [...prevState.data, { ...params }],
        }));
      },
      removeEmployee: (id: number) => {
        setEmployees((prevState) => ({
          ...prevState,
          data: prevState.data.filter((employee) => employee.id !== id),
        }));
      },
      updateEmployee: (params: IEmployee) => {
        setEmployees((prevState) => ({
          ...prevState,
          data: prevState.data.map((employee: IEmployee) =>
            employee.id === params.id ? params : employee
          ),
        }));
      },
      setEmployeeForm: (params: IEmployee) => {
        setEmployees((prevState) => ({
          ...prevState,
          employee: params
        }));
      },
    },
  });

  useEffect(() => {
    getEmployees().then((res: any) => {
      console.log(employeesAdapter(res.data));
      setEmployees({ ...employees, data: employeesAdapter(res.data) });
    });
  }, []);

  return (
    <EmployeesContext.Provider value={employees}>
      {children}
    </EmployeesContext.Provider>
  );
}
