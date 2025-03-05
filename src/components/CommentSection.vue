<script setup>
import { ref, onMounted } from "vue";
import { addComment, getComments } from "@/firebase";

const newComment = ref(""); // 사용자가 입력하는 댓글
const comments = ref([]);   // Firestore에서 불러온 댓글 리스트

// Firestore에서 댓글 불러오기
onMounted(() => {
  getComments((data) => {
    comments.value = data;
  });
});

// 댓글 추가 함수
const submitComment = async () => {
  if (newComment.value.trim()) {
    await addComment(newComment.value);
    newComment.value = ""; // 입력창 초기화
  }
};
</script>

<template>
  <div class="comments">
    <h2>댓글</h2>
    <input v-model="newComment" placeholder="댓글을 입력하세요..." />
    <button @click="submitComment">등록</button>

    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.createdAt ? comment.createdAt.toDate().toLocaleString() : "시간 없음" }}</strong>: 
        {{ comment.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.comments {
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
input {
  width: 80%;
  padding: 5px;
  margin-right: 10px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>


<style scoped>
.comments {
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
input {
  width: 80%;
  padding: 5px;
  margin-right: 10px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
