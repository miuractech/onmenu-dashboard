import { IconButton } from "@material-ui/core"
import Clear from "@mui/icons-material/Clear"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { variants } from "./dish.add.form";
import styles from "./styles/dish.add.form.module.scss";
import { v4 as uuidv4 } from "uuid";
import './option.css'

export default ({addons, setAddons}) => {
    
    const { register:register3, handleSubmit:handleSubmit3, setValue:setValue2, getValues:getValues2, reset:reset2, formState: {errors:errors3} } = useForm()
    const addAddon = data =>{
        var id = uuidv4()
        setAddons([...addons,{...data,id}])
        reset2({name:'',price:'',preference:''})
    }
    return(
        <div
        style={{ margin: "15px auto 30px auto"}}
        >
            <div className={styles["pictorial"]} style={{ margin: "1.5rem auto",}}>
                <label style={{ fontSize: "1.5rem"}}>Addons </label>
            </div>
            <table
                style={{width:'100%',margin:'auto'}}
                >
                {(addons.length>0) && <thead 
                // style={{ display: "flex", justifyContent: "space-between"}}
                
                >
                    <tr>
                    <td
                        style={{marginBottom:8 }}
                        >
                            
                        </td>
                        <td
                        style={{marginBottom:8 }}
                        >
                            Preference
                        </td>
                        <td
                        style={{marginBottom:16  }}
                        >
                            Name
                        </td>
                        <td
                        style={{marginBottom:16  }}
                        >
                            Price
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>}
                <tbody>

                    {addons.map((inner, i) =>(
                        <tr 
                        // style={{ display: "flex", justifyContent: "space-between",alignItems:'flex-start'}}
                        >
                            <td
                            style={{marginBottom:16 }}
                            >
                                {i+1}
                            </td>
                            <td
                            style={{marginBottom:16 }}
                            >
                                {inner.preference}
                            </td>
                            <td
                            style={{marginBottom:16  }}
                            >
                                {inner.name}
                            </td>
                            <td
                            style={{marginBottom:16  }}
                            >
                                {inner.price}
                            </td>
                            <td>
                                <IconButton size='small'
                                onClick={()=>{
                                    var filtered = addons.filter(v=>v.id !== inner.id)
                                    setAddons(filtered)
                                }}
                                >
                                    <Clear />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>

            </table>
            <div
            
            >
                <form 
                
                
                >
                    <div 
                    className={styles["variant__container--price"]} 
                    style={{ display: "flex", justifyContent: "space-around"}}
                    >
                        <div
                        style={{width:60}}
                        >
                                <label>&ensp;</label>
                            <div>
                                <select 
                                name="preference"  
                                style={{height:28,}}
                                {...register3("preference")}
                                className='option-input'   
                                >
                                    {Object.keys(variants).map(variant=>(
                                        <option value={variant}>
                                            {variant}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div
                        // style={{margin:8}}
                        >
                            <label>Name</label>
                        <div>
                            <input
                                type="text"
                                style={{height:28,}}
                                {...register3(`name`, {
                                required: true,
                                min: 1,
                                })}
                                className='option-input'   
                            />
                            </div>
                        </div>
                        <div
                        style={{width:50}}
                        >
                                <label>Price</label>
                            <div>
                            <input
                                type="number"
                                style={{height:28,width:48}}
                                {...register3(`price`, {
                                required: true,
                                min: 1,
                                })}
                                className='option-input'   
                            />
                            </div>
                        </div>
                        <div
                        // style={{margin:8}}
                        >
                                <label>&ensp;</label>
                            <div>
                            <input
                                type="submit"
                                value = ' Add '
                                style={{
                                    backgroundColor:'#0094ff',
                                    color:'#fff',
                                    height:28,
                                    padding:'4px 8px',
                                    border:'none',
                                    borderRadius:4,
                                    margin:2

                                }}
                                onClick={handleSubmit3(addAddon)}
                                // {...register(`maxallow`, {
                                // required: true,
                                // min: 1,
                                // })}
                            />
                            </div>
                        </div>
                    </div>
                        {/* {innerError && <div style={{ color:'red' }}>
                            Add atleast one option before submit
                        </div> } */}
                </form>
                </div>
        </div>
    )
  }
  