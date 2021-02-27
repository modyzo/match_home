/** */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  data: any;
  imageData: any;
  public editPageForm: FormGroup;
  public sexObject = [
    { value: 'man', name: 'Mens' },
    { value: 'woman', name: 'Vrouw' },
  ];
  constructor(
    public serviceProvider: DataService,
    public formBuilder: FormBuilder
  ) {
    this.data = environment.editInfo;
    this.imageData = environment.images;
    this.editPageForm = this.formBuilder.group({
      sex: [null, Validators.required],
      birthDate: [null, Validators.compose([Validators.required])],
      phone: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.editPageForm.valueChanges.subscribe((res) => console.log(res));
  }

  applyFilter = () => {
    console.log('this.editPageForm.value', this.editPageForm.value);
  };
}
