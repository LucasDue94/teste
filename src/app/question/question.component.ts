import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-questao-um',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  numbersArray = this.formBuilder.array([]);
  form: FormGroup = this.formBuilder.group({
      inputSize: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
      numbers: this.numbersArray
    }
  );
  ordenedOutput: number[] = [];


  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  createControls(): void {
    console.log(this.form);
    this.numbersArray.clear();
    this.form.controls.inputSize.markAsTouched();
    const inputSize = this.form.value ? this.form.value.inputSize : null;
    if (this.form.valid) {
      for (let i = 0; i < inputSize; i++) {
        this.numbersArray.push(this.formBuilder.control(null, [Validators.required, Validators.min(-1000), Validators.max(1000)]));
      }
    }
  }

  hasErrors = (control: AbstractControl): boolean => control.hasError('required') ||
    control.hasError('max') || control.hasError('min');

  clear(): void {
    this.numbersArray.clear();
    this.form.reset('');
  }

  generateSet(): void {
    this.form.markAllAsTouched();
    const output = new Set<number>();
    if (this.numbersArray.valid) {
      this.numbersArray.controls.forEach(control => {
        output.add(control.value);
      });
    }
    this.ordenedOutput = Array.from(output).sort((a, b) => a - b);
    if (this.ordenedOutput.length > 0) {
      this.openResult();
    }
  }

  openResult = () => this.dialog.open(ResultComponent, { data: this.ordenedOutput, width: '250px' });

  hasControls = (): boolean => this.numbersArray && this.numbersArray.length > 0;
}
