import { useEffect, useState } from "react";
import "./Editor.css";

interface User {
  id: number;
  name: string;
  birth: string;
}
interface Props {
  onClickAdd: (
    name: string,
    dt: string,
    h8: string,
    w8: string,
    userId: number,
    rmk: string
  ) => void;
  user: User[];
  //   id: number;
  //   name: string[];
  //   bitrh: string;
}

export default function Editor(props: Props) {
  let today = new Date();
  // console.log(today.toString());
  // console.log(today.toISOString());
  let yymmdd = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  // console.log(yymmdd);
  // const [dt, setDt] = useState(Date.now().toString());
  // console.log(props.user);
  const [name, setName] = useState("");
  // function al() {
  //   // alert(props.user);
  //   console.log(props.user);
  // }
  // useEffect(al, props.user);
  // if (props.user.length !== 0) setName(props.user[0].name);
  // if (props) {
  //   setName(props.user[0].name);
  // }
  // const [name, setName] = useState(props.user[0].name);
  const [dt, setDt] = useState(yymmdd);
  const [h8, setH8] = useState("");
  const [w8, setW8] = useState("");
  const [userId, setUserId] = useState(0);
  const [rmk, setRmk] = useState("");

  //   const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setName(e.target.value);
  //   };
  const onChangeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
    setUserId(props.user.filter((f) => f.name == e.target.value)[0].id);
    // setUserId(e.target.id);
  };
  const onChangeDt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDt(e.target.value);
    // console.log(dt);
  };
  const onChangeH8 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setH8(e.target.value);
  };
  const onChangeW8 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setW8(e.target.value);
  };
  const onChangeRmk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRmk(e.target.value);
  };
  const onClickBtn = () => {
    // let userId = props.user[0].id;
    // let userId = props.user[0].id;
    console.log(
      `이름:${name} 날짜:${dt} \n키:${h8}, 몸무게:${w8}, userId:${userId}, rmk:${rmk}`
    );
    // setStore([...store, { name: name, dt: dt, h8: h8, w8: w8 }]);
    props.onClickAdd(name, dt, h8, w8, userId, rmk);
    setH8("");
    setW8("");
    setRmk("");
    (document.querySelector("#nameSel") as HTMLInputElement).focus();
  };

  return (
      <div className="editor-form">
      {/* <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={onChangeName}
      /> */}
          <select name="select" id="nameSel" onChange={onChangeName} className="input-select">
              {props.user.map((u) => (
                  <option key={u.id} value={u.name}>
                      {u.name}
                  </option>
              ))}
          </select>
          <input type="date" name="dt" id="dt" value={dt} onChange={onChangeDt} className="input-date"/>
          {/* <label htmlFor="h8">키</label> */}
      <input
        type="text"
        id="h8"
        value={h8}
        onChange={onChangeH8}
        placeholder="키"
        className="input-text"
      />
          <input
              type="text"
              id="w8"
              value={w8}
              onChange={onChangeW8}
              placeholder="몸무게"
              className="input-text"
          />
          <input
              type="text"
              id="rmk"
              value={rmk}
              onChange={onChangeRmk}
              placeholder="비고"
              className="input-text"
          />
          <button onClick={onClickBtn} className="submit-button">입력</button>
      </div>
  );
}
