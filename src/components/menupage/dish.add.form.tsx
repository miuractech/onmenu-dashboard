// npm packages direct imports
import { Button, Chip, Dialog, DialogActions, IconButton } from "@material-ui/core";
import Clear from "@mui/icons-material/Clear";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// services imports
import uploadImageToFirebaseStorage from "../../service/utils/upload.image";
import UploadedImage from "../../service/utils/uploadedImage";

// reducers imports

// types imports
import { RootState } from "../../store/store.root";

// global components imports
import UniversalButton from "../global/universal-button";
import Recommendation from "../recommendation";

// hooks imports
import useAddDish from "./hooks/useAddDish";

// styles imports
import styles from "./styles/dish.add.form.module.scss";

// native components imports
import Variant from "./variant";

import VEGICON from "../../images/filter/veg.svg";
// import VEGANICON from "../../images/filter/vegan.svg";
import EGGICON from "../../images/filter/egg.svg";
import CRABICON from "../../images/filter/crab.png";
import LAMBICON from "../../images/filter/lamb.png";
import SHRIMPICON from "../../images/filter/shrimp.svg";
import BEEFICON from "../../images/filter/beef.png";
import CHICKENICON from "../../images/filter/chicken.png";
import DUCKICON from "../../images/filter/duck.png";
import FISHICON from "../../images/filter/fish.png";
import LOBSTERICON from "../../images/filter/lobster.png";
import MUTTONICON from "../../images/filter/mutton.png";
import PORKICON from "../../images/filter/pork.png";
import POULTRYICON from "../../images/filter/poultry.png";
import PRAWNICON from "../../images/filter/prawn.png";
import RABBITICON from "../../images/filter/rabbit.png";
import TURKEYICON from "../../images/filter/turkey.png";
import Options from "./options";
import Addons from "./addons";


const DishForm = ({handleClose,editMode,dish,newIndex}:any) => {
  const { register, handleSubmit, control, formState: { errors },setValue } = useForm();
  const state = useSelector((state: RootState) => state);
  const [imageFile, setImageFile] = React.useState<string | null>(null);
  const [rOpen, setROpen] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedPreference, setSelectedPreference] = useState<any>([])
  const [pictorialDescription, setPictorialDescription] = React.useState<
    Array<string>
  >([]);
  const [recommendation, setRecommendation] = useState<any>([])
  const { addDish } = useAddDish();
  const [addons, setAddons] = useState([])
  // console.log('selectedPreference',selectedPreference);
  
  async function onSubmit(data: any) {
    const newRec = recommendation.map((obj:any)=> {return Object.assign({}, obj)});
    var preference:any = {}
    for (var pref of selectedPreference){
      preference[pref] = data.food_variants[pref]
    }
    // console.log(preference,selectedPreference);
    
    var payload = { ...data,food_variants:preference, pictorialDescription: pictorialDescription,options,recommendation:newRec,addons,index:editMode?dish.index:newIndex};
    payload.images = imageFile?[imageFile]:[];
    var dish_id = editMode?dish.dish_id:uuidv4()
    // console.log(preference);
    await addDish(
      state.restaurant.restaurantId,
      state.menu.activeMenu,
      state.category.activeCategory,
      state.menu.activeMenuType,
      dish_id,
      payload,
      editMode
    );  
    handleClose()
  }
  
  useEffect(() => {
    if(editMode) {
      for (let key of ['dish_name','description','specialty_tags','quantity','search_tags','packingCharge']){
        setValue(key,dish[key])
      }
      // food_variants: food_variants,
      setOptions(dish.options)
      setPictorialDescription(dish.pictorial_description)
      setImageFile(dish.images[0])
      if(dish.recommendation){
        setRecommendation(dish.recommendation)
      }
      if(dish.addons){
        setAddons(dish.addons)
      }
      let pref = []
      let fv:any={}
      for (let k of dish.food_variants){
          pref.push(k.food_preference)
          fv[k.food_preference] = k.price
        }
        setSelectedPreference(pref)
        setValue(`food_variants`, fv)
    }
  }, [editMode])
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file !== undefined) {
        const res = await uploadImageToFirebaseStorage("dish-images", file);
        setImageFile(res);
      } else {
        setImageFile(null);
      }
    }
  }

  function handlePictorialDescription(item: string) {   
    if (pictorialDescription.includes(item) && item) {
      var arr = [...pictorialDescription];
      arr = arr.filter(e => e !== item);
      setPictorialDescription(arr);
    } else {
      setPictorialDescription((prev) => [...prev, item]);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles["form-container"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Name of the Dish: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                {...register("dish_name", { required: true, minLength: 1 })}
              />
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Description: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea 
                style={{ height: "100px" }}
                {...register("description")}
              />
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Specialty tag: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                {...register("specialty_tags", {maxLength:15 })}
              />
            {errors.specialty_tags && 
            <div className={styles["fields-container"]} style={{color: "red"}} >
              specialty tag exceed 15 characters
            </div>
            }
            </div>
          </div>
          
          
          {/* <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Price: </label>
            <div className={styles["fields-container-input"]}>
              <input
                type="number"
                {...register("price", { required: true, min: 1, max: 10000 })}
              />
            </div>
          </div> */}
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Image: </label>
            {imageFile?
              <UploadedImage
              src={imageFile}
              imgProps={{style:{maxHeight:150,maxWidth:150}}}
              style={{display:'inline-block',width:'60%'}}
              remove={()=>setImageFile(null)}
              />
            :
            <label className={styles["upload-custom-btn"]}>
              <input
                type="file"
                className={styles["input"]}
                multiple
                accept="image/*"
                required
                onChange={(e) => handleChange(e)}
              />
              Upload Image
            </label>
            }
          </div>
          {state.menu.activeMenuType ==='take-away' && <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Packing charge: </label>
            <div className={styles["fields-container-textarea"]}>
              <input
              type="number"
              step="0.01"
                {...register("packingCharge", {required: true, min:0 })}
              />
            {errors.packingCharge && 
            <div className={styles["fields-container"]} style={{color: "red"}} >
              Provide valid packing charge
            </div>
            }
            </div>
          </div>}
          <div className={styles["fields-container"]}>
            <div className={styles["pictorial__container"]}>
              {pictorialDescription.map((name)=>(
                <div className={styles["pictorial__container--item"]} style={{ margin:8,cursor:'pointer' }}>
                  <label htmlFor={name} className={styles["pictorial__container--item-label"]}>
                    <input 
                    id={name} 
                    type="checkbox" 
                    name={name} 
                    value={name} 
                    onChange={(e) => handlePictorialDescription(name)}
                    checked={pictorialDescription.includes(name)}
                    />
                    <span>{name} &ensp; X </span> 
                  </label>
              </div>
              ))}
              
            </div>
          </div>
          {/* dghdfhhthdfhb */}
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Pictorial Descriptions: </label>
            <div className={styles["pictorial__container"]}>
               {/* <div className={styles["pictorial__container--item"]} style={{ margin:8,cursor:'pointer' }}> */}
               <div className={styles["fields-container-textarea"]}>
                    <select 
                    onChange={(e) => handlePictorialDescription(e.target.value)}
                    name="pictorial-des" id="" >
                      <option 
                      value={undefined} >Select </option>
                      {PD.filter(({name})=>!pictorialDescription.includes(name)).map(({name})=>(
                        <option value={name}>{name}</option>
                      ))}
                    </select>
                    </div>
                {/* </div> */}
            </div>
          </div>
          <div className={styles["pictorial"]}>
            
            <input type="checkbox" id="allowQ" {...register(`quantity`)} />&ensp;&ensp;
            <label htmlFor='allowQ' style={{ fontSize: "1.5rem" }}>Allow Quantity &ensp; </label>
          </div>
          <div className={styles["pictorial"]} style={{ marginTop: "1.5rem",}}>
            <label style={{ fontSize: "1.5rem" }}>Food preferences </label>
          </div>
          <div className={styles["variants"]} style={{  marginBottom: "1.5rem" }}>
            {selectedPreference.map((preference:any) =>(
                <React.Fragment key={preference}>
                <div className={styles["variants__item"]}>
                <input 
                className={styles["variants__item-input"]} 
                type="checkbox" 
                checked={true}
                onChange={() => setSelectedPreference((pref:any)=>pref.filter((p:any)=>p!==preference))} 
                />
                {/* <label className={styles["variants__item-label"]}>{!show && preference}</label> */}
                
                  <Variant
                    register={register}
                    control={control}
                    variantName={preference}
                  />
                
              </div>
                </React.Fragment>
            ))}
           {Object.keys(variants).map((name)=>(<VariantWrapper
              register={register}
              control={control}
              variantName={name}
              selectedPreference={selectedPreference} 
              setSelectedPreference = {setSelectedPreference}
            />))}
            {/* <div className={styles["fields-container"]}>
           
           <label className={styles["upload-custom-btn"]}>
              <input
                className={styles["input"]}
                onClick={() => setVOpen(true)}
              />
              Add New Food Variants 
            </label>
          </div> */}
          {/* <NewVariantWrapper vOpen={vOpen} setVOpen={setVOpen} /> */}
            {/* <VariantWrapper
              register={register}
              control={control}
              variantName={"Veg"}
            />
            <VariantWrapper
              register={register}
              control={control}
              variantName={"NonVeg"}
            />
            <VariantWrapper
              register={register}
              control={control}
              variantName={"Egg"}
            /> */}
          </div>
          <div className={styles["fields-container"]}>
            <div>
              {/* <div>
                {options.map((opt:any)=>(
                  <div>
                    <div>
                      {opt.title}
                    </div>
                  </div>
                ))}
              </div> */}
              <Options 
              register={register}
              options={options}
              setOptions={setOptions}
              // innerOptions={innerOptions}
              // setInnerOptions={setInnerOptions}
              />
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Search Terms <br /> <small>(use commas to seperate multiple words): </small> </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                style={{ height: "100px" }}
                {...register("search_tags")}
              />
            </div>
          </div>
            <Addons addons={addons} setAddons={setAddons} />
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Recommendation </label>
           <label className={styles["upload-custom-btn"]}>
              <input
                className={styles["input"]}
                onClick={() => setROpen(true)}
              />
              Add Recommendation
            </label>
          </div>
          <div>

{(recommendation.length > 0) && recommendation.map((dish: any)=>(
   <div style={{margin:'14px 0px',width:'100%',maxWidth:400,display:'flex',position: 'relative'}}>
     <div 
       style={{position:'absolute',right:5}}
       >
        <IconButton size='small'
        onClick={()=>{
          var refined = recommendation.filter((d:any)=>d.dish_id !== dish.dish_id);
          setRecommendation(refined)
      }}
        >
          <Clear />
        </IconButton>
       </div>
   {/* <div>
     <img src={dish.images[0]} style={{width:75,borderRadius:8}} alt="" />
   </div> */}
   <div
   style={{
       paddingLeft:15,
       fontSize:14
   }}
   >
       <div 
       style={{marginBottom:8}}
       >
         {dish.dish_name}
       </div>
       <div>
       <Chip label="recommended" color="primary" variant='outlined' size='small' />
       </div>
   </div>
   
 </div>               
))}
</div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "1.5rem 1.5rem 0 1.5rem",
                    }}
                  >
                  <UniversalButton
                    height={40}
                    width={130}
                    selected={true}
                    handleClick={handleSubmit(onSubmit)}
                  >
                    SAVE
                  </UniversalButton>
                  <UniversalButton
                    height={40}
                    width={130}
                    selected={false}
                    handleClick={handleClose}
                  >
                    CLOSE
                  </UniversalButton>
                  </div>
        </form>
          
        {rOpen && 
        <Dialog 
        open={rOpen} 
        onClose={()=>setROpen(false)} 
        aria-labelledby="form-dialog-title" >
            <div style={{padding:16,minWidth:400}} >
              <Recommendation
              recommendation={recommendation}
              setRecommendation={setRecommendation}
              />

            </div>
            <div
            style={{
              display: "flex",
              justifyContent: "right",
              margin: "1.5rem 1.5rem 0 1.5rem",
              marginBottom:50
            }}
          >
          <UniversalButton
            height={40}
            width={130}
            selected={false}
            handleClick={()=>setROpen(false)}
          >
            CLOSE
          </UniversalButton>
          </div>
      </Dialog>}
      </div>
    </>
  );
};

const NewVariantWrapper = ({ register, control, variantName,vOpen, setVOpen }: any) => {
  // const [selectedPreference, setSelectedPreference] = useState(null)
  return (
<>
        <Dialog open={vOpen} onClose={()=>setVOpen(false)} aria-labelledby="form-dialog-variant" >
            <div style={{padding:16,minWidth:400,minHeight:400}} >
            <div className={styles["variants__item"]}>
              <div>
                Select preference &ensp;&ensp;
              </div>
              <select>
              {Object.keys(variants).map(variant=>(
                <option value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>

            </div>
      </Dialog>
 
   </>
  );
};



const VariantWrapper = ({ register, control, variantName,selectedPreference, setSelectedPreference }: any) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
    {variants[variantName].length>1?
      <div>
        <SelectFoodPreference
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
        available={variants[variantName].filter((v:any)=>selectedPreference.indexOf(v) === -1)}
        foodPreference={variantName}
        />
      </div>
      :
      <div className={styles["variants__item"]}>
        {!selectedPreference.includes(variants[variantName][0].name) && <>
      <input className={styles["variants__item-input"]} type="checkbox" onChange={() => {
        // setShow((prev) => !prev)
        setSelectedPreference((pref:any)=>([...pref,variants[variantName][0].name]))
        }} />
      <label className={styles["variants__item-label"]} style={{fontSize: '1.5rem'}} >{variantName}</label>
      {/* {show && (
        <Variant
          register={register}
          control={control}
          variantName={variantName}
        />
      )} */}
      </>}
    </div>}
    </>
  );
};

export default DishForm;


const SelectFoodPreference = ({available,setSelectedPreference,selectedPreference,foodPreference}:any) => {
  const [dopen, setDOpen] = useState(false)

  return (
    <div
    className={styles["variants__item"]}
    
    aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
      <div className={styles["variant"]} onClick={()=>setDOpen(true)}>
      <input className={styles["variants__item-input"]} type="checkbox" checked={false} />
      <label className={styles["variant__label"]} style={{fontSize: '1.5rem'}}> {foodPreference} </label>
        
      </div>
      <Dialog 
      // hideBackdrop
      // modal={false}
        open={dopen} 
        onClose={()=>setDOpen(false)} 
       >
          <div
          style={{padding:16,minWidth:500}}
          >
            <div style={{textAlign: "center",fontSize: "1.5rem" }} >
              Select {foodPreference} preferences
            </div>
            {available
            // .filter((foodPreference:any)=>{
            //   if(!selectedPreference.includes(foodPreference.name)){
            //     return foodPreference
            //   }
            // })
            .map(({name}:any)=>(
              <div className={styles["variants__item"]} style={{margin:16}}>
              <input 
              className={`${styles["variants__item-input"]} padding1`} 
              type="checkbox" 
              checked={selectedPreference.includes(name)}
              onChange={() => {
                if (selectedPreference.includes(name)){
                  setSelectedPreference(selectedPreference.filter((p:any)=>p!==name))
                }
                else{
                  setSelectedPreference([...selectedPreference,name])
                }
              }} 
              />
              <label className={styles["variants__item-label"]}>{name}</label>
              
              {/* {name} */}
              
            </div>
            ))}
          </div>
          <DialogActions>
          <Button 
          variant='contained'
          color='primary'
          onClick={()=>{
            setDOpen(false)
          }} 
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}




 const PD =  [
  {name:'Very spicy'},
  {name:'Spicy'},
  {name:'Gluten free'},
  {name:'Nut free'},
  {name:'Dairy'},
  {name:'Contains nuts'},
  {name:'Dairy free'},
  {name:'Organic'},
  {name:'Vegan'},
  {name:'Low-fat'},
  {name:'Healthy'},
  {name:'Contains eggs'},
  {name:'Eggless'},
  {name:'Keto'},
  {name:'Contains mushrooms'},
  {name:'Contains soybean'},
  {name:'Contains caffeine'}
]


// const variants = [
//       {name:'veg',type:'veg'},
//       {name:'vegan',type:'vegan'},
//       {name:'chicken',type:'non-veg'},
//       {name:'lamb',type:'non-veg'},
//       {name:'fish',type:'sea-food'},
//       {name:'turkey',type:'non-veg'},
//       {name:'prawn',type:'sea-food'},
//       {name:'beef',type:'non-veg'},
//       {name:'duck',type:'non-veg'},
//       {name:'lobster',type:'sea-food'},
//       {name:'mutton',type:'non-veg'},
//       {name:'pork',type:'non-veg'},
//       {name:'poultry',type:'non-veg'},
//       {name:'rabbit',type:'non-veg'},
//       {name:'crab',type:'sea-food'},
//       {name:'egg',type:'egg'},
//   ]


export const variants:any = {
    'veg':[
        {name:'veg',image:VEGICON},
    ],
    'vegan':[
        {name:'vegan',image:VEGICON},
    ],
    'egg':[
        {name:'egg',image:EGGICON},
    ],
    'non-veg':[
        {name:'chicken',image:CHICKENICON},
        {name:'lamb',image:LAMBICON},
        {name:'fish',image:FISHICON},
        {name:'turkey',image:TURKEYICON},
        {name:'prawn',image:PRAWNICON},
        {name:'beef',image:BEEFICON},
        {name:'duck',image:DUCKICON},
        {name:'lobster',image:LOBSTERICON},
        {name:'mutton',image:MUTTONICON},
        {name:'pork',image:PORKICON},
        {name:'poultry',image:POULTRYICON},
        {name:'rabbit',image:RABBITICON},
        {name:'crab',image:CRABICON},
    ],
}