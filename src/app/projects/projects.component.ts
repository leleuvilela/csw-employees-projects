import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { api } from '../models/api.model';
import { ProjectService } from '../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  @ViewChild(MatTable) table!: MatTable<api.projects.Project>;
  projects$!: Observable<api.projects.Project[]>;
  displayedColumns: string[] = [
    'name',
    'actions',
  ];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projects$ = this.projectService.getProjects();
  }

  // openDialog(employeeId?: number) {
  //   const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
  //     width: '650px',
  //     data: employeeId,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
