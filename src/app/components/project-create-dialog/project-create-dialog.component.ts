import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './project-create-dialog.component.html',
})
export class ProjectCreateDialogComponent {
  projectFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public projectId?: string
  ) {}

  ngOnInit() {
    if (this.projectId) {
      this.projectService.getProject(this.projectId).subscribe((project) => {
        this.projectFormGroup.patchValue(project);
      });
    }
  }

  onSubmit(): void {
    if (this.projectId) {
      this.projectService.updateProject(this.projectId, this.projectFormGroup.value).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }

    this.projectService.createProject(this.projectFormGroup.getRawValue()).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
