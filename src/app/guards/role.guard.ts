import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userSession = localStorage.getItem('user_session');

  if (!userSession) {
    router.navigate(['/login']);
    return false;
  }

  const userData = JSON.parse(userSession);
  // Nota: Asegúrate de que el campo en tu objeto sea exactamente 'rol'
  const userRole = userData.rol ? userData.rol.toLowerCase().trim() : '';
  const expectedRoles = route.data['expectedRole'] as string[];

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  // Si el usuario no tiene el rol, lo enviamos al home
  router.navigate(['/home']);
  return false;
};
