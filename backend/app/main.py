from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine


app = FastAPI(
    title="HRMS API",
    version="1.0.0",
    description="Human Resource Management System API"
)


@app.get("/")
def root():
    return {
        "message": "HRMS API is running"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }