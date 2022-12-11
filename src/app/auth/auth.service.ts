import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginForm, RegisterForm } from '../types/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  login(form: LoginForm) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        this.isAuthenticated = true;
        this.router.navigate(['']);
        // alert('You have been logged!');
      })
      .catch(() => {
        alert('Impossible to login!');
        this.isAuthenticated = false;
      });
  }

  register(form: RegisterForm) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        console.log(userCredential);
      })
      .catch(() => {
        this.isAuthenticated = false;

      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['login']);
        this.isAuthenticated = false;
      })
      .catch(() => {
        console.log('Something happened');
      });
  }
}
