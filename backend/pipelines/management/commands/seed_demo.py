from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from pipelines.models import PipelineRun, PipelineStage, Repository, Workflow

RUNS = [
    (142, "a82f91c", "Fix checkout flow on mobile", "failure", 272, "push", "main", "Image pull failed: manifest not found"),
    (141, "7bc921a", "Add product filters", "success", 228, "push", "main", ""),
    (140, "12de81a", "Update dependencies", "success", 242, "pull_request", "feature/search", ""),
    (139, "f3c82bd", "Refactor API client", "success", 235, "push", "main", ""),
    (138, "c9d14ee", "Add dark mode tokens", "success", 251, "pull_request", "feature/theme", ""),
]
STAGES = [
    ("Build", "Compile & bundle", 42), ("Test", "Unit + integration", 72),
    ("Security", "CodeQL analysis", 38), ("Docker", "Build image", 65),
    ("Deploy", "Production · us-east-1", 54),
]

class Command(BaseCommand):
    help = "Create a small sample repository, workflow, and run history for the dashboard."

    def handle(self, *args, **options):
        repo, _ = Repository.objects.get_or_create(
            full_name="Aarush-Gupta15/CICD-Pipeline-Visualizer-E23CSEU0008",
            defaults={"owner": "Aarush-Gupta15", "name": "CICD-Pipeline-Visualizer-E23CSEU0008", "visibility": "public", "html_url": "https://github.com/Aarush-Gupta15/CICD-Pipeline-Visualizer-E23CSEU0008"},
        )
        workflow, _ = Workflow.objects.get_or_create(repository=repo, name="CI / CD Pipeline", defaults={"file_name": ".github/workflows/ci.yml"})
        now = timezone.now()
        for index, (number, sha, message, status, duration, trigger, branch, failure) in enumerate(RUNS):
            run, _ = PipelineRun.objects.update_or_create(
                workflow=workflow, run_number=number,
                defaults={"commit_sha": sha, "commit_message": message, "status": status, "duration_seconds": duration, "trigger": trigger, "branch": branch, "actor": "Aarush Gupta", "failure_summary": failure, "started_at": now-timedelta(hours=index+1, seconds=duration), "completed_at": now-timedelta(hours=index+1), "created_at": now-timedelta(hours=index+1)},
            )
            PipelineStage.objects.filter(run=run).delete()
            for order, (name, detail, seconds) in enumerate(STAGES, start=1):
                stage_status = "failure" if status == "failure" and name == "Deploy" else "success"
                stage_failure = failure if stage_status == "failure" else ""
                PipelineStage.objects.create(run=run, name=name, detail=detail, order=order, status=stage_status, duration_seconds=seconds, failure_message=stage_failure, logs_url=run.logs_url)
        self.stdout.write(self.style.SUCCESS("Demo repository, workflow, and five pipeline runs are ready."))
