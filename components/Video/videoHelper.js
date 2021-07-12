

export const converter = (sec) => {
    let secund = Math.floor(sec/1000)
    let min = (secund - secund%60)/60
    min = isNaN(min)?'00': min
    let reminder = secund%60
    reminder = isNaN(reminder)?'0':reminder
    return `${min}:${reminder<10?`0${reminder}`:reminder}`
}


export const leftSkip = (status,video,removeClickTime,setSkipIcon) =>{
    let time = status.positionMillis - 10*1000

    if(time<0){
      time=0
    }
    video.current.setPositionAsync(time)
    removeClickTime.current = setTimeout(() => {
      setSkipIcon({
        right:{opacity:0},
        left:{opacity:0}           
      })
    }, 400) 
      
  }
export const rightSkip = (status,video,removeClickTime,setSkipIcon) =>{
    let time = status.positionMillis + 10*1000
    if(time>status.durationMillis){
      time=status.durationMillis
    }
    video.current.setPositionAsync(time)
    removeClickTime.current = setTimeout(() => {
      setSkipIcon({
        right:{opacity:0},
        left:{opacity:0}           
      })
    }, 400) 
      
  }

export  const doubleClick = (condition,doubleClickCounter,removeClickTime,setSkipIcon,status,video,setControl) =>{
    doubleClickCounter.current++
    setControl((e)=>!e)
    if (doubleClickCounter.current == 2) {
        clearTimeout(removeClickTime.current)
        doubleClickCounter.current = 0
        if(condition==='left'){
          setSkipIcon({
            left:{opacity:1},
            right:{opacity:0}           
          })
          leftSkip(status,video,removeClickTime,setSkipIcon)
        }else{
          setSkipIcon({
            left:{opacity:0},
            right:{opacity:1}           
          })
          rightSkip(status,video,removeClickTime,setSkipIcon)
          removeClickTime.current = setTimeout(() => {
          doubleClickCounter.current = 0
          setSkipIcon({
            right:{opacity:0},
            left:{opacity:0}           
          })
        }, 400)}    
    } else {
            removeClickTime.current = setTimeout(() => {
            doubleClickCounter.current = 0
            setSkipIcon({
                right:{opacity:0},
                left:{opacity:0}           
            })
            }, 400) 
          }
  }