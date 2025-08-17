from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_users_db = {
    "admin@naoconformidade.com": {"password": "123456"}
}

class LoginBody(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
def login(data: LoginBody):
    user = fake_users_db.get(data.email)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return {"message": "Login realizado", "token": "fake-jwt-token"}