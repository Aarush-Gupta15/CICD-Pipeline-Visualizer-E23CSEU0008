# Backend API

Django REST Framework service for the CI/CD Pipeline Visualizer.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver 127.0.0.1:8000
```

The API uses SQLite by default and stores its database at `backend/db.sqlite3`.

## Endpoints

- `GET /api/health/` — service health
- `GET /api/repositories/` — repositories
- `GET /api/workflows/?repository_id=1` — active workflows
- `GET /api/dashboard/?workflow_id=1` — metrics, latest run, recent runs, and duration trend
- `GET /api/runs/?workflow_id=1&status=failure` — recent runs (optional filters)
- `GET /api/runs/<id>/` — a run and its stages

The demo seed command is safe to run more than once; it updates the sample runs.
