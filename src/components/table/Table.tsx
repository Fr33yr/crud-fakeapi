import { useContext } from "react";
import { EmployeesContext } from "../../context/employeeContext";
import { IEmployee } from "../../models/employee.model";
import Row from "../row/Row";

function Table() {
  const { employee, data, actions } = useContext(EmployeesContext);

  return (
    <>
      <table>
        {/* table titles */}
        <tr>
          <th>Name</th>
          <th>Salary</th>
          <th>Age</th>
        </tr>
        {/* table content */}
        {data &&
          data.map((item: any) => (
            <Row props={item} key={`${item.id}-employee`} />
          ))}
      </table>
    </>
  );
}

export default Table;
