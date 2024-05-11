import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenCorreoGuard } from './token-correo.guard';

describe('tokenCorreoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenCorreoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
