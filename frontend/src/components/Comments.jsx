import React, { useState } from 'react'
import axios from 'axios';
import { API_URL } from '../config';
function Comments({id, onCommentAdded}) {
  const [commentaire, setCommentaire] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Veuillez vous authentifier.');
      return;
    }

    try {

      console.log(id)
      const postData = {
        data: {
          commentaire,
          post_frenz: id,
        },
      };

      const response = await axios.post(`${API_URL}/comments-frenzs`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Réponse du serveur :', response.data);

      setCommentaire('');
      if (onCommentAdded) {
        onCommentAdded(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la création du commentaire :', error.response?.data || error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} required/>
        <button type="submit">Commenter</button>
      </form>
    </>
  )
}

export default Comments;