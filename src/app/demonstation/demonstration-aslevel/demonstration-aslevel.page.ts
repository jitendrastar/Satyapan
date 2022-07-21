import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { JanAadharDetailModelPage } from '../model/jan-aadhar-detail-model/jan-aadhar-detail-model.page';

@Component({
  selector: 'app-demonstration-aslevel',
  templateUrl: './demonstration-aslevel.page.html',
  styleUrls: ['./demonstration-aslevel.page.scss'],
})
export class DemonstrationAslevelPage implements OnInit {

  public asTargetCompleteList:any = [];
  public asJanAadharDataReturned:any;
  public selectedASJson:any;
  public janAadharNo:any;
  public memberListRes:any = [];
  public enableSubmitTarget:boolean = true;
  public memberSubmitList:any = [];
  public allotmnet_id:any;

  constructor(public httpClient: CommonService,
    public navCtrl: NavController,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router) { 
      this.route.queryParams.subscribe(params=>{
        this.selectedASJson = JSON.parse(params["asJSON"]);
        this.allotmnet_id = this.selectedASJson.ReferenceId;
        console.log("AAO Selected JSON List = "+JSON.stringify(this.selectedASJson));
      });
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

   getAllotmentDetailAS(){
    this.httpClient.showLoading();
    // if(this.selectedASJson.AllotedTarget >= this.asTargetCompleteList.length){
      let credObj:any = new Object();
      credObj.obj = new Object();
      credObj.obj.usrnm = "rajkisan";
      credObj.obj.psw = "rajkisan@123";
      credObj.obj.srvnm = "Demonstration";
      credObj.obj.srvmethodnm = "Memberlist";
      let paramObj:any = new Object();
      paramObj.janaadhaarId = this.janAadharNo;
      credObj.obj.srvparam = JSON.stringify(paramObj);
      this.httpClient.post(credObj).subscribe(res=>{
        console.log("member list data = "+JSON.stringify(res));
        if(res[0].status == 0){
          this.memberListRes = res[0].data;
          this.openModel();
          this.httpClient.dismissLoading();
        }
      });
    // }
  }

  async openModel(){
    const modal = await this.modalCtrl.create({
      component: JanAadharDetailModelPage,
      componentProps: {
        "referenceID": 40,
        "memberList": JSON.stringify(this.memberListRes)
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.asJanAadharDataReturned = dataReturned.data.selected_member;
        this.asTargetCompleteList.push(this.asJanAadharDataReturned);
        console.log('Modal Sent Data :'+ JSON.stringify(dataReturned));
        let listObj:any = new Object();
        listObj.Id = 0;
        listObj.enrId = this.asJanAadharDataReturned.ENR_ID;
        listObj.aadharId  = this.asJanAadharDataReturned.AADHAR_ID;
        listObj.AllotmentId = this.selectedASJson.ReferenceId;
        listObj.FJanId = this.asJanAadharDataReturned.JAN_AADHAR;
        listObj.MemberId = this.asJanAadharDataReturned.JAN_MEMBER_ID;
        listObj.Name = this.asJanAadharDataReturned.NAME;
        listObj.Name_Hi = this.asJanAadharDataReturned.NAME_HINDI;
        listObj.ProductId = 0;
        listObj.OTPVerified = 0;
        listObj.IsAllotmentCompleted = 0;
        listObj.Isrejected = 0;
        listObj.RejectionRemark = "";
        listObj.MemberDetailJson = "";
        listObj.IsPartialSave = 0;
        listObj.FarmerCasteName  = "";
        listObj.FarmerCategory = dataReturned.data.memberCatId;
        listObj.IsPermanent = 1;
        // listObj.MobileNo = this.asJanAadharDataReturned.MOBILE_NO;
       this.memberSubmitList.push(listObj);
       console.log("Member List to besubmitted = "+JSON.stringify(this.memberSubmitList));
        // if(this.selectedASJson.AllotedTarget == this.asTargetCompleteList.length){
        //   if(this.httpClient.currentLanguage == "english"){
        //     this.httpClient.showToast("You have completed your assigned target. So please submit your member List.");
        //   }else{
        //     this.httpClient.showToast("आपने अपना निर्धारित लक्ष्य पूरा कर लिया है। तो कृपया अपनी सदस्य सूची जमा करें।");
        //   }
        //   // this.enableSubmitTarget = false;
        // }
      }
    });

    return await modal.present();
  }

  saveAsTargetList(){
    this.httpClient.showLoading();
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "SaveDemonstrationAllotmentASLevel";
    let paramObj:any = new Object();
    paramObj.ListASObj = this.memberSubmitList;
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res=>{
      console.log("member list data = "+JSON.stringify(res));
      if(res[0].status == 0){
        if(this.httpClient.currentLanguage == "english"){
          this.httpClient.showToast("Member List saved Successfully");
        }else{
          this.httpClient.showToast("सदस्य सूची सफलतापूर्वक जमा की गई");
        }
        this.memberSubmitList = [];
        this.asTargetCompleteList = [];
        this.httpClient.dismissLoading();
        this.viewMemberList();
      }else{
        if(this.httpClient.currentLanguage == "english"){
          this.httpClient.showToast("Something went wrong. Please try again.");
        }else{
          this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
        }
        this.httpClient.dismissLoading();
      }
    });
  }

  viewMemberList(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "allotment_id": this.allotmnet_id
          // "asJSON": JSON.stringify(this.asSearchResList[index]),
      }
  };
    this.router.navigate(['/demonstration-beneficiary'],navigationExtras);
  }


}
