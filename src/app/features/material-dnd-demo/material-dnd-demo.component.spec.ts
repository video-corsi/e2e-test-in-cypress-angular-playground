import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDndDemoComponent } from './material-dnd-demo.component';

describe('MaterialDndDemoComponent', () => {
  let component: MaterialDndDemoComponent;
  let fixture: ComponentFixture<MaterialDndDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialDndDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialDndDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
