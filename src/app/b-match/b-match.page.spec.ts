import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BMatchPage } from './b-match.page';

describe('BMatchPage', () => {
  let component: BMatchPage;
  let fixture: ComponentFixture<BMatchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
