import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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