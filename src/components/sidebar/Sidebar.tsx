import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/userSlice';
import useCollection from '../../hooks/useCollection';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  //ノート取得
  const {documents: notes} = useCollection("notes");

  // 新規ノート
  const newNote = async() => {
    let noteTitle: string | null = prompt("新しいノートを作成します");
    if(noteTitle) {
      await addDoc(collection(db, "notes"), {
        noteTitle: noteTitle,
        noteBody: "",
        user: user
      });
    }
  }

  // ログアウト
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    if(window.confirm("ログアウトしますか？")){
      dispatch(logout());
      auth.signOut()
      navigate("/login");
    }
  }

  const toHome = () => {
    navigate(`/${user?.uid}`);
  }

  //サイドバーのアイコン
  const SidebarUserIcon = () => {
    if(user?.photo) {
      return (
        <div className="userIcon" onClick={signOut}>
          <img src={user?.photo} alt=""/>
        </div>
      );
    } else {
      return (
        <div className="userIcon" onClick={signOut}>
          <img src="./149071.png" alt=""/>
        </div>
      );
    }
  }

  return (
    <div className='sidebar'>
      <div className="sidebarLeft">
        <div className="appIcon" onClick={toHome}>
          <MenuBookIcon className='appIconItem'/>
        </div>

        <SidebarUserIcon/>
      </div>

      <div className="sidebarRight">
        <div className="newButton" onClick={newNote}>新規ノート</div>

        <Link to={`/${user?.uid}`} className='home'>ホーム画面</Link>

        <div className="notes">
          <span className='notesText'>すべてのノート</span>
          {notes.map((note) => (
            <Link to={`/${user?.uid}/${note.id}`} className='noteItem' key={note.id}>
              {note.note.noteTitle}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;