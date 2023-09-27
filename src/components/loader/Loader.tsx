import ReactLoading from "react-loading";
import { FC } from "react";

interface IProps {
  type: any;
  color: string;
}

const Loader: FC<IProps> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

export default Loader;
