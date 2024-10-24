import { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <ol className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
