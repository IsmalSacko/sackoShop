import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiquesRetourComponent } from './politiques-retour.component';

describe('PolitiquesRetourComponent', () => {
  let component: PolitiquesRetourComponent;
  let fixture: ComponentFixture<PolitiquesRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitiquesRetourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiquesRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
