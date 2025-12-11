import { Fragment } from "react/jsx-runtime";
import "./Items.css";

interface Props {
  id: number;
  name: string;
  dt: string;
  h8: string;
  w8: string;
  rmk: string;
  sh: string;
}

export default function Items(props: Props) {
  return (
    <Fragment>
      <div className="item hover-effect">
        {String(props.id).padStart(2, "0")}
      </div>
      <div className="item hover-effect name">{props.name}</div>
      <div className="item hover-effect date">{props.dt}</div>
      <div className="item hover-effect measurement">
        {props.h8}
        <span className="unit">cm</span>
      </div>
      <div className="item hover-effect measurement">
        {props.w8}
        <span className="unit">kg</span>
      </div>
      <div className="item hover-effect remark">{props.rmk}</div>
      <div className="item hover-effect sh">
        {props.sh}, {Math.floor(parseInt(props.sh) / 365)}년{" "}
        {parseInt(props.sh) % 365}일
      </div>
    </Fragment>
  );
}
