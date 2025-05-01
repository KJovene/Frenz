import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Validation from '../assets/LoginValidation.jsx'

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

function Login() {
  const [values, setValues] = useState({
    identifier: '',
    password: ''
  })
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})


  const handleChanges = (e) => {
    setValues ({...values, [e.target.name]: e.target.value})
  }


const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: values.identifier,
          password: values.password,
        });
  
        if (response.status === 200) {
          localStorage.setItem('token', response.data.jwt); 
          navigate('/');
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setErrors({ ...errors, identifier: "L'identifiant ou le mot de passe est incorrect" });
        } else if (err.response && err.response.status === 404) {
          setErrors({ ...errors, identifier: "L'utilisateur n'existe pas" });
        } else if (err.response && err.response.status === 500) {
          setErrors({ ...errors, identifier: "Erreur serveur" });
        }
        console.error(err);
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#171717]'>
      <div className='flex w-full max-w-5xl overflow-hidden rounded-xl'>

        {/* Image Section */}
        <div className='relative w-1/2 hidden md:block'>
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=2073" 
            alt="Nature explorer" 
            className='h-full w-full object-cover'
          />
          <div className='absolute bottom-0 left-0 p-12 text-white'>
            <h2 className='text-5xl font-bold mb-2 font-baloo'>Just post it !</h2>
            <p className='text-2xl font-baloo'>And discover the world around you</p>
          </div>
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 bg-[#272626] p-12 flex flex-col items-center justify-center rounded-r-xl'>
          <h1 className='text-4xl font-bold text-white mb-8 text-center font-baloo'>Frenz</h1>
          
          <div className='flex justify-center mb-8 space-x-6'>
            {/* Facebook Icon */}
            <a href="#" className='text-white'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none"/>
              <text x="9" y="18" fill="white" font-family="Arial" font-weight="bold" font-size="18">f</text>
            </svg>
            </a>

            {/* Instagram Icon */}
            <a href="#" className='text-white'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Twitter Icon */}
            <a href="#" className='text-white'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
          
          <p className='text-white text-center mb-8 font-baloo'>Ou alors avec ton email !</p>
          
          <div className="space-y-4 px-4 w-full">
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-500 bg-opacity-10 text-red-500 p-3 rounded-lg text-sm mx-auto max-w-xs font-baloo">
                {errors.identifier || errors.password}
              </div>
            )}
            
            <div className="mx-auto max-w-xs">
              <input 
                type="text" 
                id="identifier" 
                name="identifier" 
                value={values.identifier}
                onChange={handleChanges} 
                placeholder="Email" 
                className="w-full p-3 bg-black text-white rounded-lg outline-none font-baloo" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs">
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={values.password}
                onChange={handleChanges} 
                placeholder="Mot de passe" 
                className="w-full p-3 bg-black text-white rounded-lg outline-none font-baloo" 
                required 
              />
            </div>
            
            <div className="text-right mx-auto max-w-xs">
              <button className="text-sm hover:underline text-white font-baloo">
                Mot de passe oublié?
              </button>
            </div>
            
            <div className="mx-auto max-w-xs">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-[#CCDF5E] text-black font-medium rounded-full hover:bg-opacity-90 transition-colors font-baloo"
              >
                Se connecter
              </button>
            </div>
          </div>
          
          <div className='text-center mt-8'>
            <p className='text-white font-baloo'>Pas encore de compte?</p>
            <Link to='/register' className='text-white hover:underline mt-1 inline-block font-baloo'>
              C'est par ici !
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login