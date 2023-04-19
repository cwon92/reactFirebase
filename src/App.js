import { useState } from 'react';
import shortId from 'shortid'
// import { useParams } from 'react-router-dom'


function ShowModInput({userArr, setUserArr, setShowing, newI}) {
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
  // const modUser = userArr.map((item, i) => {
  //   i === newI ? setUserArr([ {name: newName, age: newAge, email: newEmail } ,...userArr]) : userArr
  // })
  const modUser = userArr.find( (item, i) => i === newI )
  const modInput = { name: newName, age: newAge, email: newEmail
  }
  const changeUser = {...modUser, name: newName,
    age: newAge,
    email: newEmail}
  
  


  const newSubmit = (e) => {
    e.preventDefault();
    const filter = userArr.filter((item, i) => i != newI)
    console.log(userArr)
    console.log(filter)
    console.log(userArr)
    setUserArr([changeUser, ...userArr])
    setUserArr(filter)
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

  const delUserBtn = (index) => {
    setUserArr(userArr.filter((item, i) => i !== index))
  }



  const onSubmit = (e) => {
    e.preventDefault();
    setUserArr([ { id: shortId.generate(), name: name, age: age, email: email }, ...userArr,])
    setName("");
    setAge("");
    setEmail("");
    
    console.log('메인인풋제출')
    console.log(userArr)
  }








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
  <ul>
    
    {userArr.map((item, i) => {return (<>

      <li key={item.id}>ID: {item.id}, 이름: {item.name}, 나이: {item.age}, 이메일: {item.email}</li>

      <button onClick={() => delUserBtn(i)}>delete</button>
      
      {showing ? <ShowModInput userArr={userArr} setUserArr={setUserArr} setShowing={setShowing} newI={i}/> : null}

      <button onClick={onClick}>{showing ? "cancel" : "modify"}</button>

    </>)
    })
    }
    
  </ul>
  
  
  </>
  );
}

export default App;
