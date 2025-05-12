import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


import LeftSideBar from '../components/LeftSideBar.jsx';
import RightSideBar from '../components/RightSideBar.jsx';
import Postdesign from '../components/Postdesign.jsx';
import Comments from '../components/Comments.jsx';
import EditComment from './EditComment.jsx';


function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [editPost, setEditPost] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentaires, setCommentaires] = useState([]);

    const fetchPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:1337/api/post-frenzs/${id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setPost(response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du post :', error);
        }
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
            setCommentaires(response.data.data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des commentaires :', error);
        }
    };

    const handleDeletePost = async (postId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:1337/api/post-frenzs/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          navigate('/'); // Navigate back to home after deletion
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du post :', error);
      }
    };

    const handleDeleteComment = async (commentId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:1337/api/comments-frenzs/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCommentaires((prevCommentaires) => 
            prevCommentaires.filter((comment) => comment.id !== commentId)
          );
          await fetchComments(); // Refresh comments after deletion
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
      }
    };

    const addComment = async (newComment) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:1337/api/comments-frenzs', 
            { data: newComment },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if (response.status === 200) {
            setCommentaires((prevCommentaires) => [...prevCommentaires, response.data.data]);
            await fetchComments(); // Refresh comments after adding
          }
        } catch (error) {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);
    
    return (
        <div className="flex gap-9 max-w-1xl mx-auto py-8 pl-0 pr-4">
          <LeftSideBar />

          <div className="h-screen flex flex-col items-center w-full">
            <div className="w-full">
               {post.id && (
                   <Postdesign
                    post={post}
                    commentaires={commentaires}
                    handleDeletePost={handleDeletePost}
                    toggleComments={(id) =>
                    setVisibleComments((prev) => ({ ...prev, [id]: !prev[id] }))
                          }
                    visibleComments={{}}
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
    )}
  </div>
</div>



          <RightSideBar />
        </div>
    )
}

export default PostPage;