import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DemonstrationService } from 'src/app/services/demonstration.service';

@Component({
  selector: 'app-mbsy-dashboard',
  templateUrl: './mbsy-dashboard.page.html',
  styleUrls: ['./mbsy-dashboard.page.scss'],
})
export class MBSYDashboardPage implements OnInit {

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

  public enableSeason: boolean = true;
  public seasonFilterRes: any = [];
  public selectedSeasonID: any = 0;
  public enableVariety: boolean = true;
  public varietyFilterRes: any = [];
  public selectedVarietyID: any = 0;
  public masterData: any[] = [];

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
    this.isExpandable = false;
    this.selectedDistrictID = this.httpClient.userData.OfficeId;
    console.log("District ID = " + this.selectedDistrictID);
    // this.getDropdownValues('Scheme');
    this.showSearchRes = false;
    this.schemeFilterRes = [];
    this.selectedSchemeID = 0;
    this.subSchemeFilterRes = [];
    this.selectedSubSchemeID = 0;
    this.seasonFilterRes = [];
    this.selectedSeasonID = 0;
    this.subActivityFilterRes = [];
    this.selectedSubActivityID = 0;
    this.varietyFilterRes = [];
    this.selectedVarietyID = 0;
    this.financialYrFilterRes = [];
    this.selectedFinancialYr = 0;
    setTimeout(() => {
      this.getDropdownValues('Scheme');
    }, 300);
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
    self.demoService.getMBSYFilterDropDownData(filterType, self.selectedSchemeID, self.selectedSubSchemeID,
      self.selectedComponentID, self.selectedActivityID, self.selectedDistrictID).subscribe(
        function (res) {
          console.log("Filtered Data = " + JSON.stringify(res));
          if (filterType == 'Scheme') {
            self.schemeFilterRes = res[0].data;
            console.log("Scheme Filter Res = ", self.schemeFilterRes);
            if (self.schemeFilterRes.length == 1) {
              self.selectedSchemeID = self.schemeFilterRes[0].Id;
            }
          }
          if (filterType == 'SubScheme') {
            self.subSchemeFilterRes = res[0].data;
            console.log(" Sub Scheme Filter Res = ", self.subSchemeFilterRes);
            if (self.subSchemeFilterRes.length == 1) {
              self.selectedSubSchemeID = self.subSchemeFilterRes[0].Id;
            }
          }
          if (filterType == 'Component') {
            self.componentFilterRes = res[0].data;
            console.log(" Component Filter Res = ", self.componentFilterRes);
            if (self.componentFilterRes.length == 1) {
              self.selectedComponentID = self.componentFilterRes[0].Id;
            }
          }
          if (filterType == 'Activity') {
            self.activityFilterRes = res[0].data;
            console.log(" Activity Filter Res = ", self.activityFilterRes);
            if (self.activityFilterRes.length == 1) {
              self.selectedActivityID = self.activityFilterRes[0].Id;
            }
          }
          if (filterType == 'SubActivity') {
            self.subActivityFilterRes = res[0].data;
            console.log("Sub Activity Filter Res = ", self.subActivityFilterRes);
            if (self.subActivityFilterRes.length == 1) {
              self.selectedSubActivityID = self.subActivityFilterRes[0].Id;
            }
          }
          if (filterType == 'Category') {
            self.categoryFilterRes = res[0].data;
            console.log(" Category Filter Res = ", self.categoryFilterRes);
            if (self.categoryFilterRes.length == 1) {
              self.selectedCategoryID = self.categoryFilterRes[0].Id;
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
      this.enableCategory = false;
      this.categoryFilterRes = [];
      this.selectedCategoryID = 0;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getDropdownValues('Category');
    }
    if (val == "category") {
      this.enableFinancialYr = false;
      this.financialYrFilterRes = [];
      this.selectedFinancialYr = 0;
      this.getFinancialYearList();
    }
  }


  searchResult() {
    // if (this.httpClient.userData && this.httpClient.userData.roleid && this.httpClient.userData.roleid != "14") {
    //   this.httpClient.showToast("You have not authorized role to access MBSY distribution.");
    // } else 
    if (this.selectedSchemeID == 0 || this.selectedSubSchemeID == 0 || this.selectedComponentID == 0 || this.selectedActivityID == 0 ||
      this.selectedSubActivityID == 0 || this.selectedCategoryID == 0) {
      this.httpClient.showToast("Please select all the fields from search boxes to proceed further.");
    } else {
      var self = this;
      self.asSearchResList = [];
      let searchObj: any = new Object();
      searchObj.scheme = self.schemeFilterRes.filter(item => item.Id + '' == self.selectedSchemeID + '');
      searchObj.subScheme = self.subSchemeFilterRes.filter(item => item.Id + '' == self.selectedSubSchemeID + '');
      searchObj.component = self.componentFilterRes.filter(item => item.Id + '' == self.selectedComponentID + '');
      searchObj.activity = self.activityFilterRes.filter(item => item.Id + '' == self.selectedActivityID + '');
      searchObj.sub_activity = self.subActivityFilterRes.filter(item => item.Id + '' == self.selectedSubActivityID + '');
      searchObj.category = self.categoryFilterRes.filter(item => item.Id + '' == self.selectedCategoryID + '');
      // searchObj.season = self.masterData.filter(item => item.SeasonId + '' == self.selectedSeasonID + '');
      // searchObj.crop = self.masterData.filter(item => item.CropId + '' == self.selectedSubActivityID + '');
      // searchObj.variety = self.masterData.filter(item => item.VerityId + '' == self.selectedVarietyID + '');
      searchObj.finYear = self.selectedFinancialYr;
      self.asSearchResList.push(searchObj);
      console.log("asSearchResList", self.asSearchResList);
      self.showSearchRes = true;
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
    this.router.navigate(['/mini-kit-as-list'], navigationExtras);
  }

  showJanAadharView(index) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "asJSON": JSON.stringify(this.asSearchResList),
        "categoryID": this.selectedCategoryID,
        "districtID": this.selectedDistrictID
      }
    };
    this.navCtrl.navigateForward(['/mbsy-group'], navigationExtras);
  }

  clearFilters() {
    this.showSearchRes = false;
    this.selectedSubSchemeID = 0;
    this.selectedComponentID = 0;
    this.selectedCategoryID = 0;
    this.selectedActivityID = 0;
    this.selectedSeasonID = 0;
    this.selectedSubActivityID = 0;
    this.selectedVarietyID = 0;
    this.selectedFinancialYr = 0;
    this.searchResList = [];
  }
}
