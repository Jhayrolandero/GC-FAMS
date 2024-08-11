import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type ImageCert =  {
  imgURL: string
}

@Component({
  selector: 'app-view-certs',
  standalone: true,
  imports: [],
  templateUrl: './view-certs.component.html',
  styleUrl: './view-certs.component.css'
})
export class ViewCertsComponent {

  readonly dialogRef = inject(MatDialogRef<ViewCertsComponent>);
  readonly data = inject<ImageCert>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
