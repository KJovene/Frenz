import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  const client = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_TOKEN}`,
    },
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.get("/sub-frenzs");

        if (response.data && response.data.data) {
          setArticles(response.data.data);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
          </div>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
}

export default App;