import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NplayergameComponent } from './nplayergame.component';

describe('NplayergameComponent', () => {
  let component: NplayergameComponent;
  let fixture: ComponentFixture<NplayergameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NplayergameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NplayergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
