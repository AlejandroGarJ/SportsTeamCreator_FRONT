import { TestBed } from '@angular/core/testing';

import { AuthUsuarioService } from './auth-usuario.service';

describe('AuthUsuarioService', () => {
  let service: AuthUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
