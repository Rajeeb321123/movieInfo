import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

// components and files
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movieInfo.png";



const Header = () => {

  // INSTANCES
  const navigate = useNavigate();

  // Lcation will give current location and it is changed whenever we go to different route
  const location = useLocation();



  //STATES
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");




  // METHODS
  const searchQueryHandler = (event) => {
    // making sure null value isnot provided and on only enter we move to serach
    if (event.key === "Enter" && query.length > 0) {

      // dynamic routing
      // as we know for serach page ,we had <Route path='/search/:query' element={<SearchResults/>}></Route>
      // dynamic value will be appended to url
      navigate(`/search/${query}`);

      // making search close after hitting search and 1second (1000millisecond) later
      setTimeout(()=>{
        setShowSearch(false)
      },1000);

    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  // handling navigation if we clicked movie and tv on menu
  const navigationHandler=(type)=>{
    //in both case we have to get to explore page
    if(type=="movie"){
      navigate("/explore/movie")

    }
    else{
      navigate("/explore/tv")

    }
    setMobileMenu(false);

  };

  // for making navbar show , hide , transparent
  // it is derived from EventListner in useEffect
  const controlNavbar=()=>{

    // you can see changes in window scroll in console
    // console.log(window.scrollY)
    // window.scrollY is 0 inthe begining if window isnot scrolled but increased when scrolled


    if(window.scrollY > 200){
      // window.scrollY> lastscrolly ensur when ever you scroll up menu is shown as lastscrolly is constanly increasing
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow('hide')
      }
      else{
      setShow("show")
    }
    }
    else{
      setShow("top")
    }

    // setting lastscrollY
    // as this function controlNavbar is in useEffect lastScrollY is set to different value every time
    setLastScrollY(window.scrollY)
  

  }


  // USE EFFECT
  useEffect(() => {

    //adding eventlistner and donot forget to remove it in return statement
    // event: scroll    
    // creating a method:control Navbar 
    window.addEventListener("scroll",controlNavbar)
  
    return () => {
      // best practise :added event listner should be removed for avoiding memory leakage
      window.removeEventListener("scroll",controlNavbar)

    }
  }, [lastScrollY])

  
  useEffect(()=>{
    // for setting scroll to 0 whenever we change the location instance or state
    window.scrollTo(0,0);
    
  },[location])
  


  // RETURN
  return (

    
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
    {/* ${show} can be changed by scrolling */}

      <ContentWrapper>
        <div className="logo" onClick={()=>navigate('/')}>
          <img src={logo} alt="" />
        </div>


        {/* for desktop menu*/}
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>

        {/* for mobile menu */}
        <div className="mobileMenuItems" >
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
        </div>
      </ContentWrapper>

      {/* for handling search in header part */}
      {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
      

    </header>
  );
};

export default Header;
