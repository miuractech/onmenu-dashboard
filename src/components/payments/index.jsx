import DataComponent from '../datagrid/DataGrid';
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector } from 'react-redux';
import { dateOptions } from '../currentUser';


const columns = [
    { field: "timeStamp", headerName: "time", width: 200 },
    { field: "by", headerName: "by", width: 150 },
    { field: "amount", headerName: "amount", width: 150 },
    { field: "name", headerName: "name", width: 150 },
    { field: "status", headerName: "status", width: 150 },
    { field: "paymentStatus", headerName: "paymentStatus", width: 150 },
    { field: "contact", headerName: "contact", width: 150 },
  ];





const filterConfig = [
    { 
        name:'Name',
        field:'name',
        type:'text',
    },
    { 
        name:'Amount',
        field:'amount',
        type:'text',
        valueGetter:cell=>parseFloat(cell)
    },
    { 
        name:'Mobile Number',
        field:'contact',
        type:'text',
        valueGetter:(text)=>{
            if(text.length===10){
                return '+91'+text
            }else if(text.length===13 && text.substring(0,3)==='+91'){
                return text
            }else return ''
        },

    },
    // { 
    //     name:'Payment Method',
    //     field:'by',
    //     type:'option',
    //     options:[
    //         'Razorpay'
    //     ],
    // },
    { 
        name:'Status',
        field:'status',
        type:'option',
        options:[
            'success',
            'failed'
        ],
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
    const defaultQuery = firebase.firestore().collection('payment').where('restaurantId','==',restaurantId)
        
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



// export default function Index() {
//     const [page, setPage] = useState(0)
//     const [rowSize, setRowSize] = useState(1)
//     const restaurantId = useSelector(state=>state.restaurant.restaurantId)
//     const {
//         loading,
//         loadingError:error,
//         loadingMore,
//         loadingMoreError,
//         hasMore,
//         items:value,
//         loadMore
//       } = usePagination(
//         firebase.firestore().collection('payment').where('restaurantId','==',restaurantId).orderBy('timeStamp','desc'),
//         {
//           limit: row_size
//         }
//       );
//     // const [value, loading, error] = useCollectionData(
//     //     firebase.firestore().collection('payment').orderBy('timeStamp','desc'),
//     //     {
//     //       snapshotListenOptions: { includeMetadataChanges: true },
//     //     });
//     var rows =value? value.map((val,id)=>{
//         var v = val.data()
//         var dateString =  v.timeStamp.toDate().toLocaleString(undefined,dateOptions)
//         var new_row = {...v,time:dateString,id:id.toString()}
//         return new_row
//     }):[]
//     const next = dir => {
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
//         // return () => {
//         //     setRowSize(row_size+1)
//         // }
//     }, [value])
//     return (
//         <div>
//             {error && <strong>Error: {JSON.stringify(error)}</strong>}
//             {loading ? <span>Loading...</span>
//             :
//             <DataGrid 
//             rows={rows.reverse()} 
//             columns={columns}
//             style={{minHeight:500}} 
//             rowsPerPageOptions={[row_size]}
//             pageSize={row_size}
//             pagination
//             page={page} 
//             onPageChange={next}
//             rowCount={rowSize}
//             labelDisplayedRows={null}
//             />
//         }
            
//         </div>
//     )
// }
