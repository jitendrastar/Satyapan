import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-demonstration-harvesting-member-list',
  templateUrl: './demonstration-harvesting-member-list.page.html',
  styleUrls: ['./demonstration-harvesting-member-list.page.scss'],
})
export class DemonstrationHarvestingMemberListPage implements OnInit {

  public asList: any = [];
  public asCardIndex: any;
  public isExpandable: boolean = false;
  public agriLovValuesByAgriLovCode: any = [];
  public harvestingDetails: any;
  public remark: any;
  public sowingDate: any;
  public selectedControlPlanValuesId: any;
  public selectedMiniKitValuesId: any;
  public isSubmittedAllotment: boolean = false;

  constructor(public httpClient: CommonService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public location: Location,
    public router: Router) {
      this.remark = '';
      this.getFarmerListForHarvesting();
      this.getAgriLovValuesByAgriLovCode();
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

  getFarmerListForHarvesting(){
    this.httpClient.showLoading();
    var self = this;
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetFarmerListForSowingHarvesting";
    let srvParams:any = new Object();
    srvParams.officeId =  this.httpClient.userData.OfficeId;
    srvParams.userId = 0;
    srvParams.AllotmentId = 0;
    srvParams.ActionCode = 'harvesting';
    credObj.obj.srvparam = JSON.stringify(srvParams);
    self.httpClient.post(credObj).subscribe(res=>{
      console.log("Fetched Search Result = "+JSON.stringify(res));
      if(res[0].status == 0){
        self.asList = res[0].data;
        this.httpClient.dismissLoading();
      }else{
        this.httpClient.showToast(res[0].message);
        this.httpClient.dismissLoading();
      }
    })
  }

  getAgriLovValuesByAgriLovCode(){
    this.httpClient.showLoading();
    var self = this;
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetAgriLovValuesByAgriLovCode";
    let srvParams:any = new Object();
    srvParams.AgriLovValuesCode =  'HarvestPeriod';
    credObj.obj.srvparam = JSON.stringify(srvParams);
    self.httpClient.post(credObj).subscribe(res=>{
      console.log("Fetched Search Result = "+JSON.stringify(res));
      if(res[0].status == 0){
        self.agriLovValuesByAgriLovCode = res[0].data;
        this.httpClient.dismissLoading();
      }else{
        this.httpClient.showToast(res[0].message);
        this.httpClient.dismissLoading();
      }
    })
  }

  expandCard(index, isExpand, item?: any){
    this.harvestingDetails = undefined;
    this.asCardIndex = index;
    this.isExpandable = isExpand;
    if (isExpand && item && item.AllotmentId) {
      this.httpClient.showLoading();
      var self = this;
      let credObj:any = new Object();
      credObj.obj = new Object();
      credObj.obj.usrnm = "rajkisan";
      credObj.obj.psw = "rajkisan@123";
      credObj.obj.srvnm = "Demonstration";
      credObj.obj.srvmethodnm = "GetSowingHarvestingDetails";
      let srvParams:any = new Object();
      srvParams.AllotmentId = item.Id;
      srvParams.ActionCode = 'harvesting';
      credObj.obj.srvparam = JSON.stringify(srvParams);
      self.httpClient.post(credObj).subscribe(res=>{
        console.log("Fetched Search Result = "+JSON.stringify(res)); 
        if(res[0].status == 0){
          this.harvestingDetails = res[0].data[0];
          this.remark = this.harvestingDetails && this.harvestingDetails.GDRemarks ? this.harvestingDetails.GDRemarks : '';
          this.sowingDate = this.harvestingDetails && this.harvestingDetails.SowingDate ? this.harvestingDetails.SowingDate : '';
          this.selectedControlPlanValuesId = this.harvestingDetails && this.harvestingDetails.HarvestControlPlan ? this.harvestingDetails.HarvestControlPlan : '';
          this.selectedMiniKitValuesId = this.harvestingDetails && this.harvestingDetails.HarvestMiniKit ? this.harvestingDetails.HarvestMiniKit : '';
          this.httpClient.dismissLoading();
        }else{
          this.httpClient.showToast(res[0].message);
          this.httpClient.dismissLoading();
        }
      })
    }
  }

  saveDemonstrationProductAllotment(){
    if (this.selectedControlPlanValuesId == undefined || this.selectedControlPlanValuesId == null || this.selectedControlPlanValuesId == '') {
      if (this.httpClient.currentLanguage  == "hindi") {
        this.httpClient.showToast('Please select the Harvest Control Plan.');
      } else {
        this.httpClient.showToast('Please select the Harvest Control Plan.');
      }
      return;
    } else if (this.selectedMiniKitValuesId == undefined || this.selectedMiniKitValuesId == null || this.selectedMiniKitValuesId == '') {
      if (this.httpClient.currentLanguage  == "hindi") {
        this.httpClient.showToast('Please select the Harvest Mini Kit.');
      } else {
        this.httpClient.showToast('Please select the Harvest Mini Kit.');
      }
      return;
    } else {
      let isLess50 = false;
      for (let i = 0; i < this.agriLovValuesByAgriLovCode.length; i++) {
        if (this.selectedControlPlanValuesId == this.agriLovValuesByAgriLovCode[i].AgriLovValuesId && this.agriLovValuesByAgriLovCode[i].AgriLovEn == '<50%') {
          isLess50 = true;
          break;
        }
      }
      setTimeout(() => {
        if (isLess50) {
          if (this.remark && this.remark != "") {
            this.submitDemonstrationProductAllotment();
          } else {
            if (this.httpClient.currentLanguage  == "hindi") {
              this.httpClient.showToast('Please type remark.');
            } else {
              this.httpClient.showToast('Please type remark.');
            }
            return;
          }
        } else {
          this.submitDemonstrationProductAllotment();
        }
      }, 500);
      }
  }

  submitDemonstrationProductAllotment() {
    this.httpClient.showLoading();
          var self = this;
          let credObj:any = new Object();
          credObj.obj = new Object();
          credObj.obj.usrnm = "rajkisan";
          credObj.obj.psw = "rajkisan@123";
          credObj.obj.srvnm = "Demonstration";
          credObj.obj.srvmethodnm = "SaveDemonstrationProductAllotment";
          let srvParams:any = new Object();
          let listObj:any = new Object();
          listObj.DemonProductId = this.harvestingDetails.DemonProductid;
          listObj.HarvestControlPlan = this.selectedControlPlanValuesId;
          listObj.HarvestMiniKit = this.selectedMiniKitValuesId;
          listObj.SowingDate = new Date(this.sowingDate);
          listObj.GDRemarks = this.remark;
          listObj.ActionType = 'harvesting';
          let selectedProductList: any[] = [];
          selectedProductList.push(listObj);
          srvParams.ListASProduct = selectedProductList;
          credObj.obj.srvparam = JSON.stringify(srvParams);
          self.httpClient.post(credObj).subscribe(res=>{
            console.log("Fetched Search Result = "+JSON.stringify(res));
            if(res[0].status == 0){
              this.navCtrl.navigateBack('/demonstration-beneficiary');
              this.httpClient.showToast(res[0].message);
              this.httpClient.dismissLoading();
            }else{
              this.httpClient.showToast(res[0].message);
              this.httpClient.dismissLoading();
            }
          })
  }

  viewHarvestingMemberList() {
    this.router.navigate(['/demonstration-sowing']);
  }
 
}
