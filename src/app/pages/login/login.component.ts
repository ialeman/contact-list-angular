import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserEntity } from '../../entities/UserEntity';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    userLogin: UserEntity = new UserEntity();

    constructor(
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {

    }

    /**
     * Verify inputs value aren't empty
     * 
     * @returns 
     */
    verifyLogin() {
        let errors: boolean = false;

        if (!this.userLogin.username) {
            errors = true;
        }

        if (!this.userLogin.userPassword) {
            errors = true;
        }

        if (errors == false) {
            this.doLogin(this.userLogin);
            return;
        }

        // send message
        this.showMessage("warn", "Message", "Fields can't be empty", this.messageService);
    }

    /**
     * Make real login
     * 
     * @param user 
     */
    doLogin(user: UserEntity) {
        localStorage.setItem('key', btoa(user.username+":"+user.userPassword));
        this.authService.login(user.username).subscribe(
            (res: UserEntity) => {
                localStorage.setItem('user', btoa(JSON.stringify(res)));
                this.router.navigate(['/home']);
            },
            err => {
                this.showMessage("warn", "Message", "Bad credentials, please login again!", this.messageService);
                // console.log(err);
            }
        );
    }

    /**
     * 
     * 
     * @param severity |success|info|warn|error
     * @param summary 
     * @param detail 
     */
    showMessage(severity: string, summary: string, detail: string, messageService: MessageService): void {
        messageService.add({ severity: severity, summary: summary, detail: detail });
    }



}
