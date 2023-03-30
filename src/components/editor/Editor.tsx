import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-quill/dist/quill.snow.css";
import "./Editor.scss";


export const Editor = () => {
  const user = useAppSelector((state) => state.user.user);
  //ユーザーのノートを全て取得
  const {documents: notes} = useCollection("notes");

  //名前paramsIdにしたいけどなぜか無理そう
  const {id} = useParams();

  const [noteId, setNoteId] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");
  //保存するノートのデータ
  const debouncedTitleData = useDebounce(noteTitle, 1000);
  const debouncedBodyData = useDebounce(noteBody, 1000);
  //自動保存のステータス
  const [backupStatus, setBuckUpStatus] = useState<boolean>(false);
  
  //ページが変わるたびにノートを取得、notesは最初のレンダリング用
  useEffect(()=>{
    notes.map((note) => {
      if(note.id == id) {
        setNoteId(note.id);
        setNoteTitle(note.note.noteTitle);
        setNoteBody(note.note.noteBody);
      }
    });
  },[notes,id]);

  // タイトル又は本文が最後に更新されて一定時間後データ保存
  useEffect(()=>{
    submitNote();
  }, [debouncedTitleData, debouncedBodyData]);
  
  const submitNote = async() => {
    await setDoc(doc(db, "notes", noteId), {
      noteTitle: debouncedTitleData,
      noteBody: debouncedBodyData,
      user: user,
    });
    //保存完了
    setBuckUpStatus(true);
  }

  const BackUp = () => {
    if(backupStatus) return(
      <div className="backupStatus">
        <CloudDoneIcon className='backupStatusButton'/>
        <span className='backupStatusMsg'>保存しました</span>
      </div>
    ); 
    else return (
      <div className="backupStatus">
        <CloudSyncIcon className='backupStatusButton'/>
        <span className='backupStatusMsg'>保存中です...</span>
      </div>
    );
  }

  useEffect(()=>{
    setBuckUpStatus(false);
  },[noteTitle, noteBody])

  // ノート削除
  const nav = useNavigate();
  const deleteNote = async() => {
    if(window.confirm(`削除しますか？この操作は取り消せません。\nノート: 「${noteTitle}」`)){
      await deleteDoc(doc(db, "notes", noteId));
      nav(`/${user?.uid}`);
    }
  }

  return (
    <div className="editor">
      <div className="note-title">
        <input 
          type="text" 
          value={noteTitle} 
          onChange={(e)=>setNoteTitle(e.target.value)}
          className='titleInput'
        />
        <BackUp/>
      </div>
      <hr/>
      <div className='trash'>
        <EditorToolbar />
        <div className='trashButton' onClick={deleteNote}>
          <DeleteIcon className='trashButtonIcon'/>
          <span className='trashButtonText'>ノートを削除</span>
        </div>
      </div>
      <ReactQuill
        theme="snow"
        value={noteBody}
        onChange={setNoteBody}
        placeholder={"入力を開始..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;