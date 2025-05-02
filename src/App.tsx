import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import Items from "./components/Items";
import Reg from "./components/Reg";
import Users from "./components/Users";

interface Store {
  id: number;
  name: string;
  dt: string;
  h8: string;
  w8: string;
}
interface UserInfo {
  id: number;
  name: string;
  birth: string;
}

function App() {
  const [user, setUser] = useState<UserInfo[]>([]);
  const [store, setStore] = useState<Store[]>([]);
  const idRef = useRef(0);
  const userRef = useRef(0);

  const onClickAdd = (name: string, dt: string, h8: string, w8: string) => {
    // console.log(`날짜:${dt} \n키:${h8}, 몸무게:${w8}`);
    setStore([
      ...store,
      { id: idRef.current++, name: name, dt: dt, h8: h8, w8: w8 },
    ]);
    // props.onClickAdd(name,dt,h8,w8);
    // setH8("");
    // setW8("");
    // (document.querySelector("#name") as HTMLInputElement).focus();
  };

  const onUserAdd = (name: string, dt: string) => {
    if (user.filter((u) => u.name === name).length > 0) return;
    setUser([...user, { id: userRef.current++, name: name, birth: dt }]);
  };

  useEffect(() => {
    // console.log(...store);
  }, [store]);

  return (
    <div className="App">
      <h1>hw8</h1>
      <h2>입력</h2>
      <Editor onClickAdd={onClickAdd} user={user}></Editor>
      <div>
        {store.map((item) => (
          <Items key={item.id} {...item} />
        ))}
      </div>
      <br />
      <br />
      <h2>사용자 등록</h2>
      <Reg onUserAdd={onUserAdd} />
      <div>
        {user.map((u) => (
          <Users {...u} />
        ))}
      </div>
    </div>
  );
}

export default App;
