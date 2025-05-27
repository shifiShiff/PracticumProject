import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeActionComponent } from './challenge-action.component';

describe('ChallengeActionComponent', () => {
  let component: ChallengeActionComponent;
  let fixture: ComponentFixture<ChallengeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
