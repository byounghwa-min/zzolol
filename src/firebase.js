import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVwuvwl4OJl_JWzYHno9Y_kDLyWvfX0Is",
    authDomain: "zzolol.firebaseapp.com",
    projectId: "zzolol",
    storageBucket: "zzolol.firebasestorage.app",
    messagingSenderId: "63120194972",
    appId: "1:63120194972:web:b1f4927797abccb7531c59"
  };

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore에 댓글 추가하는 함수 (🚀 수정된 부분)
const addComment = async (text) => {
  await addDoc(collection(db, "comments"), {
    text,
    createdAt: serverTimestamp() // ✅ Firestore가 자동으로 타임스탬프 추가
  });
};

// Firestore에서 댓글 실시간 가져오기
const getComments = (callback) => {
  const q = query(collection(db, "comments"));
  onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(comments);
  });
};

export { addComment, getComments };