import { Form, Table } from "./components";
import { EmployeesProvider } from "./context/employeeContext";
import "./App.css";

function App() {
  return (
    <main>
      <EmployeesProvider>
      <h1>Employees table</h1>
        <div >
          <div style={{display: "flex", flexDirection:"row", width: "100%"}}>
            <Table />
            <Form />
          </div>
        </div>
      </EmployeesProvider>
    </main>
  );
}

export default App;
