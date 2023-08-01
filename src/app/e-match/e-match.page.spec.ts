import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMatchPage } from './e-match.page';

describe('EMatchPage', () => {
  let component: EMatchPage;
  let fixture: ComponentFixture<EMatchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
