import mongoose,{connect} from "mongoose"
import { config } from "dotenv"


config()


function connects(){
    return connect(process.env.MongoURL as string,)
.then(()=>{
    console.log("db connected")
}).catch((error:any)=>{
    console.log(error)
})
}

export default connects;

