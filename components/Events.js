import React from 'react'
import eventsData from "../json/events.json"
const Events = (props) => {
    console.log(props.events)
    const eventsList = eventsData.events
    const allevents = eventsData.events.length
    let list = []
    for(let i = 0; i < eventsList.length ; i++){
        for(let j = 0; j < props.events.length; j++){
            // console.log(eventsList[i].event_id + "," + props.events[j])
            if (eventsList[i].event_id == props.events[j]){
                list.push(eventsList[i])
            }
        }
    }
    console.log(list)
    return (
        <React.Fragment>
            <div>参加 / 全体{list.length}/{allevents}</div>
            {list.map((e,i) => {
                return(
                    <div key={i}>{e.event_name}</div>
                )
            })}
        </React.Fragment>
    )
}

export default Events