import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadCollegeProfile } from '../../state/dean-state/dean-state.actions';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { faculty_ID: number },
    private facultyService: FacultyRequestService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    public store: Store
  ) { }

  isDisable: boolean = false
  deleteFaculty(id: number) {
    this.isDisable = true
    this.messageService.sendMessage(`Deleting Faculty`, 0)
    this.facultyService.deleteData("faculty/" + id).subscribe({
      next: () => {
        this.messageService.sendMessage(`Successfully Deleted!`, 1)
      },
      error: err => {
        this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        this.isDisable = false
        this.dialogRef.close();
        console.log(err)
      },
      complete: () => {
        this.store.dispatch(loadCollegeProfile());
        this.isDisable = false
        this.dialogRef.close({ deleted: true });
      }
    })
  }

}
