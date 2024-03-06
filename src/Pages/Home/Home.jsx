import React, {useState} from "react";
import Sidebar from "../../Components/Siderbar/Sidebar";
import './Home.css';

import Feed from "../../Components/Feed/Feed";
const Home = ({sidebar}) => {
  const [category, setcategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setcategory={setcategory} />
      <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category} />
      </div>

    </>
  );
};

export default Home;
