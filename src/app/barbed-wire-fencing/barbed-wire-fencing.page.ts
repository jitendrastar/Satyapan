import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-barbed-wire-fencing',
  templateUrl: './barbed-wire-fencing.page.html',
  styleUrls: ['./barbed-wire-fencing.page.scss'],
})
export class BarbedWireFencingPage implements OnInit {

  bwfVerificationList: any = [];
  roleId: any;
  userid: any;
  subsidyId: any;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subsidyId = this.route.snapshot.paramMap.get("subsidyId");
    this.roleId = this.httpClient.userData.roleid;
    this.userid = this.httpClient.userData.userid;
    this.getBWFVerificationList(this.roleId, this.userid)
  }
  getBWFVerificationList(roleId, userid) {
    var self = this;
    self.httpClient.showLoadingImage();
    self.bwfVerificationList = [];
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
          SubsidySchemeId: 12
        })

      },
    };

    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {

          self.bwfVerificationList = res[0].data;

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
              SubsidySchemeId: 12
            })
          },
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();

      }
    );
  }
  gotoSubmissionPage(data) {
    this.router.navigate(["subsidy-detail", { subsidyId: this.subsidyId,ApplicationId:data }]);
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
