import React, { useState } from 'react';
import axios from 'axios';

const EditComment = ({ comment, onClose, onCommentUpdated }) => {
  const [updatedComment, setUpdatedComment] = useState(comment.commentaire);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:1337/api/comments-frenzs/${comment.documentId}`,
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
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1f1f23] text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-purple-400">Modifier le commentaire</h2>
        <textarea
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#2a2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={4}
        />
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={handleUpdate}
            className={`bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg ${!updatedComment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!updatedComment.trim()}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
