import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedStocksComponent } from './allocated-stocks.component';

describe('AllocatedStocksComponent', () => {
  let component: AllocatedStocksComponent;
  let fixture: ComponentFixture<AllocatedStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocatedStocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocatedStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
