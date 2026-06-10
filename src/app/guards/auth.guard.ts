import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Obtenemos los valores y los normalizamos a minúsculas
  const isAuthenticated = !!localStorage.getItem('user_session');
  const role = localStorage.getItem('user_role')?.toLowerCase().trim(); // <--- Normalización
  const rolesPermitidos = route.data?.['roles'] as string[] | undefined;

  if (!isAuthenticated || !role) {
    return router.parseUrl('/login');
  }

  // Comparamos siempre en minúsculas
  if (rolesPermitidos?.length) {
    return rolesPermitidos.includes(role) ? true : router.parseUrl('/home');
  }

  return role === 'admin' ? true : router.parseUrl('/login');
};
