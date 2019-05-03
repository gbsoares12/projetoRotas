import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosTableComponent } from './dados-table.component';

describe('DadosTableComponent', () => {
  let component: DadosTableComponent;
  let fixture: ComponentFixture<DadosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
