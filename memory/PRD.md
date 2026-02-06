# Global Issues: Making a Difference - PRD

## Project Overview
Online journal/survey system for 3rd ESO students creating podcast or video log projects about global issues.

## Original Problem Statement
Create an online journal project for podcast/video log students project for 3rd ESO (3 students per group). Survey-style forms that guide students through a structured 5-day workflow to complete their project script.

## User Personas
1. **Students (3rd ESO, 14-15 years)**: Work in groups of 3, complete daily forms to build their podcast/video script
2. **Teacher**: Views all group submissions, monitors progress, can delete groups

## Core Requirements (Static)
- 5-day structured workflow (Planning → Research → Structure → Draft → Final)
- Group-based work (1 device per group)
- Choice between Radio Podcast or Video Log project type
- Teacher dashboard with password protection
- Progress tracking for each group
- Interface in English

## What's Been Implemented ✅
**Date: January 2026**

### Backend (FastAPI + MongoDB)
- Group CRUD operations with project type support
- **6-day data storage** (day1-day6 fields)
- Day 3: Grammar checklist booleans + vocabulary fields
- Day 4: Script draft + visual sketch + duration
- Day 5: Production tools + rehearsal + final submission
- Day 6: Reflection fields
- Teacher authentication (password: profesor2024)
- All error messages in English

### Frontend (React + Tailwind)
- Landing page with "Global Issues: Making a Difference" branding
- Group creation with project type selection (Radio Podcast / Video Log)
- **6-Day Project Workflow**:
  - Day 1: Planning (topic selection)
  - Day 2: Research (sources, learnings)
  - Day 3: **Unit 3 Grammar Checklist** + Vocabulary (10 words min) + Structure
  - Day 4: **Script Template** (different for podcast/vlog) + Visual Plan + Duration (3-5 min)
  - Day 5: **Production** (tools, rehearsal, recording, submission)
  - Day 6: **Reflection** (learning, challenges, team, improvements)
- Teacher dashboard with all 6 days visible
- Progress indicators (X/6)

### Design
- Neo-brutalist style (2px black borders, hard shadows)
- Color palette: Lime green (#A3E635), Violet (#8B5CF6), Pink (#F472B6)
- Fonts: Outfit (headings), Manrope (body)
- Mobile-responsive

## Day Workflow Structure (6 Days)
| Day | Title | Fields |
|-----|-------|--------|
| 1 | Planning | Topic (from Unit 3 Global Issues), Why important, Main message + Checklist |
| 2 | Research | Sources (min 2), Key Facts (3-5), Target audience + Checklist |
| 3 | Language | **Unit 3 Grammar Checklist** (Second Conditional, Indefinite Pronouns, Compound Nouns), **Unit 3 Vocabulary** (min 5 words: carbon footprint, climate change, etc.), Structure (Intro/Dev/Conclusion) |
| 4 | Script | **Complete Example Script** (Climate Change podcast), **Simplified Template** to copy, Duration (3-4 min) + Checklist |
| 5 | Production | Rehearsal notes, Tools used, **Media link submission** + Checklist |
| 6 | Reflection | What learned, Challenges, Teamwork, Experience rating |

## Prioritized Backlog

### P0 (Critical) - DONE ✅
- [x] Group creation with project type
- [x] 5-day form workflow
- [x] Save progress functionality
- [x] Teacher dashboard
- [x] English interface

### P1 (Important) - Future
- [ ] Export to PDF functionality
- [ ] Email notifications when group completes
- [ ] Deadline reminders

### P2 (Nice to Have) - Future
- [ ] Student accounts/login
- [ ] Peer feedback system
- [ ] Audio/video upload integration
- [ ] AI-powered script suggestions

## Technical Details
- **Backend**: FastAPI on port 8001
- **Frontend**: React on port 3000
- **Database**: MongoDB
- **Teacher Password**: profesor2024

## Next Tasks
1. Consider adding PDF export for teacher
2. Add ability to edit group members after creation
3. Consider adding a preview mode before marking day complete
