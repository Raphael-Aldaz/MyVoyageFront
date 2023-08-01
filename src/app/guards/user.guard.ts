import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';

export const userGuard: CanActivateFn = (

  ) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    console.log(authService.roles)

    if(authService.roles.includes('SUPERVISEUR') || authService.roles.includes('GESTIONNAIRE') ) {
      return true
    } else {
      router.navigateByUrl('/loginForm')
      return false
    }

  };
