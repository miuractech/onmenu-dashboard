// npm packages direct imports
import React, { useState } from "react";

// global components imports
import EggIcon from "../global/svgs/egg.icon";
import EllipsisBlack from "../global/svgs/ellipsis.black";
import NonVegIcon from "../global/svgs/nonveg.icon";
import VegIcon from "../global/svgs/veg.icon";
import VeganIcon from "../global/svgs/vegan.icon";

// constants imports
import { OptionPosition, StyleLessButton } from "./constants";

// hooks imports
import useDishEdit from "./hooks/useDishEdit";
import SnackBarMessage from "./snackbar.message";

// styles imports
import styles from "./styles/dish.card.module.scss";

import genericStyles from "./styles/generic.module.scss";

import Popover from '@mui/material/Popover';
import { Dialog, DialogContent } from "@material-ui/core";
import DishForm from "./dish.add.form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.root";
import DishClone from "../clone/dishClone";

import CAFFINEICON from "../../images/pd/caffeine.png";
import EGGSICON from "../../images/pd/Contain_Eggs.png";
import NUTSICON from "../../images/pd/contains_nuts.png";
import DAIRYFREEICON from "../../images/pd/Dairy_Free.png";
import DAIRYICON from "../../images/pd/Dairy.png";
import EGGLESSICON from "../../images/pd/Eggless.png";
import GLUTENFREEICON from "../../images/pd/Gluten_Free.png";
import HEALTHYICON from "../../images/pd/Healthy.png";
import KETOICON from "../../images/pd/Keto.png";
import LOWFATICON from "../../images/pd/Low_fat.png";
import MUSHROOMICON from "../../images/pd/Mushrooms.png";
import NUTFREEICON from "../../images/pd/NUT_FREE.png";
import ORGANICICON from "../../images/pd/organic.png";
import SOYABEANICON from "../../images/pd/Soyabean.png";
import SPICYICON from "../../images/pd/Spicy.png";
import VEGANICON from "../../images/pd/Vegan.png";
import VERYSPICYICON from "../../images/pd/very_spicy.png";


interface IProps {
  dish_id: string;
  dish_name: string;
  description: string;
  images: Array<string>;
  specialty_tags: string;
  price: number;
  pictorial_description: Array<string>;
  food_variants: any;
  published: boolean | string;
  dish:any;
  newIndex:number;
}

interface IconTypeProps {
  foodVariants: any;
  icon: string;
}



const DishCard: React.FC<IProps> = ({
  dish_id,
  dish_name,
  description,
  images,
  // specialty_tags,
  price,
  pictorial_description,
  published,
  newIndex,
  dish
}) => {
  const [showDishOptions, setShowDishOptions] =React.useState<HTMLButtonElement | null>(null);
  const { pubOrUnpubDish, deleteDish, successMessage, deleteMessage } =
    useDishEdit(dish_id);
  const role = useSelector((state: RootState) => state.user.user?.role);
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false)
  const [clonePopUp, setClonePopUp] = useState(false);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  if(published !== 'deleted'){
    return (
      <div className={styles["dish_card"]}>
        <div className={styles["dish_card-first"]}>
          <div className={styles["dish_card-first--left"]}>
          {!published&& (
            <div style={{ position: "absolute", top: 5, left: 5 }}>
              <img src="/unpublished.png" alt="unpublished" />
            </div>
          )}
            {/* <div className={styles["bestSeller"]}>
              {specialty_tags ? <BestSellerComponent /> : null}
            </div> */}
  
            <div className={styles["dishname"]}>
              <h3>{dish_name}</h3>
              <h3>{price}</h3>
            </div>
          </div>
          <div className={styles["dish_card-first--right"]}>
            <img
              src={images.length > 0 ? images[0] : "/blank-image-2.png"}
              alt={dish_name}
            />
          </div>
        </div>
        <div className={styles["dish_card-second"]} style={{flexWrap:'wrap'}}>
            {description}
        </div>
        <div className={styles["dish_card-second--pictorial"]}>
        {dish.pictorial_description && Array.isArray(dish.pictorial_description) && dish.pictorial_description.map((des:any)=>(
              <React.Fragment key={des}>
                  {getPictorialDescription(des,25)}
              </React.Fragment>
          ))}
        </div>
        {/* <div className={styles["dish_card-second--mark"]}>
          {Object.keys(foodVariants.egg).length > 0 && (
            <IconType foodVariants={foodVariants} icon="egg" />
          )}
          {Object.keys(foodVariants.nonVeg).length > 0 && (
            <IconType foodVariants={foodVariants} icon="nonVeg" />
          )}
          {Object.keys(foodVariants.vegan).length > 0 && (
            <IconType foodVariants={foodVariants} icon="vegan" />
          )}
          {Object.keys(foodVariants.veg).length > 0 && (
            <IconType foodVariants={foodVariants} icon="veg" />
          )}
        </div> */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: 10,
            marginTop: "auto",
            left: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <button
            style={{
              ...StyleLessButton,
              cursor: "pointer",
              height: 20,
              width: 20,
            }}
            className={genericStyles["style-less-button"]}
            onClick={(e) => setShowDishOptions(e.currentTarget)}
          >
            <EllipsisBlack />
          </button>
          <DishClone clonePopUp={clonePopUp} setClonePopUp={setClonePopUp} dish={dish} />
          
          {Boolean(showDishOptions) && (
            // <div
            //   style={{ ...OptionPosition, position: "absolute", zIndex: 1200 }}
            // >
            <Popover
              open={Boolean(showDishOptions)}
              anchorEl={showDishOptions}
              onClose={()=>setShowDishOptions(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div style={{padding:8}}>
                <div  style={{padding:2}}>
                  <button
                    style={{ ...StyleLessButton }}
                    onClick={() =>{
                        pubOrUnpubDish()
                        setShowDishOptions(null)
                      }}
                  >
                    {published ? `unpublish` : `publish`}
                  </button>
                </div>
               { role === 'admin' &&
                <>
                <div  style={{padding:2}}>
                    <button
                      style={{ ...StyleLessButton, color: "red" }}
                      onClick={() =>{
                        deleteDish()
                        setShowDishOptions(null)
                        }}
                    >
                      delete
                    </button>
                  </div>
                  <div  style={{padding:2}}>
                    <button
                      style={{ ...StyleLessButton }}
                      onClick={() =>{
                        setOpen(true)
                        setShowDishOptions(null)
                        }}
                    >
                      edit
                    </button>
                  </div>
                  <div  style={{padding:2}}>
                    <button
                      style={{ ...StyleLessButton }}
                      id="clone"
                      onClick={() =>{
                        setClonePopUp(true)
                        // setShowDishOptions(null)
                        }}
                    >
                      Clone
                    </button>
                  </div>
                </>
                }
                
              </div>
           </Popover>
          )}
        </div>
        <SnackBarMessage
          message={`Dish ${
            published ? `published` : `unpublished`
          } successfully!`}
          open={successMessage}
          severity="success"
        />
        <SnackBarMessage
          message={`Dish deleted successfully!`}
          open={deleteMessage}
          severity="error"
        />
        
          
          
        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            key={'dialog'}
            scroll={'paper'}
            aria-labelledby="form-dialog-title"
          >
              <DialogContent dividers={true}>
                <DishForm 
                handleClose={()=>setOpen(false)}  
                dish={dish}
                editMode={true}
                newIndex={newIndex}
                />
              </DialogContent>
          </Dialog>
          )}
      </div>
    );
  }else{
    return <></>;
  }
};

const BestSellerComponent = () => {
  return (
    <React.Fragment>
      <img src="/bestseller-star.png" alt="bestseller-star.png" />
      <div className={styles.bestseller}>bestseller</div>
    </React.Fragment>
  );
};

const getPictorialDescription = (description:any,height:number) => {
  return <img src={pdInfo(description)} className='margin1 ' style={{height:height?height:50}} />
}


const pdInfo = (picdes:any) =>{
  const result = [
      {name:'Very spicy',src:VERYSPICYICON},
      {name:'Spicy',src:SPICYICON},
      {name:'Gluten free',src:GLUTENFREEICON},
      {name:'Nut free',src:NUTFREEICON},
      {name:'Dairy',src:DAIRYICON},
      {name:'Contains nuts',src:NUTSICON},
      {name:'Dairy free',src:DAIRYFREEICON},
      {name:'Organic',src:ORGANICICON},
      {name:'Vegan',src:VEGANICON},
      {name:'Low-fat',src:LOWFATICON},
      {name:'Healthy',src:HEALTHYICON},
      {name:'Contains eggs',src:EGGSICON},
      {name:'Eggless',src:EGGLESSICON},
      {name:'Keto',src:KETOICON},
      {name:'Contains mushrooms',src:MUSHROOMICON},
      {name:'Contains soybean',src:SOYABEANICON},
      {name:'Contains caffeine',src:CAFFINEICON},
  ].filter(pd=>pd.name === picdes)
  const source = (result.length>0)?result[0]['src']:''
  return source
} 
export default DishCard;


