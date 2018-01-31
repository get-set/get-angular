import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;
  stock: Stock = new Stock(0, '', 0, 0, '', []);
  categories = ['IT', '互联网', '金融'];

  constructor(private routeInfo: ActivatedRoute, private stockService: StockService, private router: Router) {
  }

  ngOnInit() {
    const stockId: number = this.routeInfo.snapshot.params['id'];
    this.stockService.getStock(stockId).subscribe(data => {
      this.stock = data;
      this.formModel.reset({
        name: this.stock.name,
        price: this.stock.price,
        desc: this.stock.desc,
        categories: [
          this.stock.categories.indexOf(this.categories[0]) !== -1,
          this.stock.categories.indexOf(this.categories[1]) !== -1,
          this.stock.categories.indexOf(this.categories[2]) !== -1
        ]
      });
    });

    const fb = new FormBuilder();
    this.formModel = fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required]],
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
        ], this.categoriesValidator)
      }
    );
  }

  categoriesValidator(control: FormArray) {
    let valid = false;
    control.controls.forEach(c => {
      if (c.value) {
        valid = true;
      }
    });
    if (valid) {
      return null;
    } else {
      return {categorieslength: true};
    }
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    const savedCategories: string[] = [];
    let index = 0;
    for (let i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]) {
        savedCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = savedCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);
    // this.router.navigateByUrl('/stock');
  }

}
