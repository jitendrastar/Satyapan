import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-whs',
  templateUrl: './whs.page.html',
  styleUrls: ['./whs.page.scss'],
})
export class WhsPage implements OnInit {
  whsVerificationList: any = [];
  roleId: any;
  userid: any;
  subsidyId: any;
  cast: any = '';

  preVerificationListData: any = [];
  preVerificationListDataTwo: any = [];

  farmerNameHnd: any;

  ApplicationId: any;

  constructor(public navCtrl: NavController,
    public router: Router,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public route: ActivatedRoute,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subsidyId = this.route.snapshot.paramMap.get("subsidyId");
    this.roleId = this.httpClient.userData.roleid;
    this.userid = this.httpClient.userData.userid;
    console.log("this.subsidyId", this.subsidyId);
    console.log("this.ApplicationId", this.ApplicationId);
    this.getwhsVerificationList(this.roleId, this.userid);
  }

  getwhsVerificationList(roleId, userid) {
    var self = this;
    self.httpClient.showLoadingImage();
    self.whsVerificationList = [];
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "PreVerification",
        srvmethodnm: "BWFVerificationList",
        srvparam: JSON.stringify({
          RoleId: roleId,
          UserId: userid,
          Flag: 1,
          SubsidySchemeId: 62
        })

      },
    };

    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {

          self.whsVerificationList = res[0].data;

        } else {
          if (res[0].data == "") {
            self.showPrompt(res[0].message);
          } else {
            self.showPrompt(res[0].data);
          }
        }
        self.httpClient.dismissLoadingImage();
      },
      (error) => {
        var errorRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "rajkisan@123",
            srvnm: "PreVerification",
            srvresponce: error,
            'userid': self.httpClient.userData.userid,
            srvmethodnm: "BWFVerificationList",
            srvparam: JSON.stringify({
              RoleId: roleId,
              UserId: userid,
              Flag: 1,
              SubsidySchemeId: 62
            })
          },
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();

      }
    );
  }
  VerificationList(roleId, userid, subsidyId, cast) {
    var self = this;
    self.httpClient.showLoadingImage();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "i75Q7Q6nYgW3rgEitGndNA==",
        srvnm: "PreVerification",
        srvmethodnm: "VerificationList",
        srvparam: JSON.stringify({
          SubsidySchemeId: subsidyId,
          RoleId: roleId,
          UserId: userid,
          Flag: "1",
          CasteCategory: cast,
          ApplicationId: this.ApplicationId,
        }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        if (res[0].status == 0) {
          self.preVerificationListDataTwo = res[0].data;
          self.preVerificationListData = res[0].data;
          for (let i = 0; i < self.preVerificationListData.length; i++) {
            self.preVerificationListData[i].isAlreadySaved = 0;
          }
          // if (self.preVerificationListData.length < 5) {
          //     self.preVerificationListData = self.preVerificationListData;
          //     self.listLength = false;
          // }
          // else {
          //     self.preVerificationListData = res[0].data.splice(0, 5);
          //     self.counter = 5;
          //     self.listLength = true;

          // }
          // self.checkOfflineExistOrNot();
        } else {
          if (res[0].data == "") {
            //  self.showPromptRecordNotFound(res[0].message);
          } else {
            //  self.showPromptRecordNotFound(res[0].data);
          }
        }
        // self.httpClient.showToast(res.message);
        self.httpClient.dismissLoadingImage();
      },
      (error) => {
        // self.httpClient.dismissLoading();
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "PreVerification",
            srvmethodnm: "VerificationList",
            srvparam: JSON.stringify({
              SubsidySchemeId: subsidyId,
              RoleId: roleId,
              UserId: userid,
              Flag: "1",
            }),
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }
  gotoSubmissionPage(data) {
    // this.router.navigate(["subsidy-detail", { subsidyId: this.subsidyId,ApplicationId:data }]);
    this.router.navigate([
      "whs-pre-verification", { subsidyId: this.subsidyId, ApplicationId: data.ApplicationId, obj: JSON.stringify(this.preVerificationListData), data: JSON.stringify(data) },
    ]);
  }
  async showPrompt(msg) {
    if (this.httpClient.currentLanguage == "hindi") {
      const prompt = await this.alertCtrl.create({
        header: "अलर्ट!",
        message: msg,
        backdropDismiss: false,
        buttons: [
          {
            text: "ठीक है",
            handler: (data) => {
              console.log("Ok clicked");
              this.navCtrl.pop();
            },
          },
        ],
      });
      await prompt.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Alert!",
        message: msg,
        backdropDismiss: false,

        buttons: [
          {
            text: "OK",
            handler: (data) => {
              console.log("Ok clicked");
              this.navCtrl.pop();
            },
          },
        ],
      });
      await alert.present();
    }
  }
}
