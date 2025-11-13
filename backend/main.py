from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    body = await request.json()
    nodes = body.get("nodes", [])
    edges = body.get("edges", [])
    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": True  # you can replace with real DAG logic
    }
