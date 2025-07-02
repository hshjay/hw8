interface Props {
  id: number;
  name: string;
  birth: string;
}
export default function Users(props: Props) {
  return (
    <div className="container2">
      <div className="item">{props.id}</div>
      <div className="item">{props.name}</div>
      <div className="item">{props.birth}</div>
      {/* <li>
        ID:{props.id} - 이름:{props.name}, 생일:{props.birth}
      </li> */}
    </div>
  );
}
