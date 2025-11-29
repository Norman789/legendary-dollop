import React, { useState } from "react";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });

      const data = await response.json();
      setMessage(`Пост успішно додано! ID: ${data.id}`);

      setTitle("");
      setBody("");
    } catch (error) {
      setMessage("Помилка при додаванні поста!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Додати новий пост</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Текст:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button type="submit">Додати пост</button>
      </form>

      {message && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}
