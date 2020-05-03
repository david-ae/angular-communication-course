import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    listFilter: string;
    showImage: boolean;
    includeDetail: boolean = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    
    @ViewChildren(NgModel) 
    inputElementRefs: QueryList<ElementRef>

    constructor(private productService: ProductService) { }
    ngAfterViewInit(): void {
        this.parentFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onValueChange(value: string): void{
        this.performFilter(value);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
