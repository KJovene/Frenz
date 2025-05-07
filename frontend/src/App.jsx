import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx"
import Homepage from "./components/features/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFoundPage from "./components/features/NotFoundPage.jsx";
import AddPost from "./pages/AddPost.jsx";
import Footer from "./components/Footer.jsx";
import SubFrenz from "./pages/SubFrenz.jsx";
import EditPost from "./pages/EditPost.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";
  const hideFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-base-100">
      {!hideNavbar && <Navbar />}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/post/:thematique" element={<SubFrenz />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        {!hideFooter && <Footer />}
      </footer>
    </div>
  );
}

export default App;