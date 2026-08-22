from fastapi import FastAPI

from app.routers.auth import router as auth_router
from app.api.employee import router as employee_router


app = FastAPI(
    title="HRMS API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "HRMS API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected"
    }


app.include_router(auth_router)
app.include_router(employee_router)