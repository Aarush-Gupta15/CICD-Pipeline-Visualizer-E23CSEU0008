from django.db.models import Avg, Count, Q
from django.utils import timezone
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import PipelineRun, Repository, Workflow
from .serializers import PipelineRunSerializer, RepositorySerializer, WorkflowSerializer


def run_queryset():
    return PipelineRun.objects.select_related("workflow", "workflow__repository").prefetch_related("stages")


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok", "service": "cicd-pipeline-visualizer-api"})


class RepositoryList(generics.ListAPIView):
    queryset = Repository.objects.order_by("full_name")
    serializer_class = RepositorySerializer


class WorkflowList(generics.ListAPIView):
    serializer_class = WorkflowSerializer

    def get_queryset(self):
        queryset = Workflow.objects.select_related("repository").filter(is_active=True)
        repository_id = self.request.query_params.get("repository_id")
        if repository_id:
            queryset = queryset.filter(repository_id=repository_id)
        return queryset


class RunList(generics.ListAPIView):
    serializer_class = PipelineRunSerializer

    def get_queryset(self):
        queryset = run_queryset()
        workflow_id = self.request.query_params.get("workflow_id")
        status = self.request.query_params.get("status")
        if workflow_id:
            queryset = queryset.filter(workflow_id=workflow_id)
        if status:
            queryset = queryset.filter(status=status.lower())
        return queryset[:100]


class RunDetail(generics.RetrieveAPIView):
    serializer_class = PipelineRunSerializer
    queryset = run_queryset()


@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard(request):
    workflows = Workflow.objects.select_related("repository").filter(is_active=True)
    workflow_id = request.query_params.get("workflow_id")
    if workflow_id:
        workflows = workflows.filter(id=workflow_id)
    workflow = workflows.first()
    if workflow is None:
        return Response({"repository": None, "workflow": None, "metrics": {"total_runs": 0, "success_rate": 0, "average_duration_seconds": 0, "failed_runs": 0}, "latest_run": None, "recent_runs": [], "execution_trend": []})

    runs = run_queryset().filter(workflow=workflow)
    completed = runs.filter(status__in=[PipelineRun.Status.SUCCESS, PipelineRun.Status.FAILURE, PipelineRun.Status.CANCELLED])
    aggregate = completed.aggregate(average=Avg("duration_seconds"))
    completed_count = completed.count()
    success_count = completed.filter(status=PipelineRun.Status.SUCCESS).count()
    metrics = {
        "total_runs": runs.count(),
        "success_rate": round(success_count / completed_count * 100, 1) if completed_count else 0,
        "average_duration_seconds": round(aggregate["average"] or 0),
        "failed_runs": runs.filter(status=PipelineRun.Status.FAILURE).count(),
    }
    latest = runs.first()
    recent = list(runs[:10])
    return Response({
        "repository": RepositorySerializer(workflow.repository).data,
        "workflow": WorkflowSerializer(workflow).data,
        "metrics": metrics,
        "latest_run": PipelineRunSerializer(latest).data if latest else None,
        "recent_runs": PipelineRunSerializer(recent, many=True).data,
        "execution_trend": [{"run_number": run.run_number, "duration_seconds": run.duration_seconds, "status": run.status} for run in reversed(recent)],
        "updated_at": timezone.now(),
    })
