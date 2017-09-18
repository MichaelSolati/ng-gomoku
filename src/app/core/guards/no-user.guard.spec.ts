import { TestBed, async, inject } from '@angular/core/testing';

import { NoUserGuard } from './no-user.guard';

describe('NoUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoUserGuard]
    });
  });

  it('should ...', inject([NoUserGuard], (guard: NoUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
