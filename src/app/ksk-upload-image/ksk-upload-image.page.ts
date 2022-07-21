import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from '../services/common.service';
import { DatabaseServiceService } from '../services/database-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-ksk-upload-image',
  templateUrl: './ksk-upload-image.page.html',
  styleUrls: ['./ksk-upload-image.page.scss'],
})
export class KskUploadImagePage implements OnInit {

  public officeName:any;
  public officeType:any;
  public officeDetailID:any;
  public fileURL:any;
  public lat:any;
  public long:any;
  public fileTransfer:any;
  public enableSubmit:boolean = false;

  constructor(public navCtrl: NavController,
    public httpClient: CommonService,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public camera: Camera,
    
    public geolocation:Geolocation
    ) {
      
     }

  ngOnInit() {
    this.getOfficeDetail();
  }

  changeRole() {
    this.navCtrl.navigateRoot(["selectrole"]);
  }

  logoutPopUp() {
    if (this.httpClient.currentLanguage == "english") {
      this.showPrompt("Are you sure you want to logout");
    } else {
      this.showPrompt("क्या आप लॉग आउट करना चाहते हैं");
    }
  }

  logout() {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "PreVerification",
        srvmethodnm: "logoutMobileuser",
        userid: self.httpClient.userData.userid,
        srvparam: JSON.stringify({ userid: self.httpClient.userData }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        if (res.status == 0) {
          self.dbService.emptyStorage();
          // self.storage.clear();
          self.storage.remove('userData');
          self.storage.remove('roleList');
          self.httpClient.userList = '';
          self.navCtrl.navigateRoot("login");
        } else {
          self.httpClient.showToast(res.message);
        }
        self.httpClient.dismissLoading();
      },
      (error) => {
        self.httpClient.dismissLoading();
        var errorRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "i75Q7Q6nYgW3rgEitGndNA==",
            srvnm: "PreVerification",
            srvmethodnm: "logoutMobileuser",
            userid: self.httpClient.userData.userid,
            srvparam: JSON.stringify({ userid: self.httpClient.userData.userid }),
          },
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }


  async showPrompt(msg) {
    if (this.httpClient.currentLanguage == "hindi") {
      const prompt = await this.alertCtrl.create({
        header: "लॉग आउट",
        message: msg,
        backdropDismiss: false,

        buttons: [
          {
            text: "रद्द करें",
            role: "cancel",
            handler: () => {
            },
          },
          {
            text: "ठीक है",
            handler: (data) => {
              console.log("Ok clicked");
              this.logout();
            },
          },
        ],
      });
      await prompt.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Logout",
        message: msg,
        backdropDismiss: false,

        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
            },
          },
          {
            text: "OK",
            handler: (data) => {
              console.log("Ok clicked");
              this.logout();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  home() {
    if (this.httpClient.userList.length == 0) {
      this.navCtrl.navigateRoot([
        "subsidy-lic-selection",
        { userData: JSON.stringify([this.httpClient.userData]) },
      ]);
    }
    else {
      this.navCtrl.navigateRoot([
        "subsidy-lic-selection",
        { userData: JSON.stringify(this.httpClient.userList) },
      ]);
    }
  }

  getCurrentLocation(){
    this.geolocation
    .getCurrentPosition()
    .then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
    })
    .catch((error) => {
        console.log("Error getting location", error);
    });
  }

  getOfficeDetail(){
    this.httpClient.showLoading();
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "ksk";
    credObj.obj.srvmethodnm = "GetOfficeDetailsfoMobile";
    let paramObj:any = new Object();
    paramObj.officeid = this.httpClient.userData.OfficeId;
    // paramObj.officeid = '10';
    paramObj.userid = this.httpClient.userData.userid;
    // paramObj.userid = '119';
    credObj.obj.srvparam = JSON.stringify(paramObj);
    console.log("Inserted Data  = "+JSON.stringify(credObj));
    this.httpClient.post(credObj).subscribe(res=>{
      console.log("Office Detail Res = "+JSON.stringify(res));
      if(res[0].status == 0){
        if(this.httpClient.currentLanguage == "english"){
          this.officeName = res[0].data[0].OfficeName;
          this.officeType = res[0].data[0].OfficeTypeEN;
        }else{
          this.officeName = res[0].data[0].OfficeNameHi;
          this.officeType = res[0].data[0].OfficeTypeHI;
        }
        this.officeDetailID = res[0].data[0].OfficeDetailsId;
        this.fileURL = res[0].data[0].FilePath;
        this.lat = res[0].data[0].Latitude;
        this.long = res[0].data[0].longitude;
        this.httpClient.dismissLoading();
      }else{
        if(this.httpClient.currentLanguage == "english"){
          this.httpClient.showToast("Something went wrong. Please try again.");
        }else{
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  getFilePath(){
    var self = this;
    console.log("Office Detail ID = "+self.officeDetailID);
    console.log("Lat" +this.lat);
    // if(this.lat == "" || this.long == "" || typeof this.lat == "undefined" || typeof this.long == "undefined"){
      this.getCurrentLocation();
    // }
    self.camera.getPicture(self.httpClient.options).then(
      (imageData) => {
        console.log("Image Data = "+JSON.stringify(imageData));
        console.log("Office Detail ID = "+self.officeDetailID);
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            id: self.officeDetailID,
            // id: '1',
            AppName: "PVapp",
            tablename: "OfficeDetails",
            columnname: "FilePath",
            uniqueidcolumnname: "OfficeDetailsId",
            IsDirectUpload: "False",
            latitude: self.lat,
            longitude: self.long
          },
        };
        console.log("Params = "+JSON.stringify(options));
        self.httpClient.showLoading();
        FileTransfer.create().upload(imageData, self.httpClient.imageUploadUrl, options).then(
          (data) => {
            self.httpClient.dismissLoading();
            // success
            console.log("Upload Res = "+JSON.stringify(data));
            var temp = JSON.parse(data.response);
            console.log("temp[0].data", temp[0].data);
            if (temp[0].status == 0) {
              self.fileURL = temp[0].data[0].URL;
              console.log("File Path = "+self.fileURL);
              self.httpClient.showToast((self.httpClient.currentLanguage == 'hindi') ? 'फाईल सफलता पूर्वक अपलोड की गयी ।' : 'File Uploaded Successfully.');
            } else {
              self.httpClient.showToastError();
            }
          },
          (err) => {
            // error
            self.httpClient.showToastError();
            self.httpClient.dismissLoading();
            console.log("err", err);
          }
        );

      },
      (err) => {
        // Handle error
      }
    );
  }

  submit(){
    console.log("Lat" +this.lat);
    if(this.lat == "" || this.long == "" || typeof this.lat == "undefined" || typeof this.long == "undefined"){
      this.getCurrentLocation();
    }
    this.httpClient.showLoading();
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "ksk";
    credObj.obj.srvmethodnm = "ksk_UpdateDataforMobile";
    let paramObj:any = new Object();
    paramObj.officeid = this.httpClient.userData.OfficeId;
    // paramObj.officeid = '10';
    paramObj.userid = this.httpClient.userData.userid;
    // paramObj.userid = '119';
    paramObj.UploadFile = this.fileURL;
    // paramObj.OfficeDetailsId = '1';
    paramObj.OfficeDetailsId = this.officeDetailID;
    paramObj.latitude = this.lat;
    paramObj.longitude = this.long;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    console.log("Inserted Data  = "+JSON.stringify(credObj));
    this.httpClient.post(credObj).subscribe(res=>{
      console.log("Office Detail Res = "+JSON.stringify(res));
      if(res[0].status == 0){
        this.httpClient.showToast(res[0].data);
      }else{
        if(this.httpClient.currentLanguage == "english"){
          this.httpClient.showToast("Something went wrong. Please try again.");
        }else{
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

}
