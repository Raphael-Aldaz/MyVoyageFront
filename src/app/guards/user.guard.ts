import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';

export const userGuard: CanActivateFn = (

  ) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    let roles : string[] = []

    authService.rolesSubject$.subscribe({
      next : (data) => roles = data,
    })

    if(roles.includes('SUPERVISEUR') || roles.includes('GESTIONNAIRE') ) {
      return true
    } else {
      router.navigateByUrl('/login')
      return false
    }

  };
