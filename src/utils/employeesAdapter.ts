import { IEmployee } from "../models/employee.model";

type APIEmployee = {
    id: number,
    employee_name: string,
    employee_salary: number,
    employee_age: number,
}

export const employeesAdapter = (arr: any) => {
    const data = arr && arr.map((employee:APIEmployee) => {
        return {
            id: employee.id,
            name: employee.employee_name,
            salary: employee.employee_salary,
            age: employee.employee_age,
        }
    }) as IEmployee

    return data
}