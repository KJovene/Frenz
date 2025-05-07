import React, { useState } from 'react';
import axios from 'axios';

const EditComment = ({ comment, onClose, onCommentUpdated }) => {
  const [updatedComment, setUpdatedComment] = useState(comment.commentaire);

  console.log("comment", comment)

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:1337/api/comments-frenzs/${comment.documentId}`,
        {
          data: {
            commentaire: updatedComment,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onCommentUpdated(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire :', error);
    }

    fetchComments();
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1337/api/comments-frenzs?populate=post_frenz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUpdatedComment(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires :', error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Modifier le commentaire</h2>
        <textarea
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Annuler
          </button>
          <button
            onClick={handleUpdate}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${!updatedComment.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={!updatedComment.trim()} // Désactive le bouton si le champ est vide
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;