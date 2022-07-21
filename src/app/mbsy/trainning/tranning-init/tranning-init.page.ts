import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UploadImagesPage } from '../../mbsy-modal/upload-images/upload-images.page';

@Component({
  selector: 'app-tranning-init',
  templateUrl: './tranning-init.page.html',
  styleUrls: ['./tranning-init.page.scss'],
})
export class TranningInitPage implements OnInit {

  pfarmerList: any[] = [];
  tfarmerList: any[] = [];
  selectedGroup: any;
  selectedPFarmerID: any;
  selectedTraining: any;
  trainingPicture1: any;
  trainingPicture2: any;
  imageData: any;

  constructor(public httpClient: CommonService, public route: ActivatedRoute, public alertCtrl: AlertController, public geolocation: Geolocation, public modalController: ModalController, public navCtrl: NavController) {
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
    self.pfarmerList = [];
    self.tfarmerList = [];
    self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "GetFarmerDataTrainingWise",
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
              element.IsPresent = 'False';
              if (element.FarmerType && element.FarmerType == 'P') {
                self.pfarmerList.push(element);
                // self.tfarmerList.push(element);
              }
              self.tfarmerList.push(element);
            });
            console.log("farmerList : ", this.farmerList);
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

  selectePFarmerValue(event) {
    console.log('selectePFarmerValue : ', this.selectedPFarmerID);
  }

  selectTrainingValue(event) {
    console.log('selectTrainingValue : ', this.selectedTraining);
  }

  async updateIsRoggingDone(event, item, i) {
    let isPrevValue = item.IsRoggingDone;
    item.IsRoggingDone = event.detail.checked ? 'True' : 'False';
    console.log(event);
    console.log(item);
    console.log(this.pfarmerList);
  }

  async updateIsFarmerPresent(event, item, i) {
    let isPrevValue = item.IsPresent;
    item.IsPresent = event.detail.checked ? 'True' : 'False';
    console.log(event);
    console.log(item);
    console.log(this.tfarmerList);
  }

  saveTraining() {
    if (!this.selectePFarmerValue) {
      let msg = this.httpClient.currentLanguage == "hindi" ? "उत्पादक किसान का चयन करें" : "Select Producer Farmer";
      this.httpClient.showToast(msg);
      return;
    } else if (!this.selectedTraining) {
      let msg = this.httpClient.currentLanguage == "hindi" ? "प्रशिक्षण का चयन करें" : "Select Training";
      this.httpClient.showToast(msg);
      return;
    } else if (!this.imageData || !this.imageData.innerPhoto || !this.imageData.outerPhoto) {
      // let msg = this.httpClient.currentLanguage == "hindi" ? "प्रशिक्षण की पहली छवि अपलोड करें" : "Upload First Training Image";
      // let msg = this.httpClient.currentLanguage == "hindi" ? "प्रशिक्षण की दूसरी छवि अपलोड करें" : "Upload second image of Training";
      // this.httpClient.showToast(msg);
      this.openUploadImagesModal();
    } else {
      this.finalSaveTraining();
    }
  }

  async openUploadImagesModal() {
    const modal = await this.modalController.create({
      component: UploadImagesPage,
      cssClass: 'my-UploadImages',
      backdropDismiss: false,
      componentProps: {},
    });
    modal.onDidDismiss().then((data) => {
      // this.httpClient.showLoading();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.httpClient.latitude = resp.coords.latitude;
        this.httpClient.longitude = resp.coords.longitude;

        if (data.data && data.data.innerPhoto && data.data.outerPhoto && this.httpClient.latitude != '') {
          console.log('modal data', data.data);
          this.imageData = data.data;
          this.finalSaveTraining();
        }
      })
        .catch((error) => {
          console.log('Error getting location', error);
          this.httpClient.showToast('Please Enable GPS Location!!!');
        });

    });
    return await modal.present();
  }

  finalSaveTraining() {
    var self = this;
    self.httpClient.showLoading();
    let pFarmersIDs = self.pfarmerList.map(element => {
      if (element.IsRoggingDone && (element.IsRoggingDone == true || element.IsRoggingDone == 'True')) {
        return element.FarmerId;
      }
    }).join(",");
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "MBSY",
        srvmethodnm: "MBSYInsertFarmerTraining",
        srvparam: JSON.stringify({
          userid: self.httpClient.userData.userid,
          officeid: self.httpClient.userData.OfficeId,
          GroupId: self.selectedGroup.GroupId,
          Photo_CT: self.imageData.innerPhoto,
          Photo_Group: self.imageData.outerPhoto,
          latitude: self.httpClient.latitude,
          longitude: self.httpClient.longitude,
          ListFarmerTraining: self.tfarmerList,
          TrainerID: pFarmersIDs
        })
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (temp) {
        var res: any = temp[0];
        console.log("res", res);
        self.httpClient.dismissLoading();
        if (res.status == 0) {
          self.httpClient.showToast('Training saved successfully.');
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

}
