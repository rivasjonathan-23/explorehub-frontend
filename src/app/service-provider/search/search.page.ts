import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Page } from 'src/app/modules/elementTools/interfaces/page';
import { MainServicesService } from '../provider-services/main-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public form:any;
  public pageName: string;
  public pages: Page[] =[]
  public noResult: boolean;
  public loading: boolean;
  constructor(public router: Router, public formBuilder: FormBuilder, public mainService: MainServicesService) {
    this.form = this.formBuilder.group({
      pageName: [""],
    });
   }

  ngOnInit() {
  }

  search() {
    
    const text = this.form.controls['pageName'].value.trim()
    if (text != "") {
      this.pageName = text
      this.loading = true;
      this.pages = []
      this.mainService.searchTouristSpot({pageName: text})
      .subscribe((pages: Page[]) => {
      
        this.pages = pages
        this.noResult = this.pages.length == 0
        this.loading = false;
      },() => {
        this.loading = false;
      })
    }
  }

  viewPage(page) {
    this.router.navigate(["/service-provider/view-page", page._id, page.pageType], {queryParams: {fromSearch: true}})
  }

}
