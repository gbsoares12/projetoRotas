import { TestBed } from '@angular/core/testing';

import { DashboardAdminService } from './dashboard-admin.service';

describe('DashboardAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardAdminService = TestBed.get(DashboardAdminService);
    expect(service).toBeTruthy();
  });
});
