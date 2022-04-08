// npm packages direct imports
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// global components imports
import UniversalButton from "../global/universal-button";

// styles imports
import styles from "./styles/menu.add.form.module.scss";

// native components imports
// import Timing from "./timing";
// @ts-ignore
import TimeRangeSlider from 'react-time-range-slider';
import { v4 as uuidv4 } from "uuid";
import addNewMenu from "../../service/menu/menu.add.one.service";
import uploadImageToFirebaseStorage from "../../service/utils/upload.image";
import { addMenu } from "../../store/menu/slice";
import { RootState } from "../../store/store.root";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
// hooks imports
import useAddMenu from "./hooks/useAddMenu";
import UploadedImage from "../../service/utils/uploadedImage";
interface IProps {
  handleClose: () => void;
  newIndex: number;
}

const MenuAddForm: React.FC<IProps> = ({ handleClose, newIndex }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [imageFile, setImageFile] = React.useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<Array<any>>([])
  async function onSubmit(data: any) {
    const payload = { ...data};
    const menuId = uuidv4();
    const document = {
      name: payload.menuName,
      type: state.menu.activeMenuType,
      menuId: menuId,
      restaurantId: state.restaurant.restaurantId,
      published: 'created',
      // image: imageFile,
      timing: {
        Monday: process_time(selectedDays,'Monday'),
        Tuesday: process_time(selectedDays,'Tuesday'),
        Wednesday: process_time(selectedDays,'Wednesday'),
        Thursday:  process_time(selectedDays,'Thursday'),
        Friday: process_time(selectedDays,'Friday'),
        Saturday:  process_time(selectedDays,'Saturday'),
        Sunday:  process_time(selectedDays,'Sunday'),
      },
      description: payload.description,
      index:newIndex
    };
    // console.log(document);
    
    await addNewMenu(
      state.restaurant.restaurantId,
      state.menu.activeMenuType,
      menuId,
      document
    );
    dispatch(addMenu(document));
    setSuccessMessage(true);
    handleClose()
    setTimeout(() => setSuccessMessage(false), 3000);
  }
  // useEffect(() => {
  //   if(editMode){

  //   }
  //   return () => {
      
  //   }
  // }, [])
//   [
//     {
//         "day": "Sunday",
//         "start": "11:00",
//         "end": "18:00"
//     }
// ]
console.log(selectedDays);

async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.files) {
    const file = e.target.files[0];
    if (file !== undefined) {
      const res = await uploadImageToFirebaseStorage("menu-images", file);
      setImageFile(res);
    } else {
      setImageFile(null);
    }
  }
}
  return (
    <>
      <div className={styles.container}>
        <form
          className={styles["form-container"]}
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Name of the Menu: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                {...register("menuName", { required: true, minLength: 1 })}
              />
              {errors?.menuName?.type === "required" && (
                <div className={styles["fields-container-textarea--required"]}>
                  Menu Name is required
                </div>
              )}
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Description: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                style={{ height: "100px" }}
                {...register("description")}
              />
              {errors?.description?.type === "required" && (
                <div className={styles["fields-container-textarea--required"]}>
                  Description is required
                </div>
              )}
            </div>
          </div>
          <div className={styles["fields-container"]}>
            {/* <label style={{ fontSize: "1.5rem" }}>Menu Image: </label>
            <div className={styles["fields-container-textarea"]}>
              {imageFile?
                  <UploadedImage
                  src={imageFile}
                  imgProps={{style:{maxHeight:150,maxWidth:150}}}
                  style={{display:'inline-block',width:'60%'}}
                  remove={()=>setImageFile(null)}
                  />
                :
                <label 
                className={styles["upload-custom-btn"]}
                style={{height:40}}
                >
                  <input
                    type="file"
                    className={styles["input"]}
                    // multiple
                    accept="image/*"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                  Upload Image
                </label>
                }
            </div> */}
          </div>
         {days.map(day =>(
          <div style={{ margin: 12 }}>
            <div style={{display:'flex',alignContent:'center'}} >
              <input 
              type="checkbox" 
              name={day}
              onChange={e=>{
                if(e.target.checked){
                  const now = new Date()
                  const from = now.setHours(9,0,0)
                  const to = now.setHours(11,0,0)
                  setSelectedDays([...selectedDays,{day,from,to}])
                }else{
                  var newDays = [...selectedDays]
                  var update = newDays.filter(n=>n.day!==day)
                  setSelectedDays(update)
                } 
              }}
              />
              &ensp;
              {day}
            </div>
            { selectedDays.filter(n=>n.day===day).length>0 && 
            <div style={{display:'flex',alignContent:'center',justifyContent:'space-around'}} >
              <div>  
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="From"
                    value={selectedDays.filter(n=>n.day===day)[0]['from']}
                    minutesStep={1}
                    onChange={e=>{
                      var target = selectedDays.filter(n=>n.day===day)[0]
                      var rest = selectedDays.filter(n=>n.day!==day)                     
                      target['from'] =e
                      
                      setSelectedDays([...rest,target])                  
                    }} 
                    renderInput={(params) => <TextField style={{margin:5}} size='small' {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="To"
                    minutesStep={1}
                    value={selectedDays.filter(n=>n.day===day)[0]['to']}
                    onChange={e=>{
                      var target = selectedDays.filter(n=>n.day===day)[0]
                      var rest = selectedDays.filter(n=>n.day!==day)                     
                      target['to'] =e
                      setSelectedDays([...rest,target])                  
                    }} 
                    renderInput={(params) => <TextField style={{margin:5}} size='small'  {...params} />}
                  />
                </LocalizationProvider>
              </div>
              {/* <TimeRangeSlider
                    disabled={false}
                    format={12}
                    maxValue={"23:59"}
                    minValue={"06:00"}
                    name={"time_range"}
                    // onChangeStart={this.changeStartHandler}
                    // onChangeComplete={this.changeCompleteHandler}
                    onChange={(newtime:any)=>{
                      const {start,end} = newtime;
                      var {hr, min, ampm} = str_to_hma(start);
                      setValue(`${day[0]}.from.hour`,hr)
                      setValue(`${day[0]}.from.minute`,min)
                      setValue(`${day[0]}.from.ampm`,ampm)
                      var {hr, min, ampm} = str_to_hma(end);
                      setValue(`${day[0]}.from.hour`,hr)
                      setValue(`${day[0]}.from.minute`,min)
                      setValue(`${day[0]}.from.ampm`,ampm)

                    }}
                    step={15}
                    // value={{
                    //   start:`${register[day].from.hour}:register[day]}[1].from.minute]`
                    // }}
                    /> */}
            </div>
            }
          </div>
         ))}
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
      </div>
    </>
  );
};

export default MenuAddForm;


export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const str_to_hma = (time: string) => {

  const [t, ampm] = time.split(' ')
  const [hr,min] = t.split(':')
  return {hr,min,ampm}
}
const test=  [{
         "day": "Sunday",
        "start": "11:00",
        "end": "18:00"
   }]

const process_time = (time:Array<any>,day:string) => {
  var payload = Object()
  const target = time.filter((t)=>t.day === day)
  if (target.length >0){
    const { from, to } = target[0]
    payload['from'] = from 
    payload['to'] = to
    return [payload]
  }
  else{
    return []
  }
   

}

