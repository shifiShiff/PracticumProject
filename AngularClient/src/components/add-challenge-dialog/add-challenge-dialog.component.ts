import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-challenge-dialog',
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './add-challenge-dialog.component.html',
  styleUrl: './add-challenge-dialog.component.css'
})
export class AddChallengeDialogComponent {
  challenge = { title: '', description: '' };

  constructor(private dialogRef: MatDialogRef<AddChallengeDialogComponent>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.challenge);
  }

}
