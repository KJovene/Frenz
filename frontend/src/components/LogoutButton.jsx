import React from 'react'

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };
  return (
    <>
      <button type='submit' className='w-[100px] h-[40px] bg-green-600 text-white py-2 text-xs' onClick={handleLogout}>Se deconnecter</button>
    </>
  )
}

export default LogoutButton
