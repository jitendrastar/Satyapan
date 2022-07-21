import { Component, OnInit } from "@angular/core";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { CommonService } from "../services/common.service";
import { Storage } from "@ionic/storage";
import { DatabaseServiceService } from "../services/database-service.service";

@Component({
  selector: "app-material-verification-list",
  templateUrl: "./material-verification-list.page.html",
  styleUrls: ["./material-verification-list.page.scss"],
})
export class MaterialVerificationListPage implements OnInit {
  materialVerificationList: any = [];
  constructor(
    public alertController: AlertController,
    public platform: Platform,
    public dbService: DatabaseServiceService,
    public router: Router,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public storage: Storage,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public callNumber: CallNumber
  ) {}
  ionViewWillEnter() {
    this.getMaterialVerificationList();
  }
  ngOnInit() {}
  getMaterialVerificationList() {
    var self = this;
    self.materialVerificationList = [];
    self.httpClient.showLoadingImage();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "i75Q7Q6nYgW3rgEitGndNA==",
        srvnm: "HortiSubsidy",
        srvmethodnm: "GetHortiListForMaterialVerification",
        srvparam: JSON.stringify({
          ApplicationId: 0,
          userid: this.httpClient.userData.userid,
          Status: "Pending",
        }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {
          self.materialVerificationList = res[0].data;
        } else {
          if (res[0].data == "") {
            self.httpClient.showToast(res[0].message);
          } else {
            self.httpClient.showToast(res[0].data);
          }
        }
        self.httpClient.dismissLoadingImage();
      },
      (error) => {
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "HortiSubsidy",
            srvmethodnm: "GetHortiListForMaterialVerification",
            srvparam: JSON.stringify({
              ApplicationId: 0,
              userid: self.httpClient.userData.userid,
              Status: "Pending",
            }),
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }
  callFarmer(mobileNo) {
    this.callNumber
      .callNumber(mobileNo, true)
      .then((res) => console.log("Launched dialer!", res))
      .catch((err) => console.log("Error launching dialer", err));
  }
  materialVerification(data) {
    this.router.navigate([
      "material-verification",
      { obj: JSON.stringify(data) },
    ]);
  }
}
