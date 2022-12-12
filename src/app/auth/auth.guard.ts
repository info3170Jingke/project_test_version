import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    return getAuth().currentUser as unknown as boolean;
  }
}