import { Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import { useEffect, useState } from 'react'
import Favorites from './Favorites';
import Listings from './Listings';
import CarDetail from "./CarDetail";
import Add from './Add';
import Login from './Login';
import Register from './Register';
import AuthCallback from './AuthCallback';
import { AuthProvider } from './AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect (() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme", darkMode ? "dark" : "light"
    );
  }, [darkMode] );

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => 
      prev.includes(id) ? 
        prev.filter((f) => f !== id) : 
        [...prev, id]);
  };

  return (
    <AuthProvider>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path='/' element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} darkMode={darkMode} />} />
        <Route path='/favorites' element={<Favorites favorites={favorites} onToggleFavorite={handleToggleFavorite} darkMode={darkMode} />} />
        <Route path='/listings' element={<Listings favorites={favorites} onToggleFavorite={handleToggleFavorite} darkMode={darkMode} />} />
        <Route path='/cars/:id' element={<CarDetail favorites={favorites} onToggleFavorite={handleToggleFavorite} darkMode={darkMode} />} />
        <Route path='/add' element={<Add />}/>
        <Route path='/add/:id' element={<Add />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/auth/callback' element={<AuthCallback />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
