from django.db import models


class Repository(models.Model):
    name = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    full_name = models.CharField(max_length=201, unique=True)
    visibility = models.CharField(max_length=20, default="public")
    html_url = models.URLField(blank=True)

    def __str__(self):
        return self.full_name


class Workflow(models.Model):
    repository = models.ForeignKey(Repository, related_name="workflows", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    file_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        unique_together = [("repository", "name")]

    def __str__(self):
        return f"{self.repository.full_name} · {self.name}"


class PipelineRun(models.Model):
    class Status(models.TextChoices):
        QUEUED = "queued", "Queued"
        RUNNING = "running", "Running"
        SUCCESS = "success", "Successful"
        FAILURE = "failure", "Failed"
        CANCELLED = "cancelled", "Cancelled"

    class Trigger(models.TextChoices):
        PUSH = "push", "Push"
        PULL_REQUEST = "pull_request", "Pull request"
        MANUAL = "manual", "Manual"
        SCHEDULE = "schedule", "Schedule"

    workflow = models.ForeignKey(Workflow, related_name="runs", on_delete=models.CASCADE)
    run_number = models.PositiveIntegerField()
    commit_sha = models.CharField(max_length=40, blank=True)
    commit_message = models.CharField(max_length=255, blank=True)
    branch = models.CharField(max_length=150, default="main")
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.QUEUED)
    trigger = models.CharField(max_length=20, choices=Trigger.choices, default=Trigger.PUSH)
    actor = models.CharField(max_length=100, blank=True)
    duration_seconds = models.PositiveIntegerField(default=0)
    failure_summary = models.TextField(blank=True)
    logs_url = models.URLField(blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField()

    class Meta:
        ordering = ["-run_number"]
        unique_together = [("workflow", "run_number")]

    def __str__(self):
        return f"{self.workflow.name} #{self.run_number}"


class PipelineStage(models.Model):
    class Status(models.TextChoices):
        QUEUED = "queued", "Queued"
        RUNNING = "running", "Running"
        SUCCESS = "success", "Successful"
        FAILURE = "failure", "Failed"
        SKIPPED = "skipped", "Skipped"
        CANCELLED = "cancelled", "Cancelled"

    run = models.ForeignKey(PipelineRun, related_name="stages", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    detail = models.CharField(max_length=180, blank=True)
    order = models.PositiveSmallIntegerField()
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.QUEUED)
    duration_seconds = models.PositiveIntegerField(default=0)
    failure_message = models.TextField(blank=True)
    logs_url = models.URLField(blank=True)

    class Meta:
        ordering = ["order"]
        unique_together = [("run", "order")]

    def __str__(self):
        return f"{self.run} · {self.name}"
