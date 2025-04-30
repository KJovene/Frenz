import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Validation from '../assets/RegisterValidation.jsx'

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const handleChanges = (e) => {
    setValues ({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = Validation(values)
    setErrors(validationErrors)
    
    if(Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
          username: values.username,
          email: values.email,
          password: values.password
        })
        if(response.status === 201) {
          navigate('/login')
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors({ ...errors, email: "L'utilisateur existe déjà" })
        }
        console.log(err)
      }
    }
  }

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
            {/* Facebook Icon*/}
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

            {/* Twitter/X Icon */}
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
                {errors.username || errors.email || errors.password || errors.confirmPassword}
              </div>
            )}
            
            <div className="mx-auto max-w-xs">
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={values.username}
                onChange={handleChanges} 
                placeholder="Identifiant" 
                className="w-full p-3 bg-black text-white rounded-lg outline-none font-baloo" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs">
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={values.email}
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
            
            <div className="mx-auto max-w-xs">
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={values.confirmPassword}
                onChange={handleChanges} 
                placeholder="Confirmez votre mot de passe" 
                className="w-full p-3 bg-black text-white rounded-lg outline-none font-baloo" 
                required 
              />
            </div>
            
            <div className="mx-auto max-w-xs">
              <div className="flex w-full bg-black rounded-lg">
                <div className="flex items-center px-4">
                  <span className="mr-1 text-xs">🇫🇷</span>
                  <span className="text-white font-baloo">+33</span>
                </div>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={values.phone}
                  onChange={handleChanges}
                  placeholder="Numéro de téléphone" 
                  className="w-full p-3 bg-black text-white outline-none font-baloo"
                />
              </div>
            </div>
            
            <div className="mx-auto max-w-xs">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-[#CCDF5E] text-black font-medium rounded-full hover:bg-opacity-90 transition-colors font-baloo"
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <div className='text-center mt-8'>
            <p className='text-white font-baloo'>Compte existant?</p>
            <Link to='/login' className='text-white hover:underline mt-1 inline-block font-baloo'>
              C'est par ici !
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register