import React from 'react';
import { useAppSelector } from '../../app/hooks';
import Editor from '../../components/editor/Editor';
import Sidebar from '../../components/sidebar/Sidebar';
import "./Note.scss";

const Note: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  
  return (
    <div className='note'>
      <Sidebar/>
      <Editor/>
    </div>
  )
}

export default Note;