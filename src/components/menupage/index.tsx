// direct npm package imports
import React, { useEffect } from "react";

// global components imports
import UniversalButton from "../global/universal-button";
import styles from './styles/menu-page.module.scss'
// native components imports
import Categories from "./categories";
import Dishes from "./dishes";
import useOnMount from "./hooks/useOnMount";
import Menus from "./menus";
import { useHistory, useParams } from "react-router-dom";

export const menuTypes  = [
  {type:'deli',name:'Deli'},
  {type:'take-away',name:'Take Away'},
  {type:'dine-in',name:'Dine In'},
  {type:'order-in',name:'Order In'},
  {type:'specials',name:'Specials'},
]


const MenuPageIndex: React.FC = (props:any) => {
  const { handleClick, MenuState } = useOnMount();
  //@ts-ignore
  const { selectedType,selectedMenu,selectedCategory } = useParams()
  const history = useHistory()
  useEffect(() => {
    if(selectedType){
      handleClick(selectedType,selectedMenu,selectedCategory)    
    }
    else{
      handleClick('deli',selectedMenu)    
    }
  }, []);
  
  return (
    <div className={styles["menu-page"]}>
      {menuTypes.map(({type,name}, index)=>
      (
        <a href={`/menus/${type}`}>
          <UniversalButton
            selected={MenuState.activeMenuType === type}
            height={35}
            width={131}
          >
            {name}
          </UniversalButton>
        </a>
      )
      )}
      {/* <UniversalButton
        handleClick={() => handleClick("take-away")}
        selected={MenuState.activeMenuType === "take-away"}
        height={35}
        width={131}
      >
        Takeaway
      </UniversalButton>
      <UniversalButton
        handleClick={() => handleClick("Dine In")}
        selected={MenuState.activeMenuType === "dine-in"}
        height={35}
        width={131}
      >
        Dine In
      </UniversalButton>
      <UniversalButton
        handleClick={() => handleClick("Order In")}
        selected={MenuState.activeMenuType === "order-in"}
        height={35}
        width={131}
      >
        Order In
      </UniversalButton>
      <UniversalButton
        handleClick={() => handleClick("Specials")}
        selected={MenuState.activeMenuType === "specials"}
        height={35}
        width={131}
      >
        Specials
      </UniversalButton> */}
      <div className={styles["menu-page-container"]}>
      {/* <div style={{ display: "flex", minWidth: "900px", marginTop: "20px" }}> */}
        {// @ts-ignore: Unreachable code error
          <Menus publish={props.publish} />}
          {// @ts-ignore: Unreachable code error
          <Categories publish={props.publish} />}
          {// @ts-ignore: Unreachable code error
          <Dishes publish={props.publish} />}
      </div>
    </div>
  );
};

export default MenuPageIndex;

export const PublishedMenuPage = () => {
  return (
    // @ts-ignore: Unreachable code error
    <MenuPageIndex path={'/published-menus/'} publish={true} />
  )
}
export const MenuUnderWorkPage = () => {
  return (
    // @ts-ignore: Unreachable code error
    <MenuPageIndex path={'/under-work/'} publish={'created'} />
  )
}

export const Bin = () => {
  return (
    // @ts-ignore: Unreachable code error
    <MenuPageIndex path={'/under-work/'} publish={'deleted'} />
  )
}
