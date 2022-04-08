// npm packages direct imports
import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/dishes.module.scss";

// hooks import
import useFetchDishes from "../../hooks/useFetchDishes";

// types imports
import { RootState } from "../../store/store.root";

// global components imports
import AddIcon from "../global/svgs/add.icon";

// constants imports
import { DefaultPoppins, ItemsApart } from "./constants";

// native components imports
import DishForm from "./dish.add.form";
import DishCard from "./dish.card";
import { Button, Dialog } from "@material-ui/core";
import firebase from "firebase/app"
import { IDish } from "../../store/dish/type";
import { Close, Done } from "@material-ui/icons";
import SnackBarMessage from "./snackbar.message";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { getListStyle } from "./menus";


const Dishes: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const role = state.user.user?.role
  const restaurantId = useSelector((state: RootState) => state.restaurant.restaurantId);
  const [open, setopen] = React.useState(false);
  const [dishes, setDishes] = useState<Array<IDish>>([]);
  const [editing, setEditing] = useState<boolean>(false)
  const [commitError, setCommitError] = useState<boolean>(false)
  const db = firebase.firestore()
  useFetchDishes();
  const setDishesFunc = () => {
    // console.log('state.category',state.category?.categories);
    if(state.dish && state.dish.dishes){
    setEditing(false);
    const orderedCategories = state.dish.dishes.map((m,i)=>m.index?m:{...m,index:i}).sort((a,b)=> (a.index > b.index ? 1 : -1))
    setDishes(orderedCategories)
    }
  }
  React.useEffect(() => {
    if(state.dish?.dishes){
      setDishesFunc()
    }
    return () => {
      setDishes([])
    }
  }, [state.dish?.dishes])

  const commitIndices = () => {
    var batch = db.batch()
    for (var oneMenu of dishes) {
      var docref = db.collection("dishes").doc(restaurantId).collection(oneMenu.type).doc(oneMenu.dish_id)
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

  const handledialogactions = () => {
    setopen(false);
  };

  const handleOnDragEnd = (
    result:DropResult,
    // provided:ResponderProvided
    ) => {
      if (!result.destination) return;
      setEditing(true)
      const items = Array.from(dishes);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem); 
      const target = items.map((item,index) =>({...item,index})) 
      setDishes(target);
      
  }

  return (
    <>
      <div className={styles["dishes"]} style={{paddingBottom:250,maxWidth:400}}>
        {/* {state.dish.showDishForm && <DishForm />} */}
        <div style={{ ...ItemsApart }}>
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
          onClick={() =>setDishesFunc()}
          >
            <Close />
          </Button>
        </div>
        :
          <h2 style={{ ...DefaultPoppins }}>DISHES</h2>
        }
          {state.category.activeCategory.length > 0 && role==='admin' && (
            <div style={{ cursor: "pointer" }} onClick={() => setopen(true)}>
              <AddIcon />
            </div>
          )}
        </div>
        <div className={styles["dishes__container"]}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-dish">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
          {dishes.length > 0 &&
            dishes.map((dish,index) => (
              <Draggable key={dish.dish_id} draggableId={dish.dish_id} index={index}>
              {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={{display: 'flex',width:292}}
                 >
              <>
                <DishCard
                  key={dish.dish_id}
                  dish_id={dish.dish_id}
                  dish_name={dish.dish_name}
                  description={dish.description}
                  images={dish.images}
                  specialty_tags={dish.specialty_tags}
                  price={dish.price}
                  pictorial_description={dish.pictorial_description}
                  food_variants={dish.food_variants}
                  published={dish.published}
                  dish={dish}
                  newIndex={dishes.length}
                />
                </>
                </div>
              )}
              </Draggable>
              ))}
              </div>
          )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <SnackBarMessage
        open={commitError}
        onClose={()=>setCommitError(false)}
        message={`Error in saving changes! try again.`}
        severity="error"
      />
      {open && (
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="form-dialog-title"
          scroll={'paper'}
        >
          <DishForm handleClose={handledialogactions} newIndex={dishes.length} />
        </Dialog>
      )}
    </>
  );
};

export default Dishes;
