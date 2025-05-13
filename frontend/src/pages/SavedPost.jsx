import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftSidebar from '../components/LeftSideBar.jsx'
import Postdesign from '../components/Postdesign.jsx'
import EditComment from './EditComment.jsx'
import RightSideBar from '../components/RightSideBar.jsx';
import { API_URL } from '../config.js';
function SavedPost() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([])
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    fetchUserAndSavedPosts();
    fetchComments();
  }, []);

  const fetchUserAndSavedPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const userResponse = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data.id;

      const postsResponse = await axios.get(`${API_URL}/post-frenzs?populate=*`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const saved = postsResponse.data.data.filter(post =>
        post.savedBy?.some(user => user.id === userId)
      );

      setPosts(postsResponse.data.data);
      setSavedPosts(saved); 
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/comments-frenzs?populate=post_frenz`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentaires(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/post-frenzs/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/comments-frenzs/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentaires(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComments = (postId) => {
    setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = async (newComment) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/comments-frenzs`, {
        data: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCommentInState = (updatedComment) => {
    setCommentaires((prevCommentaires) =>
      prevCommentaires.map((comment) =>
        comment.documentId === updatedComment.documentId
          ? { ...comment, commentaire: updatedComment.commentaire }
          : comment
      )
    );
    setIsEditCommentOpen(false);
  };

  return (
    <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">
      <LeftSidebar />
      <div className="flex flex-col items-center w-full">
      <h2>Posts Enregistrés</h2>
        <div className="w-full">
          {savedPosts.length > 0 ? (
            [...savedPosts].reverse().map((post) => (
              <Postdesign
                key={post.id}
                post={post}
                commentaires={commentaires}
                handleDeletePost={handleDeletePost}
                toggleComments={toggleComments}
                visibleComments={visibleComments}
                addComment={addComment}
                editPost={editPost}
                setEditPost={setEditPost}
                handleDeleteComment={handleDeleteComment}
                editComment={editComment}
                setEditComment={setEditComment}
                isEditCommentOpen={isEditCommentOpen}
                setIsEditCommentOpen={setIsEditCommentOpen}
                selectedComment={selectedComment}
                setSelectedComment={setSelectedComment}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun post disponible.</p>
          )}
        </div>
      </div>

      {isEditCommentOpen && selectedComment && (
        <EditComment
          comment={selectedComment}
          onClose={() => setIsEditCommentOpen(false)}
          onCommentUpdated={updateCommentInState}
        />
      )}

      <RightSideBar />
    </div>
  )
}

export default SavedPost