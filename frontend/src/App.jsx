import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Body from './components/Body'
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleEmailSent = () => setRefreshKey(k => k + 1);

  if (!auth) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        {showSignup ? (
          <>
            <Signup onSignup={() => setShowSignup(false)} />
            <p className="mt-2">Already have an account? <button className="text-blue-500" onClick={() => setShowSignup(false)}>Login</button></p>
          </>
        ) : (
          <>
            <Login onLogin={() => setAuth(true)} onSignup={() => setShowSignup(true)} />
            <p className="mt-2">Don't have an account? <button className="text-blue-500" onClick={() => setShowSignup(true)}>Sign Up</button></p>
          </>
        )}
      </div>
    );
  }

  // If logged in, show the app
  return (
    <>
      <Navbar onLogout={() => setAuth(false)} />
      <Body refreshKey={refreshKey} onEmailSent={handleEmailSent} />
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
      </div>
    </>
  );
};

export default App;
