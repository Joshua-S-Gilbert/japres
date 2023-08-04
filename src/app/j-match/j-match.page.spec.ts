import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JMatchPage } from './j-match.page';

describe('JMatchPage', () => {
  let component: JMatchPage;
  let fixture: ComponentFixture<JMatchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
