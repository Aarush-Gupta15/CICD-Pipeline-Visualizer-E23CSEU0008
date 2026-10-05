from rest_framework import serializers
from .models import PipelineRun, PipelineStage, Repository, Workflow


class PipelineStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PipelineStage
        fields = ["id", "name", "detail", "order", "status", "duration_seconds", "failure_message", "logs_url"]


class PipelineRunSerializer(serializers.ModelSerializer):
    stages = PipelineStageSerializer(many=True, read_only=True)

    class Meta:
        model = PipelineRun
        fields = ["id", "run_number", "commit_sha", "commit_message", "branch", "status", "trigger", "actor", "duration_seconds", "failure_summary", "logs_url", "started_at", "completed_at", "created_at", "stages"]


class WorkflowSerializer(serializers.ModelSerializer):
    repository = serializers.CharField(source="repository.full_name", read_only=True)

    class Meta:
        model = Workflow
        fields = ["id", "name", "file_name", "is_active", "repository"]


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ["id", "name", "owner", "full_name", "visibility", "html_url"]
