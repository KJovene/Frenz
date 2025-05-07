import { useState, useEffect, useRef } from 'react';
import { Search, MoreHorizontal, Send, Heart, Paperclip, Smile, Camera, Phone, Video, ArrowLeft, User, MessageCircle, Settings, LogOut, ChevronDown, Image, Mic, Bookmark } from 'lucide-react';

const friends = [
  { id: 1, name: 'Ava 🪽', avatar: 'src/assets/images/ava1234.png', online: true, lastSeen: 'now', status: 'Working on new designs' },
  { id: 2, name: 'Nana 🎀', avatar: 'src/assets/images/Snowy.jpg', online: false, lastSeen: '5m ago', status: 'At the coffee shop' },
  { id: 3, name: 'Kevin', avatar: 'src/assets/images/kevinfamily.png', online: true, lastSeen: 'now', status: 'Available' },
  { id: 4, name: 'Giuseppe', avatar: 'src/assets/images/Giuseppe.png', online: false, lastSeen: '1h ago', status: 'In a meeting' },
  { id: 4, name: 'Thomas', avatar: 'src/assets/images/Thomas.jpg', online: false, lastSeen: '1h ago', status: 'In a meeting' },
  { id: 5, name: 'Liam', avatar: 'src/assets/images/liam.jpg', online: true, lastSeen: 'now', status: 'Just chilling' },
  { id: 6, name: 'Brontis Guilloux', avatar: 'src/assets/images/Brontis.png', online: true, lastSeen: 'now', status: 'Photography mode' },
];

const initialMessages = [
  {
    id: 1,
    senderId: 1,
    content: 'Hey! Have you seen that new furniture store downtown?',
    timestamp: '2:32 PM',
    isRead: true
  },
  {
    id: 2,
    senderId: 0,
    content: "No, not yet! What's it like?",
    timestamp: '2:33 PM',
    isRead: true
  },
  {
    id: 3,
    senderId: 1,
    content: "It's amazing! They have these gorgeous minimalist pieces that would be perfect for your living room redesign.",
    timestamp: '2:35 PM',
    isRead: true
  },
  {
    id: 4,
    senderId: 1,
    content: 'I took some pics, want to see?',
    timestamp: '2:35 PM',
    isRead: true
  },
  {
    id: 5,
    senderId: 0,
    content: "Yes please! I've been looking for a new coffee table and some wall art.",
    timestamp: '2:36 PM',
    isRead: true
  },
  {
    id: 6,
    senderId: 1,
    content: "Cool! They had some beautiful abstract wall prints too. I think they'd match your color scheme perfectly!",
    timestamp: '2:38 PM',
    isRead: true
  }
];

function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeFriend = friends.find(friend => friend.id === activeChat);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    if (messages[messages.length - 1]?.senderId === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      id: messages.length + 1,
      senderId: 0,
      content: newMessage,
      timestamp,
      isRead: false
    };
    
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, userMessage];
      
      // Simulate friend response
      setTimeout(() => {
        const friendResponse = {
          id: updatedMessages.length + 1,
          senderId: activeChat,
          content: "That's great! Let's talk more about it soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        setMessages(prev => [...prev, friendResponse]);
      }, 3000);
      
      return updatedMessages;
    });
    
    setNewMessage('');
  };

  const getMessageDate = (index) => {
    if (index === 0) return 'Today';
    // the date 
    return null;
  };

 
  const isFirstInSequence = (index) => {
    if (index === 0) return true;
    return messages[index].senderId !== messages[index - 1].senderId;
  };

 
  const isLastInSequence = (index) => {
    if (index === messages.length - 1) return true;
    return messages[index].senderId !== messages[index + 1].senderId;
  };


  const getBubbleStyle = (message, index) => {
    const isUser = message.senderId === 0;
    const first = isFirstInSequence(index);
    const last = isLastInSequence(index);
    
    let baseClasses = "py-2 px-4 max-w-xs lg:max-w-md";
    
    if (isUser) {
      baseClasses += " bg-purple-600 text-white";
      if (first && last) return `${baseClasses} rounded-2xl rounded-br-none`;
      if (first) return `${baseClasses} rounded-2xl rounded-br-md rounded-bl-md`;
      if (last) return `${baseClasses} rounded-2xl rounded-br-none rounded-tr-md`;
      return `${baseClasses} rounded-2xl rounded-br-md rounded-tr-md rounded-bl-md`;
    } else {
      baseClasses += " bg-[#27272a] text-white";
      if (first && last) return `${baseClasses} rounded-2xl rounded-bl-none`;
      if (first) return `${baseClasses} rounded-2xl rounded-bl-md rounded-br-md`;
      if (last) return `${baseClasses} rounded-2xl rounded-bl-none rounded-tl-md`;
      return `${baseClasses} rounded-2xl rounded-bl-md rounded-tl-md rounded-br-md`;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
    <main className="flex h-screen w-screen bg-[#18181b] text-white overflow-hidden">
    
      {/* Friends Sidebar */}
      <section 
        className={`${showSidebar ? 'w-96' : 'w-0'} transition-all duration-300 border-r border-purple-900/30 overflow-hidden`}
        aria-label="Contacts and recent messages"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative w-10 h-10 bg-purple-600 rounded-full overflow-hidden flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white ml-2">Messages</h2>
            </div>
            <div className="flex space-x-3">
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="Settings">
                <Settings size={18} />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </header>
          
          {/* Search */}
          <div className="bg-[#27272a] rounded-full px-4 py-3 flex items-center mb-4 shadow-sm">
            <Search size={18} className="text-purple-300 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search conversations"
              className="bg-transparent border-none w-full text-base text-white placeholder-purple-300/70 focus:outline-none ml-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search conversations"
            />
          </div>
          
          {/* Friends List */}
          <section className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent" aria-label="Recent messages">
            <div className="flex justify-between items-center py-2 px-1 mb-2">
              <span className="text-xs uppercase tracking-wider text-purple-300/80 font-medium">Recent Messages</span>
              <ChevronDown size={16} className="text-purple-300/80" aria-hidden="true" />
            </div>
            
            <ul>
              {filteredFriends.map((friend) => (
                <li
                  key={friend.id}
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeChat === friend.id 
                      ? 'bg-purple-900/30 shadow-md shadow-purple-900/20' 
                      : 'hover:bg-[#27272a]'
                  }`}
                  onClick={() => setActiveChat(friend.id)}
                  aria-selected={activeChat === friend.id}
                  role="option"
                >
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={`${friend.name}'s avatar`}
                      className="w-14 h-14 rounded-full object-cover shadow-md"
                    />
                    {friend.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#18181b]" aria-label="Online" />
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white truncate text-lg">{friend.name}</span>
                      <span className="text-sm text-purple-300 whitespace-nowrap">{friend.lastSeen}</span>
                    </div>
                    <p className="text-base text-purple-300/90 truncate mt-1">
                      {messages.filter(m => m.senderId === friend.id).slice(-1)[0]?.content || "Start a conversation"}
                    </p>
                  </div>
                  {activeChat !== friend.id && (
                    <span className="w-2 h-2 rounded-full bg-purple-500 ml-1 flex-shrink-0" aria-label="Unread message"></span>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="flex justify-between items-center py-2 px-1 mb-2 mt-6">
              <span className="text-xs uppercase tracking-wider text-purple-300/80 font-medium">All Contacts</span>
              <ChevronDown size={16} className="text-purple-300/80" aria-hidden="true" />
            </div>
          </section>
          
          {/* User Profile */}
          <footer className="mt-4 pt-4 border-t border-purple-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
  <img
    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    alt="User Avatar"
    className="w-full h-full object-cover"
  />
</div>

                <div className="ml-3">
                  <p className="font-medium text-white">Yeremias NJ</p>
                  <p className="text-xs text-purple-300/80">Online</p>
                </div>
              </div>
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="Log out">
                <LogOut size={18} />
              </button>
            </div>
          </footer>
        </div>
      </section>
      
      {/* Chat Area */}
      <section className="flex-1 flex flex-col" aria-label="Chat conversation">
        {/* Chat Header */}
        {activeFriend && (
          <header className="p-4 border-b border-purple-900/30 flex justify-between items-center bg-[#1c1c20]">
            <div className="flex items-center">
              {!showSidebar && (
                <button onClick={() => setShowSidebar(true)} className="mr-3" aria-label="Show sidebar">
                  <MessageCircle size={20} className="text-purple-300" />
                </button>
              )}
              {showSidebar && (
                <button onClick={() => setShowSidebar(false)} className="mr-3 md:hidden" aria-label="Hide sidebar">
                  <ArrowLeft size={20} className="text-purple-300" />
                </button>
              )}
              <div className="relative">
                <img
                  src={activeFriend.avatar}
                  alt={`${activeFriend.name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-600/30"
                />
                {activeFriend.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1c1c20]" aria-label="Online" />
                )}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <h3 className="font-medium text-white text-lg">{activeFriend.name}</h3>
                  <div className="ml-2 px-2 py-0.5 rounded-full bg-purple-900/40 text-sm text-purple-300">
                    {activeFriend.online ? 'Online' : 'Offline'}
                  </div>
                </div>
                <p className="text-sm text-purple-300/80">
                  {activeFriend.online ? activeFriend.status : `Last seen ${activeFriend.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-purple-300 hover:text-purple-200 transition-colors p-3 hover:bg-purple-900/20 rounded-full" aria-label="Voice call">
                <Phone size={20} />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors p-3 hover:bg-purple-900/20 rounded-full" aria-label="Video call">
                <Video size={20} />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors p-3 hover:bg-purple-900/20 rounded-full" aria-label="Bookmark">
                <Bookmark size={20} />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors p-3 hover:bg-purple-900/20 rounded-full" aria-label="More options">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </header>
        )}
        
        {/* Messages */}
        <section className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#1c1c20] to-[#18181b]" aria-label="Message history">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => {
              const dateLabel = getMessageDate(index);
              return (
                <article key={message.id}>
                  {dateLabel && (
                    <div className="flex justify-center my-4">
                      <time className="bg-purple-900/30 text-purple-200 text-xs px-3 py-1 rounded-full">
                        {dateLabel}
                      </time>
                    </div>
                  )}
                  
                  <div className={`mb-1 flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                    {message.senderId !== 0 && isFirstInSequence(index) && (
                      <img
                        src={friends.find(f => f.id === message.senderId)?.avatar}
                        alt={`${friends.find(f => f.id === message.senderId)?.name}'s avatar`}
                        className="w-8 h-8 rounded-full mr-2 self-end mb-1"
                      />
                    )}
                    {message.senderId !== 0 && !isFirstInSequence(index) && (
                      <div className="w-8 mr-2"></div>
                    )}
                    
                    <div
                      className={`${getBubbleStyle(message, index)} ${
                        isLastInSequence(index) ? 'mb-3' : 'mb-1'
                      } animate-fadeIn`}
                    >
                      <p className="text-base">{message.content}</p>
                      <time className="text-right text-xs mt-1 opacity-70">{message.timestamp}</time>
                    </div>
                  </div>
                </article>
              );
            })}
            
            {isTyping && (
              <div className="flex mb-4">
                <img
                  src={activeFriend?.avatar}
                  alt={`${activeFriend?.name}'s avatar`}
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
                <div className="bg-[#27272a] rounded-2xl py-2 px-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </section>
        
        {/* Input Area */}
        <footer className="p-4 border-t border-purple-900/30 bg-[#1c1c20]">
          <div className="flex items-center bg-[#27272a] rounded-full px-5 py-3 shadow-md">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-purple-300 hover:text-purple-200 transition-colors"
              aria-label="Emoji picker"
            >
              <Smile size={24} />
            </button>
            
            <input
              type="text"
              placeholder="   Type a message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-white mx-4 text-base"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              aria-label="Message input"
            />
            
            <div className="flex items-center space-x-3">
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="Attach file">
                <Paperclip size={22} className="rotate-45" />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="Send image">
                <Image size={22} />
              </button>
              <button className="text-purple-300 hover:text-purple-200 transition-colors" aria-label="Voice message">
                <Mic size={22} />
              </button>
              <button 
                onClick={handleSendMessage}
                className={`ml-1 p-3 rounded-full transition-all duration-200 ${
                  newMessage.trim() 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700' 
                    : 'bg-purple-900/50 text-purple-300'
                }`}
                disabled={!newMessage.trim()}
                aria-label="Send message"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
          
          {showEmojiPicker && (
            <div className="absolute bottom-20 right-8 bg-[#27272a] rounded-xl shadow-xl p-2 border border-purple-900/40 w-64 h-48 flex items-center justify-center" role="dialog" aria-label="Emoji picker">
              <div className="text-center text-purple-300/70">
                <Smile size={32} className="mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm">Emoji picker would appear here</p>
              </div>
            </div>
          )}
        </footer>
      </section>
    </main>
    </div>
  );
}

export default Messages;

