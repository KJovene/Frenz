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
          navigate('/home');
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
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-lg font-bold mb-4'>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="identifier" className='block text-gray-700'>Identifiant ou Email</label>
            <input type="text" id="identifier" name="identifier" placeholder='Identifiant' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.identifier && <p className='text-red-500'>{errors.identifier}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Mot de passe</label>
            <input type="password" id="password" name="password" placeholder='Mot de passe' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          <button type='submit' className='w-full bg-green-600 text-white py-2'>Se connecter</button>
        </form>
        <div className='text-center'>
          <span>Pas de compte ? </span>
          <Link to='/register' className='text-blue-500'>S'inscrire</Link>
        </div>
      </div>
    </div>
  )
}

export default Login