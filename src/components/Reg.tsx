import { useRef, useState } from "react";

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
  return (
    // <form onSubmit={props.onUserAdd}>
    <div>
      <input type="text" id="name" placeholder="이름" onChange={onChangeName} />
      <input type="date" name="birth" id="birth" onChange={onChangeBirth} />
      {/* <input type="submit" value="입력" /> */}
      <button onClick={onClickButton}>입력</button>
    </div>
    // </form>
  );
}
