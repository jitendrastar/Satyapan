import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { AddFarmerModelPage } from '../mbsy-modal/add-farmer-model/add-farmer-model.page';

@Component({
  selector: 'app-mbsy-group',
  templateUrl: './mbsy-group.page.html',
  styleUrls: ['./mbsy-group.page.scss'],
})
export class MbsyGroupPage implements OnInit {

  public groupList: any[] = [];
  public selectedMBSYObj: any;
  public segmentType: string = "pending";

  constructor(public httpClient: CommonService, public navCtrl: NavController, public modalCtrl: ModalController, public route: ActivatedRoute, public alertCtrl: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.selectedMBSYObj = JSON.parse(params["asJSON"]);
      console.log("AS Selected MBSYObj = ", this.selectedMBSYObj);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getMBSYGroupList();
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentType = event.detail.value;
    if (this.segmentType == 'completed') {

    }
  }

  getMBSYGroupList() {
    this.groupList = [];
    this.httpClient.showLoading();
    var sendRequestData = {
      "obj": {
        "usrnm": "rajkisan",
        "psw": "rajkisan@123",
        "srvnm": "MBSY",
        "srvmethodnm": "Grouplist",
        "srvparam": JSON.stringify({
          Scheme_ID: this.selectedMBSYObj[0].scheme[0].Id,
          SubScheme_ID: this.selectedMBSYObj[0].subScheme[0].Id,
          ActivityId: this.selectedMBSYObj[0].activity[0].Id,
          SubActivityId: this.selectedMBSYObj[0].sub_activity[0].Id,
          ComponentId: this.selectedMBSYObj[0].component[0].Id,
          userid: this.httpClient.userData.userid,
          officeid: this.httpClient.userData.OfficeId
        })
      }
    }
    console.log('sendRequestData', sendRequestData);
    this.httpClient.post(sendRequestData).subscribe(async (temp) => {
      var res = temp[0];
      this.httpClient.dismissLoading();
      if (res && res.status == "0") {
        if (res.data && res.data.length > 0) {
          res.data.forEach(element => {
            element.GroupName = element.GroupNo;
            this.groupList.push(element);
          });
        }
      } else {
        this.httpClient.showToast(res.message);
      }
    }, error => {
      this.httpClient.showToastError();
    });
  }

  tappedOnCreateGroup() {
    if (this.groupList.length > 0) {
      let item: any = this.groupList[this.groupList.length - 1];
      if (item.FarmerCounts && item.FarmerCounts > 0) {
        this.addNewGroupInGroupList();
      } else {
        this.httpClient.showToast("Kindly add atleast one farmer in last created group to create a new group.");
      }
    } else {
      this.addNewGroupInGroupList();
    }

  }

  addNewGroupInGroupList() {
    let grpObj: any = new Object();
    grpObj.GroupId = 0;
    grpObj.GroupName = "Group"// + new Date().getTime();
    grpObj.IsGroupCompleted = false;
    grpObj.FarmerCounts = 0;
    grpObj.SchemeId = this.selectedMBSYObj[0].scheme[0].Id;
    grpObj.SubSchemeId = this.selectedMBSYObj[0].subScheme[0].Id;
    grpObj.ComponentId = this.selectedMBSYObj[0].component[0].Id;
    grpObj.ActivityId = this.selectedMBSYObj[0].activity[0].Id;
    grpObj.SubActivityId = this.selectedMBSYObj[0].sub_activity[0].Id;
    grpObj.CreatedBy = this.httpClient.userData.userid;
    grpObj.OfficeId = this.httpClient.userData.OfficeId;
    this.groupList.push(grpObj);
    this.httpClient.showToast("Group created successfully.");
  }

  async tappedOnAddFarmer(index) {
    const modal = await this.modalCtrl.create({
      component: AddFarmerModelPage,
      componentProps: {
        group: this.groupList[index]
      },
      cssClass: "add-farmer-modal"
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned && dataReturned.data) {
        console.log('Modal Sent Data :' + JSON.stringify(dataReturned.data));
        this.groupList[index].farmers = dataReturned.data;
        console.log(this.groupList);
        setTimeout(() => {
          this.addFarmerDataGroupWise(index);
        }, 200);
      }
    });

    return await modal.present();
  }

  addFarmerDataGroupWise(index) {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "InsertFarmerDataGroupWise",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          ListObjMBSYFarmer: [{
            GroupId: self.groupList[index].GroupId ? self.groupList[index].GroupId : 0,
            FarmerId: self.groupList[index].farmers.farmerDetails.FarmerDetailsId,
            SchemeId: self.selectedMBSYObj[0].scheme[0].Id,
            SubSchemeId: self.selectedMBSYObj[0].subScheme[0].Id,
            ActivityId: self.selectedMBSYObj[0].activity[0].Id,
            SubActivityId: self.selectedMBSYObj[0].sub_activity[0].Id,
            ComponentId: self.selectedMBSYObj[0].component[0].Id,
            FarmerCategory: self.groupList[index].farmers.memberCatId.value.toString().toUpperCase(),
            ProspectiveAreaHA: self.groupList[index].farmers.prospectiveArea,
            IsDeleted: 'False',
            IsGroupCompleted: 'False',
          }]
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          self.httpClient.showToast("Farmer added successfully.");
          self.getMBSYGroupList();
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

  gotoFarmerList(index) {
    if (this.groupList.length > 0 && this.groupList[index].FarmerCounts && this.groupList[index].FarmerCounts > 0) {
      this.navCtrl.navigateForward(['/mbsy-farmer-list', { group: JSON.stringify(this.groupList[index]) }]);
    } else {
      this.httpClient.showToast("No Farmer found. Please add farmer first.");
    }
  }

  tappedOnDistribution(index) {
    this.navCtrl.navigateForward(['/mbsy-cal-distribution', { group: JSON.stringify(this.groupList[index]) }]);
    // this.navCtrl.navigateForward(['/mbsy-final-distribution', { group: JSON.stringify(this.groupList[index]) }]);
  }

  async viewCalculation(index) {
    console.log(this.groupList[index]);
    const prompt = await this.alertCtrl.create({
      header: this.httpClient.currentLanguage == "hindi" ? "आकलन!" : "Calculation!",
      message: `${this.groupList[index].RequiredSeedNextYear_F} <br /> <br /> ${this.groupList[index].RequiredSeedCurrentYear_F})`,
      backdropDismiss: false,
      buttons: [{
        text: this.httpClient.currentLanguage == "hindi" ? "ठीक है" : "Ok",
        role: 'cancel'
      }],
    });
    await prompt.present();
  }

  tappedOnAllotment(index) {
    this.navCtrl.navigateForward(['/mbsy-final-distribution', { group: JSON.stringify(this.groupList[index]) }]);
    // this.navCtrl.navigateForward(['/mbsy-cal-distribution', { group: JSON.stringify(this.groupList[index]) }]);
  }

}
