import { FC, useEffect, useState } from "react";
import RepositoryDetail from "../RepositoryDetail/RepositoryDetail";
import { getRepositories, getSelectedRepository } from "../../api";
import RepositoryItem from "./RepositoryItem/RepositoryItem";
import styles from "./RepositoryList.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { per_page } from "../../constants";
import Loader from "../loader/Loader";
import { IRepo } from "../../types";

interface IProps {}

const RepositoryList: FC<IProps> = () => {
  const [userName, setUserName] = useState<string>("");
  const [repos, setRepos] = useState<Array<IRepo>>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [currentPage, setCarrentPage] = useState<number>(1);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<IRepo | null>(null);

  const setAllRepos = async (name: string, page?: number) => {
    setLoader(true);
    setErrorMsg("");
    const { repositories, total } = await getRepositories(name, page);

    setPaginationLength(Math.ceil((total ? total : 0) / per_page));

    if (Array.isArray(repositories)) {
      setRepos(repositories);
    } else {
      setErrorMsg(repositories?.message);
    }
    setLoader(false);
  };

  const selectRepoHandler = async (name: string) => {
    const data = await getSelectedRepository(userName, name);
    setSelectedRepo(data);
    setIsSelected(true);
  };

  const buttonsHandler = (page: number) => {
    setCarrentPage(page + 1);
    setAllRepos(userName, page + 1);
  };

  useEffect(() => {
    setAllRepos(userName);
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container}>
      {isSelected ? (
        <RepositoryDetail
          setIsSelected={() => setIsSelected(false)}
          selectedRepo={selectedRepo}
        />
      ) : (
        <>
          <SearchBar
            userName={userName}
            setUserName={setUserName}
            setAllRepos={setAllRepos}
          />
          {loader ? (
            <Loader type="bubbles" color="purple" />
          ) : (
            <>
              {!errorMsg ? (
                repos.map((repo: IRepo) => {
                  return (
                    <RepositoryItem
                      selectRepoHandler={selectRepoHandler}
                      repo={repo}
                      key={repo.id}
                    />
                  );
                })
              ) : (
                <div className={styles.errorText}>{errorMsg}</div>
              )}
            </>
          )}
          {!loader && (
            <div className={styles.paginationContainer}>
              {Array(paginationLength)
                .fill("number")
                .map((el, index) => {
                  return (
                    <button
                      key={index}
                      style={{
                        backgroundColor:
                          index + 1 === currentPage ? "purple" : "#7293ff",
                        color: index + 1 === currentPage ? "white" : "black",
                      }}
                      onClick={() => buttonsHandler(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepositoryList;
