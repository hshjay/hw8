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
    // <li>
    <div className="container">
      <div className="item">{props.id}</div>
      <div className="item">{props.name}</div>
      <div className="item">{props.dt}</div>
      <div className="item">{props.h8}cm</div>
      <div className="item">{props.w8}kg</div>
      <div className="item">{props.rmk}</div>
      {/* <div>------------------</div> */}
    </div>
    // </li>
  );
}
