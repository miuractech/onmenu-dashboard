import React from 'react'
import DataComponent from '../datagrid/DataGrid';
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector } from 'react-redux';
import { dateOptions } from '../currentUser';
import styles from "../menupage/styles/categories.add.form.module.scss";
import { Chip, CircularProgress, Tooltip } from '@material-ui/core';

const columns = [
    { field: "dateString", headerName:<b style={{fontWeight:700,fontSize:14}} >Time</b>, width: 150 },
    { field: "userName", headerName:<b style={{fontWeight:700,fontSize:14}} >Name</b>, width: 150 },
    { field: "program", headerName: <b style={{fontWeight:700,fontSize:14}} >Program</b>, width: 450, renderCell: (params) => {
        // const getRow = e =>{
        //     e.stopPropagation(); // don't select this row after clicking
        //     const api = params.api;
        //     const thisRow = {};
        //     api
        //       .getAllColumns()
        //       .filter((c) => c.field !== '__check__' && !!c)
        //       .forEach(
        //         (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
        //       );
        //     return thisRow
        // }

      return (
        <>
        {params.row.programs.map(({program,spend,visit})=>(
            <>
            <Tooltip title={<h2>{`spend:₹${spend} visit:${visit}`}</h2>} >
                <Chip variant='outlined' color='primary' size='small' label={program} />    
            </Tooltip>
            </>
        ))}
        </>
      );
    } },
    { field: "mobile", headerName:<b style={{fontWeight:700,fontSize:14}} >Mobile</b> , width: 150 },
  ];


const filterConfig = [
    { 
        name:'Name',
        field:'userName',
        type:'text',
    },
    { 
        name:'Mobile Number',
        field:'mobile',
        type:'text',
        valueGetter:(text)=>{
            if(text.length===10){
                return '+91'+text
            }else if(text.length===13 && text.substring(0,3)==='+91'){
                return text
            }else return ''
        },

    },
]


const rowManupulate = [
    {
        name:'timeStamp',
        valueGetter:cell=>cell.toDate().toLocaleString(undefined,dateOptions)
    },
    // {
    //     name:'loyalty',
    //     valueGetter:cell=>cell?.programs?cell.programs.map(prog=>prog.program).join(","):""
    // }
] 


export default function LoyalCustomer() {

    const restaurantId = useSelector((state)=>state.restaurant.restaurantId)
    var timeNow = new Date(firebase.firestore.Timestamp.now().toDate())
    timeNow.setHours(timeNow.getHours() - 4);
    const defaultQuery = firebase.firestore().collection('loyalUser')
    .where('restaurantId','==',restaurantId)
        
    return (
        <DataComponent
        columns={columns}
        defaultQuery={defaultQuery}
        row_size={10}
        filterConfig={filterConfig}
        rowManupulate={rowManupulate}
        querySuffix={{
            name:'timeStamp',
            ascdes:'desc'
        }}
        />

    )
}







// export default function LoyalCustomer() {
//     const restaurantId = useSelector((RootState)=>RootState.restaurant.restaurantId)
//     const [page, setPage] = useState(0)
//     const [rowSize, setRowSize] = useState(1)
//     const {
//         loading,
//         loadingError:error,
//         loadingMore,
//         loadingMoreError,
//         hasMore,
//         items:value,
//         loadMore
//         } = usePagination(
//         firebase.firestore().collection('loyalUser').where('restaurantId', '==', restaurantId).orderBy('timeStamp','desc'),
//         {
//             limit: row_size
//         }
//         );
//         const next = dir => {
//         setPage(prev=>{
//             if(prev<dir && hasMore){
//                 loadMore()
//             }
//             return dir
//         })
//     }
//     useEffect(() => {
//         if(value){
//             setRowSize(r=>{
//                 if(value.length<r-1){
//                     return value.length
//                 }else{
//                     return r+row_size
//                 }
//             })
//         }
//         return () => {
//             setRowSize(row_size+1)
//         }
//     }, [value])
//     var rows = value? value.map((val,id)=>{
//         const {uid,...v} = val.data()
//         // console.log('v',v['dishFeedback']);
//         var dateString =  v.timeStamp.toDate().toLocaleString(undefined,dateOptions)
//         var new_row = {...v,id,dateString} 
//         return new_row
//     }):[]
//     if(error)(<>Something went wrong. please try again/refresh</>)
//     else if(loading)(<CircularProgress />)
//     return (
//         <div className={styles.container} style={{minWidth:500,width:'100%'}}>
//         <div
//         style={{fontWeight:700,fontSize:20,}}
//         >
//             <div>
//                 Loyal Customers
//             </div>
//         </div>
//         <br />
//         <DataGrid
//             rows={rows} 
//             columns={columns}
//             style={{minHeight:500}} 
//             rowsPerPageOptions={[row_size]}
//             pageSize={row_size}
//             pagination
//             page={page} 
//             onPageChange={next}
//             rowCount={rowSize}
//             />
//         </div>
//     )
// }

