import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Platform, ActionSheetController, AlertController} from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { PageCreatorService } from 'src/app/modules/page-creator/page-creator-service/page-creator.service';
const { Camera } = Plugins;

export type PageDocuments = {
  busisnessPermit: string
  ownerValidId: string
}

@Component({
  selector: 'app-page-legality-validation',
  templateUrl: './page-legality-validation.component.html',
  styleUrls: ['./page-legality-validation.component.scss'],
})
export class PageLegalityValidationComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  public documentType: string;
 @Input() pageDocuments:PageDocuments = {busisnessPermit: null, ownerValidId: null}
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private plt: Platform,private actionSheetCtrl: ActionSheetController,public creator: PageCreatorService, public alert: AlertController) { }

  ngOnInit() {}

  async selectImageSource(type) {
    this.documentType = type
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];

    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source
      });

      const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
      this.creator.addPageDocuments(this.documentType, blobData).subscribe((data: any) => {
        this.pageDocuments[this.documentType] = data

      }, (error) => {
        this.presentAlert("The problem is maybe cuased by an invalid file type being uploaded!")
      });
    } catch (err) {
    }
  }
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    this.creator.addPageDocumentsFile(this.documentType, file).subscribe((data: any) => {
      this.pageDocuments[this.documentType] = data

    }, (error) => {
      this.presentAlert("The problem is maybe due to invalid file type being uploaded!")
    });
  }

    // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async presentAlert(message) {
    const alert = await this.alert.create({
      cssClass: "my-custom-class",
      header: message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}
