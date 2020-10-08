import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageteamComponent } from './manageteam.component';

describe('ManageteamComponent', () => {
  let component: ManageteamComponent;
  let fixture: ComponentFixture<ManageteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
