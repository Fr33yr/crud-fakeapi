import { useContext } from "react";
import { EmployeesContext } from "../../context/employeeContext";
import { IEmployee } from "../../models/employee.model";

interface Props {
  props: IEmployee
}

function Row({ props }: Props) {
  const { actions } = useContext(EmployeesContext);

  const hanleDelete = (id: number) => {
    if (id) {
      actions.removeEmployee(id);
    }
  };

  const hanldeEdit = (props: IEmployee) => {
    actions.setEmployeeForm(props)
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.salary}</td>
      <td>{props.age}</td>
      <td>
        <button type="button" onClick={() => hanldeEdit(props)}>
          Edit
        </button>
        <button type="button" onClick={()=> hanleDelete(props.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Row;
