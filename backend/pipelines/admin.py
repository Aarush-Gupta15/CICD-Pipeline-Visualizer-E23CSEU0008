from django.contrib import admin
from .models import PipelineRun, PipelineStage, Repository, Workflow

class PipelineStageInline(admin.TabularInline):
    model = PipelineStage
    extra = 0

@admin.register(PipelineRun)
class PipelineRunAdmin(admin.ModelAdmin):
    list_display = ("run_number", "workflow", "status", "branch", "duration_seconds", "created_at")
    list_filter = ("status", "trigger", "workflow")
    search_fields = ("commit_sha", "commit_message", "branch")
    inlines = [PipelineStageInline]

admin.site.register(Repository)
admin.site.register(Workflow)
