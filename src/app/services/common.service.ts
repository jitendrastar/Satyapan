import { Injectable } from "@angular/core";
import {
  AlertController,
  LoadingController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

declare var google: any;

@Injectable({
  providedIn: "root",
})
export class CommonService {
  currentAppVersion: any = "46";
  currentAppVersionShow: any = "v4.6";
  currentLanguage = "hindi";
  userData: any;
  ssoLoginData: any;
  isOffline = false;
  userList: any = [];

  /****** Staging URL */
  // xmlURL = "https://api.sewadwaar.rajasthan.gov.in/app/live/Janaadhaar/Prod/Service/Info/Fetch?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  // baseURL: string = "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Staging/ifarm/Service/MobileApp/Service?";
  // client_id = "client_id=9d97bf19-e21c-4e85-a036-1cc5d48dec6b";
  // imageUploadUrl = "http://103.203.138.116/agricultureifarm/Service/ImageUploader";
  // // imageUploadUrl = "https://api.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Prod/ImageUploader/Service?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  // mobileAppLogs = "http://103.203.138.116/agricultureifarm/Service/MobileAppLogs";
  // imageUploadUrlForJamaBandi = "http://103.203.138.116/agricultureifarm/Service/UploadJamabandiDocInPostPV";

  /****** Live URL */
  // baseURL: string =
  //  "https://api.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Prod/ifarm/Service/Mobile/App?";
  // client_id = "client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  // imageUploadUrl =  
  // "https://api.sewadwaar.rajasthan.gov.in/app/live/Rajkisan/Prod/Service/ImageUploader?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  //   "https://api.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Prod/ImageUploader/Service?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  //  imageUploadUrlForJamaBandi =
  //  "https://api.sewadwaar.rajasthan.gov.in/app/live/Rajkisan/Prod/Service/ImageUploader?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  //"https://api.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Prod/ImageUploader/Service?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";

  xmlURL =
    "https://api.sewadwaar.rajasthan.gov.in/app/live/Janaadhaar/Prod/Service/Info/Fetch?client_id=f6de7747-60d3-4cf0-a0ae-71488abd6e95";
  mobileAppLogs =
    "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Agriculture/Staging/agricultureifarm/Service/MobileAppLogs?client_id=9d97bf19-e21c-4e85-a036-1cc5d48dec6b";
  baseURL: string = "https://rajkisan.rajasthan.gov.in/Service/MobileAppService";
  client_id: string = "";
  imageUploadUrl: string = "https://rajkisan.rajasthan.gov.in/Service/ImageUploader";
  imageUploadUrlForJamaBandi: string = "https://rajkisan.rajasthan.gov.in/Service/ImageUploader";

  latitude: any = "";
  longitude: any = "";
  loading: any;
  loadingFlag: any = false;
  public key: string;
  public iv: string;
  public errorMessage: string = "Server is not reachable. Please try again.";
  selectedId: any;
  options: CameraOptions;

  constructor(
    public storage: Storage,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public camera: Camera
  ) {
    this.options = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetWidth: 1500,
      targetHeight: 2000,
    };
    this.key = CryptoJS.enc.Utf8.parse("8080808080808080");
    this.iv = CryptoJS.enc.Utf8.parse("8080808080808080");
  }
  changeLanguage() {
    if (this.currentLanguage == "hindi") {
      this.currentLanguage = "english";
    } else if (this.currentLanguage == "english") {
      this.currentLanguage = "hindi";
    }
  }

  encryptData(encstr) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(encstr), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append("Accesstoken", "!@#123APP");
    headers.append("Content-Type", "application/json");
    headers.append("Content-Type", "json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append("Referer", "http://localhost/");
  }

  loginTest(xmlStr) {
    let parser = new DOMParser();
    let xmlString = xmlStr;
    let doc = parser.parseFromString(xmlString, "application/xml");
    console.log(doc);

    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/xml");
    return new Promise((resolve) => {
      this.http
        .post(this.xmlURL, xmlString, { responseType: "text" })
        .subscribe(
          (data) => {
            console.log("XML request Response = ", data);
            resolve(data);
          },
          (err) => {
            console.log("XML request Response Error = ", err);
          }
        );
    });
  }

  async showToast(message) {
    this.dismissLoading();
    if (this.currentLanguage == "hindi") {
      const alert = await this.alertCtrl.create({
        header: "अलर्ट!",
        message: message,
        backdropDismiss: false,
        buttons: ["ठीक है"],
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Alert!",
        message: message,
        backdropDismiss: false,
        buttons: ["OK"],
      });
      await alert.present();
    }
  }

  async showToastMsg(message) {
    await this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toast => {
      toast.present();
    });
  }

  async showLoading() {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message: "Please wait...",
        // backdropDismiss: true,
        duration: 30000,
      }).then(loader => {
        loader.present();
      });
    }
  }

  async dismissLoading() {
    setTimeout(async () => {
      console.log("Dismiss Loading");
      this.loading = await this.loadingCtrl.getTop();
      while (this.loading) {
        if (!(await this.loading.dismiss())) {
          throw new Error("Could not dismiss the topmost loader. Aborting...");
        }
        this.loading = await this.loadingCtrl.getTop();
      }
    }, 300);
  }

  showLoadingImage() {
    this.loadingFlag = true;
  }

  dismissLoadingImage() {
    this.loadingFlag = false;
    // if (this.loading) {
    //   try {
    //     this.loading.dismissAll();
    //   }
    //   catch (err) {
    //     try {
    //       this.loading.dismiss();
    //     }
    //     catch (err) {
    //     }
    //   }
    // }
  }

  get(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseURL + url, {
      headers: headers,
    });
  }

  post(data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    console.log("Base URl = " + this.baseURL);
    return this.http.post(this.baseURL + this.client_id, data, {
      headers: headers,
      //  responseType: 'text' as 'json'
    });
  }

  postLogin(data) {
    // console.log("data", data);
    // let headers = new HttpHeaders();
    // this.createAuthorizationHeader(headers);
    // return this.http.post(this.baseURLLogin + this.client_idLogin, data, {
    //   headers: headers,
    // });
  }

  login(data) {
    this.userData = data;
    this.storage.set("userData", data);
  }

  logMethod(applicationId, subsidySchemeId, errorMsg, methodName, requestbody) {
    var self = this;
    self.dismissLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "PreVerification",
        srvmethodnm: "InsertVerificationErrorLog",
        srvparam: JSON.stringify({
          userid: this.userData.userid,
          ApplicationId: applicationId,
          SubsidySchemeId: subsidySchemeId,
          ErrorLogMsg: errorMsg,
          ModuleName: methodName,
          requestbody: requestbody,
        }),
      },
    };

    this.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {
          console.log("error printed");
        } else {
        }
      },
      (error) => { }
    );
  }
  mobileAppLogsPost(data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.mobileAppLogs, data, {
      headers: headers,
    });
  }
  getErrorMobileLogs(requestData) {
    var self = this;
    var sendRequestData = requestData;
    this.mobileAppLogsPost(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        // console.log('res', res);
        if (res.status == 0) {
          console.log("Mobile Log Api - ", res);
        } else {
          console.log(res.message);
        }
        // self.httpClient.showToast(res.message);
      },
      (error) => {
        self.dismissLoading();
        // self.showToast(self.errorMessage);
        // self.showToastError();
      }
    );
  }
  async showToastError() {
    this.dismissLoading();
    if (this.currentLanguage == "hindi") {
      const toast = await this.alertCtrl.create({
        header: "कनेक्ट नहीं हो सका !",
        message: "कृपया पुनः प्रयास करें।",
        backdropDismiss: false,
        buttons: [
          {
            text: "ठीक है",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      });
      toast.present();
    } else {
      const toast = await this.alertCtrl.create({
        header: "Could Not Connect !",
        message: "Please try again later.",
        backdropDismiss: false,
        buttons: [
          {
            text: "Ok",
            role: "cancel",
            handler: () => {
              console.log("Ok clicked");
            },
          },
        ],
      });
      toast.present();
    }
  }

  distanceDiffBetweenTwoLatLong(prevLat, prevLong, currLat, currLong) {
    // var location1 = new google.maps.LatLng(26.902280, 75.801550);
    // var location2 = new google.maps.LatLng(26.894758, 75.808644);

    var previousLocation = new google.maps.LatLng(prevLat, prevLong);
    var currentLocation = new google.maps.LatLng(currLat, currLong);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(previousLocation, currentLocation);
    console.log("Distance : ", distance.toFixed(2), " Meters");
  }
}
