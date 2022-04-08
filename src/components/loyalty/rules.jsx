import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import UniversalButton from '../global/universal-button'
import { useYupValidationResolver } from '../global/yup';
import styles from "../menupage/styles/categories.add.form.module.scss";
import * as yup from "yup";
import { Button, CircularProgress } from '@material-ui/core';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";
import "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const validationSchema = yup.object({
    minVisit: yup.number().min(1).max(500).required('Required'),
    minSpend: yup.number().integer().typeError("Past days must be an integer").min(0).max(100000).required('Required'),
    name:yup.string().min(3,"Minimim length of Program name is 3").max(20,"maximum length of Program name is 20").required('Required'),
    days:yup.number().integer().typeError("Past days must be an integer").min(1,"Minimim number of days is 1").max(200,"Maximum number of days is 200").required('Past days are Required'),
  });
  


export default function Rules() {
    const resolver = useYupValidationResolver(validationSchema);  
    const restaurantId = useSelector((RootState)=>RootState.restaurant.restaurantId)
    const [rules, ruleloading, ruleerror,] = useCollectionDataOnce(
        firebase.firestore().collection('loyalProgram').where('restaurantId', '==', restaurantId).orderBy('timeStamp','desc'),
        {
        //   snapshotListenOptions: { includeMetadataChanges: true },
        });
    const [error, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openNewRule, setOpenNewRule] = useState(false)
    const [deleteSure, setDeleteSure] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm(
        { resolver }
    );
        // console.log(rules);
    const columns = [
        // { field: "time", headerName: "Time", width: 150 },
        { field: "name", headerName: "Name", flexGrow: true },
        { field: "minVisit", headerName: "Minimum Visit", width: 150 },
        { field: "minSpend", headerName: "Minimum Spend", width: 150 },
        { field: "days", headerName: "Past Days", width: 150 },
        { 
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                const getRow = e =>{
                    e.stopPropagation(); // don't select this row after clicking
                    const api = params.api;
                    const thisRow = {};
                    api
                      .getAllColumns()
                      .filter((c) => c.field !== '__check__' && !!c)
                      .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                      );
                    return thisRow
                }
              const onEdit = (e) => {
                const thisRow = getRow(e);
                ['minVisit','minSpend','name','days'].forEach(field=>{
                    setValue(field,thisRow[field])
                })
                setOpenNewRule(true);
                setEditMode(true)
              }
              const onDelete = (e) => {
                const thisRow = getRow(e)
                setDeleteSure(thisRow.name)
              }

              return (
                <>
                <Button variant='outlined' color='primary' size='small' onClick={onEdit}>Edit</Button>
                &ensp;
                <Button variant='outlined' color='secondary' size='small' onClick={onDelete}>Delete</Button>
                </>
              );
            }
        }
      ];
      const success = () => {
        setErrors(null)
        setLoading(false)
        setOpenNewRule(false)
        setEditMode(false)
        window.location.reload()
    }
    const failure = () => {
        setErrors("Something went wrong. please try again!")
        setLoading(false)
    }
    const onSubmit = data => {
        if(rules.filter(rule => rule.name === data.name).length>0 && !editMode) {
            setError("name", {
                type: "manual",
                message: "the Program already exist",
              }); 
        }
        else {
            setLoading(true)    
            if(editMode) {
                firebase.firestore().collection('loyalProgram').where('restaurantId', '==', restaurantId).where('name', '==', data.name).get()
                .then(snap=>{
                    if(!snap.empty && snap.size === 1){
                        snap.forEach(doc=>{
                            doc.ref.update(data)
                        })
                    }
                    success()
                })
                .catch(()=>{
                    failure()
                })
            }else{
                firebase.firestore().collection('loyalProgram').add({...data,restaurantId,timeStamp:firebase.firestore.FieldValue.serverTimestamp()})
                .then(()=>{
                    success()
                })
                .catch(()=>{
                    failure()
                })
            }
        }
    }
    if(ruleerror)(<>Something went wrong. please try again/refresh</>)
    else if(ruleloading)(<CircularProgress />)
    var rows = rules? rules.map((v,id)=>{
        var time =  v.timeStamp? v.timeStamp.toDate().toString('en-IN'):new Date()
        var dateString = time.toString();
        var new_row = {...v,time:dateString,id:id.toString()}
        return new_row
    }):[]
    return (
        <div className={styles.container} style={{minWidth:500,width:'100%'}}>
            <div
            style={{display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:20,}}
            >
                <div>
                    Loyalty {`(${rules?.length} of 3)`}
                </div>
                {rules?.length<3 && <UniversalButton
                height={40}
                width={130}
                selected={true}
                handleClick={()=>{setOpenNewRule(true)}}
                >
                    Add new rule
                </UniversalButton>}
            </div>
            <br />
            {rules && <DataGrid rows={rows} columns={columns} style={{minHeight:260}} rowsPerPageOptions={[10]} page={1} />}
             <Dialog
             open={openNewRule}
             onClose={()=>setOpenNewRule(false)}
             >
                 <form 
                className={styles.container}
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div
                    style={{textAlign:'center',fontWeight:700,fontSize:20,}}
                    >
                        <span>
                            Add New Program &ensp; &ensp;
                        </span>
                    </div>
                    <div
                    className={styles["form-container"]}
                    >
                        <div className={styles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Program Name </label>
                            <div className={styles["fields-container-textarea"]}>
                                <textarea
                                // @ts-ignore: Unreachable code error
                                    {...register('name', { required: true})}
                                />
                                {
                                // @ts-ignore: Unreachable code error
                                errors.name?.message && 
                                    <div className={styles["fields-container-textarea--required"]}>
                                    {errors.name.message}
                                    </div>
                                   
                                }
                            </div>
                            
                        </div>
                        <div className={styles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Minimum Visit </label>
                            <div className={styles["fields-container-textarea"]}>
                                <textarea
                                // @ts-ignore: Unreachable code error
                                    {...register('minVisit', { required: true})}
                                />
                                {
                                // @ts-ignore: Unreachable code error
                                errors.minVisit && 
                                    <div className={styles["fields-container-textarea--required"]}>
                                    Enter valid limit (1-500)
                                    </div>
                                }
                            </div>
                            
                        </div>
                        <div className={styles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Minimum Spend </label>
                            <div className={styles["fields-container-textarea"]}>
                                <textarea
                                // @ts-ignore: Unreachable code error
                                    {...register('minSpend', { required: true})}
                                />
                                {
                                // @ts-ignore: Unreachable code error
                                errors.minSpend && 
                                    <div className={styles["fields-container-textarea--required"]}>
                                    Enter valid spend amount (₹1 - ₹1,00,000)
                                    </div>
                                }
                            </div>
                            
                            
                        </div>
                        <div className={styles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Past Days </label>
                            <div className={styles["fields-container-textarea"]}>
                                <textarea
                                // @ts-ignore: Unreachable code error
                                    {...register('days', { required: true})}
                                />
                                {
                                // @ts-ignore: Unreachable code error
                                errors.days && 
                                    <div className={styles["fields-container-textarea--required"]}>
                                    {/* Enter valid past days (past 1 - 200 days) */}
                                    {errors.days.message}
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
                            selected={false}
                            handleClick={()=>{
                                setOpenNewRule(false)
                                setEditMode(false)
                            }}
                            >
                                Cancel
                            </UniversalButton>
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
                                    
                                    type="submit"
                                >
                                    SAVE
                                </UniversalButton>
                            }
                        </div>
                </form>
             </Dialog>

             <Dialog
             open={Boolean(deleteSure)}
             onClose={()=>setDeleteSure(false)}
             >
                 <div
                 className={styles.container}
                 >
                     <div
                     style={{textAlign: "center",fontSize: 20}}
                     >
                         Are you sure you want to delete?
                     </div>
                     <br />
                     <br />
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
                            handleClick={()=>setDeleteSure(null)}
                            >
                                Cancel
                            </UniversalButton>
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
                                    handleClick={()=>{
                                        setLoading(true);                                     
                                        firebase.firestore().collection('loyalProgram').where('restaurantId','==',restaurantId).where('name','==',deleteSure).get()
                                        .then(snap=>{
                                            if(!snap.empty && snap.size === 1){
                                                snap.forEach(doc=>{
                                                    doc.ref.delete()
                                                })
                                            }
                                            setDeleteSure(null)
                                            setLoading(false); 
                                            window.location.reload()
                                        })
                                        .catch(error=>{
                                            failure()
                                        })
                                    }}
                                    // type="submit"
                                >
                                    Delete
                                </UniversalButton>
                            }
                        </div>
                 </div>
             </Dialog>
        </div>
    )
}


