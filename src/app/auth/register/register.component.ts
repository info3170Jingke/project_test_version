import { Component, OnInit } from '@angular/core';
import { RegisterForm } from 'src/app/types/Auth';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: RegisterForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }
  showMsg: boolean = false;
  submit() {
   this.authService.register(this.form);
   this.showMsg = true;
  }

}
