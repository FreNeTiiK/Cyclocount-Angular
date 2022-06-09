import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualObjectiveComponent } from './annual-objective.component';

describe('DashboardComponent', () => {
  let component: AnnualObjectiveComponent;
  let fixture: ComponentFixture<AnnualObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualObjectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
