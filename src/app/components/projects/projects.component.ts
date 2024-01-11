import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { api } from '../../models/api.model';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProjectCreateDialogComponent } from '../project-create-dialog/project-create-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProjectEmployeesDialogComponent } from '../project-employees-dialog/project-employees-dialog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  @ViewChild(MatTable) table!: MatTable<api.projects.Project>;
  projects: api.projects.Project[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  selectedProjectId?: string;

  constructor(
    private projectService: ProjectService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataService.fetchProjects();
    this.dataService.fetchEmployees();
    this.getProjects();
  }

  getProjects() {
    this.dataService.projectsData$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  deleteProject(projectId: string) {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.getProjects();
    });
  }

  selectProject(projectId: string) {
    if (this.selectedProjectId === projectId) {
      this.selectedProjectId = undefined;
      return;
    }

    this.selectedProjectId = projectId;
  }

  openProjectEmployeesDialog(projectId: string) {
    this.dialog.open(ProjectEmployeesDialogComponent, {
      width: '650px',
      data: projectId,
    });
  }

  openConfirmDialog(projectId?: string) {
    if (!projectId) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  openDialog(projectId?: string) {
    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '650px',
      data: projectId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProjects();
      }
    });
  }
}
