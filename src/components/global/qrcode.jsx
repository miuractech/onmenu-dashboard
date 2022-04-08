import React from 'react'
import { useSelector } from 'react-redux'
import UniversalButton from './universal-button';

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }

export default function Qrcode() {
    const restaurant = useSelector(state=>state.restaurant)
    // console.log(restaurant);
    return (
        <div
            style={{margin:100}}
        >
            <div
            >
                <img src={restaurant.qrImage} alt="" />
            </div>
            <UniversalButton
            selected={true}
            height={40}
            width={150}
            style={{marginLeft:20, marginTop:'auto'}}
            handleClick={()=>downloadURI(restaurant.qrImage,"QRcode.png")}
            >
                Print
            </UniversalButton>
        </div>
    )
}
