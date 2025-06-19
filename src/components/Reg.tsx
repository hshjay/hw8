import React, { useRef, useState } from "react";

interface Props {
  onUserAdd: (name: string, birth: string) => void;
}

export default function Reg(props: Props) {
  //   idRef = useRef(0);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };

  const onClickButton = () => {
    props.onUserAdd(name, birth);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.dir(e);
    props.onUserAdd(name, birth);
  };

  // const formData = document.querySelector("#regUser");
  // formData?.addEventListener("submit", handleSubmit);

  return (
    // <form onSubmit={props.onUserAdd}>
    // <div>
    <form id="regUser" onSubmit={handleSubmit}>
      <input type="text" id="name" placeholder="이름" onChange={onChangeName} />
      {/* <input
        type="text"
        id="name2"
        placeholder="이름2"
        onChange={onChangeName}
      /> */}
      <input type="date" name="birth" id="birth" onChange={onChangeBirth} />
      {/* <input type="submit" value="입력" /> */}
      <button>입력</button>
      {/* </div> */}
      {/* // </form> */}
    </form>
  );
}
