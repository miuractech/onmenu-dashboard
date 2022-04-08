import React from "react";
import styles from "./styles/timing.module.scss";
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";

interface IProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  day: string;
  editable: Array<any>;
}

const Timing: React.FC<IProps> = ({ register, day, control, editable }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: day,
  });

  React.useEffect(() => {
    if (editable.length > 0) {
      const newArr: Array<any> = [];
      editable.forEach((e) => {
        const obj = {
          to: { hour: e.to.hour, minute: e.to.minute, ampm: e.to.ampm },
          from: { hour: e.from.hour, minute: e.from.minute, ampm: e.from.ampm },
        };
        newArr.push(obj);
      });
      append(newArr);
    }
  }, []);
  // console.log(editable)
  return (
    <div className={styles["timing"]}>
      <div className={styles["timing__item"]}>
        <label className={styles["timing__item--day"]}>{day}: </label>
        <div>
          {fields.map(({ id }, index) => (
            <div className={styles["timing__item-item"]} key={id}>
              
                {/* <label style={{ width: "50px" }}>From: </label>
                <label>Hour</label> */}
                {/* <input
                  style={{ width: "50px" }}
                  type="number"
                  {...register(`${day}[${index}].from.hour`, {
                    required: true,
                    min: 0,
                    max: 11,
                  })}
                /> */}
                 <div>  
                    <label htmlFor="start">
                      starting time &ensp;
                    </label>
                  <input 
                  type="time"
                  step={600} 
                  defaultValue={editable[0]?.from}
                  {...register(`${day}.from`, {
                    required: true,
                    min: 0,
                    max: 11,
                  })}
                  />
              
                {/* <label className={styles["timing__item-item--label"]}>:</label> */}
                {/* <input
                  style={{ width: "50px" }}
                  type="number"
                  {...register(`${day}[${index}].from.minute`, {
                    required: true,
                    min: 0,
                    max: 59,
                  })}
                /> */}
                {/* <select
                  className={styles["timing__item-item--select"]}
                  defaultValue="am"
                  {...register(`${day}[${index}].from.ampm`)}
                >
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select> */}
              </div>
            
                {/* <label>Hour</label> */}
                {/* <input
                  style={{ width: "50px" }}
                  type="number"
                  {...register(`${day}[${index}].to.hour`, {
                    required: true,
                    min: 0,
                    max: 11,
                  })}
                /> */}
                {/* <label className={styles["timing__item-item--label"]}>:</label> */}
                {/* <input
                  style={{ width: "50px" }}
                  type="number"
                  {...register(`${day}[${index}].to.minute`, {
                    required: true,
                    min: 0,
                    max: 59,
                  })}
                />
                <select
                  className={styles["timing__item-item--select"]}
                  defaultValue="am"
                  {...register(`${day}[${index}].to.ampm`)}
                >
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select> */}
                <div>  
                    <label htmlFor="start">
                      ending time &ensp;
                    </label>
                  <input 
                  type="time"
                  step={600} 
                  defaultValue={editable[0]?.to}
                  {...register(`${day}.to`, {
                    required: true,
                    min: 0,
                    max: 11,
                  })}
                  />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button
        className={styles["timing__button"]}
        type="button"
        onClick={() => append({})}
      >
        +
      </button>
      <button
        className={styles["timing__button"]}
        type="button"
        onClick={() => remove(fields.length - 1)}
      >
        -
      </button> */}
    </div>
  );
};

export default Timing;
