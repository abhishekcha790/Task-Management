import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const Form = ({ handleSubmit, handleChange, handleClose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <label htmlFor="name">Title :</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={rest.name}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={rest.description}
        />

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={handleChange}
          value={rest.dueDate}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
