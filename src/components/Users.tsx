interface Props {
  id: number;
  name: string;
  birth: string;
}

// const itemStyle = {
//   backgroundColor: "#f0f0f0",
//   padding: "0.5rem 1rem",
//   borderRadius: "4px",
//   transition: "all 0.2s ease",
//   cursor: "pointer",
// };

export default function Users(props: Props) {
  return (
    <div
      className="container2"

    >
      <div className="item hover-item" >
        {props.id}
      </div>
      <div className="item hover-item" >
        {props.name}
      </div>
      <div className="item hover-item" >
        {props.birth}
      </div>
      {/* <li>
        ID:{props.id} - 이름:{props.name}, 생일:{props.birth}
      </li> */}
    </div>
  );
}
