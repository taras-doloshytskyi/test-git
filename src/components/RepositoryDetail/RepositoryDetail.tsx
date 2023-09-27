import { FC } from "react";
import styles from "./RepositoryDetail.module.css";
import { IRepo } from "../../types";

interface IProps {
  selectedRepo: null | IRepo;
  setIsSelected: () => void;
}

const RepositoryDetail: FC<IProps> = ({ selectedRepo, setIsSelected }) => {
  return (
    <div className={styles.container}>
      <button onClick={setIsSelected} className={styles.btn}>
        <span>Back</span>
        <div className={styles.liquid}></div>
      </button>
      <div className={styles.selectedInfo}>
        <div>{selectedRepo?.name}</div>
        <div>{selectedRepo?.description}</div>
        <div>{selectedRepo?.owner?.login}</div>
        <div>{selectedRepo?.stargazers_count}</div>
        <a href={selectedRepo?.html_url} rel="noreferrer" target="_blank">
          Link
        </a>
      </div>
    </div>
  );
};

export default RepositoryDetail;
