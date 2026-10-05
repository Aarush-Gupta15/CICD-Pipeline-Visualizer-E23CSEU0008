# CICD-Pipeline-Visualizer-E23CSEU0008

# CI/CD Pipeline Visualizer

A fourth-year DevOps project for designing and developing a web-based platform that visualizes CI/CD pipeline execution in a clear and interactive format.

---

## Student Information

| Field             | Details                               |
| ----------------- | ------------------------------------- |
| **Student Name**  | Aarush Gupta                          |
| **Roll Number**   | E23CSEU0008                           |
| **Program**       | B.Tech Computer Science & Engineering |
| **Year**          | Fourth Year                           |
| **Project Area**  | DevOps                                |
| **Project Title** | CI/CD Pipeline Visualizer             |

---

## 1. Project Overview

Modern software development uses Continuous Integration and Continuous Delivery/Deployment (CI/CD) pipelines to automate activities such as building applications, running tests, performing security checks, creating containers, and deploying software.

Platforms such as GitHub Actions provide detailed information about workflow execution. However, developers may need to inspect multiple jobs, steps, and logs to understand the overall state of a pipeline.

The **CI/CD Pipeline Visualizer** aims to provide a centralized web-based interface that converts CI/CD execution information into an understandable visual representation.

The proposed system will integrate with **GitHub Actions** and display pipeline stages, execution status, duration, failures, logs, and other useful pipeline information through a dashboard.

---

## 2. Problem Statement

CI/CD pipelines can contain multiple dependent stages and generate a large amount of execution information.

When a pipeline fails, developers may need to manually inspect different jobs and logs to determine:

- Which stage failed?
- Why did it fail?
- How long did each stage take?
- Which stages were skipped?
- What is the current pipeline status?
- How has the pipeline performed historically?

This project aims to solve this problem by providing a visual dashboard for understanding CI/CD pipeline execution.

---

## 3. Proposed Solution

The proposed system will connect with GitHub Actions and transform workflow execution data into a visual pipeline.

A typical pipeline may contain:

```text
Code Push
    |
    v
  Build
    |
    v
  Test
    |
    v
Security Scan
    |
    v
Docker Build
    |
    v
 Deployment
```

Each stage will have a status such as:

- Queued
- Running
- Successful
- Failed
- Skipped
- Cancelled

The dashboard will provide a visual representation of the complete pipeline and its execution state.

---

## 4. Objectives

The major objectives of the project are:

1. Develop a web-based CI/CD pipeline visualization platform.
2. Integrate the system with GitHub Actions.
3. Visualize individual CI/CD pipeline stages.
4. Display pipeline and job execution status.
5. Display pipeline execution time and historical runs.
6. Provide useful information about failed pipeline stages.
7. Integrate DevSecOps concepts into the CI/CD workflow.
8. Containerize the application using Docker.
9. Explore automated deployment using CI/CD.
10. Explore Infrastructure as Code using Terraform and cloud deployment.

---

## 5. Key Features

### 5.1 GitHub Actions Integration

The system will retrieve information from GitHub Actions workflows and display:

- Workflow runs
- Job status
- Pipeline status
- Commit information
- Branch information
- Execution time

### 5.2 Pipeline Visualization

The dashboard will represent pipeline stages graphically.

Example:

```text
┌─────────┐
│  BUILD  │ ✓
└────┬────┘
     |
     v
┌─────────┐
│  TEST   │ ✓
└────┬────┘
     |
     v
┌─────────┐
│ SECURITY│ ✓
└────┬────┘
     |
     v
┌─────────┐
│ DOCKER  │ ⟳
└────┬────┘
     |
     v
┌─────────┐
│ DEPLOY  │ ○
└─────────┘
```

### 5.3 Pipeline Analytics

The system is planned to provide:

- Total pipeline runs
- Successful runs
- Failed runs
- Pipeline success rate
- Average execution time
- Stage execution time
- Historical pipeline data

### 5.4 Failure Visibility

When a pipeline fails, the dashboard will identify:

- Failed stage
- Failed job
- Error information
- Relevant execution logs

### 5.5 DevSecOps Integration

Security checks will be incorporated into the CI/CD pipeline.

Planned security tooling includes:

- Trivy
- Dependency/security checks
- Container scanning

### 5.6 Docker Integration

The application will be containerized using Docker.

The planned flow is:

```text
Source Code
     |
     v
 Dockerfile
     |
     v
Docker Image
     |
     v
 Docker Container
```

### 5.7 Automated Deployment

The CI/CD pipeline will be designed to automatically deploy the application after successful validation.

---

## 6. Proposed Technology Stack

| Component              | Technology            |
| ---------------------- | --------------------- |
| Frontend               | React                 |
| UI                     | Tailwind CSS          |
| Backend                | Django REST Framework |
| Database               | PostgreSQL            |
| CI/CD                  | GitHub Actions        |
| Containerization       | Docker                |
| Security Scanning      | Trivy                 |
| Infrastructure as Code | Terraform             |
| Cloud                  | AWS / Azure           |
| Version Control        | Git & GitHub          |

The technology stack may be refined during implementation according to project requirements and feasibility.

---

## 7. High-Level Architecture

```text
                       Developer
                           |
                           v
                  GitHub Repository
                           |
                           v
                    GitHub Actions
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
        Build             Test        Security Scan
          |                |                |
          +----------------+----------------+
                           |
                           v
                      Docker Build
                           |
                           v
                       Deployment
                           |
                           v
                    Django REST API
                           |
                           v
                       PostgreSQL
                           |
                           v
                     React Dashboard
                           |
                           v
                 Pipeline Visualization
```

---

## 8. Project Modules

### Module 1 — GitHub Repository Integration

Responsible for connecting the visualizer with GitHub repositories and obtaining CI/CD workflow information.

### Module 2 — CI/CD Pipeline

GitHub Actions will automate:

```text
Build
  ↓
Test
  ↓
Security Scan
  ↓
Docker Build
  ↓
Deployment
```

### Module 3 — Pipeline Visualization

Converts workflow execution information into a graphical representation.

### Module 4 — Pipeline Analytics

Stores and analyzes historical pipeline information such as:

- Execution duration
- Success/failure count
- Stage duration
- Pipeline history

### Module 5 — Log and Failure Analysis

Provides useful information when a pipeline or individual job fails.

### Module 6 — DevSecOps

Integrates automated security checks into the CI/CD workflow.

### Module 7 — Deployment and Infrastructure

Uses Docker, Terraform, and cloud infrastructure to explore automated application deployment.

---

## 9. What We Aim to Learn

This project will provide practical experience in:

### DevOps

- CI/CD concepts
- Automation
- Deployment workflows
- Pipeline management

### Git & GitHub

- Git repositories
- Branches
- Commits
- Pull requests
- GitHub Actions

### GitHub Actions

- Workflows
- Jobs
- Steps
- Runners
- Workflow triggers
- Secrets
- Artifacts
- Environments

### Docker

- Dockerfiles
- Images
- Containers
- Containerized deployment

### DevSecOps

- Security scanning
- Vulnerability detection
- Security gates in CI/CD

### Backend Development

- Django
- REST APIs
- API integration
- Database interaction

### Frontend Development

- React
- Dashboard development
- Data visualization
- Interactive pipeline representation

### Infrastructure

- Terraform
- Infrastructure as Code
- Cloud deployment

---

## 10. Development Roadmap

### Phase 1 — Project Definition

- Finalize requirements
- Define system architecture
- Define project modules
- Define technology stack

### Phase 2 — CI/CD Foundation

- Create GitHub Actions workflow
- Implement build stage
- Implement testing stage
- Verify workflow execution

### Phase 3 — Backend Development

- Develop Django REST API
- Integrate GitHub API
- Design database models
- Store pipeline information

### Phase 4 — Frontend Development

- Develop React dashboard
- Create pipeline visualization
- Display workflow information
- Display pipeline status

### Phase 5 — DevSecOps and Containerization

- Integrate security scanning
- Add Trivy
- Create Docker configuration
- Add container scanning

### Phase 6 — Deployment

- Configure automated deployment
- Explore Terraform
- Provision cloud infrastructure
- Deploy the application

### Phase 7 — Testing and Documentation

- Test the complete system
- Test successful and failed pipelines
- Collect screenshots
- Analyze results
- Document limitations
- Prepare final project report

---

## 11. Expected Outcome

The expected outcome is a working web-based **CI/CD Pipeline Visualizer** that provides developers with a clear visual representation of CI/CD workflow execution.

The system will demonstrate practical implementation of:

```text
Git
 +
GitHub Actions
 +
CI/CD
 +
Docker
 +
DevSecOps
 +
REST APIs
 +
Database
 +
Cloud
 +
Terraform
```

The final system is intended to make pipeline execution easier to understand and provide useful visibility into pipeline status, failures, execution time, and deployment progress.

---

## 12. Project Status

**Current Status: Backend API and Frontend Integration**

The React dashboard now reads repository, run, stage, and analytics data from a Django REST API. A local demo seed command is available for development. GitHub Actions synchronization and persistence of live workflow data are the next backend integration steps.

---

## 13. Future Scope

Potential future enhancements include:

- Support for multiple CI/CD platforms.
- Advanced pipeline failure classification.
- AI-assisted CI/CD log summarization.
- Recurring failure detection.
- Advanced pipeline analytics.
- Blue-Green deployment visualization.
- Canary deployment visualization.
- Prometheus and Grafana integration.
- Role-based access control.
- Organization-level pipeline analytics.

---

## 14. Repository

**GitHub Repository:**

https://github.com/Aarush-Gupta15/CICD-Pipeline-Visualizer-E23CSEU0008

---

## 15. Academic Information

**Project:** CI/CD Pipeline Visualizer
**Domain:** DevOps
**Program:** B.Tech Computer Science & Engineering
**Year:** Fourth Year
**Student:** Aarush Gupta
**Roll Number:** E23CSEU0008

## Local Development

The frontend dashboard reads pipeline data from the Django REST API. Start each service in a separate terminal:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver 127.0.0.1:8000
```

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api` requests to `http://127.0.0.1:8000`. Set `VITE_API_BASE_URL` if the API is hosted separately. API routes and response details are documented in [docs/API.md](docs/API.md). The seeded data is for local UI development; GitHub Actions synchronization remains a later integration step. The CI workflow runs frontend build, Django API tests, dependency and Trivy security scans, then builds both Docker images without pushing them.
