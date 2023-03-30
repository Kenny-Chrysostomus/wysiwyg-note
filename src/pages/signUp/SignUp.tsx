import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import "./SignUp.scss";

import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../../firebase';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const createUser = () => {
    if(password !== passwordConfirmation) {
      console.log("パスワードが一致しません");
    }else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        alert(error.message);
      });
      navigate("/loading");
    }
  }

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider).catch((err) => {
      alert(err.message);
    });
  }

  return (
    <div className='signUp'>
      <div className="signUpCard">
        <form className='signUpForm'>
          <p className='signUpHeader'>新規登録</p>
          <label className='emailLabel'>メールアドレス</label>
          <input type="email" value={email} required onChange={e => {setEmail(e.target.value)}}/>
          <label className='passLabel'>パスワード</label>
          <input type="password" value={password} required onChange={e => {setPassword(e.target.value)}}/>
          <label className='passConfLabel'>パスワード確認用</label>
          <input type="password" value={passwordConfirmation} required onChange={e => {setPasswordConfirmation(e.target.value)}}/>
          <button type='submit' onClick={createUser}>新規登録</button>
        </form>
        <div className="googleSignUp" onClick={signInWithGoogle}>
          <GoogleIcon className='googleIcon'/>
          <p>Googleアカウントで登録</p>
        </div>
        <p>ログインは<Link to="/login">こちら</Link></p>
      </div>
    </div>
  )
}

export default SignUp;