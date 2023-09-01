fetch("http://localhost:8000/3D", {
    method: "POST",
    body: JSON.stringify({
        "points":points,
        "path_points":path_points,
        "v_x":rx,
        "v_y":ry,
        "v_z":rz,
        "intensity": density
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => {console.log("Completed request");return response.json()})
.then(json => console.log(json)).catch(err => (console.log(err)));