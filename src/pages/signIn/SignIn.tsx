import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../../firebase';

import GoogleIcon from '@mui/icons-material/Google';
import "./SignIn.scss";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error.message);
    });
    navigate("/loading");
  }


  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider).catch((err) => {
      alert(err.message);
    });
  }

  return (
    <div className='signIn'>
      <div className="signInCard">
        <form className='signInForm'>
          <p className='loginHeader'>ログイン</p>
          <label className='emailLabel'>メールアドレス</label>
          <input type="email" value={email} required onChange={e => {setEmail(e.target.value)}} />
          <label className='passLabel'>パスワード</label>
          <input type="password" value={password} required onChange={e => {setPassword(e.target.value)}}/>
          <button type='submit' onClick={loginUser}>ログイン</button>
        </form>
        <div className="googleLogin" onClick={signInWithGoogle}>
          <GoogleIcon className='googleIcon'/>
          <p>Googleアカウントでログイン</p>
        </div>
        <p>アカウントの新規作成は<Link to="/signup">こちら</Link></p>
      </div>
    </div>
  )
}

export default SignIn;