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
- 5-day data storage (day1-day5 fields)
- Teacher authentication (password: profesor2024)
- All error messages in English

### Frontend (React + Tailwind)
- Landing page with "Global Issues: Making a Difference" branding
- Group creation modal with:
  - Group name input
  - Project type selection (Radio Podcast / Video Log)
  - 3 member name inputs
- Project page with:
  - Day navigation sidebar (5 levels)
  - Day-specific forms with guided questions
  - Save & Complete buttons
  - Progress indicators
- Teacher dashboard with:
  - Password login
  - Group list with progress indicators
  - Detailed view of all responses
  - Delete group functionality

### Design
- Neo-brutalist style (2px black borders, hard shadows)
- Color palette: Lime green (#A3E635), Violet (#8B5CF6), Pink (#F472B6)
- Fonts: Outfit (headings), Manrope (body)
- Mobile-responsive

## Day Workflow Structure (6 Days)
| Day | Title | Fields |
|-----|-------|--------|
| 1 | Planning | Topic, Alternatives, Why this topic, What to communicate |
| 2 | Research | Sources, Learnings, Target audience |
| 3 | Language & Structure | **Grammar Checklist** (Present Perfect, Comparatives, Connectors, Passive Voice), Introduction, Development, Conclusion, **Key Vocabulary (min 10 words)**, Definitions, Language style |
| 4 | Script & Visual | **Script Template** (Podcast/Vlog examples), Draft script, **Visual sketch/storyboard**, Estimated duration (3-5 min) |
| 5 | Production | **Rehearsal notes**, **Production tools used**, Recording date, Final script, Media link |
| 6 | Reflection | What learned, Challenges faced, Team collaboration, What would change, Overall experience |

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
