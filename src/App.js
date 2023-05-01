import { useState, useEffect } from 'react';
// import shortId from 'shortid'
import { db } from './firebase'
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { useParams } from 'react-router-dom'


function ShowModInput({userArr, setUserArr, setShowing, newI, item}) {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newEmail, setNewEmail] = useState("");


  const showNewName = (e) => {
    setNewName(e.target.value);
  }
  const showNewAge = (e) => {
    setNewAge(e.target.value);
  }
  const showNewEmail = (e) => {
    setNewEmail(e.target.value);
  }
  
  const modUser = userArr.find( (item, i) => i === newI )
  
  
  const newSubmit = async (e) => {
    e.preventDefault();
    
    
    setUserArr(userArr.map( (item) => 
      item.id === modUser.id ? { name: newName, age: newAge, email: newEmail }
        
      : item
    ))
    const updateUser = doc(db, "userList", item.id)
    await updateDoc(updateUser, {
      name: newName,
      age: newAge,
      email: newEmail
    })

    setShowing((prev)=>!prev)
    
    
  }
  
  return(<>
    <form onSubmit={newSubmit}>
      <input type='text' placeholder='newName' value={newName} onChange={showNewName}></input>
      <input type='number' placeholder='newAge' value={newAge} onChange={showNewAge}></input>
      <input type='text' placeholder='newEmail' value={newEmail} onChange={showNewEmail}></input>
      <input type='submit'></input>
    </form>
    
  </>)
}



function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [userArr, setUserArr] = useState([]);
  const [showing, setShowing] = useState(false);
  


  const onClick = () => setShowing((prev) => !prev)

  const showName = (event) => {
    setName(event.target.value)
  }
  const showAge = (event) => {
    setAge(event.target.value)
  }
  const showEmail = (event) => {
    setEmail(event.target.value)
  }

  const delUserBtn =  async (index) => {
    
    const userDoc = doc(db, "userList", index.id);
    
    await deleteDoc(userDoc);

    setUserArr(userArr.filter((item, i) => item.id !== index.id))
    
    
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setName("");
    setAge("");
    setEmail("");
    
    await addDoc(collection(db, "userList"), {
      name: name, age: age, email: email
    });
    setUserArr([]);
    
    await getList();

    console.log(userArr)
  }

  const getList = async () => {
    const q = query(collection(db, "userList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      setUserArr([...userArr, {...doc.data(), id: doc.id}])
    });
  }

  useEffect( () => {
    
    getList();
    
  }, [])


  return (<>
  <h1>userInformation With Firebase</h1>
  <form onSubmit={onSubmit}>
    <label htmlFor="userName">name</label>
    <input id="userName" placeholder='Name' value={name} type='text' onChange={showName}></input>
    <label htmlFor="userAge">age</label>
    <input id="userAge" placeholder='Age' value={age} type='number' onChange={showAge}></input>
    <label htmlFor="userEmail">e-mail</label>
    <input id="userEmail" placeholder='Email' value={email} type='text' onChange={showEmail}></input>
    <input type="submit"></input>
  </form>

  <div>
  <ul>
    {userArr.map((item, i) => {return (<>

      <li key={item.id}>ID: {item.id}, 이름: {item.name}, 나이: {item.age}, 이메일: {item.email}</li>

      <button onClick={() => delUserBtn(item)}>delete</button>
      
      {showing ? <ShowModInput userArr={userArr} setUserArr={setUserArr} setShowing={setShowing} newI={i} item={item}/> : null}

      <button onClick={onClick}>{showing ? "cancel" : "modify"}</button>

    </>)
    })
    }
  </ul>
  </div>
  
  </>
  );
}

export default App;
