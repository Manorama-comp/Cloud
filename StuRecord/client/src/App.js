import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    course: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5001/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD OR UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5001/students/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5001/students", form);
    }

    setForm({ name: "", rollNo: "", course: "" });
    fetchStudents();
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      rollNo: student.rollNo,
      course: student.course
    });
    setEditId(student._id);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5001/students/${id}`);
    fetchStudents();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #43cea2, #185a9d)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Segoe UI"
    }}>
      <div style={{
        width: "450px",
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>🎓 Student Record System</h2>

        {/* Form */}
        <input name="name" placeholder="Name"
          value={form.name} onChange={handleChange} style={inputStyle} />

        <input name="rollNo" placeholder="Roll No"
          value={form.rollNo} onChange={handleChange} style={inputStyle} />

        <input name="course" placeholder="Course"
          value={form.course} onChange={handleChange} style={inputStyle} />

        <button onClick={handleSubmit} style={btnStyle}>
          {editId ? "✏️ Update Student" : "➕ Add Student"}
        </button>

        {/* List */}
        <h3 style={{ marginTop: "20px" }}>All Students</h3>

        {students.map((s) => (
          <div key={s._id} style={cardStyle}>
            <h4>{s.name}</h4>
            <p>Roll: {s.rollNo}</p>
            <p>Course: {s.course}</p>

            <button onClick={() => editStudent(s)} style={editBtn}>
              Edit
            </button>

            <button onClick={() => deleteStudent(s._id)} style={delBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#185a9d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px"
};

const cardStyle = {
  background: "#f9f9f9",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "10px"
};

const editBtn = {
  background: "orange",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  marginRight: "5px"
};

const delBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px"
};

export default App;