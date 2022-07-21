import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DemonstrationService } from 'src/app/services/demonstration.service';
import { JanAadharDetailModelPage } from '../model/jan-aadhar-detail-model/jan-aadhar-detail-model.page';

@Component({
  selector: 'app-demonstration-dashboard',
  templateUrl: './demonstration-dashboard.page.html',
  styleUrls: ['./demonstration-dashboard.page.scss'],
})
export class DemonstrationDashboardPage implements OnInit {

  public enableSubScheme: boolean = true;
  public enableComponent: boolean = true;
  public enableCategory: boolean = true;
  public enableActivity: boolean = true;
  public enableSubActivity: boolean = true;
  public enableFinancialYr: boolean = true;
  public showSearchRes: boolean = false;
  public showASList: boolean = false;
  public schemeFilterRes: any = [];
  public subSchemeFilterRes: any = [];
  public componentFilterRes: any = [];
  public categoryFilterRes: any = [];
  public activityFilterRes: any = [];
  public subActivityFilterRes: any = [];
  public financialYrFilterRes: any = [];
  public selectedSchemeID: any = 0;
  public selectedSubSchemeID: any = 0;
  public selectedComponentID: any = 0;
  public selectedCategoryID: any = 0;
  public selectedActivityID: any = 0;
  public selectedSubActivityID: any = 0;
  public selectedFinancialYr: any = 0;
  public selectedDistrictID: any = 0;
  public asJanAadharDataReturned: any;
  public searchResList: any = [];
  public asSearchResList: any = [];
  public asList: any = [];
  public saveAllotmentRes: any;
  public selectedAAOJson: any;
  public aaoCardIndex: any = 0;
  public isExpandable: boolean = false;
  public showJanAadhar: boolean = false;
  public asTargetCompleteList: any = [];


  constructor(public httpClient: CommonService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public demoService: DemonstrationService,
    public modalCtrl: ModalController,
    public router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // this.enableSubScheme = true;
    // this.enableComponent = true;
    // this.enableCategory = true;
    // this.enableActivity = true;
    // this.enableSubActivity = true;
    // this.enableFinancialYr = true;
    // this.showSearchRes = false;
    // this.schemeFilterRes = [];
    // this.subSchemeFilterRes = [];
    // this.componentFilterRes = [];
    // this.categoryFilterRes = [];
    // this.activityFilterRes = [];
    // this.subActivityFilterRes = [];
    // this.financialYrFilterRes = [];
    // this.selectedSubSchemeID = 0;
    // this.selectedComponentID = 0;
    // this.selectedCategoryID = 0;
    // this.selectedActivityID = 0;
    // this.selectedSubActivityID = 0;
    // this.selectedFinancialYr = 0;
    // this.searchResList = [];
    // this.asList = [];
    // this.aaoCardIndex = 0;
    this.isExpandable = false;
    this.selectedDistrictID = this.httpClient.userData.OfficeId;
    console.log("District ID = " + this.selectedDistrictID);
    this.getDropdownValues('Scheme');
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

  getDropdownValues(filterType) {
    var self = this;
    self.demoService.getFilterDropDownData(filterType, self.selectedSchemeID, self.selectedSubSchemeID,
      self.selectedComponentID, self.selectedActivityID, self.selectedDistrictID).subscribe(
        function (res) {
          console.log("Filtered Data = " + JSON.stringify(res));
          if (filterType == 'Scheme') {
            self.schemeFilterRes = res[0].data;
            console.log("Scheme Filter Res = ", self.schemeFilterRes);
            if (self.schemeFilterRes.length == 1) {
              self.selectedSchemeID = self.schemeFilterRes[0].Id;
              self.getDropdownValues('SubScheme');
            }
          }
          if (filterType == 'SubScheme') {
            self.subSchemeFilterRes = res[0].data;
            console.log(" Sub Scheme Filter Res = ", self.subSchemeFilterRes);
            if (self.subSchemeFilterRes.length == 1) {
              self.selectedSubSchemeID = self.subSchemeFilterRes[0].Id;
              self.getDropdownValues('Component');
            }
          }
          if (filterType == 'Component') {
            self.componentFilterRes = res[0].data;
            console.log(" Component Filter Res = ", self.componentFilterRes);
            if (self.componentFilterRes.length == 1) {
              self.selectedComponentID = self.componentFilterRes[0].Id;
              self.getDropdownValues('Category');
            }
          }
          if (filterType == 'Category') {
            self.categoryFilterRes = res[0].data;
            console.log(" Category Filter Res = ", self.categoryFilterRes);
            if (self.categoryFilterRes.length == 1) {
              self.selectedCategoryID = self.categoryFilterRes[0].Id;
              self.getDropdownValues('Activity');
            }
          }
          if (filterType == 'Activity') {
            self.activityFilterRes = res[0].data;
            console.log(" Activity Filter Res = ", self.activityFilterRes);
            if (self.activityFilterRes.length == 1) {
              self.selectedActivityID = self.activityFilterRes[0].Id;
              self.getDropdownValues('SubActivity');
            }
          }
          if (filterType == 'SubActivity') {
            self.subActivityFilterRes = res[0].data;
            console.log(" Activity Filter Res = ", self.subActivityFilterRes);
            if (self.subActivityFilterRes.length == 1) {
              self.selectedSubActivityID = self.subActivityFilterRes[0].Id;
              self.getFinancialYearList();
            }
          }

        });
  }

  getFinancialYearList() {
    this.demoService.getFinancialYrList().subscribe(res => {
      this.financialYrFilterRes = res[0].data;
      if (this.financialYrFilterRes.length == 1) {
        this.selectedFinancialYr = this.financialYrFilterRes[0].FIN_YEAR_MASTR_ID;
      }
    })
  }

  selectFilterValue(val) {
    if (val == "scheme") {
      this.enableSubScheme = false;
      this.subSchemeFilterRes = [];
      this.selectedSubSchemeID = 0;
      this.componentFilterRes = [];
      this.selectedComponentID = 0;
      this.categoryFilterRes = [];
      this.selectedCategoryID = 0;
      this.activityFilterRes = [];
      this.selectedActivityID = 0;
      this.subActivityFilterRes = [];
      this.selectedSubActivityID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('SubScheme');
    }
    if (val == "subScheme") {
      this.enableComponent = false;
      this.componentFilterRes = [];
      this.selectedComponentID = 0;
      this.categoryFilterRes = [];
      this.selectedCategoryID = 0;
      this.activityFilterRes = [];
      this.selectedActivityID = 0;
      this.subActivityFilterRes = [];
      this.selectedSubActivityID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('Component');
    }
    if (val == "component") {
      this.enableCategory = false;
      this.categoryFilterRes = [];
      this.selectedCategoryID = 0;
      this.activityFilterRes = [];
      this.selectedActivityID = 0;
      this.subActivityFilterRes = [];
      this.selectedSubActivityID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('Category');
    }
    if (val == "category") {
      this.enableActivity = false;
      this.activityFilterRes = [];
      this.selectedActivityID = 0;
      this.subActivityFilterRes = [];
      this.selectedSubActivityID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('Activity');
    }
    if (val == "activity") {
      this.enableSubActivity = false;
      this.subActivityFilterRes = [];
      this.selectedSubActivityID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('SubActivity');
    }
    if (val == "sub_activity") {
      this.enableFinancialYr = false;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getFinancialYearList();
    }
    // if(val == "financial_year"){
    //   this.getFinancialYearList();
    // }
  }


  searchResult() {
    this.httpClient.showLoading();
    var self = this;
    if (this.selectedSchemeID == 0 || this.selectedSubSchemeID == 0 || this.selectedComponentID == 0 ||
      this.selectedCategoryID == 0 || this.selectedActivityID == 0 || this.selectedSubActivityID == 0 ||
      this.selectedFinancialYr == 0) {
      this.httpClient.showToast("Please select all the fields from search boxes to proceed further.");
      this.httpClient.dismissLoading();
    } else {
      let credObj: any = new Object();
      credObj.obj = new Object();
      credObj.obj.usrnm = "rajkisan";
      credObj.obj.psw = "rajkisan@123";
      credObj.obj.srvnm = "Demonstration";
      credObj.obj.srvmethodnm = "GetDataForAllotmentList";
      let srvParams: any = new Object();
      srvParams.SchemeId = this.selectedSchemeID;
      srvParams.SubScheme_ID = this.selectedSubSchemeID;
      srvParams.componentid = this.selectedComponentID;
      srvParams.ActivityId = this.selectedActivityID;
      srvParams.SubActivityId = this.selectedSubActivityID;
      srvParams.financialyearid = this.selectedFinancialYr;
      srvParams.Demandid = this.selectedCategoryID;
      srvParams.OfficeId = this.selectedDistrictID;
      srvParams.userid = this.httpClient.userData.userid;
      credObj.obj.srvparam = JSON.stringify(srvParams);
      self.httpClient.post(credObj).subscribe(res => {
        console.log("Fetched Search Result = " + JSON.stringify(res));
        if (res[0].status == 0) {
          if (this.httpClient.userData.roleid == 13) {
            self.searchResList = res[0].data;
            console.log("Fetched Search result List = " + JSON.stringify(self.searchResList));
          } else {
            if (this.httpClient.userData.roleid == 14) {
              self.asSearchResList = res[0].data;
              console.log("Fetched Search result List = " + JSON.stringify(self.asSearchResList));
            }
          }
          this.httpClient.dismissLoading();
          self.showSearchRes = true;
        } else {
          this.httpClient.showToast(res[0].message);
          self.showSearchRes = false;
          this.httpClient.dismissLoading();
        }
      })
    }
  }

  expandCard(index, isExpand) {
    this.aaoCardIndex = index;
    this.isExpandable = isExpand;
  }

  getASList(index) {
    this.selectedAAOJson = this.searchResList[index];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "aaoJSON": JSON.stringify(this.selectedAAOJson),
        "categoryID": this.selectedCategoryID,
        "districtID": this.selectedDistrictID,
        "allotmentID": this.selectedAAOJson.ReferenceId
      }
    };
    console.log("navigationExtras : ", navigationExtras);
    this.router.navigate(['/as-list'], navigationExtras);
  }

  showJanAadharView(index) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "asJSON": JSON.stringify(this.asSearchResList[index]),
        "categoryID": this.selectedCategoryID,
        "districtID": this.selectedDistrictID
      }
    };
    this.router.navigate(['/demonstration-aslevel'], navigationExtras);
  }

  clearFilters() {
    this.showSearchRes = false;
    this.selectedSubSchemeID = 0;
    this.selectedComponentID = 0;
    this.selectedCategoryID = 0;
    this.selectedActivityID = 0;
    this.selectedSubActivityID = 0;
    this.selectedFinancialYr = 0;
    this.searchResList = [];
  }
}
