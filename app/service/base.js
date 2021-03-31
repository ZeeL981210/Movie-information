 export default class BaseService {
     constructor() {

     }
     static ResponseRequest(code = 200, status= true, msg = 'Request successful', result= null) {
        return {
            code,
            success: status,
            msg,
            result,
            timestamp: new Date().getTime()
        }
     }
 }
