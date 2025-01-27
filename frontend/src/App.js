import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importez le fichier CSS

function App() {
    const [pseudo, setPseudo] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3002/posts');
        setPosts(response.data);
    };

    const handlePseudoSubmit = async () => {
        await axios.post('http://localhost:3001/auth/choose-pseudo', { pseudo });
    };

    const handlePostSubmit = async () => {
        await axios.post('http://localhost:3002/post', { pseudo, message });
        setMessage('');
        fetchPosts();
    };

    return (
        <div className="container">
            <h1>Twitter Clone</h1>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Choose a pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />
                <button onClick={handlePseudoSubmit}>Set Pseudo</button>
            </div>
            <div className="input-group">
                <textarea
                    placeholder="Write a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div className="posts">
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <strong>{post.pseudo}</strong>: {post.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;