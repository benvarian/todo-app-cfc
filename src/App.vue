<template >
  <div>
    <h2 class="text-4xl font-bold heading-formatting">Bens Todo-app with Firebase functionality & tailwind</h2>
  </div>
  <!-- <div class="todo-formatting">
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
  </div> -->
  <div>
    <form @submit.prevent>
      <label
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">email:</label>
      <input type="email" v-model="email">
      <label
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">password:</label>
      <input type="password" v-model="password">
      <br>
      <label for="cars">Choose a car:</label>
      <select v-model="selected">
        <option v-for="option in options" :value="option.role">{{ option.role }}
        </option>
      </select>
      <p>selected {{ selected }}</p>
      <br>
      <button class="button text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        @click="login()">login</button>
      <button class="button text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        @click="register()">register</button>
      <button class="button text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" @click="signout()">log
        out</button>
      <button class="button text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        @click="dump()">dump</button>
    </form>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, connectFirestoreEmulator, setDoc } from "firebase/firestore";
import { db, app } from '@/firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, connectAuthEmulator, signOut, AuthErrorCodes } from "firebase/auth"
import newUsers from "../newData/mockturtle_users.json"
import newInsti from "../newData/mockturtle_insti.json"
import newTeams from "../newData/mockturtle_teams.json"
import newVenues from "../newData/mockturtle_venues.json"
import newTorna from "../newData/mockturtle_tornis.json"

// console.log(newUsers);

// console.log(y)


const res = JSON.stringify(newUsers)
const x = JSON.parse(res)
const insti = JSON.stringify(newInsti)
const y = JSON.parse(insti)
const teams = JSON.stringify(newTeams)
const z = JSON.parse(teams)
const venues = JSON.stringify(newVenues)
const c = JSON.parse(venues)
const torna = JSON.stringify(newTorna)
const v = JSON.parse(torna)



const options = ref([{ id: "1", role: "Admin" }, { id: "2", role: "head adjudicator" }, { id: "3", role: "adjudicator" }])
// console.log(options)

let selected = ref('')


// console.log(app)
const auth = getAuth(app);


if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log('we going to emulate baby')
}

y.forEach(element => {
  // console.log(element.id);
  const ref = doc(db, "institutions", element.id);
  setDoc(ref, element)
});

z.forEach(element => {
  // const ref = doc(db, "teams", element.id)
  // const ref = collection(db, "teams")
  const ref = doc(db, "teams", element.id)
  // addDoc(ref, element)
  setDoc(ref, element)
})
c.forEach(element => {
  const ref = doc(db, "venues", element.id)
  setDoc(ref, element)
})
v.forEach(element => {
  // let el = Object.keys(element).filter(x => x !== 'levels')
  // console.log([el]);
  // console.log(element);
  // console.log(element.splice(1,0));
  const ref = collection(db, "tournaments")

  addDoc(ref, element)

})



// file.forEach(element => {
//   // console.log(file);
//   const adjids = []
//   const teams = []

//   const reference = collection(db, 'institutions')
//   // console.log(element.id)

//   element['adjudicator_ids'].forEach(ele => {
//     adjids.push(ele)
//   })
//   element['team_ids'].forEach(elem => {
//     teams.push(elem)
//   })
//   // const reference = doc(db, 'institutions', element.id)
//   // const usersRef = doc(db, 'users', "hello")

//   // console.log(reference);
//   const data = {
//     id: element.id,
//     coordId: element.coordinator_id,
//     adjId: adjids,
//     teams: teams,
//     name: element.name,
//     abbreviation: element.abbreviation,
//     code: element.code
//   }
//   addDoc(reference, data).then(() => {
//     console.log('done');
//   }).catch((err) => {
//     console.log(err);
//   })
// })


// const tournaments = JSON.stringify(mock)
// const resTorni = JSON.parse(tournaments)
// // console.log(resTorni);

// resTorni.forEach(element => {
//   // console.log(element);
//   const ref = collection(db, "tournamets");
//   // console.log(ref);
//   addDoc(ref, element)
// })


const dump = () => {
  x.forEach(element => {
    console.log(element)
    createUserWithEmailAndPassword(auth, element.email, element.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(AuthErrorCodes.)
        const usersRef = doc(db, 'users', user.uid)
        // console.log(usersRef)
        const data = { role: element.role, first_name: element.first_name, last_name: element.last_name, email: element.email, phone: element.phone, password: element.password, institution: element.institution, id: element.id, requesting: element.requesting }
        // console.log(data)
        setTimeout(() => {
          setDoc(usersRef, data).then(() => {
            console.log("done");
          }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode + errorMessage);
          });
        }, 500);
      })
  });
}


const email = ref('ben@ben.com')
const password = ref('123456')
const login = async () => {
  // console.log(email.value + '  ' + password.value)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
    });


}



const register = async () => {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user.uid)
      const usersRef = doc(db, 'users', user.uid)
      console.log(usersRef)
      const data = { role: selected.value }
      console.log(setDoc(usersRef, data).then(() => {
        console.log("done")
      }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
      }));
    })
}




const signout = async () => {
  await signOut(auth);
  console.log(auth)
}

const todosCollectionRef = collection(db, 'todo')


const todos = ref([])

// get todos
// onMounted(() => {
//   // this will simply update the view once when a new todo is added 
//   // const querySnapshot = await getDocs(collection(db, "todo"));
//   // let nTodos = []
//   // querySnapshot.forEach((doc) => {
//   //   const todo = {
//   //     id: doc.id,
//   //     content: doc.data().content,
//   //     done: doc.data().done
//   //   }
//   //   nTodos.push(todo)
//   // });
//   // todos.value = nTodos

//   // will update the view every single time a new todo is added in the database will be good for wadl maybe 
//   onSnapshot(todosCollectionRef, (querySnapshot) => {
//     const fbTodos = [];
//     querySnapshot.forEach((doc) => {
//       const todo = {
//         id: doc.id,
//         content: doc.data().content,
//         done: doc.data().done
//       }
//       fbTodos.push(todo)
//     })
//     todos.value = fbTodos
//   })
// })

const todoContent = ref('')

const addTodo = () => {
  console.log(addDoc(todosCollectionRef, {
    content: todoContent.value,
    done: false
  }))
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