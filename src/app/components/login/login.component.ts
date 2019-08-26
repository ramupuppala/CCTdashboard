import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    public loginForm: FormGroup;
    public submitted = false;
    public status:boolean=true;
    public validation:string="";
    // public login = {
    //     "user": {
    //         "username": "",
    //         "password": ""
    //     }
    // };

    public errorMsg: boolean = false;
    public marked: boolean = false;
    constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
        this.loginForm = fb.group({
            "user": fb.group({
                "username": [null, Validators.required],
                "password": [null, Validators.required]
            }),
            "checkBox": [false]
        });
    }

    ngOnInit() {
        if(window.localStorage.getItem("x-access-token")){
            this.router.navigate(['admindashboard']);
        }
    }
    
    public fieldInput() {
        this.errorMsg = false;
    }
    public loginFunction() {
        if (this.loginForm.valid) {
            this.submitted = false;
            this.userService.doLogin(this.loginForm.controls.user.value).then(((data: any) => {
                console.log(data);
                if (data.status) {
                    window.localStorage.setItem("x-access-token", data.data[0]["x-access-token"]);
                    window.localStorage.setItem("p_id", data.data[0]["p_id"]);
                    window.localStorage.setItem("app_id", data.data[0]["app_id"]);
                    window.localStorage.setItem("username", data.data[0]["username"]);
                    window.localStorage.setItem("roles", JSON.stringify(data.data[0]["roles"]));
                    window.localStorage.setItem("x-refresh-token", data.data[0]["x-refresh-token"]);
                    this.userService.doLoggedIn();
                    if(data.data[0]["roles"][0].name == "Store Manager"){
                       this.router.navigate(['storedashboard']); 
                    }

                    else
                    {
                        location.href="admindashboard"
                    }
                    // this.router.navigate(['admindashboard']);
                }
                else {
                    this.status=data.status;
                    this.validation=data.validation
                }

            }));
        }
        else {
            this.submitted = true;
        }
    }

    toggleVisibility(e) {
        this.marked = e.target.checked;
        console.log(this.marked)
    }

}