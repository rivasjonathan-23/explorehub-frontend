import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Page } from 'src/app/modules/elementTools/interfaces/page';
import { bookingData } from '../../provider-services/interfaces/bookingData';
import { notification } from '../../provider-services/interfaces/notification';
import { MainServicesService } from '../../provider-services/main-services.service';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
})
export class NotificationCardComponent implements OnInit {
  @Input() notif: notification = {
    _id: "",
    receiver: "",
    createdAt: "",
    message: "",
    opened: false,
  }
  @Output() displayOption: EventEmitter<any> = new EventEmitter();
  @Input() notificationGroup: any;

  constructor(public router: Router, public alert: AlertController, public mainService: MainServicesService) { }

  ngOnInit() {
    if (this.notif && this.notif.createdAt) {
    }
  }

  viewNotification(notif, notificationGroup, allNotif = false) {
    setTimeout(() => {

      this.mainService.viewNotification({ notifId: notif["isMessage"] && !allNotif ? notif._id : notificationGroup._id, isMessage: notif["isMessage"] }).subscribe(
        response => {
          if (notif["isMessage"]) {
            notif.opened = true
          } else {
            notificationGroup.notifications = notificationGroup.notifications.map(notif => {
              if (!notif.isMessage) {
                notif.opened = true
              }
              return notif
            })
          }
          const type = notificationGroup.type
          let deleted = "";
          
          if (type == "booking-tourist") {
            if (notificationGroup.booking) {
              let tab = "/booking-information"
              let params: any = { notification: true }
              if (notif["isMessage"]) {
                tab = "/conversation"
                params = { notification: true, bookingId: notificationGroup.booking._id, pageId: notificationGroup.page._id, receiverId: notificationGroup.page.creator, noLoadingInd: true }
                if (notificationGroup.page.creator == notif["sender"]) params["fromOwner"] = true
              }
              this.router.navigate(["/service-provider/view-booking/" + notificationGroup.booking._id + tab],
                { queryParams: params })
            } else {
              deleted = "booking"
            }
          }
          else if (type.includes("booking") && !notificationGroup.booking) {
            this.presentAlert(`The booking is already deleted.`)
          
          } else if (type == "page-provider") {

            const page = notificationGroup.page
            if (page) {
              if (notif["isMessage"]) {
                this.router.navigate(['/service-provider/page-chat'], { queryParams: { pageId: page._id, conversationId: notif["conversation"] } })
              } else {
                if (page.creator == this.mainService.user._id) {
                  this.router.navigate([`/service-provider/dashboard/${page.pageType}/${page._id}/board/booking/Booked`], { queryParams: { fromNotification: true } })
                } else {
                  this.router.navigate(["/service-provider/view-page", page._id, page.pageType], { queryParams: { fromHostedList: true, parentPageCreator: this.mainService.user._id } })
                }
              }
            } else {
              deleted = "page"
            }
          }
          else if (type == "booking-provider") {
            if (notificationGroup.booking) {
              let tab = "/booking-information"
              let params: any = { notification: true }

              if (notif["isMessage"]) {
                tab = "/conversation"
                params = { notification: true, bookingId: notificationGroup.booking._id, pageId: notificationGroup.page._id, tourist: notificationGroup.booking.tourist }
              }
              this.router.navigate(["./service-provider/view-booking-as-provider/" + notificationGroup.booking.pageId + "/" + notificationGroup.booking.bookingType + "/" + notificationGroup.booking._id + "/" + notificationGroup.booking.status + tab],
                { queryParams: params })
            } else {
              deleted = "booking"

            }
          }
          if (deleted != "") {
            this.presentAlert(`The ${deleted} is already deleted.`)
          }
        }
      )
    }, 300);

  }
  getName(conversation) {
    return conversation.receiver ? conversation.receiver.fullName : conversation["type"] == "admin_approval" ? "Admin" : "Unknown"
  }

  async presentAlert(message) {
    const alert = await this.alert.create({
      cssClass: "my-custom-class",
      header: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  clickOption(e) {
    e.stopPropagation()
    setTimeout(() => {
      this.displayOption.emit(this.notif._id);
    }, 200);
  }
}
