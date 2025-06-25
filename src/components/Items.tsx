interface Props {
  id: number;
  name: string;
  dt: string;
  h8: string;
  w8: string;
  rmk: string;
}

export default function Items(props: Props) {
  return (
    <li>
      {props.id}번 <div>이름: {props.name}</div>
      <div>날짜: {props.dt}</div>
      <div>키: {props.h8}</div>
      <div>몸무게: {props.w8}</div>
      <div>비고: {props.rmk}</div>
      <div>------------------</div>
    </li>
  );
}
