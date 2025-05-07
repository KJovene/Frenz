import React from 'react'
import { useNavigate } from 'react-router-dom';
function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };
  return (
    <>
      <button type='submit' className='w-[100px] h-[40px] bg-green-600 text-white py-2 text-xs' onClick={handleLogout}>Se deconnecter</button>
    </>
  )
}

export default LogoutButton
