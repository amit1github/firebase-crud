import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const App = () => {
  const [user, setUser] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const usersCollectionRef = collection(db, "user");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "user", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name..."
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />

      <button onClick={createUser}>Create User</button>

      {user.map((users) => {
        return (
          <div key={users.id}>
            <h1>name: {users.name}</h1>
            <h1>Age: {users.age}</h1>
            <button onClick={() => updateUser(users.id, users.age)}>
              Increase Age
            </button>
            <button onClick={() => deleteUser(users.id)}>Delete me</button>
          </div>
        );   
      })}
    </div>
  );
};

export default App;
