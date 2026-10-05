# API Contract

The local dashboard reads its data from Django REST Framework. All responses are JSON.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health/` | API health check |
| GET | `/api/repositories/` | List repositories |
| GET | `/api/workflows/?repository_id=<id>` | List active workflows, optionally for one repository |
| GET | `/api/dashboard/?workflow_id=<id>` | Dashboard metrics, latest run with ordered stages, recent runs, and execution trend |
| GET | `/api/runs/?workflow_id=<id>&status=failure` | List runs; both query filters are optional |
| GET | `/api/runs/<id>/` | One run and its stages |

The dashboard chooses the first active workflow when `workflow_id` is omitted. `status` uses `queued`, `running`, `success`, `failure`, or `cancelled`; stages additionally support `skipped`.

`python manage.py seed_demo` creates sample data for local development. These records demonstrate the UI/API connection; GitHub Actions synchronization is a later integration step.
