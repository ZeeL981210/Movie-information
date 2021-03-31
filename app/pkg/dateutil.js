import dayjs from 'dayjs'
 export const getCurrentDateTime = () => {
     return dayjs().format("YYYY-MM-DD dddd HH:mm:ss")
 }