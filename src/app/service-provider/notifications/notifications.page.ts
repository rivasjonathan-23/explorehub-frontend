import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { NotificationCardComponent } from '../components/notification-card/notification-card.component';
import { NotificationHandlerComponent } from '../components/notification-handler/notification-handler.component';
import { notification } from '../provider-services/interfaces/notification';
import { notificationGroup } from '../provider-services/interfaces/notificationGroup';
import { MainServicesService } from '../provider-services/main-services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notifications: notificationGroup[] = []
  public loading: boolean = true;
  @ViewChild(NotificationCardComponent) notificationCard: NotificationCardComponent;
  public formDashboard: boolean;
  public showOption: boolean = false;
  public showOther: string = null
  public notifGroupOption: any = null;
  public notifClicked: string;
  constructor(public mainService: MainServicesService, public alert: AlertController, public route: ActivatedRoute) { }

  ngOnInit() {
    this.mainService.activeTab.emit("notifications")
    this.getNotifications();
    this.mainService.notification.subscribe(
      (data: any) => {
        if (!data.receiver.includes("all"))
          this.getNotifications(true)
      }
    )

    this.route.queryParams.subscribe(
      (params: any) => {
        if (params && params.formDashboard) this.formDashboard = true
      }
    )
  }


  getNotifications(hideLoading = false) {
    this.mainService.getNotifications(hideLoading).subscribe(
      (notifications: any) => {
        // notifications = notifications.map(notif => {
        //   const msgNotif = notif.notifications.filter(n => n.isMessage)
        //   if (msgNotif.length > 0) {
        //     msgNotif.forEach(msg => {
        //       if (!msg.opened) {
        //         const notifs = notif.notifications.filter(n => n._id != msg._id)
        //         notifs.push(msg);
        //         notif.notifications = notifs;
        //       }
        //     });
        //   }
        //   return notif
        // })
        this.loading = false
        this.notifications = notifications
      },
      error => {
      }
    )
  }

  getPageName(notif) {
    let title = "Untitled Page"
    notif.page.components.forEach(comp => {
      if (comp.data.defaultName && comp.data.defaultName == "pageName") {
        title = comp.data.text
      }
    });
    return title;
  }


  getTitle(notif) {
    const curUser = this.mainService.user._id
    let title = "Untitled Page"
    if (notif.booking && notif.page) {
      const bookingOwner = notif.booking.tourist
      if (curUser == bookingOwner) {
        title = `Your booking to "${this.getPageName(notif)}"`
      } else {
        title = `${notif.mainReceiver.fullName}'s booking`
      }
    } else if (notif.type.includes("booking") && !notif.booking) {
      const bookingOwner = notif.mainReceiver
      if (curUser == bookingOwner) {
        title = `Your booking to "${this.getPageName(notif)}" | DELETED`
      } else {
        title = `${notif.mainReceiver.fullName}'s booking | DELETED`
      }
    } else if (!notif.page && notif.type.includes("page")) {
      return "DELETED PAGE"
    } else {
      if (notif.page) {

        notif.page.components.forEach(comp => {
          if (comp.data.defaultName == "pageName") {
            title = comp.data.text
          }
        });
      } else {
        return "DELETED PAGE"
      }
    }
    return title
  }

  getTotalUnread(notif) {
    let count = 0;
    notif.notifications.forEach(ntf => {
      if (!ntf.opened) count++
    });
    return count;
  }

  getNotifs(notif, num) {
    if (notif.length > 3) {
      return notif.splice(0, num)
    }
    return notif
  }

  displayOption(id) {
    setTimeout(() => {
      this.showOption = true;
      this.notifClicked = id
    }, 200);
  }
  clickOpt(type) {
    setTimeout(() => {
      if (type == "delete") {
        if (this.notifGroupOption) {
          this.deleteNotificationGroupCon(this.getTitle(this.notifGroupOption))
        } else {

          this.deleteNotifConfirmation()
        }
      }
      else if (type == "edit") {
        if (this.notifGroupOption) {
          this.notificationCard.viewNotification(this.notifGroupOption.notifications[0], this.notifGroupOption, true)
        } else {

          this.notifications.forEach(notificationGroup => {
            notificationGroup.notifications.forEach(notif => {

              if (notif._id == this.notifClicked) {
                this.notificationCard.viewNotification(notif, notificationGroup)
              }
            });
          })
        }
      } else {
        this.notifClicked = "";
      }
      this.showOption = false;
      this.notifGroupOption = null
    }, 100);
  }

  async deleteNotifConfirmation() {
    let notifData = ""
    this.notifications.forEach(notificationGroup => {
      notificationGroup.notifications.forEach(notif => {
        if (notif._id == this.notifClicked) {
          notifData = notif
        }

      });
    })
    const alert = await this.alert.create({
      cssClass: "my-custom-class",
      header: `Are you sure you want to delete this notification?`,
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.mainService.deleteNotification(this.notifClicked).subscribe(
              (response) => {
                this.notifications = this.notifications.map((notifGroup: any) => {
                  notifGroup.notifications = notifGroup.notifications.filter(notif => notif._id != this.notifClicked)
                  return notifGroup
                })
                this.notifClicked = ""
              }
            )
          },
        },
        {
          text: "No",
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteNotificationGroupCon(name) {

    const alert = await this.alert.create({
      cssClass: "my-custom-class",
      header: `Are you sure you want to delete all the notifications about "${name}"?`,
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.mainService.deleteNotificationGroup(this.notifClicked).subscribe(
              (response) => {
                this.notifications = this.notifications.filter(notif => notif._id != this.notifClicked)
                this.notifGroupOption = null
                this.notifClicked = ""
              }
            )
          },
        },
        {
          text: "No",
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }
}
