import { FC } from "react";
import styles from "./RepositoryItem.module.css";
import { IRepo } from "../../../types";

interface IProps {
  repo: IRepo;
  selectRepoHandler: (name: string) => void;
}

const RepositoryItem: FC<IProps> = ({ repo, selectRepoHandler }) => {
  const { name, description, stargazers_count } = repo;

  return (
    <div onClick={() => selectRepoHandler(name)} className={styles.container}>
      <div>Name: {name}</div>
      <div>
        Description:{" "}
        {description?.length > 30
          ? description.slice(0, 30) + "..."
          : description}
      </div>
      <div>Number of stars: {stargazers_count}</div>
    </div>
  );
};

export default RepositoryItem;
