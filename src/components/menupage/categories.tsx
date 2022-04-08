// npm packages direct imports
import React, { useState } from "react";
import { useSelector } from "react-redux";

// types imports
import { RootState } from "../../store/store.root";

import styles from "./styles/menus.module.scss";

// global components imports
import AddIcon from "../global/svgs/add.icon";

// native components imports
import CategoriesForm from "./categories.add.form";
import SingleCategory from "./single.category";

import { Button, Dialog } from "@material-ui/core";

// constants imports
import { StyleLessButton, ItemsApart, DefaultPoppins } from "./constants";
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { getListStyle } from "./menus";
import SnackBarMessage from "./snackbar.message";
import {ICategory} from "../../store/category/type";
import { Close, Done } from "@material-ui/icons";
// import { db } from "../../service/utils/firebase.initialization";
import firebase from "firebase/app"
import 'firebase/firestore'

const Categories: any = (props: { path: any; }) => {
  const state = useSelector((state: RootState) => state);
  const restaurantId = useSelector((state: RootState) => state.restaurant.restaurantId);
  const role = state.user.user?.role
  const [open,setopen]=React.useState(false);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [editing, setEditing] = useState<boolean>(false)
  const [commitError, setCommitError] = useState<boolean>(false)
  const db = firebase.firestore()
  const handledialogactions=()=>{
    setopen(false);
}
          const setCategoriesFunc = () => {
            // console.log('state.category',state.category?.categories);
            
            if(state.category && state.category.categories){
            setEditing(false);
            const orderedCategories = Array.from(state.category.categories).map((m,i)=>m.index?m:{...m,index:i}).sort((a,b)=> (a.index > b.index ? 1 : -1))
            setCategories(orderedCategories)
            }
          } 
          React.useEffect(() => {
            if(state.category?.categories){
              setCategoriesFunc()
            }
            return () => {
              setCategories([])
            }
          }, [state.category?.categories])
// console.log('category',state.category?.categories);
          const commitIndices = () => {
            var batch = db.batch()
            for (var oneMenu of categories) {
              var docref = db.collection("restaurants").doc(restaurantId).collection('categories').doc(oneMenu.categoryId)
              batch.update(docref,oneMenu)
            }
            batch.commit()
            .then(()=>{
              setEditing(false)
            })
            .catch((err:any) => {
              console.log(err);
              setCommitError(true)
              
            })

          }

          const handleOnDragEnd = (
            result: DropResult,
            // provided:ResponderProvided
            ) => {
              if (!result.destination) return;
              setEditing(true)
              const items = Array.from(categories);
              const [reorderedItem] = items.splice(result.source.index, 1);
              items.splice(result.destination.index, 0, reorderedItem); 
              const target = items.map((item,index) =>({...item,index})) 
              setCategories(target);
          }
  return (
    <>
    <div className={styles["menu-page-container-list"]} >
      {/* {state.category.showCategoryForm && <CategoriesForm />} */}
      <div className={styles["menu-page-container-list--heading"]} style={{ ...ItemsApart}}>
      {role==='admin' && <div></div>}
      {editing?
        <div
        style={{margin:0}}
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
          onClick={() =>setCategoriesFunc()}
          >
            <Close />
          </Button>
        </div>
        :
        <h2 style={{ ...DefaultPoppins }}>CATEGORIES</h2>
        }
        
        {state.menu.activeMenu.length >0 && role==='admin'  &&<button
          style={{ ...StyleLessButton, cursor: "pointer" }}
          onClick={() => setopen(true)}
        >
          <AddIcon />
        </button>}
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
        {categories.length>0 && categories.map((category,index) => (
            <Draggable key={category.categoryId} draggableId={category.categoryId} index={index}>
              {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={{display: 'flex',width:292}}
                 >
                   <SingleCategory 
                   key={category.categoryId} 
                   category={category} 
                   newIndex={categories.length}
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
      <CategoriesForm 
      handleClose={handledialogactions}
      newIndex={categories.length}
      />
    </Dialog>}
    <SnackBarMessage
        open={commitError}
        onClose={()=>setCommitError(false)}
        message={`Error in saving changes! try again.`}
        severity="error"
      />
    </>
  );
};

export default Categories;
