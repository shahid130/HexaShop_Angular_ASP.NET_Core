import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../Interfaces/Iuser';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userInfoString = localStorage.getItem('userObj')!;
  userInfo: Iuser = JSON.parse(this.userInfoString);


  //userInfo: Iuser;
  /*userInfo: Iuser = {
    userID: 0,
    userName: '',
    userEmail: '',
    userNumber: '',
    userAddress: ''
  };*/

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    //this.userInfo = localStorage.getItem('userObj');
    //console.log("user: " + this.userInfo);
  }
  
  

  logOut() {
    this.authService.signOut();
  }
}
