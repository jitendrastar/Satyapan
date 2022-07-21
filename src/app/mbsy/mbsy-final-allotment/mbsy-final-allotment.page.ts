import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { MbsyProductAllotmentModelPage } from '../mbsy-modal/product-allotment-model/product-allotment-model.page';

@Component({
  selector: 'app-mbsy-final-allotment',
  templateUrl: './mbsy-final-allotment.page.html',
  styleUrls: ['./mbsy-final-allotment.page.scss'],
})
export class MbsyFinalAllotmentPage implements OnInit {

  selectedGroup: any;
  farmerList: any[] = [];
  isProducerFarmer: any;
  isNeedToCallChange: boolean = false;
  areatobeallotedforcurrentYear: any;

  constructor(public httpClient: CommonService, public route: ActivatedRoute, public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.selectedGroup = JSON.parse(this.route.snapshot.paramMap.get("group"));
    console.log("group details : ", this.selectedGroup);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getGroupFarmerData();
  }

  getGroupFarmerData() {
    var self = this;
    self.farmerList = [];
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
          if (res.data && res.data.length > 0) {
            res.data.forEach(element => {
              element.isProducerFarmer = element.FarmerType && element.FarmerType == 'P' ? true : false;
              if (element.FarmerType && element.FarmerType == 'P') {
                self.farmerList.push(element);
              }
            });
            console.log("farmerList : ", self.farmerList);
          }
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

  async updateIsProducerFarmer(event, item, i) {
    let isPrevValue = item.isProducerFarmer;
    item.isProducerFarmer = event.detail.checked;
    console.log("isProducerFarmer : ", item.isProducerFarmer);
    if (item.isProducerFarmer != isPrevValue) {
      if (item.isProducerFarmer) {
        const prompt = await this.alertCtrl.create({
          header: this.httpClient.currentLanguage == "hindi" ? "पुष्टीकरण!" : "Confirmation!",
          message: this.httpClient.currentLanguage == "hindi" ? "क्या आपको यकीन है, यह किसान उत्पादक किसान है?" : "Are you sure, This farmer is producer farmer?",
          backdropDismiss: false,
          cssClass: 'producer-farmer-alert',
          inputs: [{
            name: 'allotedCurrentArea',
            type: 'tel',
            placeholder: 'Area to be alloted for current Season',
            label: 'Area to be alloted for current Season',
            attributes: {
              required: true
            }
          }],
          buttons: [{
            text: this.httpClient.currentLanguage == "hindi" ? "नहीं" : "No",
            handler: (data) => {
              console.log("No clicked");
              item.isProducerFarmer = false;
            },
          }, {
            text: this.httpClient.currentLanguage == "hindi" ? "हाँ" : "Yes",
            handler: (data) => {
              console.log("Ok clicked");
              if (!data.allotedCurrentArea) {
                this.httpClient.showToastMsg('Please Enter Area to be alloted for current Season.');
                return false;
              } else {
                this.areatobeallotedforcurrentYear = data.allotedCurrentArea;
                this.updateFarmerType(item, i);
              }
            },
          }],
        });
        await prompt.present();
      } else {
        const prompt = await this.alertCtrl.create({
          header: this.httpClient.currentLanguage == "hindi" ? "पुष्टीकरण!" : "Confirmation!",
          message: this.httpClient.currentLanguage == "hindi" ? "क्या आपको यकीन है, यह किसान उत्पादक किसान नहीं है?" : "Are you sure, This farmer is not producer farmer?",
          backdropDismiss: false,
          buttons: [{
            text: this.httpClient.currentLanguage == "hindi" ? "नहीं" : "No",
            handler: (data) => {
              console.log("No clicked");
              item.isProducerFarmer = true;
            },
          }, {
            text: this.httpClient.currentLanguage == "hindi" ? "हाँ" : "Yes",
            handler: (data) => {
              console.log("Ok clicked");
              this.updateFarmerType(item, i);
            },
          }],
        });
        await prompt.present();
      }
      console.log("farmerList : ", this.farmerList);
    }
  }

  updateFarmerType(item, i) {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "MBSY_UpdateFarmerTypeData",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: item.GroupId,
          SeedRatePerHA: item.SeedRate,
          AreatobeallotedforcurrentYear: item.isProducerFarmer ? this.areatobeallotedforcurrentYear : 0,
          farmertype: item.isProducerFarmer ? 'P' : 'T',
          farmerid: item.FarmerId,
          IsProduceCountChecked: 0
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          // self.httpClient.showToast('Group saved successfully.');
          // self.navCtrl.pop();
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

  finalSaveGroupDataPrompt() {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "MBSY_UpdateFarmerTypeData",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: self.selectedGroup.GroupId,
          IsProduceCountChecked: 'True',
          SeedRatePerHA: 0,
          AreatobeallotedforcurrentYear: 0,
          farmertype: 0,
          farmerid: 0,
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          // self.httpClient.showToast('Group saved successfully.');
          // self.navCtrl.pop();
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

  async mbsyAllotment(item, index) {
    const modal = await this.modalCtrl.create({
      component: MbsyProductAllotmentModelPage,
      componentProps: {
        group: this.selectedGroup,
        farmer: item
      },
      cssClass: "add-farmer-modal"
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log('Modal Sent Data :' + JSON.stringify(dataReturned.data));
      if (dataReturned && dataReturned.data && dataReturned.data.status == 'success') {
        this.providedSeedDistribution(item, dataReturned.data.providedSeeds)
      }
    });

    return await modal.present();
  }

  providedSeedDistribution(farmer, seedDistributedFarmer) {
    var self = this;
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "UpdateProvidedSeeds",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: self.selectedGroup.GroupId,
          farmerid: farmer.FarmerId,
          // farmertype: farmer.FarmerType,
          ProvidedSeeds: seedDistributedFarmer
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          // self.httpClient.showToast('Group saved successfully.');
          // self.navCtrl.pop();
          self.getGroupFarmerData();
        } else {
          self.httpClient.showToast(res.message);
        }
      },
      (error) => {
        self.httpClient.showToastError();
      }
    );
  }

  gotoTraining() {
    this.navCtrl.navigateForward(['/tranning-init', { group: JSON.stringify(this.selectedGroup) }]);
  }

}
