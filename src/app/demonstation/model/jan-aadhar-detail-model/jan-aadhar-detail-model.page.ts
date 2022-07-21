import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-jan-aadhar-detail-model',
  templateUrl: './jan-aadhar-detail-model.page.html',
  styleUrls: ['./jan-aadhar-detail-model.page.scss'],
})
export class JanAadharDetailModelPage implements OnInit {

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  referenceID:any;
  memberList:any = [];
  public selectedMembersList:any = [];
  public memberCatList:any = [];
  public memberCatID:any;

  constructor(public navParams: NavParams,
    public modalController: ModalController,
    public httpClient: CommonService) {
      this.getCategoryList();
     }

  ngOnInit() {
    this.referenceID = this.navParams.data.referenceID;
    this.memberList = JSON.parse(this.navParams.data.memberList);
    console.log("Member list fetche in modal = "+JSON.stringify(this.memberList));
  } 

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail;
    console.log("radioGroupChange",JSON.stringify(this.selectedRadioGroup));
    var filteredMember = this.memberList.filter((x) => x.JAN_MEMBER_ID == this.selectedRadioGroup.value);
    console.log("Filtered JSON = "+JSON.stringify(filteredMember));
    this.selectedMembersList= filteredMember[0];
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    // this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }

  async saveTargetToLocalList(){
    if(typeof this.memberCatID == "undefined" || this.selectedMembersList == []){
      if(this.httpClient.currentLanguage == "english"){
        this.httpClient.showToast("All fields are mandatory.");
      }else{
        this.httpClient.showToast("सभी फील्ड भरना अनिवार्य हैं।");
      }  
    }else{
      console.log("Member Cat ID = "+this.memberCatID);
      const memberSelected:any = new Object();
      memberSelected.selected_member = this.selectedMembersList;
      memberSelected.memberCatId = this.memberCatID;
      await this.modalController.dismiss(memberSelected);
    }
  }
   
  getCategoryList(){
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetFarmerCategoryList";
    let paramObj:any = new Object();
    credObj.obj.srvparam = JSON.stringify(paramObj);
    this.httpClient.post(credObj).subscribe(res=>{
      console.log("category list data = "+JSON.stringify(res));
      if(res[0].status == 0){
        this.memberCatList = res[0].data;
      }
    });
  }

}
