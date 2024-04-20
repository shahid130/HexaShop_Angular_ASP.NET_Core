import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  addProductForm!: FormGroup
  selectedFile: File | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      ProductDetails: ['', Validators.required],
      ProductPrice: ['', Validators.required],
      ProductType: ['', Validators.required]
    });
  }

  AddProduct(): void {

    if (this.addProductForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('ProductName', this.addProductForm.value.ProductName);
      formData.append('ProductDetails', this.addProductForm.value.ProductDetails);
      formData.append('ProductPrice', this.addProductForm.value.ProductPrice);
      formData.append('ProductType', this.addProductForm.value.ProductType);
      formData.append('photo', this.selectedFile);



      this.adminService.createProduct(formData).subscribe({
        next: () => {
          console.log('Product added successfully');
          this.addProductForm.reset();
          this.router.navigate(['add']);
        },
        error: (error) => {
          console.error('Error occurred while adding product:', error);
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
}
