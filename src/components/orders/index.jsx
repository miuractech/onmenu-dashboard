import React, { useEffect, useState } from 'react'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";
import "firebase/firestore";
import { DataGrid, RowsProp, ColDef } from "@mui/x-data-grid";
import usePagination from "firestore-pagination-hook";
import { useSelector } from 'react-redux';
import { dateOptions } from '../currentUser';
import { Button, Dialog } from '@material-ui/core';
import Order from './order';

const row_size = 5


export default function Index() {
    const [page, setPage] = useState(0)
    const [rowSize, setRowSize] = useState(1)
    const restaurantId = useSelector((RootState)=>RootState.restaurant.restaurantId)
    const {
        loading,
        loadingError:error,
        loadingMore,
        loadingMoreError,
        hasMore,
        items:value,
        loadMore
      } = usePagination(
        firebase.firestore()
        .collection('orders')
        .where('restaurantId','==',restaurantId)
        .where('orderStatus','in',['paid','accepted','cooked','delivered','completed','payment-failed','declined'])
        .orderBy('lastUpdated','desc')
        ,
        {
          limit: row_size
        }
      );
    const [order, setOrder] = useState(null);
      const next = dir => {
        setPage(prev=>{
            if(prev<dir && hasMore){
                loadMore()
            }
            return dir
        })
    }
    useEffect(() => {
        if(value){
            setRowSize(r=>{
                if(value.length<r-1){
                    return value.length
                }else{
                    return r+row_size
                }
            })
        }
        return () => {
            setRowSize(row_size+1)
        }
    }, [value])
    var rows =value? value.map((val,id)=>{
        var v = val.data()
        v.orderId = val.id
        var dateString =  v.orderTime.toDate().toLocaleString(undefined,dateOptions)
        var new_row = {...v,totalAmount:`₹${v.totalAmount}/-`,time:dateString,id:id.toString()}
        return new_row
    }):[]
    console.log(value);
    const columns = [
        { field: "orderId", headerName: <b style={{fontWeight:700,fontSize:14}} >Order ID</b>, width: 180 },
        { field: "time", headerName:<b style={{fontWeight:700,fontSize:14}} >Time</b> , width: 150 },
        { field: "orderStatus", headerName:<b style={{fontWeight:700,fontSize:14}} >Status</b> , width: 150 },
        { field: "userName", headerName:<b style={{fontWeight:700,fontSize:14}} >Customer Name</b>, width: 150 },
        { field: "phoneNumber", headerName:<b style={{fontWeight:700,fontSize:14}} >Phone Number</b>, width: 150 },
        { field: "paymentStatus", headerName:<b style={{fontWeight:700,fontSize:14}} >Payment Status</b> , width: 150 },
        { field: "totalAmount", headerName:<b style={{fontWeight:700,fontSize:14}} >Order Value</b> , width: 150 },
        { field: "Actions", headerName:<b style={{fontWeight:700,fontSize:14}} >Actions</b> , width: 150, renderCell: (params) => {
        console.log(params.row)
        return (
                
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={()=>setOrder(params.row)}
              >
                View Order
              </Button>
          )}, },
        
      ];
    return (
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            <DataGrid 
            rows={rows} 
            columns={columns}
            style={{minHeight:500}} 
            rowsPerPageOptions={[row_size]}
            pageSize={row_size}
            pagination
            page={page} 
            onPageChange={next}
            rowCount={rowSize}
            />
            <Dialog
            open={Boolean(order)}
            onClose={()=>setOrder(null)}
            >
                <div
                style={{width:450,padding:25}}
                >
                    <Order order={order} setOrder={setOrder} />
                </div>
            </Dialog>
        </div>
    ) 
}


