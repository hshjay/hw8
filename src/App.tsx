import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import Items from "./components/Items";
import Reg from "./components/Reg";
import Users from "./components/Users";
import ReadSheet from "./components/ReadSheet";
import "./App.css";

interface Store {
  id: number;
  name: string;
  dt: string;
  h8: string;
  w8: string;
  userId: number;
  rmk: string;
}
interface UserInfo {
  id: number;
  name: string;
  birth: string;
}

interface SheetData {
  sheet1: Array<any[]>;
  sheet2: Array<any[]>;
}

function App() {
  const [user, setUser] = useState<UserInfo[]>([]);
  const [store, setStore] = useState<Store[]>([]);
  const idRef = useRef(0);
  const userRef = useRef(0);
  // const sUrl =
  //   "https://script.google.com/macros/s/AKfycbw9mIsLRrOrk8RdAlevI3D_smw378Ht53oKYUx42R4GynKmmp-nkCLpwDBuSaLyUqu9/exec";
  // const sUrl =
  // "https://script.google.com/macros/s/AKfycbz0RGg9j9FK8EPFRjhW-X3mJcExncmXd4OFi6H5at2T5ONx3CsCArUaiSKEN2Ayglvv/exec";
  const sUrl =
    "https://script.google.com/macros/s/AKfycbxF27A4ElYE0kEYQujcNC_5UMbPuTUV4EWjiPpd-tFi_sQ8c1UKE9xOBe5H7UNwTmXe/exec";
  const onReceived = (sheets: SheetData) => {
    // console.log(sheets);
    // sheets.sheet1.map((userData) =>
    //   setUser([
    //     ...user,
    //     { id: userData[0], name: userData[1], birth: userData[2] },
    //   ])
    // );
    const users = sheets.sheet1
      .filter((userData) => userData[0] != "id")
      .map((userData) => ({
        id: userData[0],
        name: userData[1],
        birth: userData[2],
      }));
    // userRef.current = users.length;
    if (users.length > 0) userRef.current = users[users.length - 1].id + 1;
    setUser([...users]);

    const dataList = sheets.sheet2
      .filter((rowData) => rowData[0] != "id")
      .map((rowData) => ({
        id: rowData[0],
        name: users.filter((u) => u.id == rowData[1])[0].name,
        dt: rowData[2],
        h8: rowData[3],
        w8: rowData[4],
        userId: rowData[1],
        rmk: rowData[5],
      }));
    // idRef.current = dataList.length;
    if (dataList.length > 0)
      idRef.current = dataList[dataList.length - 1].id + 1;
    setStore([...dataList]);
    // console.log(sheets.sheet1);
  };

  const onClickAdd = async (
    name: string,
    dt: string,
    h8: string,
    w8: string,
    userId: number,
    rmk: string
  ) => {
    // console.log(`날짜:${dt} \n키:${h8}, 몸무게:${w8}`);
    try {
      const response = await fetch(
        `${sUrl}?type=data&id=${idRef.current}&userId=${userId}&name=${name}&dt=${dt}&h8=${h8}&w8=${w8}&rmk=${rmk}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`서버 응답 에러: ${res.status}`);
          }
          // console.log(res.json());
          return res.json(); // as Promise<SheetData>;
        })
        .catch((err) => {
          throw new Error(`에러: ${err.message}`);
        });
      if (name === "") {
        name = user[0].name;
      }
      setStore([
        ...store,
        {
          id: idRef.current++,
          name: name,
          dt: dt,
          h8: h8,
          w8: w8,
          userId: userId,
          rmk: rmk,
        },
      ]);
    } catch (error) {
      console.log(`error: ${error}`);
    }
    // console.log(
    //   `${sUrl}?type=data&id=${idRef.current}&userId=${userId}&name=${name}&dt=${dt}&h8=${h8}&w8=${w8}`
    // );
    // props.onClickAdd(name,dt,h8,w8);
    // setH8("");
    // setW8("");
    // (document.querySelector("#name") as HTMLInputElement).focus();
  };

  const onUserAdd = async (name: string, dt: string) => {
    if (user.filter((u) => u.name === name).length > 0) return;

    try {
      const response = await fetch(
        `${sUrl}?type=user&id=${userRef.current}&name=${name}&birth=${dt}`
        //   , {
        //   redirect: "follow",
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json;charset=utf-8",
        //     // "Content-Type": "text/plain;charset=utf-8",
        //     Host: "script.google.com",
        //   },
        //   body: JSON.stringify({ id: userRef.current++, name: name, birth: dt }),
        // }
      );

      if (!response.ok) {
        throw new Error(`서버 에러: ${response.status}`);
      }
      setUser([...user, { id: userRef.current++, name: name, birth: dt }]);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    // console.log(...store);
  }, [store]);

  return (
    <div className="App">
      <h1 className="app-title">hw8</h1>
      <h2 className="section-title">입력</h2>
      <Editor onClickAdd={onClickAdd} user={user}></Editor>
      <div>
        <div className="mainContainer">
          <div className="scroll-box">
            <div className="container">
              <div className="header">No.</div>
              <div className="header">이름</div>
              <div className="header">날짜</div>
              <div className="header">키</div>
              <div className="header">몸무게</div>
              <div className="header">비고</div>
              <div className="header">생후</div>

              {store
                .filter((item) => item.userId == 0)
                .map((item) => (
                  <Items
                    key={item.id}
                    {...item}
                    sh={(
                      (new Date(item.dt).getTime() -
                        new Date(user[0].birth).getTime()) /
                      (1000 * 24 * 60 * 60)
                    ).toString()}
                  />
                ))}
            </div>
          </div>
          <div className="scroll-box">
            <div className="container">
              <div className="header">No.</div>
              <div className="header">이름</div>
              <div className="header">날짜</div>
              <div className="header">키</div>
              <div className="header">몸무게</div>
              <div className="header">비고</div>
              <div className="header">생후</div>

              {store
                .filter((item) => item.userId == 1)
                .map((item) => (
                  <Items
                    key={item.id}
                    {...item}
                    sh={(
                      (new Date(item.dt).getTime() -
                        new Date(user[1].birth).getTime()) /
                      (1000 * 24 * 60 * 60)
                    ).toString()}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2>사용자 등록</h2>
      <Reg onUserAdd={onUserAdd} />
      <div>
        <div className="container2">
          <div className="itemHeader">No.</div>
          <div className="itemHeader">이름</div>
          <div className="itemHeader">생일</div>
        </div>
        {user.map((u) => (
          <Users key={u.id} {...u} />
        ))}
      </div>
      <ReadSheet onReceived={onReceived} />
      {/* {idRef.current}
      {userRef.current} */}
    </div>
  );
}

export default App;
