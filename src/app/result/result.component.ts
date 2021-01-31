import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResultComponent>, @Inject(MAT_DIALOG_DATA) public outputArray: number[]) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
