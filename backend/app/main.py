from fastapi import FastAPI

from app.database import Base, engine
from app.routers.admin import router as admin_router
from app.routers.attendance import router as attendance_router
from app.routers.auth import router as auth_router
from app.routers.leave import router as leave_router
from app.routers.payroll import router as payroll_router
from app.api.employee import router as employee_router

Base.metadata.create_all(bind=engine)

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
app.include_router(attendance_router)
app.include_router(leave_router)
app.include_router(payroll_router)
app.include_router(admin_router)