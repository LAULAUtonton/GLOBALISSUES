from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class Day1Data(BaseModel):
    topic: str = ""
    alternative_topics: str = ""
    why_this_topic: str = ""
    what_to_communicate: str = ""
    completed: bool = False

class Day2Data(BaseModel):
    sources: str = ""
    learnings: str = ""
    target_audience: str = ""
    completed: bool = False

class Day3Data(BaseModel):
    part1: str = ""
    part2: str = ""
    part3: str = ""
    language_style: str = ""
    key_vocabulary: str = ""
    completed: bool = False

class Day4Data(BaseModel):
    draft_script: str = ""
    completed: bool = False

class Day5Data(BaseModel):
    final_script: str = ""
    media_link: str = ""
    completed: bool = False

class GroupProject(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    group_name: str
    members: List[str] = []
    project_type: str = "podcast"  # "podcast" or "vlog"
    day1: Day1Data = Field(default_factory=Day1Data)
    day2: Day2Data = Field(default_factory=Day2Data)
    day3: Day3Data = Field(default_factory=Day3Data)
    day4: Day4Data = Field(default_factory=Day4Data)
    day5: Day5Data = Field(default_factory=Day5Data)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GroupCreate(BaseModel):
    group_name: str
    members: List[str]
    project_type: str = "podcast"

class DayUpdateRequest(BaseModel):
    day: int
    data: dict

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Podcast Journal API"}

# Groups
@api_router.post("/groups", response_model=GroupProject)
async def create_group(input: GroupCreate):
    # Check if group name already exists
    existing = await db.groups.find_one({"group_name": input.group_name}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Group name already exists")
    
    project = GroupProject(
        group_name=input.group_name,
        members=input.members,
        project_type=input.project_type
    )
    
    doc = project.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.groups.insert_one(doc)
    return project

@api_router.get("/groups", response_model=List[GroupProject])
async def get_all_groups():
    groups = await db.groups.find({}, {"_id": 0}).to_list(100)
    for g in groups:
        if isinstance(g.get('created_at'), str):
            g['created_at'] = datetime.fromisoformat(g['created_at'])
        if isinstance(g.get('updated_at'), str):
            g['updated_at'] = datetime.fromisoformat(g['updated_at'])
    return groups

@api_router.get("/groups/{group_id}", response_model=GroupProject)
async def get_group(group_id: str):
    group = await db.groups.find_one({"id": group_id}, {"_id": 0})
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    if isinstance(group.get('created_at'), str):
        group['created_at'] = datetime.fromisoformat(group['created_at'])
    if isinstance(group.get('updated_at'), str):
        group['updated_at'] = datetime.fromisoformat(group['updated_at'])
    
    return group

@api_router.put("/groups/{group_id}/day")
async def update_day(group_id: str, request: DayUpdateRequest):
    group = await db.groups.find_one({"id": group_id}, {"_id": 0})
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    day_key = f"day{request.day}"
    if day_key not in ["day1", "day2", "day3", "day4", "day5"]:
        raise HTTPException(status_code=400, detail="Invalid day")
    
    update_data = {
        f"{day_key}": request.data,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.groups.update_one(
        {"id": group_id},
        {"$set": update_data}
    )
    
    return {"message": "Updated successfully", "day": request.day}

@api_router.delete("/groups/{group_id}")
async def delete_group(group_id: str):
    result = await db.groups.delete_one({"id": group_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Group not found")
    return {"message": "Grupo eliminado"}

# Teacher password check (simple)
TEACHER_PASSWORD = "profesor2024"

@api_router.post("/teacher/login")
async def teacher_login(data: dict):
    if data.get("password") == TEACHER_PASSWORD:
        return {"success": True}
    raise HTTPException(status_code=401, detail="Contraseña incorrecta")

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
