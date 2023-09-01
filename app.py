#! /usr/bin/env python3

from fastapi import FastAPI
from algorithm2D import solution as solution2D
from algorithm3D import solution as solution3D
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Env(BaseModel):
    points: list
    path_points: list
    v_x: float
    v_y: float
    intensity: float

@app.post("/2D")
async def process(env: Env):
    points = env.points
    path_points = env.path_points
    v_x = env.v_x
    v_y = env.v_y
    intensity = env.intensity
    solved = solution2D(points, path_points, v_x, v_y, intensity)
    return solved

if __name__ == "__main__":
    pass