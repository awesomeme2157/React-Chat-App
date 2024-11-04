import { useState } from "react";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  // Search for user
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    if (!username) {
      console.warn("No username provided"); // Optional: log a warning if username is empty
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        console.log("No user found with that username.");
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   // Capture the form data correctly
  //   const formData = new FormData(e.target);
  //   const username = formData.get("username");

  //   try {
  //     const userRef = collection(db, "users");

  //     // Query for the unique user by username
  //     const q = query(userRef, where("username", "==", username));
  //     const querySnapshot = await getDocs(q);

  //     // Handle the result based on Firestore's assumption of unique usernames
  //     if (querySnapshot.empty) {
  //       setUser(null);
  //     } else if (querySnapshot.size > 1) {
  //       setUser(null); // Reset user
  //     } else {
  //       const userData = querySnapshot.docs[0].data();
  //       setUser(userData); // Set the single user if unique
  //     }
  //   } catch (err) {
  //     console.error("Error fetching user:", err);
  //   }
  // };

  // then add the user
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="addUser">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Username" name="username" />
          <button>Search</button>
        </form>
        {user && (
          <div className="user">
            <div className="detail">
              <img src={user.avatar || "./avatar.png"} alt="User avatar" />
              <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddUser;
