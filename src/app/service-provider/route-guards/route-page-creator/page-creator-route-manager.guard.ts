import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PageCreatorService } from 'src/app/modules/page-creator/page-creator-service/page-creator.service';
import { MainServicesService } from '../../provider-services/main-services.service';

@Injectable({
  providedIn: 'root'
})
export class PageCreatorRouteManagerGuard implements CanActivate {
  constructor(
    private creator: PageCreatorService,
    private router: Router,
    private route: ActivatedRoute,
    public alert: AlertController,
    public mainService: MainServicesService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  canDeactivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.creator.canLeave) {
      return true;
    }
    return this.alertAtLeave();
  }

  async alertAtLeave() {
    let url = ["/service-provider"]
    this.route.queryParams.subscribe(params => {
      if (params && params.fromDraft) {
        url = ["/service-provider/list-of-pages", "unfinished"]
      }
    })
    let curUrl = this.router.url.split("?")[0]
    curUrl = curUrl.split("/").reverse()[0]
    return this.mainService.getPage(curUrl).toPromise().then(async (data: any) => {
      if (data.status == "Unfinished" || data.status == "Rejected" || data.status == "Cancelled") {

        const alert = await this.alert.create({
          cssClass: "my-custom-class",
          header:
            "Do you want to save this to 'Draft' and finish it later?",
          buttons: [
            {
              text: "Save",
              handler: () => {
                this.creator.canLeave = true;
                this.creator.preview = false;
                this.router.navigate(url)
              },
            },
            {
              text: "Delete",
              handler: () => {
                this.creator.canLeave = false;
                this.discardPage(url)
              },
            },
          ],
        });
        await alert.present();
        return false
      } else {
        this.mainService.validatePage.emit()
        return false
      }
    })
  }

  async discardPage(url) {
    const alert = await this.alert.create({
      cssClass: "my-custom-class",
      header:
        "Are you sure you want to delete this page?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.creator.deletePage().subscribe(
              (response) => {
                this.creator.canLeave = true;
                this.creator.preview = false;
                this.router.navigate(url)
              }
            )
          },
        },
        {
          text: "No",
          handler: () => {
            this.creator.canLeave = false;
            this.alertAtLeave();
            // this.router.navigate(["/service-provider"])
          },
        },
      ],
    });
    await alert.present();
  }
}
