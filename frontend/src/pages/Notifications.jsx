import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'comment':
      return (
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      );
    case 'like':
      return (
        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      );
    case 'follow':
      return (
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
      );
    case 'mention':
      return (
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      );
  }
};

const formatTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMs = now - date;
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);

  if (diffInSec < 60) return 'Just now';
  if (diffInMin < 60) return `${diffInMin}m ago`;
  if (diffInHour < 24) return `${diffInHour}h ago`;
  if (diffInDay < 7) return `${diffInDay}d ago`;
  
  return date.toLocaleDateString();
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      user: {
        id: 1,
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: 'a commenté sur votre post "Comment tu as fais ça ? Tu gères trop bien !"',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
      link: '/post/1'
    },
    {
      id: 2,
      type: 'like',
      user: {
        id: 2,
        username: 'janedoe',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      content: 'a aimé votre commentaire dans le post "Recette de cuisine"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      link: '/post/2'
    },
    {
      id: 3,
      type: 'follow',
      user: {
        id: 3,
        username: 'alexsmith',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: 'a commencé à vous suivre',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      link: '/profile/alexsmith'
    },
    {
      id: 4,
      type: 'mention',
      user: {
        id: 4,
        username: 'sarahparker',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      content: 'vous a mentionné dans un commentaire',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      link: '/post/4'
    },
    {
      id: 5,
      type: 'comment',
      user: {
        id: 5,
        username: 'mikeross',
        avatar: 'https://i.pravatar.cc/150?img=6'
      },
      content: 'a répondu à votre commentaire sur "Merci beaucoup pour ton soutien ! Je suis ravi que tu aimes mon travail."',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      link: '/post/5'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      setLoading(false);
    }
  };

  // Notif lu
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Lire tout les notif
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Filtrer notif
  const filteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notif => !notif.read);
      case 'read':
        return notifications.filter(notif => notif.read);
      case 'comments':
        return notifications.filter(notif => notif.type === 'comment');
      case 'likes':
        return notifications.filter(notif => notif.type === 'like');
      case 'follows':
        return notifications.filter(notif => notif.type === 'follow');
      case 'mentions':
        return notifications.filter(notif => notif.type === 'mention');
      default:
        return notifications;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-base-100 rounded-xl shadow-md border border-base-300 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
          </h1>
          <button 
            onClick={markAllAsRead}
            className="btn btn-sm btn-outline"
          >
            Tout marquer comme lu
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-base-300 overflow-x-auto">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Toutes
            </button>
            <button 
              onClick={() => setFilter('unread')} 
              className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Non lues
            </button>
            <button 
              onClick={() => setFilter('comments')} 
              className={`btn btn-sm ${filter === 'comments' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Commentaires
            </button>
            <button 
              onClick={() => setFilter('likes')} 
              className={`btn btn-sm ${filter === 'likes' ? 'btn-primary' : 'btn-ghost'}`}
            >
              J'aime
            </button>
            <button 
              onClick={() => setFilter('follows')} 
              className={`btn btn-sm ${filter === 'follows' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Abonnements
            </button>
            <button 
              onClick={() => setFilter('mentions')} 
              className={`btn btn-sm ${filter === 'mentions' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Mentions
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filteredNotifications().length > 0 ? (
            <ul className="divide-y divide-base-300">
              {filteredNotifications().map((notification) => (
                <li 
                  key={notification.id} 
                  className={`p-4 hover:bg-base-200 transition-colors ${!notification.read ? 'bg-base-200/50' : ''}`}
                >
                  <Link 
                    to={notification.link} 
                    className="flex items-start gap-4"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <NotificationIcon type={notification.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={notification.user.avatar} 
                            alt={notification.user.username} 
                            className="h-5 w-5 rounded-full"
                          />
                          <span className="font-medium">{notification.user.username}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                      </div>
                      <p className="mt-1 text-sm">{notification.content}</p>
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-lg font-medium text-gray-500">Pas de notifications</h3>
              <p className="text-gray-400 mt-1">
                {filter !== 'all' 
                  ? "Aucune notification ne correspond à ce filtre"
                  : "Vous n'avez pas encore de notifications"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;