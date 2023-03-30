import { collection, DocumentData, onSnapshot, Query, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { db } from '../firebase';

interface Notes {
  id: string,
  note: DocumentData,
}


// ノートコレクションを取得
const useCollection = (data: string) => {
  const user = useAppSelector((state) => state.user.user);

  const [documents, setDocuments] = useState<Notes[]>([]);
  // 自分のノートだけ
  const collectionRef: Query<DocumentData> = query(collection(db, data), where("user", "==", user));

  useEffect(()=>{
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResult: Notes[] = [];
      querySnapshot.docs.forEach((doc)=>
      channelsResult.push({
        id: doc.id,
        note: doc.data(),
      })
      );
      setDocuments(channelsResult);
    })
  },[]);
  
  return {documents};
}

export default useCollection;