import {  Chip, CircularProgress} from '@material-ui/core';
import React, {  useState } from 'react'
import {  useSelector } from 'react-redux';
// import { calcDishTotal, getVariantImage } from '../restaurant/dishCard';
import VegIcon from '../../images/veg.icon'
import VeganIcon from '../../images/vegan.icon'
import NonVegIcon from '../../images/non.veg.icon'
import EggIcon from '../../images/egg.icon'
import { Button } from '@material-ui/core'
import firebase from "firebase/app";
export default function Order({order,setOrder}) {

    const restaurant = useSelector(state=>state.restaurant)
    // const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(order);
    const updateOrder =async (update) => {
        setLoading(true)
        await firebase.firestore().collection('orders').doc(order.orderId).update(update)
        .then(doc=>{
            setOrder(null)
        })
        .catch(err=>{
            setError('something went wrong, try again!')
        })
        setLoading(false)
    }

    if(order){
        return (
            <div>
                <div
                style={{fontWeight:700,textAlign: 'left'}}
                >
                    Order Details
                </div>
                
                <div className="flex center-align">
                    <div>
                        <Chip label={order.orderStatus} color='primary' size="small"  />
                    </div>
                    <div
                    style={{fontWeight:300,fontSize:12}}
                    >
                       Order Time &ensp; - &ensp;
                        {order.orderTime.toDate().toLocaleString()}
                    </div>
                    <div
                    style={{fontWeight:300,fontSize:12}}
                    >
                       Last Updated &ensp; - &ensp;
                        {order.lastUpdated.toDate().toLocaleString()}
                    </div>
                </div>

                    <br />
                <div>
                    <div
                    style={{fontWeight:700}}
                    >
                        Client Details
                    </div>
                    <div>
                        {order.userName}
                    </div>
                    <div>
                        {order.phoneNumber}
                    </div>
                    <div>
                        {order.paymentId?`payment Id - ${order.paymentId}`:''}
                    </div>
                </div>
                <br />
                <div style={{display: 'grid', gridTemplateColumns:'3fr 1fr',textAlign: 'left',fontWeight:700}} >
                        <div>
                            Item Details
                        </div>
                        <div>
                            {/* Price */}
                        </div>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns:'2fr 1fr 1fr',textAlign: 'left',fontSize:14}} >
                {order.items.map(({dish,quantity,selectSubVariant,selectedAddon,selectedVariant})=>(
                    <>
                        <div>
                           {getVariantImage(selectedVariant.food_preference)} {dish.dish_name}
                        </div>
                        <div>
                           {quantity?`x ${quantity}`:null}
                        </div>
                        <div>
                            {calcDishTotal(selectedVariant,selectSubVariant,selectedAddon,quantity,dish.packingCharge)}
                        </div>
                        <div
                        style={{fontWeight:300,fontSize:11}}
                        >
                            {selectSubVariant.length>0 && selectSubVariant.map(sub=>(
                                <div>
                                    &ensp;&ensp;&ensp;{sub.name}
                                </div>
                            ))}
                        </div>
                        <div/>
                        <div/>
                        <div
                        style={{fontWeight:300,fontSize:11}}
                        >
                            {selectedAddon.length>0 && selectedAddon.map(sub=>(
                                <div>
                                    &ensp;&ensp;&ensp;{sub.name}
                                </div>
                            ))}
                        </div>
                        <div/>
                        <div/>
                        
                    </>
                ))}
                <div></div>
                <div>Total</div>
                <div>{order.totalAmount}</div>
                    </div>
                {order.orderStatus === 'paid' && 
                <div
                className="flex"
                style={{justifyContent:'space-around'}}
                >
                <Button
                variant='outlined'
                color='secondary'
                onClick={()=>updateOrder({
                    lastUpdated:firebase.firestore.FieldValue.serverTimestamp(),
                    orderStatus:'declined'
                })}
                >
                    {loading?
                <CircularProgress />
                :
                 "Decline Order"
                }
                </Button>
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                &ensp;
                <Button
                color='primary'
                variant='outlined'
                onClick={()=>updateOrder({
                    lastUpdated:firebase.firestore.FieldValue.serverTimestamp(),
                    orderStatus:'accepted'
                })}
                >{loading?
                    <CircularProgress />
                    :
                     "Accept Order"
                    }
                    
                </Button>
                </div> }



                {order.orderStatus === 'accepted' && 
                <div
                className="flex"
                style={{justifyContent:'space-around'}}
                >
                <Button
                variant='outlined'
                color='primary'
                onClick={()=>updateOrder({
                    lastUpdated:firebase.firestore.FieldValue.serverTimestamp(),
                    orderStatus:'cooked'
                })}
                >
                    {loading?
                <CircularProgress />
                :
                 "Order Prepared"
                }
                </Button>
                &ensp;
                </div> }



                {order.orderStatus === 'cooked' && 
                <div
                className="flex"
                style={{justifyContent:'space-around'}}
                >
                <Button
                variant='outlined'
                color='primary'
                onClick={()=>updateOrder({
                    lastUpdated:firebase.firestore.FieldValue.serverTimestamp(),
                    orderStatus:'delivered'
                })}
                >
                    {loading?
                <CircularProgress />
                :
                 "Order Delivered"
                }
                </Button>
                &ensp;
                </div> }
            </div>
        )
    }
    else{
        return <></>
    }
}


export const calcDishTotal = (selectedVariant,selectSubVariant,selectedAddons,quantity,packingCharge) => {
    var total = parseFloat(selectedVariant.price)
    // console.log('price',{selectedVariant,selectSubVariant,selectedAddons,quantity,recommended});
    total = selectSubVariant.length>0 ? selectSubVariant.reduce( function(a, b){
        return a +parseFloat(b['price']);
    }, total): total
    total = selectedAddons.length>0 ? selectedAddons.reduce( function(a, b){
        return a +parseFloat(b['price']);
    }, total): total   
    if(packingCharge>0){
        total = total + parseFloat(packingCharge)
    }   
    var total = quantity?quantity * total : total
    return total 
}

export const getVariantImage = (variant,style) => {
    const variantImage = {
        'egg':<EggIcon style={style}  />,
        'chicken':<NonVegIcon style={style}  />,
        'lamb':<NonVegIcon style={style}  />,
        'fish':<NonVegIcon style={style}  />,
        'turkey':<NonVegIcon style={style}  />,
        'prawn':<NonVegIcon style={style}  />,
        'beef':<NonVegIcon style={style}  />,
        'duck':<NonVegIcon style={style}  />,
        'lobster':<NonVegIcon style={style}  />,
        'mutton':<NonVegIcon style={style}  />,
        'pork':<NonVegIcon style={style}  />,
        'poultry':<NonVegIcon style={style}  />,
        'rabbit':<NonVegIcon style={style}  />,
        'non-veg':<NonVegIcon style={style}  />,
        'crab':<NonVegIcon style={style}  />,
        'veg':<VegIcon style={style}  />,
        'vegan':<VeganIcon style={style} />,
    }
    return variantImage[variant]
}