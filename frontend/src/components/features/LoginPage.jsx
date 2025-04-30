import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Simulation d'un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation d'une réponse d'authentification
      const mockUser = {
        id: 1,
        username: "utilisateur_demo",
        email: email,
        avatar: null
      };
      
      // Stocker les informations d'authentification
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", "fake-jwt-token");
      
      // Mettre à jour l'état de l'utilisateur dans l'application
      setUser(mockUser);
      
      // Redirection vers la page d'origine ou vers la page d'accueil
      navigate(from);
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      setError("Email ou mot de passe incorrect. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Drapeau français en SVG inline
  const FrenchFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6.66667" height="14" fill="#0055A4"/>
      <rect x="6.66669" width="6.66667" height="14" fill="white"/>
      <rect x="13.3334" width="6.66667" height="14" fill="#EF4135"/>
    </svg>
  );

  return (
    <AuthLayout
      title="Connexion"
      buttonLabel="Se connecter"
      alternativePath="/register"
      alternativeText="Don't have an account?"
      alternativeLinkText="click here"
    >
      <div className="space-y-4 px-4">
        {error && (
          <div className="bg-red-500 bg-opacity-10 text-red-500 p-3 rounded-lg text-sm mx-auto max-w-xs">
            {error}
          </div>
        )}
        
        <div className="mx-auto max-w-xs">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-black rounded-lg outline-none"
          />
        </div>
        
        <div className="mx-auto max-w-xs">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-black rounded-lg outline-none"
          />
        </div>
        
        <div className="flex mx-auto max-w-xs">
          <div className="bg-black rounded-l-lg flex items-center px-4 py-3">
            <div className="flex items-center">
              <span className="mr-1"><FrenchFlag /></span>
              <span>+33</span>
            </div>
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            className="w-full p-3 bg-black rounded-r-lg outline-none"
          />
        </div>
        
        <div className="text-right mx-auto max-w-xs">
          <button className="text-sm hover:underline">
            Forgot your password?
          </button>
        </div>
        
        <div className="mx-auto max-w-xs">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-[#CCDF5E] text-black font-medium rounded-full hover:bg-opacity-90 transition-colors"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;