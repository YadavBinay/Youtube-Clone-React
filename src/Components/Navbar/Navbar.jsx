import React from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/youtubelogoai.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notificiation_icon from "../../assets/notification.png";
import profile_icon from "../../assets/Design.png";
import { Link } from "react-router-dom";
import { useState } from "react";

// when the searchicon img is clicked i want to pass different qurery in my feed according to what i get from searchinput box


const Navbar = ({setSidebar}) => {

  const [searchQuery, setsearchQuery] = useState('')
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={()=> setSidebar(prev=> prev===false?true:false)} src={menu_icon} alt="" />
        <Link to="/">
        <img src={logo} className="logo" alt=""/>
        </Link>

      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search"  value={searchQuery} onInput={e => setsearchQuery(e.target.value)}/>
          <img src={search_icon} alt=""/>
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notificiation_icon} alt="" />
        <img src={profile_icon} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
