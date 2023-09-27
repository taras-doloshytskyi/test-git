import { FC } from "react";
import styles from "./SearchBar.module.css";

interface IProps {
  userName: string;
  setUserName: (text: string) => void;
  setAllRepos: (name: string) => void;
}

const SearchBar: FC<IProps> = ({ userName, setUserName, setAllRepos }) => {
  const submitHandler = (e: any) => {
    e.preventDefault();
    setAllRepos(userName);
  };
  return (
    <form className={styles.container} action="" onSubmit={submitHandler}>
      <div className={styles.inputField}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
          id="search"
          required
        />
        <label htmlFor="search">Search user:</label>
      </div>
      <button className={styles.searchBtn}>
        <span>Search</span>
        <div className={styles.liquid}></div>
      </button>
    </form>
  );
};

export default SearchBar;
