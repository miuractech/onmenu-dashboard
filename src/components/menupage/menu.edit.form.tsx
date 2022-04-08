// npm packages direct imports
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// reducers imports
// import { setShowMenuEditForm } from "../../store/menu/slice";

// global components imports
// import FixedBackGround from "../global/fixed-transparent-background";
import UniversalButton from "../global/universal-button";

// styles imports
import styles from "./styles/menu.add.form.module.scss";

// native components imports
import Timing from "./timing";

// hooks imports
import useMenuEdit from "./hooks/useMenuEdit";
import SnackBarMessage from "./snackbar.message";
import { days } from "./menu.add.form";
// import { DialogContent } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

interface IProps {
  handleClose: () => void;
}

const MenuEditForm: React.FC<IProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm();
  const {
    onSubmit,
    handleChange,
    selectedMenuDetails,
    successMessage,
  } = useMenuEdit();
  const [selectedDays, setSelectedDays] = useState<Array<any>>([])
  // console.log(selectedMenuDetails);
  // console.log(Monday,
  //   Tuesday,
  //   Wednesday,
  //   Thursday,
  //   Friday,
  //   Saturday,
  //   Sunday,);

  useEffect(() => {
    var target: any[] = []
    // @ts-ignore: Unreachable code error
    Object.keys(selectedMenuDetails?.timing).map(day=>{
      // @ts-ignore: Unreachable code error
      if(selectedMenuDetails?.timing[day][0]?.from){
        // @ts-ignore
        // console.log('selectyed',selectedMenuDetails.timing[day][0]);
        // @ts-ignore
        var { from, to } = selectedMenuDetails.timing[day][0]
        // console.log('from,to',typeof(from),typeof(to));
        if(typeof(from) === 'number'){
          from = new Date(from)
        }else if(from instanceof Object){
          from = from.toDate()
        }
        if(typeof(to) === 'number'){
          to = new Date(to)
        }else if(to instanceof Object){
          to = to.toDate()
        }
            // console.log('from,to',from,to);
            
            // @ts-ignore
            target.push({day,from,to})
          
        
      }
    });
    setSelectedDays(target)
    // console.log(target);
    
    
    // setSelectedDays([selectedMenuDetails?.timing]);
  }, [])

  const submitFunc =(data:any) => {
    var target = {
      ...data,
      published:selectedMenuDetails?.published,
      index:selectedMenuDetails?.index,
      timing: {
        Monday: process_time(selectedDays,'Monday'),
        Tuesday: process_time(selectedDays,'Tuesday'),
        Wednesday: process_time(selectedDays,'Wednesday'),
        Thursday:  process_time(selectedDays,'Thursday'),
        Friday: process_time(selectedDays,'Friday'),
        Saturday:  process_time(selectedDays,'Saturday'),
        Sunday:  process_time(selectedDays,'Sunday'),
      },
    }
    
    onSubmit(target);
  }
  
  return (
    <>
      <div className={styles.container}>
        <form
          className={styles["form-container"]}
          // onSubmit={handleSubmit(submitFunc)}
        >
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Name of the Menu: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                defaultValue={selectedMenuDetails?.name}
                {...register("menuName", { required: true, minLength: 1 })}
              />
              {errors?.menuName?.type === "required" && (
                <div className={styles["fields-container-textarea--required"]}>
                  MenuName is required
                </div>
              )}
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Description: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                defaultValue={selectedMenuDetails?.description}
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
          
          <label style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Timings:
          </label>
         
          {days.map(day =>(
          <div key={day} style={{ margin: 12 }}>
            <div style={{display:'flex',alignContent:'center'}} >
              <input 
              type="checkbox" 
              name={day}
              checked={selectedDays.filter(d=>d.day === day).length>0}
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
                {/* <label htmlFor="end">
                  ending time &ensp;
                </label> */}
                {/* <input 
                type="time"
                name={'end'}
                value={selectedDays.filter(n=>n.day===day)[0]['to']}
                onChange={e=>{
                  var target = selectedDays.filter(n=>n.day===day)[0]
                  var rest = selectedDays.filter(n=>n.day!==day)
                  console.log(new Date(e.target.value));
                  
                  target['to'] =new Date(e.target.value)
                  setSelectedDays([...rest,target])                  
                }} 
                step={600} 
                id="" /> */}
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
              handleClick={handleSubmit(submitFunc)}
              // disabled={!isDirty}
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
      <SnackBarMessage
        open={successMessage}
        message="Menu updated successfully"
        severity="success"
      />
    </>
  );
};

export default MenuEditForm;


const process_time = (time:Array<any>,day:string) => {
  var payload = Object()
  const target = time.filter((t)=>t.day === day)
  // console.log('target',target);
  
  if (target.length >0){
    const { from, to } = target[0]
    console.log(from ,to);
    
    payload['from'] = from
    payload['to'] = to
    // console.log('payload',payload);
    return [payload]

  }
  else{
    return []
  }
   

}