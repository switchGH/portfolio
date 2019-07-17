import React from 'react'

const Header = (props) => {
    const s_id = props.sid
    const count = props.count
    return (
        <React.Fragment>
            <h1>ID: {s_id} Joined Event: {count}</h1>
            
        </React.Fragment>
    )
}

export default Header