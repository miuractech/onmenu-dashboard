import { IconButton } from '@material-ui/core'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
export default function UploadedImage({src,imgProps,remove,...rop}) {
    return (
        <div {...rop} style={{position:'relative',...rop.style}} >
            <IconButton 
            size="small" 
            
            style={{position:'absolute',backgroundColor:'#000000aa',color:'white'}} 
            onClick={remove}
            >
                <ClearIcon />
            </IconButton>
            <div >
                <img {...imgProps} src={src} />
            </div>
        </div>
    )
}
