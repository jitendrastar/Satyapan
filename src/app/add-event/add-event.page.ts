import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AlertController, NavController, ActionSheetController, Platform } from "@ionic/angular";
import { CommonService } from "../services/common.service";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DatabaseServiceService } from "../services/database-service.service";
//import { FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { Camera } from '@ionic-native/camera/ngx';
declare var $: any;
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  roleId: any;
  officerNameEn: any;
  roleName_EN: any;
  userid: any;
  ssoID: any;
  EventType: any;
  EventActivityMasterId: any;
  EventName: any;
  eventname: any;
  eventList: any = [];
  listOfDepartmentTS: any;
  userName: any;
  dateTime: any;
  add_edit: any;
  fileTransfer: any;
  EventDate: any;
  EventPlace: any;
  listOfEVENTS: any;
  listOfEVENTSaction: any;
  NoOfTotalOther: any;
  EventName2: any;
  TotalParticipant: any = 0;
  DepartmentId: any;
  NoOfJanPratinidhi: any;
  NoOfOtherDeptOfficial: any;
  NoOfFarmer: any;
  eventid: any;
  eventdata: any;
  dpid: any;
  schemeother: any;
  other_show: boolean= false;
  etpid: any;
  IsDisable: any;
  other_show2: any;
  NoOfDeptOffical: any;
  getPreVerificationDatafor: any;
  uploadedImageList: any = [];
  constructor(public dbService: DatabaseServiceService,
    public navCtrl: NavController,
    public router: Router,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public storage: Storage,
    public platform: Platform,
    public camera: Camera,
    // public fileOpener: FileOpener,
    // public downloader: Downloader,
    public actionSheetController: ActionSheetController,

    public geolocation: Geolocation) {
    // 
    //this.getLoc();
    //this.ssoID = this.httpClient.userData.sso_id;
    if(this.httpClient.userData.sso_id){
      this.ssoID = this.httpClient.userData.sso_id;
    }else{
      this.ssoID = this.httpClient.userData.ssoID;
    }
    //  this.ssoID = this.httpClient.userData.sso_id;
    console.log(this.httpClient.userData.sso_id);
    this.roleId = this.httpClient.userData.roleid;
    this.userid = this.httpClient.userData.userid;
    this.officerNameEn = this.httpClient.userData.OfficerNameEn;
    this.roleName_EN = this.httpClient.userData.RoleName_EN;
   // this.getEVENTLIST();
    // this.getDepartmentlist();
    this.dateTime = new Date().toISOString();
    this.getPreVerificationDatafor = this.route.snapshot.paramMap.get("actionType");

    console.log(this.getPreVerificationDatafor);
    if (this.getPreVerificationDatafor == "view") {
      this.eventid = this.route.snapshot.paramMap.get("eventid");
      this.dpid = this.route.snapshot.paramMap.get("dpid");
      this.etpid = this.route.snapshot.paramMap.get("etpid");
      this.add_edit = true;
      // this.getData();
    } else {
      this.eventid = 0;
      this.add_edit = false;
    }
    this.getEVENTLIST();
  }

  ngOnInit() {

  }
  ionViewWillEnter() {

  }

  getData() {
    var self = this;
    self.other_show=false;
          self.other_show2=false;
   // self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "CommonAPI",
        srvmethodnm: "EventAction",
        srvparam: JSON.stringify({
          Opertiontype: 'Completed',
          EventId: self.eventid,
          SSOid: self.ssoID,
          roleid: self.roleId,
          userid: self.userid,

          EventType: self.etpid,
          EventName: "",
          EventDate: "9/6/2022 5:59:58 PM",
          EventPlace: "",
          DepartmentId: self.dpid,
          NoOfFarmer: 0,
          NoOfDeptOffical: 0,
          NoOfJanPratinidhi: 0,
          NoOfOtherDeptOfficial: 0,
          IsActive: true,
          TotalParticipant: 0,
          NoOfTotalOther: 0,
          Phtoto1: "r6r",
          Phtoto2: "ytuj",
          //  DepartmentId:1
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        self.httpClient.dismissLoading();
        //self.httpClient.dismissLoadingImage();
        if (res[0].status == 0) {
          self.eventdata = res[0].data;
          console.log("listOfEVENTSdata_uniq", self.eventdata);
        self.EventType = self.eventdata[0].EventSchemeMasterId;
        if(self.eventdata[0].EventSchemeMasterId==7){
         // alert(1);
          self.other_show=true;
          self.other_show2=false;
         self.EventName2 = self.eventdata[0].EventName;
          self.schemeother= self.eventdata[0].ActionName;    
        }else{
         self.EventActivityMasterId = self.eventdata[0].EventActivityMasterId;
          self.EventName2 = self.eventdata[0].EventName;
     
        }
       // self.EventName = self.eventdata[0].EventName;
          self.EventDate = self.eventdata[0].EventDate;
          self.EventPlace = self.eventdata[0].EventPlace,
          self.DepartmentId = self.eventdata[0].DepartmentId;
          self.NoOfFarmer = self.eventdata[0].NoOfFarmer;
          self.NoOfDeptOffical = self.eventdata[0].NoOfDeptOffical;
          self.NoOfJanPratinidhi = self.eventdata[0].NoOfJanPratinidhi;
          self.NoOfOtherDeptOfficial = self.eventdata[0].NoOfOtherDeptOfficial;
          //self.IsActive=self.eventdata.EventPlace;
          self.TotalParticipant = self.eventdata[0].TotalParticipant;
          self.NoOfTotalOther = self.eventdata[0].NoOfTotalOther;
          //  self.Phtoto1=self.eventdata.Phtoto1;
          //   self.Phtoto2=self.eventdata.Phtoto2;
          self.uploadedImageList.push(self.eventdata[0].Phtoto1);
          self.uploadedImageList.push(self.eventdata[0].Phtoto2);
          console.log(self.uploadedImageList[0]);

          self.IsDisable= self.eventdata[0].IsDisable;
          self.EventName = self.eventdata[0].EventName;

        } else {
          // self.httpClient.showToast(res[0].data);
        }

      },
      (error) => {
      
        self.httpClient.showToastError();
      }
    );


   // self.EventName =self.EventName2 ;
  }
  logoutPopUp() {
    if (this.httpClient.currentLanguage == "english") {
      this.showPrompt("Are you sure you want to logout");
    } else {
      this.showPrompt("क्या आप लॉग आउट करना चाहते हैं");
    }
  }
  getEVENTLIST() {
    var self = this;
    self.httpClient.showLoading();
    self.httpClient.showLoadingImage();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "CommonAPI",
        //srvmethodnm: "GetEventmasterList",
        srvmethodnm: "GetEventSchemelist",
        srvparam: "{}",
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        // self.httpClient.dismissLoading();
        if (res[0].status == 0) {
          self.listOfEVENTS = res[0].data;
          console.log("listOfEVENTS", self.listOfEVENTS);
        } else {
          // self.httpClient.showToast(res[0].data);
        }
        self.getDepartmentlist();
        // self.httpClient.(res[0].message);
      },
      (error) => {
        // self.httpClient.dismissLoading();
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "CommonAPI",
            srvmethodnm: "GetEventmasterList",
            srvparam: "{}",
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }
  
  getvalue_activityscheme(){
   // alert();
    var schemeNameactivity = this.EventActivityMasterId;
    // alert(schemeName);
   // alert($("#EventActivityMasterIdother"+schemeNameactivity).attr("lang") );
    
     this.EventName="";
     if($("#EventActivityMasterIdother"+schemeNameactivity).attr("lang")==1){
      

      this.other_show2= true;

     }else{
      this.other_show2= false;
     }
    }
  getvalue_scheme(){
    //alert("ionchange");
    var schemeName = this.EventType;
    // alert(schemeName);
     this.EventName="";
     this.EventActivityMasterId="";
     this.other_show2= false;
     if(schemeName==7){

      this.other_show= true;

     }else{
      this.EventName="";
      this.schemeother="";
      this.other_show= false;
    var self = this;
    self.httpClient.showLoading();
    self.httpClient.showLoadingImage();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "CommonAPI",
        //srvmethodnm: "GetEventmasterList",
        srvmethodnm: "GetEventActionlist",
        srvparam: JSON.stringify({ EventSchemeMasterId: schemeName }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        // self.httpClient.dismissLoading();
        if (res[0].status == 0) {
          self.listOfEVENTSaction = res[0].data;
          console.log("listOfEVENTSaction", self.listOfEVENTSaction);
        } else {
          // self.httpClient.showToast(res[0].data);
        }
      
        self.getDepartmentlist();
       // self.EventName= self.EventName2;
        // self.httpClient.(res[0].message);
      },
      (error) => {
        // self.httpClient.dismissLoading();
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "CommonAPI",
            srvmethodnm: "GetEventActionlist",
            srvparam: JSON.stringify({ EventSchemeMasterId: self.userid }),
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );

   // self.EventName= self.EventName2;
   // alert(self.EventName);
  }
  }
  getDepartmentlist() {
    var self = this;
    // self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "CommonAPI",
        srvmethodnm: "Departmentlist",
        srvparam: "{}",
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        self.httpClient.dismissLoading();
        self.httpClient.dismissLoadingImage();
        if (res[0].status == 0) {
          self.listOfDepartmentTS = res[0].data;
          console.log("listOfEVDepartmenENTS", self.listOfDepartmentTS);
        } else {
          // self.httpClient.showToast(res[0].data);
        }
        // self.httpClient.(res[0].message);
        if (self.getPreVerificationDatafor == "view") {
          self.getData();
        }
      },
      (error) => {
        // self.httpClient.dismissLoading();
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
  logout() {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "PreVerification",
        srvmethodnm: "logoutMobileuser",
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
  async showPrompt2(msg) {
    if (this.httpClient.currentLanguage == "hindi") {
      const prompt = await this.alertCtrl.create({
        header: "Message",
        message: msg,
        backdropDismiss: false,

        buttons: [
          {
            text: "ठीक है",
            role: "cancel",
            handler: () => {
            },
          },
          {
            text: "ठीक है",
            handler: (data) => {
              console.log("Ok clicked");
              this.navCtrl.navigateRoot(["event-list"]);
              // this.logout();
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
  Addevent() {
    //this.router.navigate(["add-event", { actionType: param }]);
    //this.router.navigate(["add-event"]);
  }


  async selectImage(index) {

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Use Camera",
          handler: () => {
            this.addNewImage(index);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }
  addNewImage(photoFlag) {
  
    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        console.log("Camera imageData : ", imageData);
        let options: FileUploadOptions = {
          fileKey: "files",
          chunkedMode: false,
          params: {
            AppName: "PVapp",
            IsDirectUpload: "True",
          },
        };
        
        console.log("File Transfer options", options);
        FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, options, true)
          .then(
            (data) => {
              console.log("File Transfer response : ", data);
              var temp = JSON.parse(data.response);
              if (temp[0].status == "0") {
                this.uploadedImageList.push(temp[0].data);
                console.log(this.uploadedImageList);
                if (photoFlag == 0) {
                  let locObj: any = new Object();
                  // locObj.lat = this.lat;
                  // locObj.lng = this.long;
                  // this.storage.set('locObj', locObj).then(loc => { });
                }
              } else {
                // this.httpClient.showToastError();
                this.httpClient.showToast(temp[0].message);
              }
            },
            (err) => {
              console.log("File Transfer Error : ", JSON.stringify(err));
            }
          ).catch(e => {
            console.log("File Transfer Catch : ", JSON.stringify(e));
          });
      },
      (err) => {
        console.log("Camera Error : ", JSON.stringify(err));
      }
    );
  }

  removeImagefromList(index) {
    this.uploadedImageList.splice(index, 1);
    console.log(
      "Updated uploaded image list = " + JSON.stringify(this.uploadedImageList)
    );
  }

 

  addEventlist() {
    var self = this;

    if(self.getPreVerificationDatafor == "view"){
      self.EventName =self.EventName2;
      }
    // self.httpClient.showLoading();
    //alert(self.EventName );
    var schemeNameactivity = this.EventActivityMasterId;
    if ($("#EventActivityMasterIdother"+schemeNameactivity).attr("lang")==1 && (self.EventName == null || self.EventName == "")) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please enter Event Name");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम का नाम दर्ज करें"
        );
      }
    } else if (self.EventType!=7 && (self.EventActivityMasterId == null || self.EventActivityMasterId == "")) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Select Event Name");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम का नाम चुनें"
        );
      }
    } else if (self.EventType==7 && (self.EventName == null || self.EventName == "")) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please enter Event Name");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम का नाम दर्ज करें"
        );
      }
    } else if (self.EventType == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Select Event Type");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम प्रकार चुनें"
        );
      }
    } else if (self.EventDate == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Select Event Date");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम तिथि चुनें"
        );
      }
    } else if (self.EventPlace == null || self.EventPlace == "") {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Event Place");
      } else {
        this.httpClient.showToast(
          "कृपया कार्यक्रम का स्थल दर्ज करें"
        );
      }
    } else if (self.DepartmentId == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Select Department");
      } else {
        this.httpClient.showToast(
          "कृपया विभाग का चयन करें"
        );
      }
    } else if (self.NoOfFarmer == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Number Of Farmer");
      } else {
        this.httpClient.showToast(
          "कृपया किसान की संख्या दर्ज करें"
        );
      }
    } else if (self.NoOfDeptOffical == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Number Of Department official");
      } else {
        this.httpClient.showToast(
          "कृपया विभाग के अधिकारी की संख्या दर्ज करें"
        );
      }
    } else if (self.NoOfJanPratinidhi == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Number Of Jan Pratinidhi");
      } else {
        this.httpClient.showToast(
          "कृपया जनप्रतिनिधि की संख्या दर्ज करें"
        );
      }
    } else if (self.NoOfOtherDeptOfficial == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Number Of Other Department official");
      } else {
        this.httpClient.showToast(
          "कृपया अन्य विभाग के अधिकारियों की संख्या दर्ज करें"
        );
      }
    } else if (self.NoOfTotalOther == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Other Participants");
      } else {
        this.httpClient.showToast(
          "कृपया अन्य प्रतिभागियों को दर्ज करें"
        );
      }
    } else if (self.TotalParticipant == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Total Participants");
      } else {
        this.httpClient.showToast(
          "कृपया कुल प्रतिभागियों को दर्ज करें"
        );
      }
    } else if (self.EventType==7 && (self.schemeother == null || self.schemeother == "")) {
      //if (self.schemeother == null || self.schemeother == "") {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please Enter Other Scheme");
      } else {
        this.httpClient.showToast(
          "कृपया अन्य योजना को दर्ज करें "
        );
     // }
    }
    }  else if (self.uploadedImageList[0] == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please upload Event photo First");
      } else {
        this.httpClient.showToast(
          "कृपया पहले कार्यक्रम का फोटो अपलोड करें"
        );
      }
    }else if (self.uploadedImageList[1] == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast("Please upload Event photo Second");
      } else {
        this.httpClient.showToast(
          "कृपया दूसरी कार्यक्रम की फोटो अपलोड करें"
        );
      }
    } else {
     //alert();
      var eventname = "";
      var EventActivityMasterId = "";
      if(self.EventType==7){
         eventname = self.EventName;
         EventActivityMasterId = "0";
      }else{
     
       if($("#EventActivityMasterIdother"+schemeNameactivity).attr("lang")==1){
        eventname = self.EventName;
        EventActivityMasterId =self.EventActivityMasterId;
       }else{
        eventname ="";
        EventActivityMasterId =self.EventActivityMasterId;
       }
  
      }

    
     
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "CommonAPI",
          srvmethodnm: "EventAction",
          // srvparam: "{}",
          srvparam: JSON.stringify({
            Opertiontype: 'ActionInsert',
            EventId: self.eventid,
            SSOid: self.ssoID,
           // EventType: self.EventType,
            EventSchemeMasterId: self.EventType,
            EventName: eventname,
            ActionName: self.schemeother,
            EventActivityMasterId:EventActivityMasterId,
            EventDate: self.EventDate,
            EventPlace: self.EventPlace,
            DepartmentId: self.DepartmentId,
            NoOfFarmer: self.NoOfFarmer,
            NoOfDeptOffical: self.NoOfDeptOffical,
            NoOfJanPratinidhi: self.NoOfJanPratinidhi,
            NoOfOtherDeptOfficial: self.NoOfOtherDeptOfficial,
            roleid: self.roleId,
            userid: self.userid,
            // SSOid:self.ssoID,
            IsActive: true,
            TotalParticipant: self.TotalParticipant,
            NoOfTotalOther: self.NoOfTotalOther,
           Phtoto1: self.uploadedImageList[0],
            Phtoto2: self.uploadedImageList[1],
           //  Phtoto1:"wdw",
             // Phtoto2:"ssk",
            //  DepartmentId:1
          })
        },
      };
      console.log(sendRequestData);
     //return false;
      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          console.log("res", res);
          // self.httpClient.dismissLoading();
          if (res[0].status == 0) {
            self.eventList = res[0].data;
            self.httpClient.showToast(res[0].message);
            self.navCtrl.navigateRoot(["event-list"]);
            // self.showPrompt2(res[0].message);
            //   console.log("listOfEVDepartmenENTS", self.listOfEvents);
          } else {
            // self.httpClient.showToast(res[0].data);
          }
          // self.httpClient.(res[0].message);
        },
        (error) => {
          // self.httpClient.dismissLoading();
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
  }


}
