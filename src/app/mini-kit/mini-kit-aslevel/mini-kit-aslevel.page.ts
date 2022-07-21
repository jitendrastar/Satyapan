import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { MiniKitJanAadharDetailModelPage } from '../mini-kit-model/jan-aadhar-detail-model/jan-aadhar-detail-model.page';
import { MiniKitProductAllotmentModelPage } from '../mini-kit-model/product-allotment-model/product-allotment-model.page';

@Component({
  selector: 'app-mini-kit-aslevel',
  templateUrl: './mini-kit-aslevel.page.html',
  styleUrls: ['./mini-kit-aslevel.page.scss'],
})
export class MiniKitAslevelPage implements OnInit {

  public asTargetCompleteList: any[] = [];
  public asJanAadharDataReturned: any;
  public selectedASJson: any;
  public janAadharNo: any;
  public memberListRes: any = [];
  public enableSubmitTarget: boolean = true;
  public memberSubmitList: any = [];
  public allotmnet_id: any;
  public memberCatId: any;
  public lat: any;
  public lng: any;
  public isLocation: boolean = false;
  public villageId: any;

  constructor(public httpClient: CommonService,
    public navCtrl: NavController,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public geolocation: Geolocation,
    public locationAccuracy: LocationAccuracy,
    public androidPermissions: AndroidPermissions) {
    this.checkGPSPermission();

    this.route.queryParams.subscribe(params => {
      this.selectedASJson = JSON.parse(params["asJSON"]);
      this.allotmnet_id = this.selectedASJson.ReferenceId;
      console.log("AAO Selected JSON List = ", this.selectedASJson);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('roleList').then(userData => {
      console.log('userData', userData);
    });
  }

  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              alert(
                "requestPermission Error requesting location permissions " +
                error
              );
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLoc();
        },
        (error) =>
          alert(
            "Error requesting location permissions " + JSON.stringify(error)
          )
      );
  }
  getLoc() {
    this.geolocation
      .getCurrentPosition({ enableHighAccuracy: true })
      .then((resp) => {
        this.httpClient.latitude = resp.coords.latitude;
        this.httpClient.longitude = resp.coords.longitude;
        var acc = resp.coords.accuracy;
        var timestamp = resp.timestamp;
        console.log(acc);
        console.log(timestamp);
        this.isLocation = true;
      })
      .catch((error) => {
        this.isLocation = true;
        console.log("error", error);
        if (this.httpClient.currentLanguage == "english") {
          this.httpClient.showToast(
            "You will have to enable the location or GPS permission for this app."
          );
        } else {
          this.httpClient.showToast(
            "आपको इस ऐप के लिए लोकेशन और GPS की अनुमति को सक्षम करना होगा।"
          );
        }
      });
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

  getAllotmentDetailAS() {
    if (!this.janAadharNo) {
      this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया जन आधार नंबर दर्ज करें' : 'Please enter Jan Aadhaar number');
    } else {
      this.asTargetCompleteList = [];
      this.httpClient.showLoading();
      let credObj: any = new Object();
      credObj.obj = new Object();
      credObj.obj.usrnm = "rajkisan";
      credObj.obj.psw = "rajkisan@123";
      credObj.obj.srvnm = "Demonstration";
      // credObj.obj.srvmethodnm = "Memberlist";
      credObj.obj.srvmethodnm = "JanaadharHOFlist";
      let paramObj: any = new Object();
      paramObj.janaadhaarId = this.janAadharNo;
      paramObj.schemeid = this.selectedASJson[0].subScheme[0].SubSchemeId;
      credObj.obj.srvparam = JSON.stringify(paramObj);
      this.httpClient.post(credObj).subscribe((res: any) => {
        console.log("member list data = " + JSON.stringify(res));
        if (res[0].status == 0) {
          this.memberListRes = res[0].data;
          this.openModel();
          this.httpClient.dismissLoading();
        } else {
          this.httpClient.showToast(res[0].message);
        }
      });
    }
  }

  async openModel() {
    const modal = await this.modalCtrl.create({
      component: MiniKitJanAadharDetailModelPage,
      componentProps: {
        "referenceID": 40,
        "memberList": JSON.stringify(this.memberListRes)
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.asJanAadharDataReturned = dataReturned.data.selected_member;
        this.memberCatId = dataReturned.data.memberCatId;
        this.villageId = dataReturned.data.villageId;
        this.asTargetCompleteList = [];
        this.asTargetCompleteList.push(this.asJanAadharDataReturned);
        console.log('Modal Sent Data :' + JSON.stringify(dataReturned));
      }
    });

    return await modal.present();
  }

  async tappedOnDistributeBtn() {
    const modal = await this.modalCtrl.create({
      component: MiniKitProductAllotmentModelPage,
      cssClass: 'minikit-distribute-modal',
      backdropDismiss: false,
      componentProps: {
        referenceID: 40,
        memberData: this.asJanAadharDataReturned,
        SubSchemeId: this.selectedASJson[0].subScheme[0].SubSchemeId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned && dataReturned.data) {
        console.log('Modal Sent Data :' + JSON.stringify(dataReturned));
        if (dataReturned.data) {
          let listObj: any = new Object();
          // listObj.Id = 0; dataReturned.data.finalJanAadharData
          listObj.FarmerId = dataReturned.data.FarmerDetailsId;
          listObj.enrId = dataReturned.data.finalJanAadharData.ENR_ID;
          listObj.aadharId = dataReturned.data.finalJanAadharData.AADHAR_ID;
          listObj.FJanId = dataReturned.data.finalJanAadharData.JAN_AADHAR;
          listObj.janAadhaarID = dataReturned.data.finalJanAadharData.JAN_AADHAR;
          listObj.MemberId = dataReturned.data.finalJanAadharData.JAN_MEMBER_ID;
          listObj.Name = dataReturned.data.finalJanAadharData.NAME;
          listObj.Name_Hi = dataReturned.data.finalJanAadharData.NAME_HINDI;
          listObj.hofNameEn = dataReturned.data.finalJanAadharData.NAME;
          listObj.hofNameHi = dataReturned.data.finalJanAadharData.NAME_HINDI;
          listObj.SPOUCE_NAME_ENG = dataReturned.data.finalJanAadharData.SPOUCE_NAME_ENG ? dataReturned.data.finalJanAadharData.SPOUCE_NAME_ENG : '';
          listObj.SPOUCE_NAME_HND = dataReturned.data.finalJanAadharData.SPOUCE_NAME_HND ? dataReturned.data.finalJanAadharData.SPOUCE_NAME_HND : '';
          listObj.AlterNetMobileNo = dataReturned.data.MobNo ? dataReturned.data.MobNo : this.asJanAadharDataReturned.MOBILE_NO;
          listObj.imageUrl = dataReturned.data.image ? dataReturned.data.image : '';
          listObj.SchemeId = this.selectedASJson[0].scheme[0].Id;
          listObj.SubSchemeId = this.selectedASJson[0].subScheme[0].SubSchemeId;
          listObj.SeasonId = this.selectedASJson[0].season[0].SeasonId;
          listObj.CropId = this.selectedASJson[0].crop[0].CropId;
          listObj.VerityId = this.selectedASJson[0].variety[0].VerityId;
          listObj.FinancialYearID = this.selectedASJson[0].finYear;
          listObj.OfficeId = this.httpClient.userData.OfficeId;
          listObj.VillageId = this.villageId;
          listObj.FarmerTypeId = this.memberCatId.value;
          this.memberSubmitList.push(listObj);
          console.log("Member List to besubmitted = " + JSON.stringify(this.memberSubmitList));

          let credObj: any = new Object();
          credObj.obj = new Object();
          credObj.obj.usrnm = "rajkisan";
          credObj.obj.psw = "rajkisan@123";
          credObj.obj.srvnm = "Demonstration";
          credObj.obj.srvmethodnm = "InsertMiniKitDistribution";
          let paramObj: any = new Object();
          paramObj.otp = dataReturned.data.otp;
          paramObj.isAadhaarVerified = dataReturned.data.isAadhaarVerified;
          paramObj.latitude = this.httpClient.latitude;
          paramObj.longitude = this.httpClient.longitude;
          paramObj.CreatedBy = this.httpClient.userData.userid;
          paramObj.MiniKitDistributionList = [listObj];
          credObj.obj.srvparam = JSON.stringify(paramObj);

          let self = this;
          this.httpClient.post(credObj).subscribe(
            function (temp) {
              var res: any = temp[0];
              console.log("res", res);
              self.httpClient.dismissLoading();
              if (res.status == 0) {
                // self.asTargetCompleteList.splice(index, 1);
                self.httpClient.showToast("Minikit distributed successfully.");
              } else {
                self.httpClient.showToast(res.message);
              }
              // self.navCtrl.navigateRoot(["mini-kit-dashboard"]).then(navData => {
              //   self.asTargetCompleteList.splice(index, 1);
              // });
            }, (error) => {
              self.httpClient.dismissLoading();
              self.httpClient.showToastError();
            }
          );
        }
      }
    });
    return await modal.present();
  }

  viewMemberList() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "allotment_id": this.allotmnet_id,
        "asJSON": JSON.stringify(this.selectedASJson)
      }
    };
    this.router.navigate(['/mini-kit-beneficiary'], navigationExtras);
  }

}
