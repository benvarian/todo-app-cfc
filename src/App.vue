<template>
  <div>
    <h2 class="text-4xl font-bold heading-formatting">Bens Todo-app with Firebase functionality & tailwind</h2>
  </div>
  <div class="todo-formatting">
    <form @submit.prevent="addTodo">
      <div class="grid grid-cols-2">
        <input v-model="todoContent" type="text" id="todo"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="todo" required>
        <button :disabled="!todoContent"
          class=" button text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Add</button>
      </div>
    </form>
  </div>
  <div v-for="todo in todos" class="card py-1 ">
    <div class="flex justify-center">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm" v-bind:id="todo.id">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2"> {{ todo.content }}</h5>
        <div class="flex space-x-4">
          <div>
            <button type="button" @click="deleteTodo(todo.id)"
              class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md   hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">
              Remove</button>
          </div>
          <div>
            <button type="button" @click="toggleDone(todo.id)"
              class=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">Done</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { db } from '@/firebase'


const db2 = getFirestore();
connectFirestoreEmulator(db2, 'localhost', 8080);

const todosCollectionRef = collection(db, 'todo')


const todos = ref([])

// get todos
onMounted(() => {
  // this will simply update the view once when a new todo is added 
  // const querySnapshot = await getDocs(collection(db, "todo"));
  // let nTodos = []
  // querySnapshot.forEach((doc) => {
  //   const todo = {
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done
  //   }
  //   nTodos.push(todo)
  // });
  // todos.value = nTodos

  // will update the view every single time a new todo is added in the database will be good for wadl maybe 
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})

const todoContent = ref('')

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: todoContent.value,
    done: false
  })
  todoContent.value = ''
}

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}

const toggleDone = id => {

  const index = todos.value.findIndex(todo => todo.id === id)

  var card = document.getElementById(id)
  card.classList.toggle('bg-green-100')

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })

}

</script>

<style>
.todo-formatting {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.heading-formatting {
  text-align: center;
  padding-top: 50px;
}
</style>