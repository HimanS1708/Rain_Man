#! /usr/bin/env python3

from algorithm import solution
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class Env(BaseModel):
    points: list
    path_points: list
    v_x: float
    v_y: float
    intensity: float

@app.post("/")
async def process(env: Env):
    points = env.points
    path_points = env.path_points
    v_x = env.v_x
    v_y = env.v_y
    intensity = env.intensity
    solved = solution(path_points, points, v_x, v_y, intensity)
    return solved

if __name__ == "__main__":
    pass