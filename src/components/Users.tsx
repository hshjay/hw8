interface Props {
  id: number;
  name: string;
  birth: string;
}
export default function Users(props: Props) {
  return (
    <div>
      <li>
        ID:{props.id} - 이름:{props.name}, 생일:{props.birth}
      </li>
    </div>
  );
}
