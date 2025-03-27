import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreAideComponent } from './centre-aide.component';

describe('CentreAideComponent', () => {
  let component: CentreAideComponent;
  let fixture: ComponentFixture<CentreAideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreAideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreAideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
