import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ad} from "../../models/ad.model";
import {AuthService} from "../../auth/services/auth.service";
import {User} from "../../auth/models/user.model";

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss']
})
export class AdItemComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}
  @Input() ad!: Ad;

  @Output() adLiked:EventEmitter<number> = new EventEmitter<number>();
  @Output() adDeleted:EventEmitter<number>= new EventEmitter<number>();
  @Output() adApplayed:EventEmitter<number>= new EventEmitter<number>();
  @Output() userApproved:EventEmitter<User>= new EventEmitter<User>();
  @Output() AdApproved:EventEmitter<Ad>= new EventEmitter<Ad>();
  isOrganization: boolean | undefined;
  userid!: number;
  ngOnInit(): void {
    const loggedUser = this.authService.getUserfromStorage();
    if(loggedUser.role=="Организация"){
    this.isOrganization = true;
    this.userid=loggedUser.id!;
    return;}
    this.userid=loggedUser.id!;
    this.isOrganization = false;
  }

  onDelete():void{
    this.adDeleted.emit(this.ad.id);
  }

  onLike() {
    this.adLiked.emit(this.ad.id);
  }

  onApplay(){
    this.adApplayed.emit(this.ad.id);
  }

  onApprove(user:User,ad:Ad) {
    this.userApproved.emit(user);
    this.AdApproved.emit(ad);
  }
}
