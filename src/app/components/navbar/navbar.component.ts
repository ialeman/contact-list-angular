import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../entities/UserEntity';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthService) { }

    userLogin: UserEntity = new UserEntity();

    ngOnInit(): void {
        if (localStorage.getItem('key')) {
            this.userLogin = JSON.parse(atob(localStorage.getItem('user')));
        }
    }

    logout(){
        this.authService.logout();
    }
}
