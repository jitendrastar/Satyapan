import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { CommonService } from "../services/common.service";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DatabaseServiceService } from "../services/database-service.service";
import { FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { Camera } from '@ionic-native/camera/ngx';
import { Console } from 'console';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  roleId: any;
  officerNameEn: any;
  roleName_EN: any;
  userid: any;
  ssoID: any;
  showText: any;
  eventList:any=[];
  userName: any;
  pending_complete: any="";
  listOfEvents: any;
  constructor(  public dbService: DatabaseServiceService,
    public navCtrl: NavController,
    public router: Router,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public storage: Storage,
    public platform: Platform,
    public camera: Camera,

    public geolocation: Geolocation) { 
     
      if(this.httpClient.userData.sso_id){
        this.ssoID = this.httpClient.userData.sso_id;
      }else{
        this.ssoID = this.httpClient.userData.ssoID;
      }
     // console.log(this.ssoID);sso_id
     // console.log(this.httpClient.userData);
      this.roleId = this.httpClient.userData.roleid;
      this.userid = this.httpClient.userData.userid;
      this.officerNameEn = this.httpClient.userData.OfficerNameEn;
      this.roleName_EN = this.httpClient.userData.RoleName_EN;
      
    }

  ngOnInit() {
    console.log(this.httpClient.userData);
  }
  ionViewWillEnter() {
    this.getEventlist('Completed');
  }
  change_status(){
    this.getEventlist('Completed');

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
getEventlist(textuse) {
    var self = this;
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "CommonAPI",
        srvmethodnm: "EventAction",
        srvparam: JSON.stringify({
            Opertiontype:textuse,
            EventId:0,
           //  EventType: 'test',
           //  EventName:'Event1',
           //  EventDate:'2022-10-01',
           // EventPlace:'Jaipur', 
            roleid:self.roleId,
            userid:self.userid,
            SSOid:self.ssoID,
            IsActive:true,
            DepartmentId:0
          })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        // self.httpClient.dismissLoading();
        if (res[0].status == 0) {
          self.eventList = res[0].data;
          console.log("listOfEVDepartmenENTS", self.eventList);
        } else {
          self.showText = "No Event Found !";
        }
      },
      (error) => {
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "CommonAPI",
            srvmethodnm: "Departmentlist",
            srvparam: "{}",
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }
Addevent(eventid,dpid,etpid){
  this.router.navigate(["add-event", { actionType: 'view',eventid:eventid, dpid:dpid,etpid:etpid }]);
}

Addevent2(){
  this.router.navigate(["add-event", { actionType: 'add' }]);
}
}
