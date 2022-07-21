import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-as-list',
  templateUrl: './as-list.page.html',
  styleUrls: ['./as-list.page.scss'],
})
export class AsListPage implements OnInit {

  public selectedAAOJson:any;
  public asList:any = [];
  public selectedCategoryID:any;
  public asCardIndex:any;
  public isExpandable:boolean = false;
  public selectedDistrictID:any;
  public saveAllotmentRes:any;
  public count:any = 0;
  public allomentTarget:any = 0;
  public allotmnetID:any;

  constructor(public httpClient: CommonService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public dbService: DatabaseServiceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public location: Location) { 
      this.route.queryParams.subscribe(params=>{
        this.selectedAAOJson = JSON.parse(params["aaoJSON"]);
        this.selectedCategoryID = params["categoryID"];
        this.selectedDistrictID = params["districtID"];
        this.allotmnetID = params["allotmentID"];
        console.log("AAO Selected JSON List = "+JSON.stringify(this.selectedAAOJson));
        this.allomentTarget = this.selectedAAOJson.Physicalcategory;
        this.getASList();
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

  getASList(){
    this.httpClient.showLoading();
    var self = this;
    let credObj:any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "GetASList";
        let srvParams:any = new Object();
        srvParams.UserId =  this.httpClient.userData.userid;
        srvParams.DemandId = this.selectedCategoryID;
        srvParams.BTAId = this.selectedAAOJson.BTAId;
        srvParams.AAOCircleId = this.httpClient.userData.AAOCircle_Id;
        srvParams.AllotmentId = this.allotmnetID;
        credObj.obj.srvparam = JSON.stringify(srvParams);
        self.httpClient.post(credObj).subscribe(res=>{
          console.log("Fetched Search Result = "+JSON.stringify(res));
          if(res[0].status == 0){
            self.asList = res[0].data;
            console.log("Fetched AS List = "+JSON.stringify(self.asList));
            this.httpClient.dismissLoading();
          }else{
            this.httpClient.showToast(res[0].message);
            this.httpClient.dismissLoading();
          }
        })
  }

  expandCard(index,isExpand){
    this.asCardIndex = index;
    this.isExpandable = isExpand;
  }

  checkAllotedCount(val,index){
    // if(val == null || val == ""){
    //   val = 0;
    // }
    // console.log("-----------------",this.asList[index].Allotedtarget , index ,val);
   
    // if(val > this.selectedAAOJson.PhysicalTotal){
    //   if(this.httpClient.currentLanguage == "hindi"){
    //     this.httpClient.showToast("आवंटित लक्ष्य से अधिक आवंटित नहीं कर सकते हैं जो की "+this.selectedAAOJson.PhysicalTotal+" है। ");
    //   }else{
    //     this.httpClient.showToast("Cannot allocate more than the allotted target which is "+this.selectedAAOJson.PhysicalTotal);
    //   }
    //   this.asList[index].Allotedtarget = "";
    // }else{
      var count = 0;
      for(let i = 0; i< this.asList.length; i++){
        if(this.asList[i].Allotedtarget == ""){
          this.asList[i].Allotedtarget = 0;
        }
        count += this.asList[i].Allotedtarget;
        if(count > this.selectedAAOJson.PhysicalTotal){
          if(this.httpClient.currentLanguage == "hindi"){
            this.httpClient.showToast("आवंटित लक्ष्य से अधिक आवंटित नहीं कर सकते हैं जो की "+this.selectedAAOJson.PhysicalTotal+" है। ");
          }else{
            this.httpClient.showToast("Cannot allocate more than the allotted target which is "+this.selectedAAOJson.PhysicalTotal);
          }
          count -= this.asList[i].PhysicalTotal ;
          this.asList[i].PhysicalTotal = 0;
        }
         else{
        if(count == this.selectedAAOJson.PhysicalTotal){
          if(this.httpClient.currentLanguage == "hindi"){
            this.httpClient.showToast("आपका आवंटन लक्ष्य पूरा हो गया है। कृपया एएस सूची जमा करें।");
          }else{
            this.httpClient.showToast("Your allocation target has been met. Please submit the AS list.");
          }
        }
      
      }
      }
        console.log("Count = "+count);
        this.count = count;
  }

  submitAAODetail(){
    this.httpClient.showLoading();
    let count = 0;
    for(let i = 0; i< this.asList.length; i++){
      if(this.asList[i].Allotedtarget == "" || this.asList[i].Allotedtarget == null){
        this.asList[i].Allotedtarget = 0;
      }
      count += parseFloat(this.asList[i].Allotedtarget);
      console.log("Count = "+count);
    }
   
    if(count > this.selectedAAOJson.Physicalcategory){
      if(this.httpClient.currentLanguage == "hindi"){
        this.httpClient.showToast("आवंटित लक्ष्य से अधिक आवंटित नहीं कर सकते हैं जो की "+this.selectedAAOJson.Physicalcategory+" है। ");
        this.httpClient.dismissLoading();
      }else{
        this.httpClient.showToast("Cannot allocate more than the allotted target which is "+this.selectedAAOJson.Physicalcategory); 
        this.httpClient.dismissLoading();
      }
      
    }else{
    var submissionAllotmentArray = [];
    console.log("AS Modified List = "+JSON.stringify(this.asList));
    for(let i=0; i<this.asList.length; i++){
      let asObj:any = new Object();
     
      asObj.AllotmentId = this.asList[i].AllotmentId == "" ? 0: this.asList[i].AllotmentId;
      asObj.BTAId = this.asList[i].btaid;
      asObj.TotalTarget = this.asList[i].PhysicalTotal;
      asObj.AllotedTarget = this.asList[i].Allotedtarget;
      asObj.FromOfficeId = this.selectedDistrictID ;
      asObj.ToOfficeId = this.asList[i].officeid;
      asObj.IsApproved = 1;
      asObj.ApprovedBy = this.httpClient.userData.userid;
      // asObj.ReferenceId =  this.asList[i].AllotmentId;
      asObj.ReferenceId = this.selectedAAOJson.ReferenceId;
      if(this.asList[i].VarietyId == "" || typeof this.asList[i].VarietyId == "undefined" || this.asList[i].VarietyId == null){
        asObj.VarietyId = 0;
      }else{
        asObj.VarietyId = this.asList[i].VarietyId;
      }
      asObj.CategoryId = this.selectedCategoryID;
      submissionAllotmentArray.push(asObj);
    }

    console.log("Array to Submit = "+JSON.stringify(submissionAllotmentArray));
    var self = this;
    let credObj:any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "SaveAllotmentDetails";
        let listObj:any = new Object();
        listObj.ListObj = submissionAllotmentArray;
        credObj.obj.srvparam = JSON.stringify(listObj);
        self.httpClient.post(credObj).subscribe(res=>{
          console.log("Fetched Search Result = "+JSON.stringify(res));
          if(res[0].status == 0){
            self.saveAllotmentRes = res[0].data;
            if(this.httpClient.currentLanguage == "hindi"){
              this.httpClient.showToast("सफलतापूर्वक संचित कर लिया गया है।");
            }else{
              this.httpClient.showToast("Successfully saved.");
            }       
          this.httpClient.dismissLoading();
          }else{
            if(this.httpClient.currentLanguage == "english"){
              this.httpClient.showToast("Something went wrong. Please try again.");
            }else{
              this.httpClient.showToast("कुछ गलत हो गया। कृपया पुन: प्रयास करें।");
            }
            this.httpClient.dismissLoading();
          }
        })
  }
  }
}
