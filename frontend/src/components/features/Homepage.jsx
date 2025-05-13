import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../../components/LeftSideBar.jsx';
import RightSideBar from '../../components/RightSideBar.jsx';
import Postdesign from '../../components/Postdesign.jsx';
import EditComment from '../../pages/EditComment.jsx';
import { API_URL } from '../../config.js';
const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchComments();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');
      await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      navigate('/login');
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/post-frenzs?populate=author.image&populate=image&populate=savedBy&populate=likedBy&populate=comments_frenzs&pagination[page]=${page}&pagination[pageSize]=5&sort=createdAt:desc`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newPosts = res.data.data;

      setPosts((prevPosts) => {
        const postIds = prevPosts.map((post) => post.id);
        const filteredNewPosts = newPosts.filter((post) => !postIds.includes(post.id));
        return [...prevPosts, ...filteredNewPosts];
      });
      setHasMore(newPosts.length === 5);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/comments-frenzs?populate=*`, {
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchPost();
    }
  }, [page]);


  return (
    <>
      <div className="max-w-[1800px] mx-auto flex gap-6 px-1">
        <LeftSideBar />
        {/* Contenu principal: Les posts */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            {posts.length > 0 ? (
              [...posts].map((post) => (
                <Postdesign
                  key={post.id}
                  post={post}
                  commentaires={commentaires}
                  handleDeletePost={handleDeletePost}
                  toggleComments={toggleComments}
                  visibleComments={visibleComments[post.id]}
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