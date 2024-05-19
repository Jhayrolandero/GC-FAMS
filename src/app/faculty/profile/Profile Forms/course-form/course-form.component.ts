import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { loadCourse } from '../../../../state/faculty-state/faculty-state.actions';
import { selectCourses } from '../../../../state/faculty-state/faculty-state.selector';
import { MessageService } from '../../../../services/message.service';

@Component({
    selector: 'app-course-form',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
    public courses$ = this.store.select(selectCourses);

    constructor(
        public dialogRef: MatDialogRef<CourseFormComponent>,
        private facultyRequest: FacultyRequestService,
        private messageService: MessageService,
        private store: Store,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    courseForm = new FormGroup({
        course_code: new FormControl(''),
        class_count: new FormControl('')
    })

    onNoClick(): void {
        this.dialogRef.close();
    }

    existCourseSelect(event: any){
        this.courseForm.patchValue({
            course_code: event.target.value
        });
    }

    submitForm() {
        console.log(this.courseForm);
        this.messageService.sendMessage("Adding Courses...", 0)
        this.facultyRequest.postData(this.courseForm, 'addCourse').subscribe({
            next: (next: any) => { console.log(next); },
            error: (error) => { this.messageService.sendMessage("Failed to add course.", -1) },
            complete: () => {
                this.store.dispatch(loadCourse());
                this.messageService.sendMessage("Courses Successfully Added!", 1)
                this.onNoClick();
            }
        });
    }
}
