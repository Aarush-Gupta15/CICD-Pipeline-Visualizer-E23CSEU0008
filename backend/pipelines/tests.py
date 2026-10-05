from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from .models import PipelineRun, PipelineStage, Repository, Workflow


class PipelineApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.repository = Repository.objects.create(
            owner="example", name="service", full_name="example/service",
            visibility="public", html_url="https://github.com/example/service",
        )
        self.workflow = Workflow.objects.create(repository=self.repository, name="CI Pipeline")
        self.failed_run = PipelineRun.objects.create(
            workflow=self.workflow, run_number=12, commit_sha="abc1234",
            commit_message="Fix deployment", branch="main", status="failure",
            trigger="push", actor="Developer", duration_seconds=90,
            failure_summary="Image pull failed", created_at=timezone.now(),
        )
        PipelineStage.objects.create(
            run=self.failed_run, name="Deploy", detail="Production", order=1,
            status="failure", duration_seconds=30, failure_message="Image pull failed",
        )
        PipelineRun.objects.create(
            workflow=self.workflow, run_number=11, commit_sha="def5678",
            commit_message="Add health check", branch="main", status="success",
            trigger="pull_request", actor="Developer", duration_seconds=60,
            created_at=timezone.now(),
        )

    def test_health_endpoint(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["status"], "ok")

    def test_dashboard_returns_repository_metrics_latest_run_and_stages(self):
        response = self.client.get("/api/dashboard/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["repository"]["full_name"], "example/service")
        self.assertEqual(response.data["metrics"]["total_runs"], 2)
        self.assertEqual(response.data["metrics"]["success_rate"], 50.0)
        self.assertEqual(response.data["latest_run"]["run_number"], 12)
        self.assertEqual(response.data["latest_run"]["stages"][0]["name"], "Deploy")

    def test_run_list_can_filter_by_status_and_run_detail_contains_stages(self):
        response = self.client.get("/api/runs/?status=failure")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([row["run_number"] for row in response.data], [12])
        detail = self.client.get(f"/api/runs/{self.failed_run.pk}/")
        self.assertEqual(detail.status_code, 200)
        self.assertEqual(detail.data["stages"][0]["status"], "failure")
