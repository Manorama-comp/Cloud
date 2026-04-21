import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      await axios.post("http://localhost:5000/posts", {
        title,
        content
      });
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE FUNCTION
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Segoe UI"
    }}>
      <div style={{
        width: "400px",
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>📝 Blog App</h2>

        <input
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <button
          onClick={createPost}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          ➕ Add Post
        </button>

        <div style={{ marginTop: "20px" }}>
          <h3>All Posts</h3>

          {posts.map((p) => (
            <div key={p._id} style={{
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px"
            }}>
              <h4>{p.title}</h4>
              <p>{p.content}</p>

              <button
                onClick={() => deletePost(p._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;