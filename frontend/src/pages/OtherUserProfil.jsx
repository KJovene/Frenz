import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { User, Settings, MessageSquare, Heart, Users, Award } from 'lucide-react';

function OtherUserProfil() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [postsLoading, setPostsLoading] = useState(true);


    const fetchUser = async () => {
        try {

            const token = localStorage.getItem('token')
            const response = await axios.get(`http://localhost:1337/api/users/${id}?populate=post_frenzs.image&populate=post_frenzs.comments_frenzs&populate=image`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data);
            setLoading(false);
            setPostsLoading(false)
        } catch (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        }
    };
    console.log('Utilisateur récupéré :', user);

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-[#18181b] text-[#ffffff] py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Profil</h1>
                    <p className="text-[#a1a1aa] mb-6">Consultez tous les détails de votre profil ici.</p>
                    <hr className="border-[#3f3f46] mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Profile utilisateur */}
                        <div className="bg-[#27272a] rounded-3xl p-8 flex flex-col">
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative">
                                    {user.image ? (
                                        <img
                                            src={`http://localhost:1337${user.image.url}`}
                                            alt={user.image.alternativeText || 'Photo de profil'}
                                            className="w-40 h-40 rounded-full object-cover border-4 border-[#6b21a8]"
                                        />
                                    ) : (
                                        <div className="w-40 h-40 rounded-full bg-[#3f3f46] flex items-center justify-center">
                                            <User size={64} className="text-[#a1a1aa]" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
                                <p className="text-[#c084fc]">Utilisateur</p>
                            </div>

                            
                        </div>

                        {/* Details */}
                        <div>
                            <div className="bg-[#27272a] rounded-3xl p-6 mb-6">
                                <h3 className="text-xl font-semibold mb-4 flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-[#c084fc] mr-2"></div>
                                    Détails personnels
                                </h3>

                                <div className="flex items-center justify-between p-3 bg-[#18181b] rounded-lg">
                                    <span className="text-[#a1a1aa]">Membre depuis</span>
                                    <span>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#18181b] rounded-lg">
                                    <span className="text-[#a1a1aa]">Status</span>
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                        Actif
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#18181b] rounded-lg">
                                    <span className="text-[#a1a1aa]">Promo</span>
                                    <span>{user.promo ? user.promo : 'Non spécifié'}</span>
                                </div>

                                {/* Statistiques */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-[#c084fc] mr-2"></div>
                                    Statistiques
                                </h3>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-[#18181b] rounded-lg p-3 flex flex-col items-center">
                                        <MessageSquare size={20} className="text-[#c084fc] mb-1" />
                                        <span className="text-lg font-bold">
                                            {user.post_frenzs && user.post_frenzs.length > 0 ? user.post_frenzs.length : "0"}
                                        </span>
                                        <span className="text-[#a1a1aa] text-xs">Posts</span>
                                    </div>

                                    <div className="bg-[#18181b] rounded-lg p-3 flex flex-col items-center">
                                        <Users size={20} className="text-[#c084fc] mb-1" />
                                        <span className="text-lg font-bold">0</span>
                                        <span className="text-[#a1a1aa] text-xs">Abonnés</span>
                                    </div>

                                    <div className="bg-[#18181b] rounded-lg p-3 flex flex-col items-center">
                                        <Award size={20} className="text-[#c084fc] mb-1" />
                                        <span className="text-lg font-bold">
                                            {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))}
                                        </span>
                                        <span className="text-[#a1a1aa] text-xs">Jours</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts de l'utilisateur */}
                <div className="mt-8 bg-[#27272a] rounded-3xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#c084fc] mr-2"></div>
                        Vos posts
                    </h3>

                    {postsLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#9333ea]"></div>
                        </div>
                    ) : user.post_frenzs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.post_frenzs.map(post => (
                                <Link to={`/post/${post.documentId}`}>
                                <div key={post.id} className="bg-[#18181b] rounded-lg p-4 hover:bg-[#3f3f46] transition-colors cursor-pointer">
                                    <h4 className="font-medium">{post.title || 'Sans titre'}</h4>
                                    <p className="text-[#a1a1aa] text-sm truncate">{post.description || 'Pas de description'}</p>
                                    <div className="flex justify-between items-center mt-3 text-[#a1a1aa] text-sm">
                                        <span className="flex items-center">
                                            <Heart size={14} className="mr-1" /> {post.likes || 0}
                                        </span>
                                        <span className="flex items-center">
                                            <MessageSquare size={14} className="mr-1" /> {post.comments_frenzs?.length || 0}
                                        </span>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-[#a1a1aa]">
                            <p>Vous n'avez pas encore publié de posts.</p>
                            <Link to="/addPost" className="mt-4 inline-block bg-[#9333ea] hover:bg-[#6b21a8] text-white px-4 py-2 rounded-full transition-colors">
                                Créer un post
                            </Link>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}

export default OtherUserProfil