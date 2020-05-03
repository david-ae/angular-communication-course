import { SimpleChanges, Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string>
        = new EventEmitter<string>();
  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  private _listFilter: string;
  get listFilter(): string{
    return this._listFilter;    
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = "No matches found";
    }else{
      this.hitMessage = "Hits: " + changes['hitCount'].currentValue;
    }
  }
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(this.filterElementRef){
      this.filterElementRef.nativeElement.focus();
    }    
  }
}
