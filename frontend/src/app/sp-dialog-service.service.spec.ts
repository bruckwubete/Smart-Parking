/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpDialogServiceService } from './sp-dialog-service.service';

describe('SpDialogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpDialogServiceService]
    });
  });

  it('should ...', inject([SpDialogServiceService], (service: SpDialogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
