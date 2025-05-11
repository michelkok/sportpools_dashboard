from fastapi import FastAPI
from loguru import logger


app = FastAPI(title="SportPools Export API")


# Configure loguru
logger.add("logs/sportpools_subleague_export.log", rotation="500 MB", level="INFO")

if __name__ == "__main__":
    import uvicorn

    logger.info("Starting SportPools Export API")
    uvicorn.run(app, host="0.0.0.0", port=8000)
