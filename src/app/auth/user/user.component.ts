import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../models/user.model";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  @Input() user!: User;

  @Output() userDeleted:EventEmitter<number>=new EventEmitter<number>();
  ngOnInit(): void {
  }

  onDelete():void{
    this.userDeleted.emit(this.user.id);
  }
}
