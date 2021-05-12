import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTouristSpotPagePage } from './create-tourist-spot-page.page';

describe('CreateTouristSpotPagePage', () => {
  let component: CreateTouristSpotPagePage;
  let fixture: ComponentFixture<CreateTouristSpotPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTouristSpotPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTouristSpotPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
