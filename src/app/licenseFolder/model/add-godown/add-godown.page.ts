import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-godown',
  templateUrl: './add-godown.page.html',
  styleUrls: ['./add-godown.page.scss'],
})
export class AddGodownPage implements OnInit {

  public addressType:any = "urban";
  public stateList:any = [];
  public selectedState:any;
  public districtList:any = [];
  public selectedDistrict:any;
  public tehsilList:any = [];
  public selectedTehsil:any;
  public cityList:any = [];
  public selectedCity:any;
  public panchayatSamitiList:any = [];
  public selectedPanchayatSamiti:any;
  public gramPanchayatList:any = [];
  public selectedGramPanchayat:any;
  public villageList:any = [];
  public selectedVillage:any;
  public plotNo_landmark:any;
  public locality_wardNo:any;
  public pincode:any;

  constructor(public httpClient: CommonService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.getDistrictList();
  }

  closeModel(){
    this.modalCtrl.dismiss();
  }

  getStateList(){
    var self = this;
    var sendRequestData = {
      obj: {
          usrnm: 'rajkisan',
          psw: 'rajkisan@123',
          srvnm: 'CommonAPI',
          srvmethodnm: 'GetStateList',
          srvparam: JSON.stringify({}),
      },
  };
  console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));

  self.httpClient.post(sendRequestData).subscribe(
      function(temp) {
          var res: any = temp[0];
          console.log('res', res);
          self.httpClient.dismissLoading();
          if (res.status == 0) {
             self.stateList = res.data;
             console.log("state list = "+JSON.stringify(self.stateList));
             if(self.stateList.length == 1){
               self.selectedState = self.stateList[0].STATE_ID;
              //  self.getDistrictList();
             }
          } else {
              self.httpClient.showToast(res.message);
          }
      });
  }

  getDistrictList(){
    console.log("State ID = ",this.selectedState);
    var self = this;
    var sendRequestData = {
      obj: {
          usrnm: 'rajkisan',
          psw: 'rajkisan@123',
          srvnm: 'CommonAPI',
          srvmethodnm: 'GetDistrictbyIdList',
          srvparam: JSON.stringify({'stateid':6}),
      },
  };
  console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));

  self.httpClient.post(sendRequestData).subscribe(
      function(temp) {
          var res: any = temp[0];
          console.log('res', res);
          self.httpClient.dismissLoading();
          if (res.status == 0) {
             self.districtList = res.data;
             console.log("district list = "+JSON.stringify(self.districtList));
             if(self.districtList.length == 1){
               self.selectedDistrict = self.districtList[0].DISTRICT_ID;
              //  self.getDistrictList();
             }
          } else {
              self.httpClient.showToast(res.message);
          }
      });
  }

  getTehsilList(){
    console.log("District ID = ",this.selectedDistrict);
    var self = this;
    var sendRequestData = {
      obj: {
          usrnm: 'rajkisan',
          psw: 'rajkisan@123',
          srvnm: 'CommonAPI',
          srvmethodnm: 'gettehsilbydistrictid',
          srvparam: JSON.stringify({'districtid':self.selectedDistrict}),
      },
  };
  console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));

  self.httpClient.post(sendRequestData).subscribe(
      function(temp) {
          var res: any = temp[0];
          console.log('res', res);
          self.httpClient.dismissLoading();
          if (res.status == 0) {
             self.tehsilList = res.data;
             console.log("district list = "+JSON.stringify(self.tehsilList));
             if(self.tehsilList.length == 1){
               self.selectedTehsil = self.tehsilList[0].TEHSIL_ID;
              //  self.getDistrictList();
             }
          } else {
              self.httpClient.showToast(res.message);
          }
      });
  }

  getListAccToAddressType(){
    console.log("Tehsil ID = ",this.selectedTehsil);
    if(!this.selectedDistrict){

    }else{
      if(this.addressType == "urban"){
        this.selectedGramPanchayat = "";
        this.selectedPanchayatSamiti = "";
        this.selectedVillage = "";
        var self = this;
        var sendRequestData = {
          obj: {
              usrnm: 'rajkisan',
              psw: 'rajkisan@123',
              srvnm: 'CommonAPI',
              srvmethodnm: 'getcitylistbyDstId',
              srvparam: JSON.stringify({'districtid':self.selectedDistrict}),
          },
      };
      console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));
    
      self.httpClient.post(sendRequestData).subscribe(
          function(temp) {
              var res: any = temp[0];
              console.log('res', res);
              self.httpClient.dismissLoading();
              if (res.status == 0) {
                 self.cityList = res.data;
                 console.log("City list = "+JSON.stringify(self.cityList));
                 if(self.cityList.length == 1){
                   self.selectedCity = self.cityList[0].CITY_ID;
                  //  self.getDistrictList();
                 }
              } else {
                  self.httpClient.showToast(res.message);
              }
          });
      }else{
        this.selectedCity = "";
        var self = this;
        var sendRequestData = {
          obj: {
              usrnm: 'rajkisan',
              psw: 'rajkisan@123',
              srvnm: 'CommonAPI',
              srvmethodnm: 'getpsbydistrictid',
              srvparam: JSON.stringify({'districtid':self.selectedDistrict}),
          },
      };
      console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));
    
      self.httpClient.post(sendRequestData).subscribe(
          function(temp) {
              var res: any = temp[0];
              console.log('res', res);
              self.httpClient.dismissLoading();
              if (res.status == 0) {
                 self.panchayatSamitiList = res.data;
                 console.log("PS list = "+JSON.stringify(self.panchayatSamitiList));
                 if(self.panchayatSamitiList.length == 1){
                   self.selectedPanchayatSamiti = self.panchayatSamitiList[0].BLOCK_ID;
                  //  self.getDistrictList();
                 }
              } else {
                  self.httpClient.showToast(res.message);
              }
          });
      }
    }
    
   
  }

  getGramPanchayatList(){
    console.log("PS = ", this.selectedPanchayatSamiti);
    var self = this;
    var sendRequestData = {
      obj: {
          usrnm: 'rajkisan',
          psw: 'rajkisan@123',
          srvnm: 'CommonAPI',
          srvmethodnm: 'getgpbyblockid',
          srvparam: JSON.stringify({'blockid':self.selectedPanchayatSamiti}),
      },
  };
  console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));

  self.httpClient.post(sendRequestData).subscribe(
      function(temp) {
          var res: any = temp[0];
          console.log('res', res);
          self.httpClient.dismissLoading();
          if (res.status == 0) {
             self.gramPanchayatList = res.data;
             console.log("GP list = "+JSON.stringify(self.gramPanchayatList));
             if(self.gramPanchayatList.length == 1){
               self.selectedGramPanchayat = self.gramPanchayatList[0].GP_ID;
              //  self.getDistrictList();
             }
          } else {
              self.httpClient.showToast(res.message);
          }
      });
  }

  getVillageList(){
    console.log("GP = ", this.selectedGramPanchayat);
    var self = this;
    var sendRequestData = {
      obj: {
          usrnm: 'rajkisan',
          psw: 'rajkisan@123',
          srvnm: 'CommonAPI',
          srvmethodnm: 'getvillagebygpid',
          srvparam: JSON.stringify({'gpid':self.selectedGramPanchayat}),
      },
  };
  console.log('RevertAddress sendRequestData -> ', JSON.stringify(sendRequestData));

  self.httpClient.post(sendRequestData).subscribe(
      function(temp) {
          var res: any = temp[0];
          console.log('res', res);
          self.httpClient.dismissLoading();
          if (res.status == 0) {
             self.villageList = res.data;
             console.log("Village list = "+JSON.stringify(self.villageList));
             if(self.villageList.length == 1){
               self.selectedVillage = self.villageList[0].VILLAGE_ID;
              //  self.getDistrictList();
             }
          } else {
              self.httpClient.showToast(res.message);
          }
      });
  }

  addGodown(){
   if(!this.selectedDistrict){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select district" : "कृपया जिले का चयन करें");
    }else if(!this.selectedTehsil){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select Tehsil" : "कृपया तहसील का चयन करें");
    }else if(this.addressType == "urban" && !this.selectedCity){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select City" : "कृपया शहर का चयन करें");
    }else if(this.addressType == "rural" && !this.selectedPanchayatSamiti){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select Panchayat Samiti" : "कृपया पंचायत समिति का चयन करें");
    }else if(this.addressType == "rural" && !this.selectedGramPanchayat){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select Gram Panchayat" : "कृपया ग्राम पंचायत का चयन करें");
    }else if(this.addressType == "rural" && !this.selectedVillage){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please select Village" : "कृपया गांव का चयन करें");
    }else if(!this.plotNo_landmark){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please enter Plot No/Landmark" : "कृपया प्लॉट नंबर / लैंडमार्क दर्ज करें");
    }else if(!this.locality_wardNo){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please enter Locality/Ward No" : "कृपया स्थान/वार्ड नंबर दर्ज करें");
    }else if(!this.pincode){
      this.httpClient.showToast(this.httpClient.currentLanguage == "english" ? "Please enter Pincode" : "कृपया पिनकोड दर्ज करें");
    }else{
      
    }
  }

}
