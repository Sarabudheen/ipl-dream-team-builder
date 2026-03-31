import { TestBed } from '@angular/core/testing';

import { SpinWheel } from './spin-wheel';

describe('SpinWheel', () => {
  let service: SpinWheel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinWheel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
