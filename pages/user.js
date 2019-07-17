import React from 'react'
import userData from "../json/user.json"
import Header from "../components/Header"
import Events from "../components/Events"
const User = () => {
    console.log(userData)
    let list = userData.events_list.split(",")
    let count = list.length
    return(
        <React.Fragment>
            <Header sid={userData.student_id} count={count}/>
            <Events events={list}/>
        </React.Fragment>
    )
}

export default User