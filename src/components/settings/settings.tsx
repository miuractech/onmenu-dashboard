import React, { HTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store.root'
import styles from "../menupage/styles/categories.add.form.module.scss";
import firebase from "firebase/app";
import uploadImageToFirebaseStorage from '../../service/utils/upload.image';
import UploadedImage from '../../service/utils/uploadedImage';
import UniversalButton from '../global/universal-button';
import { Alert, CircularProgress } from '@mui/material';
import { Dialog, Snackbar } from '@material-ui/core';
import { useYupValidationResolver } from '../global/yup';
import * as yup from "yup";
import { setUser } from '../../store/user/slice';
import { Redirect } from 'react-router-dom';
// import { MultiRestaurantHandler } from '../../App';

const simpleFields = [
    {field:'corporateName',name:'Corporate Name',options:{required:true}},
    {field:'fssai',name:'Fssai Number',options:{required:true}},
    {field:'address',name:'Address',options:{required:true}},
    {field:'area',name:'Area',options:{required:true}},
    {field:'latitude',name:'Latitude',options:{required:true}},
    {field:'longitude',name:'Longitude',options:{required:true}},
    {field:'razorpayId',name:'Razorpay Id',options:{required:true}},
    {field:'serviceCharge',name:'Service Charge',options:{required:true}},
    {field:'mobile',name:'Mobile Number',options:{required:true}},
    {field:'whatsapp',name:'Whatsapp Number',options:{required:true}},
]

export default function Index() {
    const { register, setValue , handleSubmit,formState: { errors } } = useForm();
    const restaurant = useSelector((state:RootState) => state.restaurant)
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [newMailOpen, setNewMailOpen] = React.useState<boolean>(false)
    const [staffEmail, setStaffEmail] = React.useState<Array<string>>([])
    const [error, setError] = React.useState<string | null>(null)
    // console.log(restaurant);
    
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files) {
        const file = e.target.files[0];
        if (file !== undefined) {
          const res = await uploadImageToFirebaseStorage("restaurant", file);
          setImageFile(res);
        } else {
          setImageFile(null);
        }
      }
    }
    const onSubmit = (data:any) => {
        setLoading(true);
        var target = {...restaurant,...data,logo:imageFile,published:true,tag:''}
        delete target.menus
        // console.log(data,target);
        
        firebase.firestore().collection('restaurants').doc(restaurant.restaurantId).update(target)
        .then(()=>{
            setLoading(false)
            setError(null)
            window.location.reload()
        })
        .catch(() => {
            setError('something went wrong')
        })
    }
    
    useEffect(() => {
        for (var element of simpleFields){
            // @ts-ignore: Unreachable code error
            // console.log(restaurant[element.field]);
            
            // @ts-ignore: Unreachable code error
            setValue(element.field,restaurant[element.field])
        }
        firebase
        .firestore()
        .collection('roles')
        .where('restaurantId','==',restaurant.restaurantId)
        .where('role','==','staff')
        .get()
        .then((snap)=>{
            if(!snap.empty){
                var emails: any[] = []
                snap.forEach(doc => {
                    var { email } = doc.data()
                    emails.push(email)
                })
                setStaffEmail(emails)
            }
            setError(null)
        })
        .catch(() => {
            setError('something went wrong')
        })
        if(restaurant.logo){
            setImageFile(restaurant.logo)
        }
    }, [])
    
    return (
        <div className={styles.container}>
            <div
            style={{textAlign:'center',fontWeight:700,fontSize:20}}
            >
                {restaurant.name}
            </div>
            <form
            className={styles["form-container"]}
            // onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles["fields-container"]}>
                    <label style={{ fontSize: "1.5rem" }}>Logo: </label>
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
                        Upload Logo
                    </label>
                    }
                </div>
                {simpleFields.map((element:any)=>(
                    <div className={styles["fields-container"]}>
                        <label style={{ fontSize: "1.5rem" }}>{element.name} </label>
                        <div className={styles["fields-container-textarea"]}>
                        <textarea
                            // defaultValue={selectedCategoryDetails?.name}
                            {...register(element.field,element.options)}
                        />
                        {errors[element] && 
                            <div className={styles["fields-container-textarea--required"]}>
                            {element.name} is required
                            </div>
                        }
                        </div>
                    </div>
                ))}
                {loading?
                <UniversalButton
                    height={40}
                    width={130}
                    selected={true}
                    // type="submit"
                >
                   <CircularProgress style={{color: "white"}} size={20} />
                </UniversalButton>
                :
                <UniversalButton
                    height={40}
                    width={130}
                    selected={true}
                    handleClick={handleSubmit(onSubmit)}
                    // type="submit"
                >
                    SAVE
                </UniversalButton>
            }
            </form>
            <div
            className={styles["form-container"]}
            >
                <div
                style={{textAlign:'center',fontWeight:700,fontSize:20,}}
                >
                    <span>
                        Staff Email &ensp; &ensp;
                    </span>
                   {staffEmail.length<4 && <UniversalButton 
                   height={40}
                   width={130}
                   selected={true}
                   handleClick={()=>setNewMailOpen(true)}
                   >
                    Add Email
                   </UniversalButton>}
                   <br />
                   <br />
                </div>
                <NewEmployeeEmail newMailOpen={newMailOpen} setNewMailOpen={setNewMailOpen} />
                
                <div>
                    {staffEmail.map((email:string)=>(
                        <div
                        style={{margin:8}}
                        >
                            <span
                            style={{fontSize:16}}
                            >
                                {email}
                            </span>
                            &ensp;
                            &ensp;
                            &ensp;
                            &ensp;
                            <span>
                            <UniversalButton 
                            height={40}
                            width={130}
                            selected={false}
                            handleClick={()=>{
                                firebase
                                .firestore()
                                .collection('roles')
                                .where('email','==',email)
                                .get()
                                .then(snap=>{
                                    if(!snap.empty){
                                        setError(null)
                                        snap.forEach(doc=>{
                                            doc.ref.delete().then(()=>{
                                                window.location.reload()
                                            })
                                        })
                                    }

                                })
                                .catch(()=>{
                                    setError('Something went wrong, Try again')
                                })
                            }}
                            >
                                Delete
                            </UniversalButton>
                            </span>
                        </div>
                    ))}
                </div>
             </div>
             <br />
                <br />
                <br />
                <br />
                {user.multiRestaurant.length>1 && 
                <UniversalButton 
                        height={40}
                        width={130}
                        selected={true}
                        type="submit"
                        handleClick={()=>{
                            dispatch(setUser(null))
                            localStorage.removeItem('restaurantId')
                            document.location.href="/";
                        }}
                        >
                            Switch Restaurant
                        </UniversalButton>}
             {/* <MultiRestaurantHandler /> */}
             <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={()=>setError(null)}  >
                <Alert variant="filled" onClose={()=>setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}


const validationSchema = yup.object({
    email: yup.string().email().required("Required"),
  });
  
interface NewEmployeeEmailprops extends HTMLAttributes<HTMLElement> {
    newMailOpen: boolean;
    setNewMailOpen:any;
}
  

const NewEmployeeEmail = ({newMailOpen,setNewMailOpen}:NewEmployeeEmailprops) => {
    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit,formState: { errors } } = useForm({ resolver });
    const restaurantId = useSelector((state:RootState)=> state.restaurant.restaurantId)
    const [error, setError] = React.useState<null|string>(null)
    const onSubmit = (data:any) => {
        const { email } = data

        firebase
        .firestore()
        .collection('roles')
        .where('email','==',email)
        .get()
        .then(snap =>{
            if(snap.empty){
                firebase.firestore().collection('roles').add({ email,restaurantId,role:'staff'})
                .then(() =>{
                    setError(null)
                    setNewMailOpen(false)
                    window.location.reload()
                })
                .catch(() =>{
                    setError('someting went wrong, Try again.')
                })
            }
            else{ 
                setError('email already in use')
            }
        })
        .catch(err=>{
            setError('someting went wrong')
        })
        
    }
    return(
        <Dialog
        // hideBackdrop
            open={newMailOpen} 
            onClose={()=>setNewMailOpen(false)} 
        >
                <form 
                className={styles.container}
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div
                    style={{textAlign:'center',fontWeight:700,fontSize:20,}}
                    >
                        <span>
                            Add New Email &ensp; &ensp;
                        </span>
                    </div>
                    <div
                    className={styles["form-container"]}
                    >
                        <div className={styles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Email </label>
                            <div className={styles["fields-container-textarea"]}>
                                <textarea
                                // @ts-ignore: Unreachable code error
                                    {...register('email', { required: true})}
                                />
                                {
                                // @ts-ignore: Unreachable code error
                                errors.email && 
                                    <div className={styles["fields-container-textarea--required"]}>
                                    Enter valid email 
                                    </div>
                                }
                            </div>
                            
                        </div>
                        {error && 
                        <span
                        style={{color:'red'}}
                        >
                            {error}
                        </span>
                        }
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
                        selected={false}
                        handleClick={()=>setNewMailOpen(false)}
                        >
                            Cancel
                        </UniversalButton>
                        <UniversalButton 
                        height={40}
                        width={130}
                        selected={true}
                        type="submit"
                        >
                            Add Email
                        </UniversalButton>
                    </div>
                </div>
                
            </form>
        </Dialog>
    )
}
  