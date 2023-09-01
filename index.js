const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.post('/',(req,res)=>{
    const points = req.body.points
    const path_points = req.body.path_points
    const v_x = req.body.v_x
    const v_y = req.body.v_y
    const intensity = req.body.intensity
    res.send([points,path_points,v_x,v_y,intensity])
    console.log("Helrjaldjf ")
})



app.listen(8000)