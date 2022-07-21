
import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";
import {
  AlertController,
  ModalController,
  NavController,
  NavParams,
  ActionSheetController,
} from "@ionic/angular";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-upload-images",
  templateUrl: "./upload-images.page.html",
  styleUrls: ["./upload-images.page.scss"],
})
export class UploadImagesPage implements OnInit {
  
  licenseId: any;
  applicationType: any;
  innerPhoto: any;
  outerPhoto: any;
  constructor(
    public navparams: NavParams,
    
    public file: File,
    public sanitizer: DomSanitizer,
    public camera: Camera,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController,
    public httpClient: CommonService
  ) {
    
    this.licenseId = this.navparams.get("licenseId");
    this.applicationType = this.navparams.get("AppType");
  }

  ngOnInit() { }

  closeModel() {
    this.modalCtrl.dismiss(null);
  }

  takePhotos(param) {
    // this.submit();
    //  return false;
    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        this.httpClient.showLoading();
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            AppName: "MBSY",
            IsDirectUpload: "True",
          },
        };
        console.log("options params rs ", options.params);
        FileTransfer.create()
          .upload(imageData, this.httpClient.imageUploadUrl, options)
          .then(
            (data) => {
              this.httpClient.dismissLoading();
              // success
              var temp = JSON.parse(data.response);
              console.log("temp", temp);
              if (temp[0].status == "0") {
                if (param == 1) {
                  this.innerPhoto = temp[0].data;
                } else {
                  this.outerPhoto = temp[0].data;
                }
              } else {
                this.httpClient.showToast(temp[0].message);
              }
            },
            (err) => {
              // error
              this.httpClient.dismissLoading();
              console.log("err", err);
            }
          );
      },
      (err) => {
        // Handle error
      }
    );
  }

  submit() {
    if (!this.innerPhoto) {
      this.httpClient.showToast("Upload first photo");
      return;
    }
    if (!this.outerPhoto) {
      this.httpClient.showToast("Upload second photo");
      return;
    }
    this.modalCtrl.dismiss({
      innerPhoto: this.innerPhoto,
      outerPhoto: this.outerPhoto,
      // innerPhoto: "http://rajkisan.rajasthan.gov.in/Content/UserImages/1bdbbdcc-1840-4f89-8491-bdd07e260f43.png",
      //outerPhoto: "http://rajkisan.rajasthan.gov.in/Content/UserImages/1bdbbdcc-1840-4f89-8491-bdd07e260f43.png",
    });
  }

}
