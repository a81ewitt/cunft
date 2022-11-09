import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Health } from '../health';
import { HealthCheckService } from '../health-check.service';
import { NftCreateService } from '../nft-create.service';
import { NftLocalService } from '../nft-local.service';

/** A field / cardano metadata cannot exceed 64bytes of utf-8 encoding */
export function maxUTFBytesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isTooLong = (new TextEncoder().encode(control.value)).length > 64
    return isTooLong ? { maxUTFBytesValidator: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  health?: Health;

  constructor(private formBuilder: FormBuilder,
    private nftCreateService: NftCreateService,
    private healthService: HealthCheckService, 
    private router: Router,
    public nftLocalService: NftLocalService) { }

  imageURL?: string;

  ngOnInit(): void {
    this.updateHealth();
  }

  createForm = this.formBuilder.group({
    fileField: ['', Validators.required],
    addressField: ['', [Validators.required,
    environment.network == "mainnet" ? Validators.pattern('addr1[a-z0-9]+') : Validators.pattern('addr_test1[a-z0-9]+')]],
    nameField: ['', [Validators.required, maxUTFBytesValidator()]],
    attributes: this.formBuilder.array([])
  });

  get fileField() {
    return this.createForm.get('fileField') as FormControl;
  }

  get addressField() {
    return this.createForm.get('addressField') as FormControl;
  }

  get nameField() {
    return this.createForm.get('nameField') as FormControl;
  }

  get attributes(): FormArray {
    return this.createForm.get("attributes") as FormArray
  }

  newAttribute(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, maxUTFBytesValidator()]],
      value: ['', [Validators.required, maxUTFBytesValidator()]]
    })
  }

  addAttribute() {
    this.attributes.push(this.newAttribute());
  }

  removeAttribute(i: number) {
    this.attributes.removeAt(i);
  }

  submit() {
    let data: any = {
      receive_address: this.createForm.value["addressField"],
      attributes: {
        name: this.createForm.value["nameField"]
      }
    };

    for (let index = 0; index < this.createForm.value["attributes"].length; index++) {
      const key: string = this.createForm.value["attributes"][index].name;
      const value: string = this.createForm.value["attributes"][index].value;
      data["attributes"][key] = value
    }

    this.nftLocalService.setData = data ;
    this.nftLocalService.setImgURL = this.imageURL;

    this.nftCreateService.submit(
      this.createForm.value["fileField"], JSON.stringify(data))
      .subscribe((response) => {
        if (response.paymentState === "UPLOADING") {
          this.router.navigate(['/transaction'], {queryParams: {id: response.id}});
        }
      })
  }

  updateHealth(){
    this.healthService.getHealth().subscribe(response => {
      this.health = response;
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.createForm.patchValue({
        fileField: file
      });
      //preview if image
      if (file.type.match(/image\/\w+/g)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
      //clear if file removed
    } else {
      this.imageURL = ""
    }
  }
}


