import React from 'react'

export default function Counter({dif}) {
    // console.log(currentTime,StartTime)
    // const Start = StartTime.getTime()/1000
    // const current = (currentTime.getTime()/1000)+1
    dif= dif/1000 +1;
    let hours = Math.floor(dif / (60 * 60));
    let minuts = Math.floor((dif % (60 * 60)) / (60));
    let sec =  Math.floor(dif % (60));
    if(hours<10) hours = '0' + hours;
    if(minuts<10) minuts = '0' + minuts;
    if(sec<10) sec = '0' + sec;

    return (
        <span>
            {hours}:{minuts}:{sec}
        </span>
    )
}
