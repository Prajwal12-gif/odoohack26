from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    role: str = "employee"


class UserCreate(UserBase):
    employee_id: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(UserBase):
    id: int
    employee_id: str
    is_verified: bool
    is_active: bool

    class Config:
        from_attributes = True


class VerifyEmailRequest(BaseModel):
    email: EmailStr
    otp: str