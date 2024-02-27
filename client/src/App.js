import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    description: "",
    dueDate: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        description: "",
        dueDate: "",
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add User Task
        </button>

        {addSection && (
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Form
            handleSubmit={handleUpdate}
            handleChange={handleEditChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{new Date(el.dueDate).toISOString().split("T")[0]}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
