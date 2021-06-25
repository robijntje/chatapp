import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({ 
  apiKey: "AIzaSyAAeVouBjRR0tY-Pf8wAM0uoU92OxKNhHA",
  authDomain: "chatapp-30b35.firebaseapp.com",
  projectId: "chatapp-30b35",
  storageBucket: "chatapp-30b35.appspot.com",
  messagingSenderId: "175105623860",
  appId: "1:175105623860:web:c3e01c5ae55975cb344761",
  measurementId: "G-XPPJCQEW65"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <header>

      </header>
      <section>
    {user ? <ChatRoom /> : < SignIn />}
    </section>
    </div>
  );
  }

function SignIn() {
  const signInWithGoogle = () => {
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Inloggen met Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Log Uit</button>
  )
}

function ChatRoom() {
const messagesRef = firestore.collection('messages');
const query = messagesRef.orderBy('createdAt').limit(25);
const [messages] = useCollectionData(query, {idField: 'id'});
return (
  <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>

    <div>

    </div>
    </>
)
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  return <p>{text}</p>
}

export default App;
