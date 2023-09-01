const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth*0.95
canvas.height = window.innerHeight*0.8

const ctx = canvas.getContext('2d')

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn_con = document.getElementById('button-container')

const obj_para = document.getElementById('obj-para')
const obj_con = document.getElementById('obj-con')
const path_para = document.getElementById('path-para')
const path_con = document.getElementById('path-con')

var display = 0
var isDrawing = 0
var path_isDrawing = 0
var origin = {
    x: canvas.width/2,
    y: canvas.height/2
}
var points = []
var path_points = []

function hideShow(){
    if(display === 1){
        btn_con.style.display = 'flex'
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        obj_para.style.display = 'none'
        obj_con.style.display = 'none'
        path_para.style.display = 'none'
        path_con.style.display = 'none'
        display = 0
        isDrawing = 0
    }
    else{
        btn1.style.display = 'none'
        btn2.style.display = 'none'
        btn3.style.display = 'none'
        btn_con.style.display = 'none'
        display = 1
    }
}

function hideShow_1(){
    if(display === 1){
        btn_con.style.display = 'flex'
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        obj_para.style.display = 'none'
        obj_con.style.display = 'none'
        path_para.style.display = 'none'
        path_con.style.display = 'none'
        display = 0
        path_isDrawing = 1
    }
    else{
        btn1.style.display = 'none'
        btn2.style.display = 'none'
        btn3.style.display = 'none'
        btn_con.style.display = 'none'
        display = 1
    }
}

function objShow(){
    obj_para.style.display = 'block'
    obj_con.style.display = 'block'
    obj_para.style.display = 'flex'
    obj_para.style.justifyContent = 'center'
    obj_con.style.display = 'flex'
    obj_con.style.justifyContent = 'center'
    obj_para.style.scale = 1.25
    isDrawing = 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    points = []
}

function draw() {
    if(isDrawing === 1){
        canvas.addEventListener('click', (e) => {
            if(isDrawing === 1){
                var x = e.clientX - origin.x - canvas.offsetLeft
                var y = e.clientY - origin.y - canvas.offsetTop
                ctx.fillRect(x + origin.x, y + origin.y, 2, 2)
                points.push([x, y])
            }
        })
    }
    else if(path_isDrawing === 1){
        canvas.addEventListener('click', (e) => {
            if(path_isDrawing === 1){
                var x = e.clientX - origin.x - canvas.offsetLeft
                var y = e.clientY - origin.y - canvas.offsetTop
                ctx.fillRect(x + origin.x, y + origin.y, 2, 2)
                path_points.push([x, y])
            }
        })
    }
}

function plotPoints(){
    if(points[0][0] == points[points.length-1][0] && points[0][1] == points[points.length-1][1]){
        alert("Enter at least two points")
        points = []
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return;
    }
    else{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var init_x = points[0][0]
        var init_y = points[0][1]
        for(let i=1;i<points.length;i++){
            var cur_x = points[i][0]
            var cur_y = points[i][1]
            ctx.beginPath()
            ctx.moveTo(init_x + origin.x, init_y + origin.y)
            ctx.lineTo(cur_x + origin.x, cur_y + origin.y)
            ctx.stroke()
            init_x = cur_x
            init_y = cur_y
        }
        ctx.beginPath()
        ctx.moveTo(points[points.length-1][0] + origin.x,points[points.length-1][1] + origin.y)
        ctx.lineTo(points[0][0] + origin.x, points[0][1] + origin.y)
        ctx.stroke()
    }
}

function plotPoints_1(){
    var x_c = 0;
    var y_c = 0;
    for(let i=0;i<points.length;i++){
        x_c += points[i][0];
        y_c += points[i][1];
    }
    x_c = x_c/points.length
    y_c = y_c/points.length

    var x_i = path_points[0][0]
    var y_i = path_points[0][1]

    var dx = x_i - x_c
    var dy = y_i - y_c

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var init_x = points[0][0] + dx
    var init_y = points[0][1] + dy
    for(let i=1;i<points.length;i++){
        var cur_x = points[i][0] + dx
        var cur_y = points[i][1] + dy
        ctx.beginPath()
        ctx.moveTo(init_x + origin.x, init_y + origin.y)
        ctx.lineTo(cur_x + origin.x, cur_y + origin.y)
        ctx.stroke()
        init_x = cur_x
        init_y = cur_y
    }
    ctx.beginPath()
    ctx.moveTo(points[points.length-1][0] + origin.x + dx,points[points.length-1][1] + origin.y + dy)
    ctx.lineTo(points[0][0] + origin.x + dx, points[0][1] + origin.y + dy)
    ctx.stroke()

    // console.log(path_points)

    // var dir_x = 0
    // var dir_y = 0
    // var vx = 1
    // var vy = 1
    // temp_points = points
    // for(let i=0;i<path_points.length - 1;i++){
    //     dir_x = path_points[i+1][0] - path_points[i][0]
    //     dir_y = path_points[i+1][1] - path_points[i][1]

    //     vx = dir_x/Math.sqrt(Math.pow(dir_x,2)+Math.pow(dir_y,2));
    //     vy = dir_y/Math.sqrt(Math.pow(dir_x,2)+Math.pow(dir_y,2));

    //     x_c = path_points[i][0]
    //     y_c = path_points[i][1]

    //     while(x_c !== path_points[i+1][0] && y_c !== path_points[i+1][1]){
    //         ctx.clearRect(0, 0, canvas.width, canvas.height)
    //         var init_x = temp_points[0][0] + dx
    //         var init_y = temp_points[0][1] + dy
    //         temp_points[0][0]+=vx;
    //         temp_points[0][1]+=vy;
    //         for(let j=1;j<temp_points.length;j++){
    //             var cur_x = temp_points[j][0] + dx
    //             var cur_y = temp_points[j][1] + dy
    //             ctx.beginPath()
    //             ctx.moveTo(init_x + origin.x, init_y + origin.y)
    //             ctx.lineTo(cur_x + origin.x, cur_y + origin.y)
    //             ctx.stroke()
    //             init_x = cur_x
    //             init_y = cur_y
    //             temp_points[j][0]+=vx;
    //             temp_points[j][1]+=vy;
    //         }
    //         ctx.beginPath()
    //         ctx.moveTo(temp_points[temp_points.length-1][0] + origin.x + dx,temp_points[temp_points.length-1][1] + origin.y + dy)
    //         ctx.lineTo(temp_points[0][0] + origin.x + dx, temp_points[0][1] + origin.y + dy)
    //         ctx.stroke()
    //         temp_points[temp_points.length-1][0]+=vx;
    //         temp_points[temp_points.length-1][1]+=vy;
    //         x_c += vx;
    //         y_c += vy;
    //     }
    // }
}

function path(){
    path_para.style.display = 'block'
    path_con.style.display = 'block'
    path_para.style.display = 'flex'
    path_para.style.justifyContent = 'center'
    path_con.style.display = 'flex'
    path_con.style.justifyContent = 'center'
    path_para.style.scale = 1.25
    path_isDrawing = 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    path_points = []
}

function animate(){
    draw()
    requestAnimationFrame(animate)
}

animate()