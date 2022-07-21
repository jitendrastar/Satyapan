import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-jan-aadhar-detail-model',
  templateUrl: './jan-aadhar-detail-model.page.html',
  styleUrls: ['./jan-aadhar-detail-model.page.scss'],
})
export class MiniKitJanAadharDetailModelPage implements OnInit {

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  referenceID: any;
  memberList: any = [];
  public selectedMembersList: any = [];
  public memberCatList: any = [];
  public memberCatID: any;
  public villList: any[] = [];
  public selectedVillId: any;

  constructor(public navParams: NavParams,
    public modalController: ModalController,
    public httpClient: CommonService) {
    this.getCategoryList();
    // this.getASAssignVillageList();
  }

  ngOnInit() {
    this.referenceID = this.navParams.data.referenceID;
    this.memberList = JSON.parse(this.navParams.data.memberList);
    console.log("Member list fetche in modal = " + JSON.stringify(this.memberList));
    if (this.memberList && this.memberList.length == 1) {
      this.selectedMembersList = this.memberList[0];
    }
  }

  radioGroupMemberChange(event) {
    this.selectedRadioGroup = event.detail;
    console.log("radioGroupChange", JSON.stringify(this.selectedRadioGroup));
    var filteredMember = this.memberList.filter((x) => x.JAN_MEMBER_ID == this.selectedRadioGroup.value);
    console.log("Filtered JSON = " + JSON.stringify(filteredMember));
    this.selectedMembersList = filteredMember[0];
  }

  radioGroupCategoryChange(event) {
    console.log("radioGroupCategoryChange", event.detail);
    this.memberCatID = event.detail;
  }

  async saveTargetToLocalList() {
    let msg: string = "";
    if (this.selectedMembersList.length <= 0) {
      msg = this.httpClient.currentLanguage == "english" ? "Select Member" : "सदस्य चुनें";
      this.httpClient.showToast(msg);
    } else if (!this.memberCatID) {
      msg = this.httpClient.currentLanguage == "english" ? "Select category of Member" : "सदस्य की श्रेणी चुनें";
      this.httpClient.showToast(msg);
    } else if (!this.selectedVillId) {
      msg = this.httpClient.currentLanguage == "english" ? "Select village" : "गांव चुनें";
      this.httpClient.showToast(msg);
    } else {
      console.log("Member Cat ID = " + this.memberCatID);
      const memberSelected: any = new Object();
      memberSelected.selected_member = this.selectedMembersList;
      memberSelected.memberCatId = this.memberCatID;
      memberSelected.villageId = this.selectedVillId;
      await this.modalController.dismiss(memberSelected);
    }
  }

  getCategoryList() {
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetFarmerCategoryList";
    let paramObj: any = new Object();
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res => {
      console.log("category list data = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.memberCatList = res[0].data;
        this.getASAssignVillageList();
      }
    });
  }

  getASAssignVillageList() {
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetVillageListbyUserId";
    credObj.obj.srvparam = JSON.stringify({ userid: this.httpClient.userData.userid });
    this.httpClient.post(credObj).subscribe(res => {
      console.log("category list data = " + JSON.stringify(res));
      if (res[0].status == 0) {
        this.villList = res[0].data;
        if (this.memberList[0].Village_Eng && this.memberList[0].Village_Eng.toString().trim() != '') {
          let filteredVillage = this.villList.filter((x) => x.GPNameEn.toString().trim() == this.memberList[0].Village_Eng.toString().trim());
          if (filteredVillage && filteredVillage.length > 0) {
            this.selectedVillId = filteredVillage[0].GPId;
          }
        }
      }
    });
  }

}
