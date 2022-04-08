import LocalDining from '@material-ui/icons/LocalDining'
import React from 'react'

export default function OrderIcon({selected}) {
    return (
        <div>
        {selected?
            <LocalDining />
            :
            <LocalDining />

        }
        </div>
    )
}
