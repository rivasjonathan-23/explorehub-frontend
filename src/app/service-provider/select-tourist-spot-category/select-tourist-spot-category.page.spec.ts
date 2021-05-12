import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTouristSpotCategoryPage } from './select-tourist-spot-category.page';

describe('SelectTouristSpotCategoryPage', () => {
  let component: SelectTouristSpotCategoryPage;
  let fixture: ComponentFixture<SelectTouristSpotCategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTouristSpotCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTouristSpotCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
