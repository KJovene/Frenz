import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const RegisterPage = ({ setUser }) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation des champs
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Simulation d'un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'une réponse d'enregistrement réussie
      const mockUser = {
        id: 1,
        username: email.split('@')[0], // Création d'un nom d'utilisateur à partir de l'email
        email: email,
        avatar: null
      };
      
      // Stocker les informations d'authentification
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", "fake-jwt-token");
      
      // Mettre à jour l'état de l'utilisateur dans l'application
      setUser(mockUser);
      
      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      setError("Une erreur est survenue lors de la création du compte. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Inscription"
      buttonLabel="S'inscrire"
      alternativePath="/login"
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;