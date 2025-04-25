import React, { useEffect, useState } from "react";

interface Store {
  name: string;
  dt: string;
  h8: string;
  w8: string;
}
function App() {
  let today = new Date();
  // console.log(today.toString());
  // console.log(today.toISOString());
  let yymmdd = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  // console.log(yymmdd);
  // const [dt, setDt] = useState(Date.now().toString());
  const [name, setName] = useState("");
  const [dt, setDt] = useState(yymmdd);
  const [h8, setH8] = useState("");
  const [w8, setW8] = useState("");
  const [store, setStore] = useState<Store[]>([]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
  const onClickBtn = () => {
    console.log(`날짜:${dt} \n키:${h8}, 몸무게:${w8}`);
    setStore([...store, { name: name, dt: dt, h8: h8, w8: w8 }]);
    setH8("");
    setW8("");
    (document.querySelector("#name") as HTMLInputElement).focus();
  };

  useEffect(() => {
    console.log(...store);
  }, [store]);

  return (
    <div className="App">
      <h1>hw8</h1>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={onChangeName}
      />
      <br />
      <input type="date" name="dt" id="dt" value={dt} onChange={onChangeDt} />
      <br />
      {/* <label htmlFor="h8">키</label> */}
      <input
        type="text"
        id="h8"
        value={h8}
        onChange={onChangeH8}
        placeholder="키"
      />
      <br />
      {/* <label htmlFor="w8">몸무게</label> */}
      <input
        type="text"
        id="w8"
        value={w8}
        onChange={onChangeW8}
        placeholder="몸무게"
      />
      <button onClick={onClickBtn}>입력</button>
    </div>
  );
}

export default App;
