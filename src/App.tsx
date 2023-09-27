import React, { FC } from "react";
import "./App.css";
import RepositoryList from "./components/RepositoryList/RepositoryList";

const App: FC = () => {
  return (
    <div className="App">
      <RepositoryList/>
    </div>
  );
};

export default App;
