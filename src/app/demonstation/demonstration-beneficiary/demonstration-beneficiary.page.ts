import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { ProductAllotmentModelPage } from '../model/product-allotment-model/product-allotment-model.page';

@Component({
  selector: 'app-demonstration-beneficiary',
  templateUrl: './demonstration-beneficiary.page.html',
  styleUrls: ['./demonstration-beneficiary.page.scss'],
})
export class DemonstrationBeneficiaryPage implements OnInit {

  public memberList: any = [];
  public alloctingMemberName: any;
  public showProductList: boolean = false;
  public productList: any = [];
  public selectedProductList: any = [];
  public selectedMember: any;
  public saveBeneficiaryDataRes: any;
  public listJSONArray: any = [];
  public hectareModelArray: any = [];
  public selectedHectare: any;
  public showProductAccHectare: boolean = false;
  public farmerCategory: string = "";
  public hectareModelSelected: boolean = false;
  public activeProductList: any = [];
  public isAllotmentComplete: any = 0;
  public showSaveBtn: boolean = false;
  public remainingHectareRes: any = [];
  
  public allotment_id: any;
  public jamabandiImagePath: any = "";
  public nazariaImagePath: any = "";

  constructor(public navCtrl: NavController,
    public httpClient: CommonService,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public datepipe: DatePipe,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    
    public route: ActivatedRoute,
    public router: Router
  ) {
    
    this.route.queryParams.subscribe(params => {
      this.allotment_id = params["allotment_id"];
      console.log("Allotment ID = ", this.allotment_id);
      this.getMemberList();
    })

    // this.getJanAadharData();
    for (let i = 40; i <= 100; i = i + 10) {
      this.hectareModelArray.push(i / 100);
    }
    console.log("Hectare Model Array = " + this.hectareModelArray);
  }

  ngOnInit() {
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

  onHectareSelection(selectedItem) {
    if (this.selectedMember.HectareModel == 0 || this.selectedMember.HectareModel == 0.0) {
      if (this.selectedHectare > this.remainingHectareRes[0].remaining) {
        this.selectedHectare = 0;
        this.showProductAccHectare = false;
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Cannot select hectare more than Remaining Hectare " + this.remainingHectareRes[0].remaining);
          console.log("heelo1");
        } else {
          this.httpClient.showToast("शेष " + this.remainingHectareRes[0].remaining + " हेक्टेयर से अधिक हेक्टेयर का चयन नहीं कर सकते।");
          console.log("heelo2");
        }
      } else {
        if (this.selectedHectare == 0) {
          this.showProductAccHectare = false;
          console.log("heelo3");
        } else {
          // this.showProductAccHectare = true;
          this.getProductList();
          console.log("heelo4");
        }
      }
    } else {
      this.getProductList();
    }
    console.log("jhgjhgjhk");
  }

  getProductList() {
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetProductList";
    let paramObj: any = new Object();
    paramObj.ASID = parseInt(this.selectedMember.Id);
    paramObj.MemberId = this.selectedMember.MemberId;
    paramObj.AllotmentId = this.selectedMember.AllotmentId;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("product list = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.productList = res[0].data;
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].AlreadySaved == 0) {
            this.activeProductList.push(this.productList[i]);
          }

        }

        console.log("Active Product = " + JSON.stringify(this.activeProductList));
        this.showProductAccHectare = true;
        this.showProductList = true;
        this.httpClient.dismissLoading();
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Something went wrong. Please try again.");
        } else {
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }
  getMemberList() {
    console.log("Allotment ID = ", this.allotment_id);

    this.httpClient.showLoading();
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetMemberListForProduct";
    let paramObj: any = new Object();
    paramObj.officeId = this.httpClient.userData.OfficeId;
    paramObj.userId = this.httpClient.userData.userid;
    paramObj.allotmentid = this.allotment_id;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("member list data = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.memberList = res[0].data;
        this.showProductList = false;
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Record not exists.");
        } else {
          this.httpClient.showToast("रिकॉर्ड मौजूद नहीं है।");
        }
      }
      this.httpClient.dismissLoading();
    });
  }

  allocateToMember(selectedItem) {
    this.httpClient.showLoading();
    this.selectedMember = selectedItem;
    this.selectedHectare = selectedItem.HectareModel;
    if (selectedItem.HectareModel != 0 || selectedItem.HectareModel != 0.0) {
      console.log("here hectare is not 0;")
      this.hectareModelSelected = true;
      this.showProductAccHectare = true;
      this.onHectareSelection(this.selectedMember);
    } else {
      console.log("here hectare is 0;")
      this.hectareModelSelected = false;
      this.showProductAccHectare = false;
      this.getRemainingHectare(this.selectedMember);
    }
    if (selectedItem.IsAllotmentCompleted == 1) {
      this.showSaveBtn = true;
    } else {
      this.showSaveBtn = false;
    }
    console.log("Selected Item = " + JSON.stringify(selectedItem));
    this.alloctingMemberName = selectedItem.Name;
    this.showProductList = true;

  }

  getRemainingHectare(selectedItem) {
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "CalculateAllotedTarget";
    let paramObj: any = new Object();
    paramObj.AllotmentId = selectedItem.AllotmentId;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("Remaining Hectare Res = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.remainingHectareRes = res[0].data;
        this.onHectareSelection(this.selectedMember);
        this.httpClient.dismissLoading();
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Something went wrong. Please try again.");
        } else {
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  async saveAllotment(isPartial, farmerCat) {
    this.farmerCategory = farmerCat;
    this.selectedProductList = [];
    // if(this.selectedProductList == null || this.selectedProductList == []){
    //   this.httpClient.showToast("Selected product list cannot be blank");
    // }else{
    if (this.selectedHectare == "" || this.selectedHectare == null || typeof this.selectedHectare == "undefined") {
      this.httpClient.showToast("Please select hectare model");
    }
    else {
      console.log("Product modified list= " + JSON.stringify(this.productList));
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].Ischecked == 1) {
          let listObj: any = new Object();
          listObj.DemonProductId = 0;
          listObj.ASAllotmentId = parseInt(this.selectedMember.Id);
          listObj.ProductId = this.productList[i].DemonstrationId;
          listObj.MemberId = this.selectedMember.MemberId;
          this.selectedProductList.push(listObj);
        }
      }
      console.log("Selected Product list= " + JSON.stringify(this.selectedProductList));
      // this.saveMemberData("",isPartial);
      if (isPartial == 1) {
        this.isAllotmentComplete = 0;
        if (this.selectedMember.OTPVerified == 1) {
          this.saveMemberData("", isPartial);
        } else {
          // this.saveMemberData("",isPartial);
          this.openModelToVerifyOTP(isPartial);
        }
      } else {
        this.isAllotmentComplete = 1;
        // this.saveMemberData("",isPartial);
        this.openModelToVerifyOTP(isPartial);
      }
    }
    // }

  }

  async openModelToVerifyOTP(isPartial) {
    const modal = await this.modalCtrl.create({
      component: ProductAllotmentModelPage,
      componentProps: {
        "referenceID": 40,
        "aadhaarId": this.selectedMember.aadharId
        // "memberList": JSON.stringify(this.memberListRes)
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Modal Sent Data :' + JSON.stringify(dataReturned));
        if (dataReturned.role == "backdrop") {

        }
        if (dataReturned.data) {
          this.saveMemberData(dataReturned.data, isPartial);
        }
      }
    });
    return await modal.present();
  }

  saveMemberData(data, isPartial) {
    this.httpClient.showLoading();
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "SaveDemonstrationAllotmentASLevel";
    let paramObj: any = new Object();
    paramObj.ListASObj = [
      {
        "Id": parseInt(this.selectedMember.Id),
        "AllotmentId": this.selectedMember.AllotmentId,
        "enrId": this.selectedMember.enrId,
        "aadharId": this.selectedMember.aadharId,
        "FJanId": this.selectedMember.FJanId,
        "MemberId": this.selectedMember.MemberId,
        "Name": this.selectedMember.Name,
        "Name_Hi": this.selectedMember.Name_Hi,
        "ProductId": 0,
        "OTPVerified": 1,
        "IsAllotmentCompleted": this.isAllotmentComplete,
        "Isrejected": 0,
        "RejectionRemark": "",
        "MemberDetailJson": "",
        "IsPartialSave": isPartial,
        "FarmerCasteName": "GEN",
        "ImagePath": "",
        // "FarmerCasteName" :this.farmerCategory,
        "FarmerCategory": this.selectedMember.FarmerCategory,
        "IsPermanent": 1,
        "HectareModel": this.selectedHectare
      }];
    credObj.obj.srvparam = JSON.stringify(paramObj);
    console.log("Inserted data = " + JSON.stringify(credObj));
    this.httpClient.post(credObj).subscribe(res => {
      console.log("member list data = " + JSON.stringify(res));
      if (res[0].status == 0) {
        if (this.httpClient.currentLanguage == "english") {
          // this.httpClient.showToast("Member List saved Successfully");
          if (this.selectedProductList.length == 0) {
            if (this.httpClient.currentLanguage == "english") {
              this.httpClient.showToast("Data Saved Successfully");
            } else {
              this.httpClient.showToast("डेटा सफलतापूर्वक जमा की गई");
            }
            this.hectareModelSelected = true;
            this.getMemberList();
            this.getProductList();
          } else {
            this.saveProductList(isPartial);
          }
          console.log("is Partal = " + isPartial);
          if (isPartial == 1) {
            this.showSaveBtn = false;
          } else {
            this.showSaveBtn = true;
          }

        } else {
          this.httpClient.showToast("सदस्य सूची सफलतापूर्वक जमा की गई");
        }
        this.httpClient.dismissLoading();
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Something went wrong. Please try again.");
        } else {
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  saveProductList(isPartial) {
    this.httpClient.showLoading();
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "SaveDemonstrationProductAllotment";
    let paramObj: any = new Object();
    paramObj.ListASProduct = this.selectedProductList;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("Saved Product Allotment Res = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.getMemberList();
        this.getProductList();
        if (isPartial == 1) {
          this.showSaveBtn = false;
        } else {
          this.showSaveBtn = true;
        }
        this.hectareModelSelected = true;
        // this.allocateToMember(this.selectedMember);
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Product List saved Successfully");
        } else {
          this.httpClient.showToast("उत्पाद सूची सफलतापूर्वक जमा की गई");
        }
        this.httpClient.dismissLoading();
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Something went wrong. Please try again.");
        } else {
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  addProductToList(item, index) {
    if (this.productList[index].Ischecked == 0) {
      this.productList[index].Ischecked = 1;
    } else {
      this.productList[index].Ischecked = 0;
    }
  }

  getJanAadharData(isPartial) {
    var self = this;
    var farmerCat;
    let registerDate = new Date();
    let tranformedDate = this.datepipe.transform(registerDate, 'dd-mm-yyyy hh:MM:ss a');
    console.log("Parse Json = " + tranformedDate);
    var xmlString = "<root><Info><janaadhaarId>" + this.selectedMember.FJanId + "</janaadhaarId><enrId>" + this.selectedMember.enrId + "</enrId><aadharId>" + this.selectedMember.aadharId + "</aadharId><scheme>" + this.selectedMember.scheme + "</scheme><infoFlg>" + this.selectedMember.infoFlg + "</infoFlg><authMode>" + this.selectedMember.authMode.trim() + "</authMode><dateTime>" + tranformedDate + "</dateTime></Info></root>"

    this.httpClient.loginTest(xmlString).then(res => {
      console.log("XML Res = " + JSON.stringify(res));
      let parseString = require('xml2js').parseString;
      let xml = res;
      parseString(xml, function (err, result) {
        console.dir("---------------" + JSON.stringify(result));
        console.log("Category = " + result.root.family[0].familydetail[0].category[0]);
        console.log("cvxn Category = " + self.farmerCategory);
        farmerCat = result.root.family[0].familydetail[0].category[0];
        console.log("FArmer Category = " + farmerCat);
        self.saveAllotment(isPartial, farmerCat);
      });
    });
  }

  async showConfirmAlert(isPartial) {
    if (this.httpClient.currentLanguage == "hindi") {
      const prompt = await this.alertCtrl.create({
        header: "पुष्टि करें",
        message: "आपने फाइनल सेव कर लिया है, इसके बाद आप फिर से उसी किसान को आवंटन नहीं कर पाएंगे। क्या आप वाकई आवंटित करना चाहते हैं?",
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
              this.getJanAadharData(isPartial);
            },
          },
        ],
      });
      await prompt.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Confirm",
        message: "You have done final save, after this you would not be able to allot again to same farmer. Are you sure you want to allocate?",
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
              this.getJanAadharData(isPartial);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async selectImage(columnName) {
    if (this.httpClient.currentLanguage == 'hindi') {
      const actionSheet = await this.actionSheetController.create({
        header: "छवि स्रोत का चयन करें",
        buttons: [{
          text: 'गैलरी का प्रयोग करें',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, columnName);
          }
        },
        {
          text: 'कैमरा का प्रयोग करें',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA, columnName);
          }
        },
        {
          text: 'रद्द करें',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Use Gallery',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, columnName);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA, columnName);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }
  }

  pickImage(sourceType, columnName) {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetWidth: 1500,
      targetHeight: 2000,
      sourceType: sourceType
    }
    console.log(options);

    this.camera.getPicture(options).then((imageData) => {

      let optionsCam: FileUploadOptions = {
        fileKey: 'files',
        params: {
          id: parseInt(this.selectedMember.Id),
          AppName: 'Demonstration',
          tableName: 'Demonstration_Allotment_ASLevel',
          columnName: columnName,
          uniqueidcolumnname: 'Id',
          IsDirectUpload: 'False',
        },

      };
      console.log(optionsCam.params);
      console.log("Image Data = ", imageData);


      this.httpClient.showLoading();

      FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, optionsCam).then((data) => {
        this.httpClient.dismissLoading();
        var temp = JSON.parse(data.response);
        console.log('temp[0].data', temp[0].data);
        if (temp[0].data[0].URL) {

          if (columnName == 'JamabandiImagePath') {
            this.jamabandiImagePath = temp[0].data[0].URL;
          } else {
            this.nazariaImagePath = temp[0].data[0].URL;
          }
          // this.ImgTriPartyAgreement = temp[0].data;
        } else {
          this.httpClient.showToastError();
        }


      }, (err) => {

        this.httpClient.dismissLoading();
        console.log('err', err);
      });

    },
      (err) => {
        console.log('log 3', err);
      });
  }

  deleteMember(item) {
    this.httpClient.showLoading();
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "DeleteFarmerfromList";
    let paramObj: any = new Object();
    paramObj.AllotmentId = item.AllotmentId;
    paramObj.MemberId = item.MemberId;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("Delete Farmer Res = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.getMemberList();
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Farmer has been deleted successfully");
        } else {
          this.httpClient.showToast("किसान को सफलतापूर्वक हटा दिया गया है");
        }
        this.httpClient.dismissLoading();
      } else {
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast("Something went wrong. Please try again.");
        } else {
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  viewSowingMemberList() {
    this.router.navigate(['/demonstration-sowing']);
  }

}
