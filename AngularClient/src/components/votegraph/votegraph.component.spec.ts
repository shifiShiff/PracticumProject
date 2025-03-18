import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotegraphComponent } from './votegraph.component';

describe('VotegraphComponent', () => {
  let component: VotegraphComponent;
  let fixture: ComponentFixture<VotegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotegraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
