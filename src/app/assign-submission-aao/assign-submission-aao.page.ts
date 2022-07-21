import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { CommonService } from "../services/common.service";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-assign-submission-aao',
  templateUrl: './assign-submission-aao.page.html',
  styleUrls: ['./assign-submission-aao.page.scss'],
})
export class AssignSubmissionAaoPage implements OnInit {
  farmerPhoto: any;
  farmerName: any;
  schemeName: any;
  schemeNameHnd: any;
  applicationNo: any;
  mobileNo: any;
  fatherName: any;
  caste: any;
  subCaste: any;
  khasraNo: any;
  totalLandArea: any;
  farmCategory: any;
  isSprinkler: any;
  farmPondCategory: any;
  shape: any;
  creationDate: any;
  farmerNameH: any;
  statusAssignPending: any;
  assignedToNameEn: any;
  assignedToNameHi: any;
  applicationId: any;

  listDeatailForAssign: any;
  getAsListData:[];

  asListId: any;
  asListId2: any;
  asName: any;
  asNameHi: any;

  village: any;
  district: any;
  block: any;
  villageH: any;
  districtH: any;
  blockH: any;
  schemeNameH: any;
  roleId: any;
  userid: any;
  subsidySchemeId: any;
  listLength: any;
  constructor(    public navCtrl: NavController,
    public storage: Storage,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public httpClient: CommonService) { 
      this.listDeatailForAssign = JSON.parse(
        this.route.snapshot.paramMap.get("dataForAAO")
      );
      this.applicationId = this.listDeatailForAssign.ApplicationID;
      this.subsidySchemeId = this.listDeatailForAssign.SubsidySchemeId;
      console.log("this.subsidySchemeId", this.subsidySchemeId);
      console.log("this.applicationId", this.applicationId);
  
      this.farmerName = this.listDeatailForAssign.FarmerName;
  
      this.schemeName = this.listDeatailForAssign.SchemeNameEng;
      this.schemeNameHnd = this.listDeatailForAssign.SchemeNameHnd;
  
      this.khasraNo = this.listDeatailForAssign.KhasraNo;
      this.totalLandArea = this.listDeatailForAssign.SubsidySchemeId;
      this.farmCategory = this.listDeatailForAssign.FarmCategory;
      this.isSprinkler = this.listDeatailForAssign.IsSprinkler;
      this.farmPondCategory = this.listDeatailForAssign.SubsidyCategory;
      // this.shape = this.listDeatailForAssign.Shape;
      if (this.listDeatailForAssign.Shape == "") {
        this.shape = "null";
      } else {
        this.shape = this.listDeatailForAssign.Shape;
      }
      // this.farmPondCategory = this.listDeatailForAssign.FarmerCost;
      // this.farmPondCategory = this.listDeatailForAssign.FarmPondCategory;
  
      this.village = this.listDeatailForAssign.Village_Eng;
      this.district = this.listDeatailForAssign.DISTRICT_ENG;
      this.block = this.listDeatailForAssign.BLOCK_ENG;
  
      if (this.listDeatailForAssign.FarmerNameHnd == "") {
        this.farmerNameH = this.listDeatailForAssign.FarmerName;
      } else {
        this.farmerNameH = this.listDeatailForAssign.FarmerNameHnd;
      }
  
      this.villageH = this.listDeatailForAssign.Village_Mangal;
      this.districtH = this.listDeatailForAssign.DISTRICT_MANGAL;
      this.blockH = this.listDeatailForAssign.BLOCK_MANGAL;
      this.mobileNo = this.listDeatailForAssign.MobileNo;
      this.caste = this.listDeatailForAssign.Caste;
      this.subCaste = this.listDeatailForAssign.SubCaste;
      this.creationDate = this.listDeatailForAssign.CreationDate;
      this.fatherName = this.listDeatailForAssign.fatherName;
      this.farmerPhoto = this.listDeatailForAssign.FarmerPhoto;
      this.applicationNo = this.listDeatailForAssign.ApplicationNo;
      this.statusAssignPending = this.listDeatailForAssign.Status;
      this.assignedToNameEn = this.listDeatailForAssign.AssignedToNameEn;
      if (this.listDeatailForAssign.AssignedToNameHi == "") {
        this.assignedToNameHi = this.listDeatailForAssign.AssignedToNameEn;
      } else {
        this.assignedToNameHi = this.listDeatailForAssign.AssignedToNameHi;
      }
    }

    ionViewDidLoad() {
      console.log("ionViewDidLoad AssignsubmissionPage");
    }
    ionViewWillEnter() {
      console.log("ionViewWillEnter AssignsubmissionPage");
      this.roleId = this.httpClient.userData.roleid;
      this.userid = this.httpClient.userData.userid;
      this.getAAOList(this.userid);
  }
  ngOnInit() {
  }
  getAAOList(userid) {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "i75Q7Q6nYgW3rgEitGndNA==",
        srvnm: "PostVerification",
        srvmethodnm: "GetASCircleByAAOId",
        srvparam:
          "{'UserId':'" +
          userid +
          "','ApplicationId':'" +
          0 +
          "','SubsidySchemeId':'" +
          0 +
          "'}",
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {
          self.getAsListData = res[0].data;

          console.log("self.getAsListData ", self.getAsListData);
          console.log("res[0].data.length--> ", res[0].data.length);
          //self.listLength = res[0].data.length;
          if (self.listLength == 1) {
           // self.asName = self.getAsListData[0].OfficerNameEn;
          //  self.asNameHi = self.getAsListData[0].OfficerNameHi;
            //self.asListId = self.getAsListData[0].UserId;
          }
        } else {
          // self.httpClient.showToast(res[0].data);
          if (res[0].data == "") {
            self.showPrompt(res[0].message);
          } else {
            self.showPrompt(res[0].data);
          }
        }
        // self.httpClient.showToast(res.message);
        self.httpClient.dismissLoading();
      },
      (error) => {
        var errorRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "i75Q7Q6nYgW3rgEitGndNA==",
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "PostVerification",
            srvmethodnm: "GetASCircleByAAOId",
            srvparam:
                "{'UserId':'" +
                userid +
                "','ApplicationId':'" +
                0 +
                "','SubsidySchemeId':'" +
                0 +
                "'}",
          },
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();       }
    );
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


  saveAssignAS() {
    console.log("sdjd"+this.asListId);
    //alert(this.asListId2);
   
    if (this.asListId2 == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Select One Item");
      } else {
        this.httpClient.showToast("Please Select One Item");
      }
    } else {
     // return false;
      var self = this;
      // self.httpClient.showLoading();
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "i75Q7Q6nYgW3rgEitGndNA==",
          srvnm: "PostVerification",
          srvmethodnm: "AssignToASUrbanCasePV",
          srvparam: JSON.stringify({
            //ApplicationIds: this.applicationId,
           // NextUserID: this.asListId,
           ApplicationId: this.applicationId,
            ASID: this.asListId2,
           // RoleId: this.roleId,
            UserId: this.userid,
            schemeid: this.subsidySchemeId,
          }),
        },
      };

      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          console.log("res", res);
          if (res[0].status == 0) {
            // self.saveAssignASData = res[0].data;
            self.showPrompt(res[0].message);
          } else {
            self.showPrompt(res[0].data);
          }

          // self.httpClient.showToast(res.message);
          self.httpClient.dismissLoading();
        },
        (error) => {
          var errorRequestData = {
            obj: {
              usrnm: "rajkisan",
              psw: "i75Q7Q6nYgW3rgEitGndNA==",
              srvresponce: error,
              userid: self.httpClient.userData.userid,
              srvnm: "PostVerification",
              srvmethodnm: "AssignToASUrbanCasePV",
              srvparam: JSON.stringify({
               // ApplicationIds: self.applicationId,
               // NextUserID: self.asListId,
                ApplicationId: this.applicationId,
                ASID: this.asListId2,
                RoleId: self.roleId,
                UserId: self.userid,
                schemeid: self.subsidySchemeId,
              }),
            },
          };
          console.log('errorRequestData new', errorRequestData);
          self.httpClient.getErrorMobileLogs(errorRequestData);
          self.httpClient.showToastError();
        }
      );
    }
  }
  onAsClick(e) {
    console.log("asListId-->", e.target.value);
  }
}
