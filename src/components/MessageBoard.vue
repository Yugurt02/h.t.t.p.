<template>
  <div class="whiteboard">
    <!-- 添加标题区域 -->
    <div class="flex-none border-[#222222] mb-8">
      <h1 class="mb-4 px-4 font-black text-[clamp(3rem,8vw,10rem)] leading-[0.8] tracking-tight">
        Message
        <span class="block text-[clamp(1.5rem,4vw,5rem)]">Discussion Board</span>
      </h1>
    </div>

    <!-- 便签区域 -->
    <div class="notes-container">
      <div 
        v-for="(note, index) in notes" 
        :key="index"
        class="note"
        :style="{ 
          left: note.x + 'px', 
          top: note.y + 'px'
        }"
        @mousedown="startDrag($event, index)"
      >
        <div class="note-header">
          <div class="drag-handle">⋮⋮</div>
          <button class="delete-btn" @click="deleteNote(index)">×</button>
        </div>
        <div class="note-content">{{ note.content }}</div>
        <div class="note-footer">
          <div class="note-time">{{ note.time }}</div>
          <div class="note-actions">
            <button 
              class="action-btn" 
              :class="{ active: note.userVote === 'up' }"
              @click="handleVote(index, 'up')"
            >
              ↑ {{ note.upvotes }}
            </button>
            <button 
              class="action-btn" 
              :class="{ active: note.userVote === 'down' }"
              @click="handleVote(index, 'down')"
            >
              ↓ {{ note.downvotes }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加便签的表单 -->
    <div class="input-form">
      <input
        v-model="newNote"
        placeholder="分享你的观察和故事..."
        @keydown.enter="addNote"
      />
      <button @click="addNote">发布</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const notes = ref([]);
const newNote = ref('');

let isDragging = false;
let currentNote = null;
let startX = 0;
let startY = 0;

const getRandomPosition = () => {
  const margin = 50;
  return {
    x: margin + Math.random() * (window.innerWidth - 300 - margin * 2),
    y: margin + Math.random() * (window.innerHeight - 200 - margin * 2)
  };
};

const addNote = () => {
  if (newNote.value.trim()) {
    const position = getRandomPosition();
    notes.value.push({
      content: newNote.value,
      x: position.x,
      y: position.y,
      time: new Date().toLocaleString(),
      upvotes: 0,
      downvotes: 0,
      userVote: null
    });
    newNote.value = '';
    saveNotes();
  }
};

const handleVote = (index, type) => {
  const note = notes.value[index];
  
  // 如果已经投过相同的票，则取消投票
  if (note.userVote === type) {
    note.userVote = null;
    if (type === 'up') note.upvotes--;
    else note.downvotes--;
  }
  // 如果投过相反的票，则转换票型
  else if (note.userVote) {
    if (type === 'up') {
      note.upvotes++;
      note.downvotes--;
    } else {
      note.downvotes++;
      note.upvotes--;
    }
    note.userVote = type;
  }
  // 如果还没投过票
  else {
    note.userVote = type;
    if (type === 'up') note.upvotes++;
    else note.downvotes++;
  }
  
  saveNotes();
};

// 开始拖拽
const startDrag = (event, index) => {
  if (event.target.className === 'delete-btn') return;
  
  isDragging = true;
  currentNote = index;
  const note = event.currentTarget;
  const rect = note.getBoundingClientRect();
  
  startX = event.clientX - rect.left;
  startY = event.clientY - rect.top;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

// 拖拽中
const onDrag = (event) => {
  if (!isDragging) return;
  
  const x = event.clientX - startX;
  const y = event.clientY - startY;
  
  notes.value[currentNote].x = Math.max(0, Math.min(window.innerWidth - 300, x));
  notes.value[currentNote].y = Math.max(0, Math.min(window.innerHeight - 200, y));
};

// 停止拖拽
const stopDrag = () => {
  isDragging = false;
  currentNote = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  saveNotes();
};

// 保存便签到localStorage
const saveNotes = () => {
  localStorage.setItem('whiteboard-notes', JSON.stringify(notes.value));
};

// 加载便签
const loadNotes = () => {
  const savedNotes = localStorage.getItem('whiteboard-notes');
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes);
  }
};

onMounted(() => {
  loadNotes();
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
.whiteboard {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

.notes-container {
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
}

.note {
  position: absolute;
  width: 300px;
  min-height: 150px;
  padding: 20px;
  background-color: #ffffff;
  border: 2px solid #000000;
  cursor: move;
  user-select: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.note:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #000000;
  padding-bottom: 10px;
}

.drag-handle {
  cursor: move;
  font-weight: bold;
}

.delete-btn {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 20px;
  padding: 0 5px;
}

.note-content {
  flex-grow: 1;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #000000;
  padding-top: 10px;
}

.note-time {
  font-size: 12px;
  color: #666;
}

.note-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: none;
  border: 1px solid #000000;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #000000;
  color: #ffffff;
}

.action-btn.active {
  background-color: #000000;
  color: #ffffff;
}

.input-form {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-top: 2px solid #000000;
  display: flex;
  gap: 15px;
}

input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #000000;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #666;
}

button {
  padding: 12px 30px;
  background-color: #000000;
  color: #ffffff;
  border: 2px solid #000000;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background-color: #ffffff;
  color: #000000;
}
</style> 