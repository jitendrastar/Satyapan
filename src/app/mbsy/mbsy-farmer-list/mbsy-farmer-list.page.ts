import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-mbsy-farmer-list',
  templateUrl: './mbsy-farmer-list.page.html',
  styleUrls: ['./mbsy-farmer-list.page.scss'],
})
export class MbsyFarmerListPage implements OnInit {

  selectedGroup: any;
  groupList: any[] = [];

  constructor(public httpClient: CommonService, public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public route: ActivatedRoute,
    public alertCtrl: AlertController) {

    this.selectedGroup = JSON.parse(this.route.snapshot.paramMap.get("group"));
    console.log("groupList : ", this.selectedGroup);

  }

  ngOnInit() {
    this.getGroupFarmerData();
  }

  getGroupFarmerData() {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "GetFarmerDataGroupWise",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: self.selectedGroup.GroupId,
          ForGroupList: 0,
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        if (res.status == 0) {
          self.groupList = res.data;
        } else {
          self.httpClient.showToast(res.message);
        }
        self.httpClient.dismissLoading();
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

  finalSaveGroupData() {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "MBSY_FarmerGroupCompleted",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: self.selectedGroup.GroupId,
          IsGroupCompleted: 'True',
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          self.httpClient.showToast('Group saved successfully.');
          self.navCtrl.pop();
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }


  async finalSaveGroupDataPrompt() {
    const prompt = await this.alertCtrl.create({
      header: this.httpClient.currentLanguage == "hindi" ? "क्या आपको यकीन है?" : "Are you sure?",
      message: this.httpClient.currentLanguage == "hindi" ? "फाइनल सेव के बाद, आप इस समूह के किसी भी किसान को जोड़ या हटा नहीं सकते।" : "After final save, You can't ADD or REMOVE to any farmer from this group.",
      backdropDismiss: false,
      buttons: [{
        text: this.httpClient.currentLanguage == "hindi" ? "नहीं" : "No",
        role: "cancel",
        handler: () => {
        },
      }, {
        text: this.httpClient.currentLanguage == "hindi" ? "हाँ" : "Yes",
        handler: (data) => {
          console.log("Ok clicked");
          this.finalSaveGroupData();
        },
      }],
    });
    await prompt.present();
  }

  async removeFarmerPrompt(item, i) {
    const prompt = await this.alertCtrl.create({
      header: this.httpClient.currentLanguage == "hindi" ? "पुष्टि करें!" : "Confirm!",
      message: this.httpClient.currentLanguage == "hindi" ? "क्या आप इस किसान को हटाना चाहते हैं?" : "Do you want to remove this farmer?",
      backdropDismiss: false,
      buttons: [{
        text: this.httpClient.currentLanguage == "hindi" ? "नहीं" : "No",
        role: "cancel",
        handler: () => {
        },
      }, {
        text: this.httpClient.currentLanguage == "hindi" ? "हाँ" : "Yes",
        handler: (data) => {
          console.log("Ok clicked");
          this.removeFarmer(item, i);
        },
      }],
    });
    await prompt.present();
  }

  removeFarmer(item, i) {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "RemoveFarmerDataGroupWise",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: item.GroupId,
          farmerid: item.FarmerId,
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          self.groupList.splice(i, 1);
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

}
