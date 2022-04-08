import React from 'react'
import DataComponent from '../datagrid/DataGrid';
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector } from 'react-redux';

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


const columns = [
    { field: "time", headerName: "Login Time", width: 200 },
    { field: "userName", headerName: "Name", width: 150 },
    { field: "mobile", headerName: "Mobile Number", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "loyalty", headerName: "Loyalty", width: 150, 
    renderCell: (cellValues) => {
        return (
          <div
            style={{
            //   color: "white",
              color: "#007AFF",
              fontSize: 14,
              width: "100%",
            //   textAlign: "right"
            }}
          >
            {cellValues.value}
          </div>
        );
      } },
  ];

const rowManupulate = [
    {
        name:'time',
        valueGetter:cell=>cell.toDate().toLocaleString(undefined,dateOptions)
    },
    {
        name:'loyalty',
        valueGetter:cell=>cell?.programs?cell.programs.map(prog=>prog.program).join(","):""
    }
] 


export default function Index() {

    const restaurantId = useSelector((state)=>state.restaurant.restaurantId)
    var timeNow = new Date(firebase.firestore.Timestamp.now().toDate())
    timeNow.setHours(timeNow.getHours() - 4);
    const defaultQuery = firebase.firestore().collection('currentUser')
    .where('restaurantId','==',restaurantId)
    .where('time','>=',timeNow)
    return (
        <DataComponent
        columns={columns}
        defaultQuery={defaultQuery}
        row_size={10}
        filterConfig={filterConfig}
        rowManupulate={rowManupulate}
        querySuffix={{
            name:'time',
            ascdes:'desc'
        }}
        />

    )
}










export const dateOptions =  { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"} 







