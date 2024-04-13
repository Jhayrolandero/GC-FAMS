import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyCertificationsComponent } from '../Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from '../Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from '../Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from '../Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from '../Profile Components/faculty-projects/faculty-projects.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-faculty-certifications-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './Profile Forms/Certification Form/faculty-certifications-form.component.html',
  styleUrl: './Profile Forms/Certification Form/faculty-certifications-form.component.css'
})

export class FacultyCertificationsFormComponent { 
  constructor(public dialogRef: MatDialogRef<FacultyCertificationsFormComponent>,){}

  certForm = new FormGroup({
    cert_name: new FormControl(''),
    cert_details: new FormControl(''),
    cert_corporation: new FormControl(''),
    accomplished_date: new FormControl(''),
    cert_image: new FormControl<File | null>(null)
  })

  submitForm(){
    
  }

  imageURL?: string = undefined;
  PreviewImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file) {
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageURL = reader.result as string;
            this.certForm.patchValue({
              cert_image: file
            })
        };
        reader.readAsDataURL(file);
    }
    console.log(this.certForm);
  }
}

@Component({
    selector: 'app-cv-dropdown',
    standalone: true,
    templateUrl: './cv-dropdown.component.html',
    styleUrl: './cv-dropdown.component.css',
    imports: [CommonModule, FacultyCertificationsComponent, FacultyEducationComponent, FacultyExperienceComponent, FacultyProjectsComponent, FacultyExpertiseComponent]
})
export class CvDropdownComponent {
  @Input() name?: string;
  rotated = true;
  components: string[] = ["Educational Attaiment", "Certifications", "Industry Experience", "Projects", "Expertise"]

  constructor(public dialog: MatDialog){}

  rotate(){
    this.rotated = !this.rotated;
  }

  openDialog(formType: any){
    switch (formType) {
      case "Certifications":
        const dialogRef = this.dialog.open(FacultyCertificationsFormComponent);
        break;
    
      default:
        break;
    }

    // const dialogRef = this.dialog.open(FacultyCertificationsFormComponent).afterClosed().subscribe(result => {
    //   this.getCertificate();
    // });
  }
}
