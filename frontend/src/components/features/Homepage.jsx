import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../../components/LeftSideBar.jsx';
import RightSideBar from '../../components/RightSidebar.jsx';
import Postdesign from '../../components/Postdesign.jsx';
import EditComment from '../../pages/EditComment.jsx';

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchComments();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');
      await axios.get('http://localhost:1337/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      navigate('/login');
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:1337/api/post-frenzs?populate=author.image&populate=image&populate=savedBy&populate=likedBy&populate=comments_frenzs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:1337/api/comments-frenzs?populate=*', {
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
      await axios.delete(`http://localhost:1337/api/post-frenzs/${postId}`, {
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
      await axios.delete(`http://localhost:1337/api/comments-frenzs/${commentId}`, {
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
      await axios.post(`http://localhost:1337/api/comments-frenzs`, {
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
    <>
      <div className="max-w-[1800px] mx-auto flex gap-6 px-1">
        <LeftSideBar />
        {/* Contenu principal: Les posts */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden">
            {posts.length > 0 ? (
              [...posts].reverse().map((post) => (
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
        <RightSideBar />
      </div>
      {isEditCommentOpen && selectedComment && (
        <EditComment
          comment={selectedComment}
          onClose={() => setIsEditCommentOpen(false)}
          onCommentUpdated={updateCommentInState}
        />
      )}
    </>
  );
};

export default Homepage;