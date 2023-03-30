import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Loading from './components/loading/Loading';
import Note from './pages/note/Note';
import NotFound from './pages/notFound/NotFound';
import './App.css';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  // 通知が来るたびに確認
  useEffect(()=>{
    auth.onAuthStateChanged((loginUser) => {
      if(loginUser) {
        dispatch(login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
        }));
      } else {
        dispatch(logout());
      }
    })
  },[dispatch]);

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={user ? <Navigate to={`/${user.uid}`}/> : <Navigate to="/login"/>}/>
            <Route path='/loading' element={user ? <Navigate to={`/${user.uid}`}/> : <Loading/>}/>
            <Route path='/:id' element={user ? <Home/> : <Loading/>}/>
            <Route path='/:id/:id' element={user ? <Note/> : <Loading/>}/>
            <Route path='/login' element={user ? <Navigate to={`/${user.uid}`}/> : <SignIn/>}/>
            <Route path='/signup' element={user ? <Navigate to={`/${user.uid}`}/> : <SignUp/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
