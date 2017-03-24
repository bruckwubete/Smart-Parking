/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpUserServiceService } from './sp-user-service.service';

describe('SpUserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpUserServiceService]
    });
  });

  it('should ...', inject([SpUserServiceService], (service: SpUserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
