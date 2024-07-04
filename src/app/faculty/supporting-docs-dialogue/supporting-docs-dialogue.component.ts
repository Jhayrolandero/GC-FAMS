import { Component, Inject } from '@angular/core';
import { NgxDocViewerComponent, NgxDocViewerModule } from 'ngx-doc-viewer';
import { mainPort } from '../../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-supporting-docs-dialogue',
    standalone: true,
    templateUrl: './supporting-docs-dialogue.component.html',
    styleUrl: './supporting-docs-dialogue.component.css',
    imports: [NgxDocViewerModule, LoadingScreenComponent, CommonModule]
})
export class SupportingDocsDialogueComponent {
  port = mainPort
  loading = true


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SupportingDocsDialogueComponent>,
  ){

    if(data) {
      this.loading = false
    }
    // console.log(data)
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
