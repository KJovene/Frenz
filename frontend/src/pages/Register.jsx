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
  })
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const handleChanges = (e) => {
    setValues ({...values, [e.target.name]: e.target.value})
  }

  console.log(values)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = Validation(values)
    setErrors(validationErrors)
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
      if (err.response.status === 409) {
        setErrors({ ...errors, email: "L'utilisateur existe déjà" })
      }
      console.log(err)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-lg font-bold mb-4'>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="username" className='block text-gray-700'>Pseudo</label>
            <input type="text" id="username" name="username" placeholder='Pseudo' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.username && <p className='text-red-500'>{errors.username}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input type="email" id="email" name="email" placeholder='Email' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Mot de passe</label>
            <input type="password" id="password" name="password" placeholder='Mot de passe' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Mot de passe</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirmez votre mot de passe' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
          </div>
          <button type='submit' className='w-full bg-green-600 text-white py-2'>Valider</button>
        </form>
        <div className='text-center'>
          <span>Déjà un un compte ? </span>
          <Link to='/login' className='text-blue-500'>Se connecter</Link>
        </div>
      </div>
    </div>
  )
}

export default Register