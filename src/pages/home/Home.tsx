import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Sidebar from '../../components/sidebar/Sidebar';
import NotFound from '../notFound/NotFound';
import "./Home.scss";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const {id} = useParams();
  if(user?.uid != id) {
    return <NotFound/>
  }

  return (
    <div className='home'>
      <Sidebar/>
      <div className='home-p'>
        <p>←ノートを新規作成、または入力を開始</p>
      </div>
    </div>
  )
}

export default Home;