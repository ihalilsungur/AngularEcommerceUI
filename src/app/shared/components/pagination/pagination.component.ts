import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageNumber:number;
  @Input() pageSize:number;
  @Input() totalCount :number;
  @Output() pageChanged  = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPaginationChanged(event:any){
    this.pageChanged.emit(event.page);
  }
}
