import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group({
      test: [null, Validators.required],
      rangeSingle: [null, Validators.required],
      rangeDualKnobs: [null, Validators.required],
      select: [null, Validators.required],
      toogle: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((res) => console.log(res));
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public applyFilter() {
    this.modalCtrl.dismiss(this.filterForm.value);
  }

}
