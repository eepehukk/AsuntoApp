import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHousingComponent } from './manage-housing.component';

describe('ManageHousingComponent', () => {
  let component: ManageHousingComponent;
  let fixture: ComponentFixture<ManageHousingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManageHousingComponent]
    });
    fixture = TestBed.createComponent(ManageHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
