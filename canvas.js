const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth*0.95
canvas.height = window.innerHeight*0.8

const ctx = canvas.getContext('2d')

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const object = document.getElementById('object')
var display = 0

function hideShow(){
    if(display === 1){
        btn1.style.display = 'block'
        btn2.style.display = 'block'
        btn3.style.display = 'block'
        display = 0
    }
    else{
        btn1.style.display = 'none'
        btn2.style.display = 'none'
        btn3.style.display = 'none'
        display = 1
    }
}

function objShow(){
    object.style.display = 'block'
}