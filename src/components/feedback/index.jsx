import React from 'react'
import DataComponent from '../datagrid/DataGrid';
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector } from 'react-redux';
import { dateOptions } from '../currentUser';
import { Rating } from '@mui/material';

const filterConfig = [
    { 
        name:'feedback',
        field:'feedback',
        type:'option',
        options:[
            1,2,3,4,5
        ],
        valueGetter:(text)=>parseInt(text),

    },
]


const postRowStyle = (v, index) => ({
    backgroundColor:parseInt(v['feedback'])<3 ? '#efe' : 'white',
});
const columns = [
    // { field: "name", headerName: "name", width: 150 },
    { field: "phone", headerName:<b style={{fontWeight:700,fontSize:14}} >Phone Number</b>, width: 150 },
    { field: "feedback", headerName:<b style={{fontWeight:700,fontSize:14}} >Rating</b> , width: 150,
    renderCell: (cellValues) => {
        return (
          <div
            style={{
            //   color: "white",
              color: (parseInt(cellValues.value)<3)?"red":'green',
              fontSize: 14,
              width: "100%",
            //   textAlign: "right"
            }}
          >
              <Rating 
              name="simple-controlled"
              style={{color:(parseInt(cellValues.value)<3)?'red':'green'}}
              value = {parseInt(cellValues.value)}
              readOnly
              />
            
          </div>
        );
      }
    },
    { field: "textFeedback", headerName: <b style={{fontWeight:700,fontSize:14}} >Feeback</b>, width: 150 },
    { field: "dishFeedback", headerName:<b style={{fontWeight:700,fontSize:14}} >Dish Feedback</b>, width: 150 },
  ];


const rowManupulate = [
    // {
    //     name:'time',
    //     valueGetter:cell=>cell.toDate().toLocaleString(undefined,dateOptions)
    // },
    {
        name:'dishFeedback',
        valueGetter:cell=>{
            var dishFeedbackDishes = cell? Object.keys(cell):[]
            var dishFeedback = dishFeedbackDishes.length>0? dishFeedbackDishes.map(dish=>(`${dish} : ${cell[dish]}`)):''
            return dishFeedback
        }
    }
] 

// var dishFeedbackDishes = v['dishFeedback']? Object.keys(v['dishFeedback']):[]
//             var dishFeedback = dishFeedbackDishes.length>0? dishFeedbackDishes.map(dish=>(`${dish} : ${v['dishFeedback'][dish]}`)):''
//             console.log(v['feedback']);
//             var new_row = {...v,id,dishFeedback} 

export default function Index() {

    const restaurantId = useSelector((state)=>state.restaurant.restaurantId)
    var timeNow = new Date(firebase.firestore.Timestamp.now().toDate())
    timeNow.setHours(timeNow.getHours() - 4);
    const defaultQuery = firebase.firestore().collection('feedback').where('restaurantId','==',restaurantId)
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
        dataGridProp={{postRowStyle}}
        />

    )
}


// import React, { useEffect, useState } from 'react'
// // import { useCollectionData } from 'react-firebase-hooks/firestore';
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { DataGrid, RowsProp, ColDef } from "@mui/x-data-grid";
// import usePagination from "firestore-pagination-hook";
// import { useSelector } from 'react-redux';
// import { Rating } from '@mui/material';

// const row_size = 5


// export default function Index() {
//     const [page, setPage] = useState(0)
//     const [rowSize, setRowSize] = useState(1)
//     const restaurantId = useSelector((RootState)=>RootState.restaurant.restaurantId)
//     const {
//         loading,
//         loadingError:error,
//         // loadingMore,
//         // loadingMoreError,
//         hasMore,
//         items:value,
//         loadMore
//       } = usePagination(
//         firebase.firestore().collection('feedback').where('restaurantId','==',restaurantId).orderBy('timeStamp','desc'),
//         {
//           limit: row_size
//         }
//       );
//       const next = dir => {
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
//         var rows = value? value.map((val,id)=>{
//             const {uid,...v} = val.data()
//             // console.log('v',v['dishFeedback']);
//             var dishFeedbackDishes = v['dishFeedback']? Object.keys(v['dishFeedback']):[]
//             var dishFeedback = dishFeedbackDishes.length>0? dishFeedbackDishes.map(dish=>(`${dish} : ${v['dishFeedback'][dish]}`)):''
//             console.log(v['feedback']);
//             var new_row = {...v,id,dishFeedback} 
//             return new_row
//         }):[]
//     return (
//         <div>
//             {error && <strong>Error: {JSON.stringify(error)}</strong>}
//             {loading && <span>Collection: Loading...</span>}
//             <DataGrid 
//             rows={rows} 
//             columns={columns}
//             style={{minHeight:500}} 
//             rowsPerPageOptions={[row_size]}
//             pageSize={row_size}
//             pagination
//             page={page} 
//             onPageChange={next}
//             rowCount={rowSize}
//             rowStyle={postRowStyle}
//             />
//         </div>
//     ) 
// }


