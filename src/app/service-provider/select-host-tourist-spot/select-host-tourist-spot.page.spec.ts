import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectHostTouristSpotPage } from './select-host-tourist-spot.page';

describe('SelectHostTouristSpotPage', () => {
  let component: SelectHostTouristSpotPage;
  let fixture: ComponentFixture<SelectHostTouristSpotPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHostTouristSpotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHostTouristSpotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
