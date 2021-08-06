export const converter = (sec)=>{
    var d = new Date(sec*1000+5*60*1000*60);
    var time = d; 
    let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
    let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
    return [`${hour}:${minute}`,]
}
export const width=(begin,end,screenWidth)=>{
    const currentTime = new Date().getTime()/1000
    const position = currentTime - begin
    const timeProgram = end - begin
    const width = (position*(screenWidth))/timeProgram
    if(width<screenWidth){
        return width
    }else{
        return screenWidth
    }
}