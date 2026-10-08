from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



class Prompt(BaseModel):
    prompt:str



@app.post("/generate")
def generate(data: Prompt):

    try:
        response = requests.post(
            "http://127.0.0.1:7860/sdapi/v1/txt2img",
            json={
                "prompt": data.prompt,
                "steps": 20,
                "width": 512,
                "height": 512
            },
            timeout=300
        )

        print("Forge Status:", response.status_code)
        print(response.text[:300])

        return response.json()

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}