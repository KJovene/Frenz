import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../../components/LeftSideBar.jsx';
import RightSideBar from '../../components/RightSideBar.jsx';
import Post from '../../components/Post.jsx';
import Comments from '../../components/Comments.jsx';
import EditComment from '../../pages/EditComment.jsx';


const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});

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
      const res = await axios.get('http://localhost:1337/api/post-frenzs?populate=*', {
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
      const res = await axios.get('http://localhost:1337/api/comments-frenzs?populate=post_frenz', {
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

  const toggleComments = (postId) => {
    setVisibleComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">
      <LeftSideBar />

      <div className="flex flex-col items-center w-full">
        <div className="w-full">
          {posts.length > 0 ? (
            [...posts].reverse().map((post) => (
              <Post
                key={post.id}
                post={post}
                commentaires={commentaires}
                handleDeletePost={handleDeletePost}
                toggleComments={toggleComments}
                visibleComments={visibleComments}
                addComment={addComment}
                editPost={editPost}
                setEditPost={setEditPost}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun post disponible.</p>
          )}
        </div>
      </div>

      <RightSideBar />
    </div>
  );
};

export default Homepage;
