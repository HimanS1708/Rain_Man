const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth*0.95
canvas.height = window.innerHeight*0.8

const ctx = canvas.getContext('2d')

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const obj_para = document.getElementById('obj-para')
const obj_con = document.getElementById('obj-con')

var display = 0
var isDrawing = 0
var origin = {
    x: canvas.width/2,
    y: canvas.height/2
}
var points = []

function hideShow(){
    if(display === 1){
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        obj_para.style.display = 'none'
        obj_con.style.display = 'none'
        display = 0
        isDrawing = 0
    }
    else{
        btn1.style.display = 'none'
        btn2.style.display = 'none'
        btn3.style.display = 'none'
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
    console.log(points)
}

function draw() {
    if(isDrawing === 1){
        canvas.addEventListener('click', (e) => {
            var x = e.clientX - origin.x - canvas.offsetLeft
            var y = e.clientY - origin.y - canvas.offsetTop
            ctx.fillRect(x + origin.x, y + origin.y, 1, 1)
            points.push([x, y])
        })
    }
}

function plotPoints(){
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

function animate(){
    draw()
    requestAnimationFrame(animate)
}

animate()