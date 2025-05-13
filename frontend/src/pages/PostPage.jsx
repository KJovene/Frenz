import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import LeftSideBar from '../components/LeftSideBar.jsx';
import RightSideBar from '../components/RightSidebar.jsx';
import Postdesign from '../components/Postdesign.jsx';
import EditComment from '../pages/EditComment.jsx';

function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [visibleComments, setVisibleComments] = useState(false);
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');
      const res = await axios.get(`http://localhost:1337/api/post-frenzs/${id}?populate=*`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(res.data.data);
    } catch (err) {
      console.error(err);
      navigate('/');
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
      navigate('/');
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

  const addComment = async (newComment) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:1337/api/comments-frenzs?populate=*`, {
        data: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setCommentaires([...commentaires, res.data.data])
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

  const toggleComments = (postId) => {
    setVisibleComments(prev => !prev);
  };

  // TODO: redirect to 404
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#18181b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9333ea]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">
        <LeftSideBar />
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <Postdesign
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
}

export default PostPage;