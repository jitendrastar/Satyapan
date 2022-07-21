import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-crop-disease-request',
  templateUrl: './crop-disease-request.page.html',
  styleUrls: ['./crop-disease-request.page.scss'],
})
export class CropDiseaseRequestPage implements OnInit {

  public seasonList:any = [];
  public selectedSeasonType:any;
  public cropList:any = [];
  public selectedCrop:any;
  public fileTransfer:any;
  public uploadedImageList:any = [];
  public finalUploadImageList:any = [];
  public latitude:any;
  public longitude:any;
  userid:any;
  diseaseList:any = [];
  selectedDisease:any;
  insectList:any = [];
  selectedInsect:any;
  selectedNutritionalDef:any;
  nutritionalDefList:any = [];
  selectedWeed:any;
  weedList:any = [];
  selectedDiseaseName:any;
  other_disease_name:any = "";

  constructor(public httpClient: CommonService,
    
    public storage: Storage,
    public alertCtrl: AlertController,
    public dbService: DatabaseServiceService, 
    public navCtrl: NavController,
    public router: Router,
    public geolocation: Geolocation,
    public camera: Camera) { }

  ngOnInit() {
    this.getSeasonList();
    
    console.log("Upload Image List = "+JSON.stringify(this.uploadedImageList));
    // this.getCurrentLocation();
  }

  changeRole() {
    this.navCtrl.navigateRoot(["selectrole"]);
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

  logoutPopUp() {
    if (this.httpClient.currentLanguage == 'english') {
        this.showPrompt('Are you sure you want to logout');

    } else {
        this.showPrompt('क्या आप लॉग आउट करना चाहते हैं');
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
          userid: self.userid,
          srvparam: JSON.stringify({ userid: self.userid }),
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
                  userid: self.userid,
                  srvparam: JSON.stringify({ userid: self.userid }),
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

  getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getSeasonList(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                'psw': 'rajkisan@123',
                'srvnm': 'InformaticApp',
                "userid":"2",
                'srvmethodnm': 'agrilovvalues',
                'srvparam': JSON.stringify({'AgriLovValuesCode':'SeedType'})

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.seasonList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  onSeasonChange(){
    console.log("Hiiiiii");
    this.getCropList();
    this.selectedCrop = 0;
    this.selectedDisease = "";
    this.selectedInsect = 0;
    this.selectedNutritionalDef = 0;
    this.selectedWeed = 0;
  }

  getCropList(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                'psw': 'rajkisan@123',
                'srvnm': 'InformaticApp',
                "userid":"2",
                'srvmethodnm': 'getcropbyseason',
                'srvparam': JSON.stringify({'seasonid':this.selectedSeasonType})

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.cropList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  onCropChange(){
    if(this.selectedCrop != 0){
      this.getDiseaseList();
    }
  }

  getDiseaseList(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                "psw":"i75Q7Q6nYgW3rgEitGndNA==",
                "srvnm":"InformaticApp",
                "srvmethodnm":"GetSuvidhaNewCategory",
                'srvparam': JSON.stringify({
                  'category':'subcategory',
                  'categoryid':'1',
                  'cropid':this.selectedCrop
                })

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.diseaseList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  onDiseaseChange(){
    if(this.selectedDisease != ''){
      this.getInsectsList();
    }
    
  }

  getInsectsList(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                "psw":"i75Q7Q6nYgW3rgEitGndNA==",
                "srvnm":"InformaticApp",
                "srvmethodnm":"GetSuvidhaNewCategory",
                'srvparam': JSON.stringify({
                  'category':'subcategory',
                  'categoryid':'2',
                  'cropid':this.selectedCrop
                })

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.insectList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  onInsectChange(){
    if(this.selectedInsect != 0){
      this.getNutritionalDef();
    }
  }

  getNutritionalDef(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                "psw":"i75Q7Q6nYgW3rgEitGndNA==",
                "srvnm":"InformaticApp",
                "srvmethodnm":"GetSuvidhaNewCategory",
                'srvparam': JSON.stringify({
                  'category':'subcategory',
                  'categoryid':'3',
                  'cropid':this.selectedCrop
                })

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.nutritionalDefList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  onNutritionDefChange(){
    if(this.selectedNutritionalDef != 0){
      this.getWeedList();
    }
  }

  getWeedList(){
    this.httpClient.showLoading();
    var self = this;
    var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                "psw":"i75Q7Q6nYgW3rgEitGndNA==",
                "srvnm":"InformaticApp",
                "srvmethodnm":"GetSuvidhaNewCategory",
                'srvparam': JSON.stringify({
                  'category':'subcategory',
                  'categoryid':'4',
                  'cropid':this.selectedCrop
                })

            }
        };
    self.httpClient.post(sendRequestData).subscribe(function(temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
              self.weedList = res.data;
              self.httpClient.dismissLoading();
            } else {
              self.httpClient.showToast(res.message);
              self.httpClient.dismissLoading();
            }
        }
        , error => {
        });
  }

  addNewImage(){
    console.log("Upload Image List = "+JSON.stringify(this.uploadedImageList));
    if(this.uploadedImageList.length >= 4){
      this.httpClient.showToast("Cannot upload more than 4 image.");
    }else{
      this.camera.getPicture(this.httpClient.options).then(
        (imageData) => {
          let options: FileUploadOptions = {
            fileKey: "files",
            params: {
              AppName: "PVapp",
              IsDirectUpload: "True",
            },
          };
  
          this.httpClient.showLoading();
          FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, options).then(
            (data) => {
              // success
              var temp = JSON.parse(data.response);
              console.log("temp[0].data", temp[0].data);
              if (temp[0].data) {
                var fileName = temp[0].data.substr(temp[0].data.lastIndexOf('/') + 1);
                console.log("File name = "+fileName);
                let credObj:any = new Object();
                credObj.filename = fileName;
                credObj.url = temp[0].data;
                this.uploadedImageList.push(credObj);
              } else {
                this.httpClient.showToast("Failed to Upload image");
              }
              this.httpClient.dismissLoading();
            },
            (err) => {
              // error
              this.httpClient.showToastError();
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
  }

  removeImagefromList(index){
    this.uploadedImageList.splice(index,1);
    console.log("Updated uploaded image list = "+JSON.stringify(this.uploadedImageList));
  }

  submit(){
    if(this.selectedSeasonType == "" || this.selectedSeasonType == null || typeof this.selectedSeasonType == "undefined" || 
    this.selectedCrop == "" || this.selectedCrop == null || typeof this.selectedCrop == "undefined" || this.uploadedImageList.length == 0){
      if(this.httpClient.currentLanguage == "english"){
        this.httpClient.showToast("It is mandatory to fill all the fields.")
      }else{
        this.httpClient.showToast("सभी फील्ड भरना अनिवार्य हैं।")
      }
    }
   else{
      for(let i=0; i< this.uploadedImageList.length;i++){
        let imageObj:any = new Object();
        imageObj.SCT_ID = 0;
        imageObj.IMG_FileName = this.uploadedImageList[i].url;
        imageObj.IsActive = 1;
        imageObj.latitude = this.latitude;
        imageObj.longitude = this.longitude;
        this.finalUploadImageList.push(imageObj);
      }
      console.log("Final Image Uplaod List = "+JSON.stringify(this.finalUploadImageList));
      this.httpClient.showLoading();
      var self = this;
      var sendRequestData =
          {
              'obj': {
                  'usrnm': 'rajkisan',
                  'psw': 'rajkisan@123',
                  'srvnm': 'InformaticApp',
                  'srvmethodnm': 'InsertCropDiseasesTreatment',
                  'srvparam': JSON.stringify(
                    {'mobileNo': 8239155962,
                    'farmerid': 0,
                    'Remark': "",
                    'SessionId':this.selectedSeasonType,
                    'cropid': this.selectedCrop,
                    'Diseaseid': this.selectedDisease,
                    'OtherDisease':this.other_disease_name,
                    'Insectsid': this.selectedInsect,
                    'Deficienciesid': this.selectedNutritionalDef,
                    'Weedid': this.selectedWeed,
                    'ActionId': 0,
                    'userid': this.httpClient.userData.userid,
                    'CropDiseasesTreatmentImagesList': this.finalUploadImageList})
  
              }
          };
      self.httpClient.post(sendRequestData).subscribe(function(res) {
              console.log('Submit Data result = ', JSON.stringify(res));
  
              if (res[0].status == 0) {
                self.selectedCrop = 0;
                self.selectedSeasonType = 0;
                self.selectedDisease = "";
                self.selectedInsect = 0;
                self.selectedNutritionalDef = 0;
                self.selectedWeed = 0;
                self.uploadedImageList = [];
                self.finalUploadImageList = [];
              } else {
                self.httpClient.showToast(res[0].message);
              }
          }
          , error => {
          });
    }
  
  }


}
