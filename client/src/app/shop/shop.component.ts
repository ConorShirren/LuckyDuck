import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Aa-Zz', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];


  constructor(private shopService: ShopService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }


  getProducts(): void  {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void  {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }
  getTypes(): void  {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

    // tslint:disable-next-line: typedef
    onSortSelected(sort: string) {
      this.shopParams.sort = sort;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onPageChanged(event: any) {
      if (this.shopParams.pageNumber !== event) {
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
    }

    // tslint:disable-next-line: typedef
    onSearch() {
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    // tslint:disable-next-line: typedef
    onReset() {
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }


}
