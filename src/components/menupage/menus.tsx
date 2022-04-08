// npm package direct imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd";

// styles imports
import styles from "./styles/menus.module.scss";

// constants imports
import SystemColors from "../../constants/colors";

// reducer imports
import { DefaultPoppins, ItemsApart, StyleLessButton } from "./constants";

// types imports
import { RootState } from "../../store/store.root";

// global components imports
import AddIcon from "../global/svgs/add.icon";

// native components imports
import MenuAddForm from "./menu.add.form";
import SingleMenu from "./single.menu";
import { Button, Dialog } from "@material-ui/core";
import { IMenu } from "../../store/menu/type";
import { Close, Done } from "@material-ui/icons"
import firebase from "firebase/app"
import 'firebase/firestore'
import SnackBarMessage from "./snackbar.message";
import { useParams } from "react-router-dom";

//@ts-ignore


export const getListStyle = (isDraggingOver:any) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // width272
  // padding: 8,
  // width: '100%'
});

// const getItemStyle = (isDragging:any, draggableStyle:any) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   width:0,
//   // padding: 8,
//   margin: `0 0 ${8}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });
function sortByKey(array: any[], key: string) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
const Menus: React.FC = (props:any) => {
  const MenuState = useSelector((state: RootState) => state.menu);
  const restaurantId = useSelector((state: RootState) => state.restaurant.restaurantId);
  const role = useSelector((state: RootState) => state.user.user?.role);
  const [open, setopen] = useState(false);
  const [menu, setMenu] = useState<Array<IMenu>>([]);
  const [editing, setEditing] = useState<boolean>(false)
  const [commitError, setCommitError] = useState<'success' | 'fail' | null>(null)
  const params = useParams()
  console.log(params);
  
  const db = firebase.firestore()
  const handledialogactions=()=>{
    setopen(false);
  }
  const setMenuFunc = () => {
    setEditing(false);
    // console.log(MenuState.menus)
    const orderedMenu = sortByKey(Array.from(MenuState.menus),'index') 
    switch (props.publish) {
      case true:
        setMenu(orderedMenu.filter((menu: { published: any })=>menu.published===true));
        break;
      case 'deleted':
          setMenu(orderedMenu.filter((menu: { published: any })=>menu.published==='deleted'));
          break;
      case 'created':
        setMenu(orderedMenu.filter((menu: { published: any  })=>menu.published==='created'));
        break;
      default:
        setMenu(orderedMenu.filter((menu: { published: any })=>[true,false,'created'].includes(menu.published)))
        break;
    }
  }
  React.useEffect(() => {
    if(MenuState?.menus){
      setMenuFunc()
    }
    return () => {
      setMenu([])
    }
  }, [MenuState?.menus, props.publish])


  const commitIndices = () => {
    var batch = db.batch()
    for (var oneMenu of menu){
      console.log(oneMenu);
      var docref = db.collection("restaurants").doc(restaurantId).collection('menus').doc(oneMenu.menuId)
      batch.update(docref,oneMenu)
    }
    batch.commit()
    .then(()=>{
      setCommitError('success')
      setEditing(false)
    })
    .catch(err => {
      console.log(err);
      setCommitError('fail')
      
    })

  }
// console.log(menu);

  const handleOnDragEnd = (
    result:DropResult,
    // provided:ResponderProvided
    ) => {
      if (!result.destination) return;
      setEditing(true)
      const items = Array.from(menu);
      const [ reorderedItem ] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem); 
      const target = items.map((item,index) =>({...item,index})) 
      setMenu(target);
      
  }

  return (
    <>
    <div className={styles["menu-page-container-list"]}>
    {/* <div className={styles["menu-page-list"]} style={{ marginRight: "30px" }}> */}
      {/* {MenuState.showMenuForm && <MenuAddForm />} */}
      <div className={styles["menu-page-container-list--heading"]} style={{ ...ItemsApart}}>
      {/* <div className={styles["menus__heading"]} style={{ ...ItemsApart, minWidth: "200px" }}> */}
      {role==='admin' && <div></div>}
        {editing?
        <div
        style={{margin:'auto'}}
        >
          <Button
          variant="outlined"
          color="primary"
          onClick={commitIndices}
          >
            <Done />
          </Button>
          &ensp;
          <Button
          variant="outlined"
          color="secondary"
          onClick={() =>setMenuFunc()}
          >
            <Close />
          </Button>
        </div>
        :
        <h2
          style={{
            ...DefaultPoppins,
            color: SystemColors.Secondary,
          }}
        >
          MENUS
        </h2>}
          {role==='admin' && 
          <>
        <button
          style={{ ...StyleLessButton }}
          onClick={() => setopen(true)}
          disabled={MenuState.activeMenuType.length === 0}
        >
          <AddIcon />
        </button>
      </>
        }
      </div>
      <div className={styles["menu-page-container-list--items"]}>
        
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
          <>
            {menu.length>0 && menu.map((menu,index) => (
              <Draggable key={menu.menuId} draggableId={menu.menuId} index={index}>
              {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={{display: 'flex',width:292}}
                 >
              <SingleMenu 
              dragHandle={{...provided.dragHandleProps}} 
              key={menu.menuId} 
              menu={menu} 
              path={props.path}
              />
              </div>
              )}
              </Draggable>
            ))}
          </>
          
        </div>
        )}
        </Droppable>
      </DragDropContext>
            
      </div>
    </div>
    {open && <Dialog open={open} onClose={()=>setopen(false)} aria-labelledby="form-dialog-title" >
      <MenuAddForm handleClose={handledialogactions} newIndex={menu.length}/>
    </Dialog>}
    <SnackBarMessage
        open={Boolean(commitError)}
        onClose={()=>setCommitError(null)}
        message={commitError==='success'?`Change saved`:`Error in saving changes! try again.`}
        severity={commitError==='success'?"success":"error"}
        variant="contained"
      />
    </>
  );  
};

export default Menus;
