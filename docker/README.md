# Docker images and CI

The CI workflow builds two local-only images after the build, API test, and security jobs pass:

- `cicd-pipeline-visualizer-api:ci`
- `cicd-pipeline-visualizer-web:ci`

The workflow does not log into a registry or push images. The frontend Nginx configuration proxies `/api/` to a backend container named `backend` on the same Docker network. Database orchestration and deployment are later milestones.
