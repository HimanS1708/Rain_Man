const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth*0.95
canvas.height = window.innerHeight*0.8

const ctx = canvas.getContext('2d')

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn_con = document.getElementById('button-container')

const obj_para = document.getElementById('obj-para')
const obj_input = document.getElementById('obj-input')
const obj_con = document.getElementById('obj-con')
const rain_con = document.getElementById('rain-con')
const direction_con = document.getElementById('direction-con')
const direction = document.getElementById('direction')
const dir_input = document.getElementById('direction-input')
const intensity = document.getElementById('intensity')
const in_con = document.getElementById('intensity-con')
const path_para = document.getElementById('path-para')
const path_input = document.getElementById('path-input')
const path_con = document.getElementById('path-con')

const X_input = document.getElementById('X-input')
const Y_input = document.getElementById('Y-input')
const p_X_input = document.getElementById('p-X-input')
const p_Y_input = document.getElementById('p-Y-input')
const add = document.getElementById('add')
const finish = document.getElementById('finish')
const path_add = document.getElementById('p-add')
const path_finish = document.getElementById('p-finish')
const d_rx = document.getElementById('d-rx')
const RX = document.getElementById('RX')
const RY = document.getElementById('RY')
const in_input = document.getElementById('intensity-input')
const d_in = document.getElementById('d-in')
const in_in = document.getElementById('in')

var display = 0
var isDrawing = 0
var path_isDrawing = 0
var origin = {
    x: canvas.width/2,
    y: canvas.height/2
}
var points = []
var path_points = []
var temp_points = []

var doAnim = 0
var dir_x=0,dir_y=0
var vx=0,vy=0
var x_c=0,y_c=0

var rx=0,ry=0
var density=0

function hideShow(){
    if(display === 1){
        btn_con.style.display = 'flex'
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        obj_para.style.display = 'none'
        obj_input.style.display = 'none'
        obj_con.style.display = 'none'
        rain_con.style.display = 'none'
        direction_con.style.display = 'none'
        dir_input.style.display = 'none'
        d_rx.style.display ='none'
        RX.style.display = 'none'
        RY.style.display = 'none'
        direction.style.display = 'none'
        intensity.style.display = 'none'
        d_in.style.display = 'none'
        in_input.style.display = 'none'
        in_in.style.display = 'none'
        path_para.style.display = 'none'
        path_input.style.display = 'none'
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
        doAnim = 0
    }
}

function hideShow_1(){
    if(display === 1){
        btn_con.style.display = 'flex'
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        obj_para.style.display = 'none'
        obj_input.style.display = 'none'
        obj_con.style.display = 'none'
        rain_con.style.display = 'none'
        direction.style.display = 'none'
        intensity.style.display = 'none'
        d_in.style.display = 'none'
        in_input.style.display = 'none'
        in_in.style.display = 'none'
        path_para.style.display = 'none'
        path_input.style.display = 'none'
        path_con.style.display = 'none'
        display = 0
        path_isDrawing = 1
        doAnim = 1

        dir_x = path_points[1][0]-path_points[0][0]
        dir_y = path_points[1][1]-path_points[0][1]
        vx = dir_x/Math.sqrt(Math.pow(dir_x,2)+Math.pow(dir_y,2))
        vy = dir_y/Math.sqrt(Math.pow(dir_x,2)+Math.pow(dir_y,2))
    }
    else{
        btn1.style.display = 'none'
        btn2.style.display = 'none'
        btn3.style.display = 'none'
        btn_con.style.display = 'none'
        display = 1
        doAnim = 0
    }
}

function rainShow(){
    rain_con.style.display = 'flex'
    rain_con.style.paddingTop = '2rem'
    direction.style.display = 'block'
    intensity.style.display = 'block'
    rain_con.style.display = 'flex'
}

function objShow(){
    obj_para.style.display = 'block'
    obj_input.style.display = 'block'
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

add.addEventListener('click', (e) => {
    let x = parseInt(X_input.value, 10)
    let y = parseInt(Y_input.value, 10)
    points.push([x, y])
})

finish.addEventListener('click', (e) => {
    if(points.length<2){
        alert("Enter at least 2 points")
        points = []
    }
    else{
        plotPoints()
    }
})

path_add.addEventListener('click', (e) => {
    let x = parseInt(p_X_input.value, 10)
    let y = parseInt(p_Y_input.value, 10)
    path_points.push([x, y])
})

path_finish.addEventListener('click', (e) => {
    if(points.length<2){
        alert("Enter at least 2 points")
        points = []
    }
    else{
        doAnim = 1
    }
})

direction.addEventListener('click', (e) => {
    direction.style.display = 'none'
    intensity.style.display = 'none'
    direction_con.style.display = 'flex'
    d_rx.style.display = 'block'
    dir_input.style.display = 'flex'
    RX.style.display = 'block'
    RY.style.display = 'block'
})

intensity.addEventListener('click', (e) => {
    intensity.style.display = 'none'
    direction.style.display = 'none'
    in_con.style.display = 'flex'
    in_input.style.display = 'flex'
    d_in.style.display = 'flex'
    in_input.style.paddingBottom = '1rem'
})

d_in.addEventListener('click', (e) => {
    density=parseInt(in_in.value)
    hideShow()
})

d_rx.addEventListener('click', (e) => {
    rx=parseInt(RX.value)
    ry=parseInt(RY.value)
    hideShow()
})

function draw() {
	if(doAnim){
        var a = 0
        var b = 0
        for(let i=0;i<temp_points.length;i++){
            a+=(temp_points[i][0]+path_points[0][0]-x_c)
            b+=(temp_points[i][1]+path_points[0][1]-x_c)
        }
        a/=temp_points.length
        b/=temp_points.length
        if(a > path_points[1][0] || a < path_points[0][0]){
            vx=-vx;
            vy=-vy;
        }
        for(let i=0;i<temp_points.length;i++){
            temp_points[i][0]+=vx;
            temp_points[i][1]+=vy;
        }
        plotAnimation()
    }
}

function plotAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var x_i = path_points[0][0]
    var y_i = path_points[0][1]

    var dx = x_i - x_c
    var dy = y_i - y_c

    var init_x = temp_points[0][0] + dx
    var init_y = temp_points[0][1] + dy

    for(let i=1;i<temp_points.length;i++){
        var cur_x = temp_points[i][0] + dx
        var cur_y = temp_points[i][1] + dy
        ctx.beginPath()
        ctx.moveTo(init_x + origin.x, init_y + origin.y)
        ctx.lineTo(cur_x + origin.x, cur_y + origin.y)
        ctx.stroke()
        init_x = cur_x
        init_y = cur_y
    }
    ctx.beginPath()
    ctx.moveTo(temp_points[temp_points.length-1][0] + origin.x + dx,temp_points[temp_points.length-1][1] + origin.y + dy)
    ctx.lineTo(temp_points[0][0] + origin.x + dx, temp_points[0][1] + origin.y + dy)
    ctx.stroke()
}

function plotPoints(){
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

function plotPoints_1(){
    temp_points=points
    x_c = 0;
    y_c = 0;
    for(let i=0;i<temp_points.length;i++){
        x_c += temp_points[i][0];
        y_c += temp_points[i][1];
    }
    x_c = x_c/temp_points.length
    y_c = y_c/temp_points.length

    var x_i = path_points[0][0]
    var y_i = path_points[0][1]

    var dx = x_i - x_c
    var dy = y_i - y_c

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var init_x = temp_points[0][0] + dx
    var init_y = temp_points[0][1] + dy
    for(let i=1;i<temp_points.length;i++){
        var cur_x = temp_points[i][0] + dx
        var cur_y = temp_points[i][1] + dy
        ctx.beginPath()
        ctx.moveTo(init_x + origin.x, init_y + origin.y)
        ctx.lineTo(cur_x + origin.x, cur_y + origin.y)
        ctx.stroke()
        init_x = cur_x
        init_y = cur_y
    }
    ctx.beginPath()
    ctx.moveTo(temp_points[temp_points.length-1][0] + origin.x + dx,temp_points[temp_points.length-1][1] + origin.y + dy)
    ctx.lineTo(temp_points[0][0] + origin.x + dx, temp_points[0][1] + origin.y + dy)
    ctx.stroke()
}

function path(){
    path_para.style.display = 'block'
    path_input.style.display = 'block'
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