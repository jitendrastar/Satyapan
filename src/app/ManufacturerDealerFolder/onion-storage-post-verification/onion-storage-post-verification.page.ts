import { HttpClient } from "@angular/common/http";
import { Component, NgZone, OnInit } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Storage } from "@ionic/storage";
import { CommonService } from "../../services/common.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BillModelPage } from "../../bill-model/bill-model.page";
import { HortiApplicationBillModelPage } from "../horti-application-bill-model/horti-application-bill-model.page";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";

import { File } from "@ionic-native/file/ngx";
import { DatabaseServiceService } from "src/app/services/database-service.service";
import { ThrowStmt } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-onion-storage-post-verification",
  templateUrl: "./onion-storage-post-verification.page.html",
  styleUrls: ["./onion-storage-post-verification.page.scss"],
})
export class OnionStoragePostVerificationPage {
  remarks: any = "";

  data: any;
  CompomnentTable: any;
  getHorticultureManufactureData: any = [];
  getHorticultureManufactureDealerListData: any = [];
  getVerificationCheckData: any = [];
  mainDetailsFlag = false;
  checkListClose = false;
  hactarePSClose = false;
  uploadPhotosClose = false;
  uploadBillsClose = false;
  submitBtn = false;
  manufacturerValue: any;
  dealerValue: any;
  brandData: any = [];
  getHorticultureCouplerComponentListData: any = [];
  brandValue: any;
  imgSourceOfIrrigation: any;
  imgSourceOfIrrigationDateTime: any;
  imgSprinklerWithFarmer: any;
  imgSprinklerWithFarmeDateTime: any;
  sourceOfIrrigationLatitude: any;
  sourceOfIrrigationLongitude: any;
  sprinklerWithFarmerLatitude: any;
  sprinklerWithFarmerLongitude: any;
  ImgTriPartyAgreement: any;
  billArray: any = [];
  getAddSprinklerPostVerificationData: any = [];
  ChecklistDetailList: any = [];
  listOfISIMarks: any = [];
  totalAmountOfBill: any;
  latitude: any;
  longitude: any;
  spacingTypeDetailList: any = [];
  postVerificationId: any;

  toggleCheckList() {
    this.checkListClose = !this.checkListClose;
  }

  toggleHectarePS() {
    this.hactarePSClose = !this.hactarePSClose;
  }

  togglePhotos() {
    this.uploadPhotosClose = !this.uploadPhotosClose;
  }

  toggleBill() {
    this.uploadBillsClose = !this.uploadBillsClose;
  }

  basicDataSubmitFlag = true;
  khasaraFlag = true;
  billandPhotoFlag = false;
  fileTransfer: any;

  toggleKhasara() {
    console.log("test");
    this.khasaraFlag = !this.khasaraFlag;
  }

  selectedKhasaraNumber: any;
  selectedAccountOf: any = "0";
  imgOfConsentLetter: any;
  selectedShareProvided = -1;
  ImgFarmerWithOfficer: any;
  ImgFarmerWithOfficer2: any;
  ImgDripBrandName1: any;
  ImgDripBrandName2: any;
  ImgWarrantyCard: any;

  capacitySizeData: any = [];
  unitCost: any;
  optionalItemName: any = [
    {
      optionalItemId: "1",
      optionalItemName: "Sand filter with back wash assembly (IS 14606)",
    },
    {
      optionalItemId: "2",
      optionalItemName: "Hydrocyclone filter (IS 14743)",
    },
    {
      optionalItemId: "3",
      optionalItemName: "Fertilizer Tank with assembl",
    },
  ];
  getPVOptionalItemListData: any = [];
  selectedPipe: any;
  selectedPipeName: any;

  optionalItemNameValue: any;
  capacitySizeDataValue: any;
  optionalArray: any = [];
  unitCostValue: any;
  arr = [];
  haValue: any;

  multiUserArray: any = [];
  subsidyList: any = [
    {
      id: "2",
      name: "Raingun",
    },
    {
      id: "3",
      name: "Sprinkler",
    },
    {
      id: "10",
      name: "Micro Sprinkler",
    },
    {
      id: "11",
      name: "Drip Irrigation",
    },
    {
      id: "16",
      name: "Mini Sprinkler",
    },
    {
      id: "61",
      name: "Onion Storage",
    },
  ];

  toggleMultiuserClose = false;

  toggleMultiuser() {
    this.toggleMultiuserClose = !this.toggleMultiuserClose;
  }

  LandAreaArr = [];
  landArea: any;
  amt: any;
  docUrl: any;
  subsidyId: any;

  showLoader: boolean = false;
  availSubsidyFlag: boolean = false;
  p_bar_value: number = 0;
  uploadPercent: any = 0;
  year: any;
  oneYearFromNow: any;
  oldDocImgUrl: any;
  checked: any;
  prevAvailedSubsidyArray: any = [];
  checkArray: any = [];
  farmerAndOfficer: any;
  farmerAndOfficerDateTime: any;

  fFarmerLetterOfDissent: any;
  fFarmerLetterOfDissentDateTime: any;

  IsFarmerAcceptance: any = "Yes";
  isFarmerAcceptanceRemark: any = "";
  photoFarmerApprovalCertificate: any;
  photoFarmerApprovalCertificateDateTime: any;
  noCaseDateOfImgFarmer: any;
  noCaseDateOfImgLetter: any;
  lat: any;
  lng: any;
  photoFarmerWithOfficer: any;
  photoFarmerWithOfficerDateTime: any;
  btnAddSprinkler: boolean = false;
  btnSubmitNoForm: boolean = false;
  btnFinalSubmit: boolean = false;
  SprinklerComponentinfo: any;

  storeDirection: any;
  storeLength: any;
  storeWidth: any;
  storeWallsHeight: any;
  storeMiddleHeight: any;
  storePathWidth: any;
  storeFloorHeight: any;
  storeCapacityCM: any;
  storeCapacityMT: any;
  storeRoofType: any;
  storeWallsType: any;
  storeFloorType: any;
  storePillarsType: any;
  arrStoreRoofType: any[] = [];
  arrStoreWallType: any[] = [];
  arrStoreFloorType: any[] = [];
  arrStorePillarType: any[] = [];
  alreadySubsidyYear: any;
  alreadySubsidyAmount: any;

  constructor(
    
    public file: File,
    public ngZone: NgZone,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public router: Router,
    public alertCtrl: AlertController,
    public callNumber: CallNumber,
    public camera: Camera,
    public geolocation: Geolocation,
    public modalController: ModalController,
    public route: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public httpClient: CommonService,
    public dbService: DatabaseServiceService
  ) {
    
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
    this.data = JSON.parse(this.route.snapshot.paramMap.get("data"));
    console.log("this.data drip post verification rs", this.data);
    if (this.data.MultiApplicant) {
      var multiString = this.data.MultiApplicant;
      console.log("multiString", multiString);

      var arraylist = multiString.split(", ");
      console.log(arraylist);
      for (let i = 0; i < arraylist.length; i++) {
        var temp = arraylist[i].split(" / ");
        this.multiUserArray.push({
          applicantName: temp[0],
          fatherName: temp[1],
        });
      }
      console.log(temp, "temp");
      console.log("multiUserArray", this.multiUserArray);
    }

    this.oneYearFromNow = new Date().getFullYear() - 7;
    console.log("oneYearFromNow", this.oneYearFromNow);
    for (let i = 0.2; i < parseFloat("4.99") + 0.01; i = i + 0.01) {
      this.arr.push({
        value: i.toFixed(2),
      });
    }
    console.log("arr ", this.arr);
    for (let i = 0.2; i < parseFloat("4.99") + 0.01; i = i + 0.01) {
      this.LandAreaArr.push({
        value: i.toFixed(2),
      });
    }
    console.log("arr ", this.LandAreaArr);

    this.selectedKhasaraNumber = this.data.KhasraNo;
    console.log("coming Data", this.data);
    console.log("coming HectareModel", this.data.HectareModel);
    console.log("coming pipesize", this.data.PipeSize);
    if (!this.httpClient.isOffline) {
      this.brandData = JSON.parse(
        this.route.snapshot.paramMap.get("brandData")
      );
      if (parseInt(this.data.PostVerificationId) > 0) {
        this.basicDataSubmitFlag = false;
        this.billandPhotoFlag = true;
        this.postVerificationId = this.data.PostVerificationId;
        if (this.data.ImgDripBrandName1 != "") {
          this.ImgDripBrandName1 = this.data.ImgDripBrandName1;
        }
        if (this.data.ImgDripBrandName2 != "") {
          this.ImgDripBrandName2 = this.data.ImgDripBrandName2;
        }
        if (this.data.ImgWarrantyCard != "") {
          this.ImgWarrantyCard = this.data.ImgWarrantyCard;
        }
        if (this.data.ImgFarmerWithOfficer != "") {
          this.ImgFarmerWithOfficer = this.data.ImgFarmerWithOfficer;
        }
        if (this.data.ImgFarmerWithOfficer2 != "") {
          this.ImgFarmerWithOfficer2 = this.data.ImgFarmerWithOfficer2;
        }
        if (this.data.ImgTriPartyAgreement != "") {
          this.ImgTriPartyAgreement = this.data.ImgTriPartyAgreement;
        }
        if (this.data.SprinklerComponentinfo != "") {
          this.SprinklerComponentinfo = this.data.SprinklerComponentinfo;
        }
        this.getBills();
      }
    } else {
      if (this.data.basicDataSubmission) {
        this.basicDataSubmitFlag = false;
        this.billandPhotoFlag = true;
        if (this.data.ImgFarmerWithOfficer) {
          this.ImgFarmerWithOfficer = this.data.ImgFarmerWithOfficer;
        }
        if (this.data.ImgFarmerWithOfficer2) {
          this.ImgFarmerWithOfficer2 = this.data.ImgFarmerWithOfficer2;
        }
        if (this.data.ImgDripBrandName1) {
          this.ImgDripBrandName1 = this.data.ImgDripBrandName1;
        }
        if (this.data.ImgDripBrandName2) {
          this.ImgDripBrandName2 = this.data.ImgDripBrandName2;
        }
        if (this.data.ImgWarrantyCard) {
          this.ImgWarrantyCard = this.data.ImgWarrantyCard;
        }
        if (this.data.ImgTriPartyAgreement) {
          this.ImgTriPartyAgreement = this.data.ImgTriPartyAgreement;
        }
        if (this.data.SprinklerComponentinfo) {
          this.SprinklerComponentinfo = this.data.SprinklerComponentinfo;
        }
        if (this.data.billDetails) {
          this.billArray = this.data.billDetails;
        }
        //
      }
    }
    console.log("coming brandData", this.brandData);
    this.getVerificationChecklistData(this.data.ApplicationId);
  }

  getBills() {
    var self = this;
    // self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "PostVerification",
        srvmethodnm: "GetPostVerificationBillDetails",
        srvparam: JSON.stringify({
          ApplicationId: this.data.ApplicationId,
          SubsidySchemeId: this.data.SubsidySchemeId,
        }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        // self.httpClient.dismissLoading();
        if (res[0].status == 0) {
          self.billArray = res[0].data;
          self.calculateTheTotalBillAmount();
        } else {
          // self.httpClient.showToast(res[0].data);
        }
        // self.httpClient.(res[0].message);
      },
      (error) => {
        // self.httpClient.dismissLoading();
        var errorRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "rajkisan@123",
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "PostVerification",
            srvmethodnm: "GetPostVerificationBillDetails",
            srvparam: JSON.stringify({
              ApplicationId: self.data.ApplicationId,
              SubsidySchemeId: self.data.SubsidySchemeId,
            }),
          },
        };
        console.log("errorRequestData new", errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AaoVerificationPage");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter AaoVerificationPage");
    this.getAgriLovValuesByAgriLovCode("HortiOsRoofType");
    this.getLoc();
  }

  getAgriLovValuesByAgriLovCode(lovCode: string) {
    this.httpClient.showLoading();
    var self = this;
    let credObj: any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetAgriLovValuesByAgriLovCode";
    let srvParams: any = new Object();
    srvParams.AgriLovValuesCode = lovCode;
    credObj.obj.srvparam = JSON.stringify(srvParams);
    self.httpClient.post(credObj).subscribe((res) => {
      if (res[0].status == 0) {
        this.httpClient.dismissLoading();
        if (lovCode == "HortiOsRoofType") {
          self.arrStoreRoofType = res[0].data;
        } else if (lovCode == "HortiOsWallType") {
          self.arrStoreWallType = res[0].data;
        } else if (lovCode == "HortiOsFloorType") {
          self.arrStoreFloorType = res[0].data;
        } else if (lovCode == "HortiOsPillarType") {
          self.arrStorePillarType = res[0].data;
        }
      } else {
        this.httpClient.showToast(res[0].message);
        this.httpClient.dismissLoading();
      }
    });
  }

  getVerificationChecklistData(hortiSubsidyApplicationId) {
    if (this.httpClient.isOffline) {
      this.getVerificationCheckData = this.data.getVerificationCheckData;
    } else {
      var self = this;
      self.httpClient.showLoadingImage();
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "PostVerification",
          srvmethodnm: "VerificationChecklist",
          srvparam: JSON.stringify({
            schemeid: this.data.SubsidySchemeId,
            StepName: "Post Verification",
            ApplicationId: this.data.ApplicationId,
          }),
        },
      };
      console.log("VerificationChecklistt - ", sendRequestData);
      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          console.log(" VerificationChecklist res", res);
          self.httpClient.dismissLoadingImage();

          if (res[0].status == 0) {
            self.getVerificationCheckData = res[0].data;
            for (var i = 0; i < self.getVerificationCheckData.length; i++) {
              self.getVerificationCheckData[i].isSelectedClose = false;
              self.getVerificationCheckData[i].isSelectedCheck = false;
            }
          } else {
            self.showPrompt(res[0].data);
          }
        },
        (error) => {
          // self.httpClient.dismissLoading();
          var errorRequestData = {
            obj: {
              usrnm: "rajkisan",
              psw: "rajkisan@123",
              srvresponce: error,
              userid: self.httpClient.userData.userid,
              srvnm: "PostVerification",
              srvmethodnm: "VerificationChecklist",
              srvparam: JSON.stringify({
                schemeid: self.data.SubsidySchemeId,
                StepName: "Post Verification",
                ApplicationId: self.data.ApplicationId,
              }),
            },
          };
          console.log("errorRequestData new", errorRequestData);
          self.httpClient.getErrorMobileLogs(errorRequestData);
          self.httpClient.showToastError();
        }
      );
    }
  }

  async showPrompt(msg) {
    if (this.httpClient.currentLanguage == "hindi") {
      const prompt = await this.alertCtrl.create({
        header: "अलर्ट!",
        message: msg,
        backdropDismiss: false,
        buttons: [
          {
            text: "ठीक है",
            handler: (data) => {
              console.log("Ok clicked");
              // this.navCtrl.pop();
            },
          },
        ],
      });
      await prompt.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Alert!",
        message: msg,
        backdropDismiss: false,

        buttons: [
          {
            text: "OK",
            handler: (data) => {
              console.log("Ok clicked");
              // this.navCtrl.pop();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  getLoc() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(
          " getting  location",
          resp.coords.latitude + "-----" + resp.coords.longitude
        );
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch((error) => {
        //this.showPrompt("Error getting Source Of Irrigation location");
      });
  }

  getAddSprinklerPostVerification() {
    this.btnAddSprinkler = true;
    var test = this.prevAvailedSubsidyArray.filter((x) => x.SubsidyId == "");
    var test2 = this.prevAvailedSubsidyArray.filter((x) => x.Year == "");
    var test3 = this.prevAvailedSubsidyArray.filter((x) => x.LandArea == "");
    var test4 = this.prevAvailedSubsidyArray.filter((x) => x.Amount == "");
    var test5 = this.prevAvailedSubsidyArray.filter((x) => x.ProofDoc == "");

    console.log("PrevAvailedSubsidyArray", this.prevAvailedSubsidyArray);
    var checkArray = [];
    checkArray = this.prevAvailedSubsidyArray.filter(
      (x) => x.IsDeductSubsidy == true
    );
    console.log(checkArray);

    var self = this;
    let msg: any = "";
    if (this.longitude == null ||this.longitude == null ||this.longitude == null) {
      this.getLoc();
      if (this.httpClient.currentLanguage == "hindi") {
      this.httpClient.showToast(
      "कृपया इस एप्लिकेशन के लिए लोकेशन सक्षम करें फिर सबमिट करें"
      );
      } else {
      this.httpClient.showToast(
      "Please enable the location for this application then submit"
      );
      }
      }
      else if (this.latitude == null ||this.latitude == null ||this.latitude == null) {
      this.getLoc();
      if (this.httpClient.currentLanguage == "hindi") {
      this.httpClient.showToast(
      "कृपया इस एप्लिकेशन के लिए लोकेशन सक्षम करें फिर सबमिट करें"
      );
      } else {
      this.httpClient.showToast(
      "Please enable the location for this application then submit"
      );
      }
      }

    else if (this.selectedKhasaraNumber == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast("कृपया खसरा नंबर दर्ज करें");
      } else {
        this.httpClient.showToast("Please enter the khasra number");
      }
      this.btnAddSprinkler = false;
    } else if (this.storeDirection == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारगृह निर्माण की दिशा दर्ज करें"
          : "Please enter the Direction of Store House Construction.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeLength == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारगृह की लम्बाई दर्ज करें"
          : "Please enter the Length of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeWidth == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारगृह की चौड़ाई दर्ज करें"
          : "Please enter the Width of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeWallsHeight == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारगृह की दीवारों की ऊंचाई दर्ज करें"
          : "Please enter the Height of Walls of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeMiddleHeight == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारगृह की मध्य की ऊंचाई दर्ज करें"
          : "Please enter the Middle Height of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storePathWidth == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया रास्ते की चौड़ाई दर्ज करें"
          : "Please enter the Width of Path.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeFloorHeight == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया हवादार फर्श की जमीन से ऊंचाई दर्ज करें"
          : "Please enter the Height of Ventilated Floor.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeCapacityCM == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारण क्षमता (घन मीटर) दर्ज करें"
          : "Please enter the Storage Capacity(Cubic Meter) of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeCapacityMT == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया भण्डारण क्षमता (मैट्रिक टन) दर्ज करें"
          : "Please enter the Storage Capacity (MT) of Store House.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeRoofType == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया छत की निर्माण सामग्री का चयन करें"
          : "Please select the Building Material of Roof.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeWallsType == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया दीवारों की निर्माण सामग्री का चयन करें"
          : "Please select the Building Material of Walls.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storeFloorType == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया हवादार फर्श की निर्माण सामग्री का चयन करें"
          : "Please select the Building Material of Ventilated Floor.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    } else if (this.storePillarsType == null) {
      msg =
        this.httpClient.currentLanguage == "hindi"
          ? "कृपया खम्भे/ढांचे की निर्माण सामग्री का चयन करें"
          : "Please select the Building Material of Pillars/Frame.";
      this.httpClient.showToast(msg);
      this.btnAddSprinkler = false;
    }
    // if (this.manufacturerValue == null) {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast('कृपया निर्माता का चयन करें');
    //     } else {
    //         this.httpClient.showToast('Please select the manufacturer');
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (this.haValue == null || this.haValue == '') {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast('कृपया हेक्टेयर का चयन करें');
    //     } else {
    //         this.httpClient.showToast('Please select the Hectare Model');
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (this.dealerValue == null || this.dealerValue == '') {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast('कृपया विक्रेता का चयन करें');
    //     } else {
    //         this.httpClient.showToast('Please select the dealer');
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (this.brandValue == null) {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast('कृपया ब्रांड का चयन करें');
    //     } else {
    //         this.httpClient.showToast('Please select the brand');
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (this.selectedAccountOf == null) {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast(
    //             'कृपया सब्सिडी किसके खाते में जाएगी का चयन करें'
    //         );
    //     } else {
    //         this.httpClient.showToast(
    //             'Please select in whose account will the subsidy transfer'
    //         );
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (
    //     this.selectedAccountOf == '1' &&
    //     this.selectedShareProvided == -1
    // ) {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast(
    //             'कृपया किसान शेयर उपलब्ध कराया गया है का चयन करें'
    //         );
    //     } else {
    //         this.httpClient.showToast(
    //             'Please select whether farmer is share is provided'
    //         );
    //     }
    //     this.btnAddSprinkler = false;
    // } else if (
    //     this.selectedAccountOf == '1' &&
    //     this.imgOfConsentLetter == null
    // ) {
    //     if (this.httpClient.currentLanguage == 'hindi') {
    //         this.httpClient.showToast('कृपया सहमति पत्र अपलोड करें');
    //     } else {
    //         this.httpClient.showToast('Please upload the consent letter');
    //     }
    //     this.btnAddSprinkler = false;
    // } else
    else if (
      this.getVerificationCheckData.length != self.ChecklistDetailList.length
    ) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast("कृपया चेकलिस्ट को पूरा करें");
      } else {
        this.httpClient.showToast("Please complete the checklist");
      }
      this.btnAddSprinkler = false;
    } else if (
      test.length > 0 ||
      test2.length > 0 ||
      test3.length > 0 ||
      test4.length > 0 ||
      test5.length > 0
    ) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast(
          "कृपया पहले प्राप्त सब्सिडी विवरण को पूरा करें"
        );
      } else {
        this.httpClient.showToast(
          "Please Complete Previous Availed Subsidy Detail"
        );
      }
      this.btnAddSprinkler = false;
    } else {
      if (this.httpClient.isOffline) {
        this.dbService.storage
          .executeSql(
            "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
            [this.data.ApplicationId]
          )
          .then((res) => {
            var temp = JSON.parse(res.rows.item(0).applicationData);
            temp.basicDataSubmission = {
              IsFarmerAcceptance: this.IsFarmerAcceptance,
              ApplicationId: this.data.ApplicationId,
              latitude: this.latitude,
              longitude: this.longitude,
              ChecklistDetailList: self.ChecklistDetailList,
              SprinklerComponentinfo: [],
              UserId: self.httpClient.userData.userid,
              Step: "1",
              RoleId: self.httpClient.userData.roleid,
              SubsidySchemeId: self.data.SubsidySchemeId,
              AppVersion: self.httpClient.currentAppVersion,
              IsOnline_Offline: "1",
              mobilToVerify: "1",
              KhasraNo: this.selectedKhasaraNumber,
              ImgConsentLetter: this.imgOfConsentLetter,
              ImgConsentLetterDateTime: new Date(),
              BrandId: this.manufacturerValue,
              dealerid: this.dealerValue,
              manufactureid: this.manufacturerValue,
              SubsidyOnAccount: this.selectedAccountOf,
              IsfarmerShare: this.selectedShareProvided,
              HectareModel: this.haValue,
              optionalArray: this.optionalArray,
              PrevAvailedSubsidyArray: this.prevAvailedSubsidyArray,
            };
            let data = [JSON.stringify(temp)];
            this.dbService.storage
              .executeSql(
                `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                data
              )
              .then(() => {
                self.basicDataSubmitFlag = false;
                self.billandPhotoFlag = true;
                self.httpClient.showToast(
                  "Basic data is save now upload the required photos and bills"
                );
              })
              .catch((e) => {
                this.btnAddSprinkler = false;
                console.log("error " + JSON.stringify(e));
              });
          })
          .catch((e) => {
            this.btnAddSprinkler = false;
            alert("error " + JSON.stringify(e));
          });
      } else {
        self.httpClient.showLoading();
        var sendRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "rajkisan@123",
            srvnm: "PostVerification",
            srvmethodnm: "AddDripIrrigationPostVerification",
            srvparam: JSON.stringify({
              IsFarmerAcceptance: "Yes",
              ApplicationId: this.data.ApplicationId,
              latitude: this.latitude,
              longitude: this.longitude,
              ChecklistDetailList: self.ChecklistDetailList,
              SprinklerComponentinfo: [],
              UserId: self.httpClient.userData.userid,
              Step: "1",
              RoleId: self.httpClient.userData.roleid,
              SubsidySchemeId: self.data.SubsidySchemeId,
              AppVersion: self.httpClient.currentAppVersion,
              IsOnline_Offline: "1",
              mobilToVerify: "1",
              KhasraNo: this.selectedKhasaraNumber,
              ImgConsentLetter: this.imgOfConsentLetter,
              ImgConsentLetterDateTime: new Date(),
              BrandId: this.manufacturerValue,
              dealerid: this.dealerValue,
              manufactureid: this.manufacturerValue,
              SubsidyOnAccount: this.selectedAccountOf,
              IsfarmerShare: this.selectedShareProvided,
              HectareModel: this.haValue,
              optionalArray: this.optionalArray,
              PrevAvailedSubsidyArray: this.prevAvailedSubsidyArray,
              HortiOSDirection: this.storeDirection,
              HortiOSLength: this.storeLength,
              HortiOSWidth: this.storeWidth,
              HortiOSWallHeight: this.storeWallsHeight,
              HortiOSMidHeight: this.storeMiddleHeight,
              HortiOSPathWidth: this.storePathWidth,
              HortiOSFloorHeight: this.storeFloorHeight,
              HortiOSCapacityCM: this.storeCapacityCM,
              HortiOSCapacityMT: this.storeCapacityMT,
              HoritOSRoofType: this.storeRoofType,
              HortiOSWallType: this.storeWallsType,
              HortiOSFloorType: this.storeFloorType,
              HortiOSPillerType: this.storePillarsType,
              HortiAlreadySubsidyYear: this.alreadySubsidyYear,
              HortiAlreadySubsidyAmt: this.alreadySubsidyAmount,
            }),
          },
        };
        console.log("AddSprinklerPostVerification - ", sendRequestData);
        this.httpClient.post(sendRequestData).subscribe(
          function (res: any) {
            console.log(" AddSprinklerPostVerification res", res);
            self.httpClient.dismissLoading();
            if (res[0].status == 0) {
              // self.getAddSprinklerPostVerificationData = res[0].data;
              self.httpClient.showToast(res[0].message);

              self.postVerificationId = res[0].data[0].PostVerificationId;
              self.basicDataSubmitFlag = false;
              self.billandPhotoFlag = true;
            } else {
              this.btnAddSprinkler = false;
              self.httpClient.showToast(res[0].message);
            }
          },
          (error) => {
            // self.httpClient.dismissLoading();
            var errorRequestData = {
              obj: {
                usrnm: "rajkisan",
                psw: "rajkisan@123",
                srvresponce: error,
                userid: self.httpClient.userData.userid,
                srvnm: "PostVerification",
                srvmethodnm: "AddDripIrrigationPostVerification",
                srvparam: JSON.stringify({
                  IsFarmerAcceptance: "Yes",
                  ApplicationId: self.data.ApplicationId,
                  latitude: self.latitude,
                  longitude: self.longitude,
                  ChecklistDetailList: self.ChecklistDetailList,
                  SprinklerComponentinfo: [],
                  UserId: self.httpClient.userData.userid,
                  Step: "1",
                  RoleId: self.httpClient.userData.roleid,
                  SubsidySchemeId: self.data.SubsidySchemeId,
                  AppVersion: self.httpClient.currentAppVersion,
                  IsOnline_Offline: "1",
                  mobilToVerify: "1",
                  KhasraNo: self.selectedKhasaraNumber,
                  ImgConsentLetter: self.imgOfConsentLetter,
                  ImgConsentLetterDateTime: new Date(),
                  BrandId: self.manufacturerValue,
                  dealerid: self.dealerValue,
                  manufactureid: self.manufacturerValue,
                  SubsidyOnAccount: self.selectedAccountOf,
                  IsfarmerShare: self.selectedShareProvided,
                  HectareModel: self.haValue,
                  optionalArray: self.optionalArray,
                  PrevAvailedSubsidyArray: self.prevAvailedSubsidyArray,
                  HortiOSDirection: this.storeDirection,
                  HortiOSLength: this.storeLength,
                  HortiOSWidth: this.storeWidth,
                  HortiOSWallHeight: this.storeWallsHeight,
                  HortiOSMidHeight: this.storeMiddleHeight,
                  HortiOSPathWidth: this.storePathWidth,
                  HortiOSFloorHeight: this.storeFloorHeight,
                  HortiOSCapacityCM: this.storeCapacityCM,
                  HortiOSCapacityMT: this.storeCapacityMT,
                  HoritOSRoofType: this.storeRoofType,
                  HortiOSWallType: this.storeWallsType,
                  HortiOSFloorType: this.storeFloorType,
                  HortiOSPillerType: this.storePillarsType,
                }),
              },
            };
            this.btnAddSprinkler = false;
            console.log("errorRequestData new", errorRequestData);
            self.httpClient.getErrorMobileLogs(errorRequestData);
            self.httpClient.showToastError();
          }
        );
      }
    }
  }

  takePhotoNoCase(param, columnName) {
    // photoImplemenWIthFarmer

    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            AppName: "PVapp",
            IsDirectUpload: "True",
          },
        };
        if (this.httpClient.isOffline) {
          this.dbService.storage
            .executeSql(
              "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
              [this.data.ApplicationId]
            )
            .then((res) => {
              console.log("second");
              var temp = JSON.parse(res.rows.item(0).applicationData);
              console.log("third");
              if (param == 1) {
                temp.photoFarmerWithOfficerNoCase = imageData;
                temp.optionOfphotoFarmerWithOfficerNoCase = options;
              } else if (param == 4) {
                temp.photoFarmerApprovalCertificateNoCase = imageData;
                temp.optionOfphotoFarmerApprovalCertificateNoCase = options;
              }

              let data = temp;
              this.dbService.storage
                .executeSql(
                  `UPDATE postVerificationOfflineOfOnionStorage
                  SET applicationData = '${JSON.stringify(data)}'
                  WHERE ApplicationId = '${this.data.ApplicationId}'
                `,
                  []
                )
                .then(() => {
                  if (param == 1) {
                    this.photoFarmerWithOfficer = imageData;
                    this.noCaseDateOfImgFarmer = new Date();
                  } else if (param == 4) {
                    this.photoFarmerApprovalCertificate = imageData;
                    this.noCaseDateOfImgLetter = new Date();
                  }
                })
                .catch((e) => {
                  console.log("err one");
                  console.log("error " + e + JSON.stringify(e));
                });
            })
            .catch((e) => {
              console.log("err two", e);
              alert("error " + e + JSON.stringify(e));
            });
        } else {
          this.httpClient.showLoading();
          FileTransfer.create()
            .upload(imageData, this.httpClient.imageUploadUrl, options)
            .then(
              (data) => {
                this.httpClient.dismissLoading();
                // success
                var temp = JSON.parse(data.response);
                console.log("temp[0].data", temp[0].data);
                if (temp[0].data) {
                  if (param == 1) {
                    this.photoFarmerWithOfficer = temp[0].data;
                    this.noCaseDateOfImgFarmer = new Date();
                  } else if (param == 4) {
                    this.photoFarmerApprovalCertificate = temp[0].data;
                    this.noCaseDateOfImgLetter = new Date();
                  }
                } else {
                  this.httpClient.showToastError();
                  this.httpClient.dismissLoading();
                }
              },
              (err) => {
                // error
                this.httpClient.showToastError();
                this.httpClient.dismissLoading();
                console.log("err", err);
              }
            );
        }
      },
      (err) => {
        // Handle error
      }
    );
  }

  submitNoForm() {
    this.btnSubmitNoForm = true;
    console.log("isFarmerAcceptanceRemark", this.isFarmerAcceptanceRemark);
    console.log(
      "photoFarmerApprovalCertificate",
      this.photoFarmerApprovalCertificate
    );
    console.log("noCaseDateOfImgLetter", this.noCaseDateOfImgLetter);
    console.log("photoFarmerWithOfficer", this.photoFarmerWithOfficer);
    console.log("noCaseDateOfImgFarmer", this.noCaseDateOfImgFarmer);
    if (this.httpClient.latitude == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast(
          "कृपया इस एप्लिकेशन के लिए लोकेशन सक्षम करें फिर सबमिट करें"
        );
      } else {
        this.httpClient.showToast(
          "Please enable the location for this application then submit"
        );
      }
      this.btnSubmitNoForm = false;
    } else if (this.httpClient.longitude == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast(
          "कृपया इस एप्लिकेशन के लिए लोकेशन सक्षम करें फिर सबमिट करें"
        );
      } else {
        this.httpClient.showToast(
          "Please enable the location for this application then submit"
        );
      }
      this.btnSubmitNoForm = false;
    } else if (this.photoFarmerWithOfficer == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast("कृपया कृषक व कार्मिक का फोटो लेंवे");
      } else {
        this.httpClient.showToast(
          "Please Upload the photo of Farmer and Officer"
        );
      }
      this.btnSubmitNoForm = false;
    } else if (this.photoFarmerApprovalCertificate == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast("कृपया असहमति पत्र का फोटो अपलोड करें");
      } else {
        this.httpClient.showToast(
          "Please Upload the photo of not acceptance later"
        );
      }
      this.btnSubmitNoForm = false;
    } else {
      var tempOfflineFlag;
      if (this.httpClient.isOffline == true) {
        tempOfflineFlag = 1;
      } else {
        tempOfflineFlag = 0;
      }

      var self = this;

      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "PostVerification",
          srvmethodnm: "AddDripIrrigationPostVerification",
          srvparam: JSON.stringify({
            ApplicationId: this.data.ApplicationId,
            userid: self.httpClient.userData.userid,
            WaterStorageType: "0",
            SubsidySchemeId: this.data.SubsidySchemeId,
            latitude: this.lat,
            longitude: this.lng,
            roleid: self.httpClient.userData.roleid,
            radius: "0",
            Length: "0",
            Width: "0",
            LengthUpper: "0",
            LengthBottom: "0",
            WidthUpper: "0",
            WidthBottom: "0",

            Height: "0",
            AppVersion: "V." + this.httpClient.currentAppVersion,
            IsOnline_Offline: tempOfflineFlag,
            mobilToVerify: "1",
            IsFarmerAcceptance: "No",
            Remarks: this.isFarmerAcceptanceRemark,
            // MicroIrrPlantOnWaterStorage: "0",
            IrrigationTypeId: "0",
            MicroIrrigationId: "0",
            NotAcceptanceDocPath: this.photoFarmerApprovalCertificate,
            NotAcceptanceDocPathDateTime: this.noCaseDateOfImgLetter,
            ImgFarmerWithOfficer: this.photoFarmerWithOfficer,
            ImgFarmerWithOfficerDateTime: this.noCaseDateOfImgFarmer,
          }),
        },
      };

      console.log("sendRequestData", sendRequestData);
      if (this.httpClient.isOffline == true) {
        var noDataOffline = {
          ApplicationId: this.data.ApplicationId,
          userid: self.httpClient.userData.userid,
          WaterStorageType: "0",
          SubsidySchemeId: this.data.SubsidySchemeId,
          latitude: this.lat,
          longitude: this.lng,
          roleid: self.httpClient.userData.roleid,
          radius: "0",
          Length: "0",
          Width: "0",
          LengthUpper: "0",
          LengthBottom: "0",
          WidthUpper: "0",
          WidthBottom: "0",
          Height: "0",
          AppVersion: "V." + this.httpClient.currentAppVersion,
          IsOnline_Offline: tempOfflineFlag,
          mobilToVerify: "1",
          IsFarmerAcceptance: "No",
          Remarks: this.isFarmerAcceptanceRemark,

          // MicroIrrPlantOnWaterStorage: "0",
          IrrigationTypeId: "0",
          MicroIrrigationId: "0",
          NotAcceptanceDocPath: this.photoFarmerApprovalCertificate,
          NotAcceptanceDocPathDateTime: this.noCaseDateOfImgLetter,
          ImgFarmerWithOfficer: this.photoFarmerWithOfficer,
          ImgFarmerWithOfficerDateTime: this.noCaseDateOfImgFarmer,
        };
        this.dbService.storage
          .executeSql(
            "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
            [this.data.ApplicationId]
          )
          .then((res) => {
            var temp = JSON.parse(res.rows.item(0).applicationData);

            temp.finalSubmission = noDataOffline;

            console.log("temp", temp);
            let data = [JSON.stringify(temp)];
            this.dbService.storage
              .executeSql(
                `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                data
              )
              .then(() => {
                this.successAlertFinalSubmission();
              })
              .catch((e) => {
                this.btnSubmitNoForm = false;
                console.log("error " + JSON.stringify(e));
              });
          })
          .catch((e) => {
            this.btnSubmitNoForm = false;
            alert("error " + JSON.stringify(e));
          });
      } else {
        self.httpClient.showLoading();
        this.httpClient.post(sendRequestData).subscribe(
          function (res: any) {
            self.httpClient.dismissLoading();
            if (res[0].status == 0) {
              self.successAlertFinalSubmission();
            } else {
              this.btnSubmitNoForm = false;
              self.photoFarmerWithOfficer = null;
              self.photoFarmerWithOfficerDateTime = null;
              self.photoFarmerApprovalCertificate = null;
              self.photoFarmerApprovalCertificateDateTime = null;
              self.httpClient.showToast(res[0].message);
            }
          },
          (error) => {
            self.httpClient.dismissLoading();
            var errorRequestData = {
              obj: {
                usrnm: "rajkisan",
                psw: "rajkisan@123",
                srvresponce: error,
                userid: self.httpClient.userData.userid,
                srvnm: "PostVerification",
                srvmethodnm: "AddDripIrrigationPostVerification",
                srvparam: JSON.stringify({
                  ApplicationId: self.data.ApplicationId,
                  userid: self.httpClient.userData.userid,
                  WaterStorageType: "0",
                  SubsidySchemeId: self.data.SubsidySchemeId,
                  latitude: self.lat,
                  longitude: self.lng,
                  roleid: self.httpClient.userData.roleid,
                  radius: "0",
                  Length: "0",
                  Width: "0",
                  LengthUpper: "0",
                  LengthBottom: "0",
                  WidthUpper: "0",
                  WidthBottom: "0",
                  Height: "0",
                  AppVersion: "V." + self.httpClient.currentAppVersion,
                  IsOnline_Offline: tempOfflineFlag,
                  mobilToVerify: "1",
                  IsFarmerAcceptance: "No",
                  Remarks: this.isFarmerAcceptanceRemark,
                  // MicroIrrPlantOnWaterStorage: "0",
                  IrrigationTypeId: "0",
                  MicroIrrigationId: "0",
                  NotAcceptanceDocPath: self.photoFarmerApprovalCertificate,
                  NotAcceptanceDocPathDateTime: self.noCaseDateOfImgLetter,
                  ImgFarmerWithOfficer: self.photoFarmerWithOfficer,
                  ImgFarmerWithOfficerDateTime: self.noCaseDateOfImgFarmer,
                }),
              },
            };
            this.btnSubmitNoForm = false;
            console.log("errorRequestData new", errorRequestData);
            self.httpClient.getErrorMobileLogs(errorRequestData);
            self.httpClient.showToastError();
          }
        );
      }
    }
  }

  takePhotoDirect() {
    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // this.billDetails.BillImg = imageData;

        // Upload Bill Details
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            AppName: "PVapp",
            IsDirectUpload: "True",
          },
        };
        console.log("options.params", options.params);
        if (this.httpClient.isOffline) {
          this.dbService.storage
            .executeSql(
              "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
              [this.data.ApplicationId]
            )
            .then((res) => {
              var temp = JSON.parse(res.rows.item(0).applicationData);
              temp.imgOfConsentLetter = imageData;
              temp.optionsOfimgOfConsentLetter = options;
              let data = [JSON.stringify(temp)];
              this.dbService.storage
                .executeSql(
                  `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                  data
                )
                .then(() => {
                  this.imgOfConsentLetter = imageData;
                })
                .catch((e) => {
                  console.log("error " + JSON.stringify(e));
                });
            })
            .catch((e) => {
              alert("error " + JSON.stringify(e));
            });
        } else {
          this.httpClient.showLoading();
          FileTransfer.create()
            .upload(imageData, this.httpClient.imageUploadUrl, options)
            .then(
              (data) => {
                console.log("data", data);
                this.httpClient.dismissLoading();
                // success
                var temp = JSON.parse(data.response);
                this.imgOfConsentLetter = temp[0].data;
              },
              (err) => {
                // error
                this.httpClient.dismissLoading();
                this.httpClient.showToastError();
              }
            );
        }
      },
      (err) => {
        // Handle error
      }
    );
  }

  takePhoto(param, columnName) {
    var self = this;

    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            id: this.postVerificationId,
            AppName: "PVapp",
            tableName: "FP_PostVerification",
            columnName: columnName,
            uniqueidcolumnname: "FP_PostVerificationId",
            IsDirectUpload: "False",
          },
        };
        console.log(options.params);
        if (this.httpClient.isOffline) {
          this.dbService.storage
            .executeSql(
              "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
              [this.data.ApplicationId]
            )
            .then((res) => {
              var temp = JSON.parse(res.rows.item(0).applicationData);
              if (param == 0) {
                temp.ImgFarmerWithOfficer = imageData;
                temp.optionOfImgFarmerWithOfficer = options;
              } else if (param == 1) {
                temp.ImgFarmerWithOfficer2 = imageData;
                temp.optionOfImgFarmerWithOfficer2 = options;
              } else if (param == 2) {
                temp.ImgDripBrandName1 = imageData;
                temp.optionOfImgDripBrandName1 = options;
              } else if (param == 3) {
                temp.ImgDripBrandName2 = imageData;
                temp.optionOfImgDripBrandName2 = options;
              } else if (param == 4) {
                temp.ImgWarrantyCard = imageData;
                temp.optionOfImgWarrantyCard = options;
              }
              // else if (param == 5) {
              //     temp.ImgTriPartyAgreement = imageData;
              //     temp.optionOfImgTriPartyAgreement = options;
              // }
              else if (param == 6) {
                temp.CompomnentTable = imageData;
                temp.optionOfCompomnentTable = options;
              }
              let data = [JSON.stringify(temp)];
              this.dbService.storage
                .executeSql(
                  `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                  data
                )
                .then(() => {
                  if (param == 0) {
                    this.ImgFarmerWithOfficer = imageData;
                  } else if (param == 1) {
                    this.ImgFarmerWithOfficer2 = imageData;
                  } else if (param == 2) {
                    this.ImgDripBrandName1 = imageData;
                  } else if (param == 3) {
                    this.ImgDripBrandName2 = imageData;
                  } else if (param == 4) {
                    this.ImgWarrantyCard = imageData;
                  }
                  // else if (param == 5) {
                  //     this.ImgTriPartyAgreement = imageData;
                  // }
                  else if (param == 6) {
                    this.CompomnentTable = imageData;
                  }
                })
                .catch((e) => {
                  console.log("error " + JSON.stringify(e));
                });
            })
            .catch((e) => {
              alert("error " + JSON.stringify(e));
            });
        } else {
          this.httpClient.showLoading();
          FileTransfer.create()
            .upload(imageData, this.httpClient.imageUploadUrl, options)
            .then(
              (data) => {
                this.httpClient.dismissLoading();
                // success
                var temp = JSON.parse(data.response);
                console.log("temp[0].data", temp[0].data);
                if (temp[0].data[0].URL) {
                  if (param == 0) {
                    this.ImgFarmerWithOfficer = temp[0].data;
                  } else if (param == 1) {
                    this.ImgFarmerWithOfficer2 = temp[0].data;
                  } else if (param == 2) {
                    this.ImgDripBrandName1 = temp[0].data;
                  } else if (param == 3) {
                    this.ImgDripBrandName2 = temp[0].data;
                  } else if (param == 4) {
                    this.ImgWarrantyCard = temp[0].data;
                  }
                  // else if (param == 5) {
                  //     this.ImgTriPartyAgreement = temp[0].data;
                  // }
                  else if (param == 6) {
                    this.CompomnentTable = temp[0].data;
                  }
                  //
                } else {
                  this.httpClient.showToastError();
                }
              },
              (err) => {
                // error

                this.httpClient.dismissLoading();
                console.log("err", err);
              }
            );
        }
      },
      (err) => {
        // Handle error
      }
    );
  }

  checkedCheck(i, isSelectedCheck) {
    for (var j = 0; j < this.ChecklistDetailList.length; j++) {
      if (
        this.ChecklistDetailList[j].ChecklistId ==
        this.getVerificationCheckData[i].Id
      ) {
        this.ChecklistDetailList.splice(j, 1);
      }
      this.getVerificationCheckData[i].isSelectedClose = false;
    }
    if (isSelectedCheck == false) {
      this.ChecklistDetailList.push({
        ChecklistId: this.getVerificationCheckData[i].Id,
        IsChecked: !isSelectedCheck,
        Remarks: "",
      });
      console.log(this.ChecklistDetailList);
    } else if (isSelectedCheck == true) {
      for (var l = 0; l < this.ChecklistDetailList.length; l++) {
        if (
          this.ChecklistDetailList[l].ChecklistId ==
          this.getVerificationCheckData[i].Id
        ) {
          this.ChecklistDetailList.splice(l, 1);
        }
      }
      console.log(this.ChecklistDetailList);
    }

    this.getVerificationCheckData[i].isSelectedCheck = !this
      .getVerificationCheckData[i].isSelectedCheck;
    this.checkAvailSubsidy(i);
  }

  async checkedClose(i, isSelectedClose) {
    for (var j = 0; j < this.ChecklistDetailList.length; j++) {
      if (
        this.ChecklistDetailList[j].ChecklistId ==
        this.getVerificationCheckData[i].Id
      ) {
        this.ChecklistDetailList.splice(j, 1);
      }
      this.getVerificationCheckData[i].isSelectedCheck = false;
    }
    console.log("isSelectedClose", isSelectedClose);
    if (isSelectedClose == false) {
      const prompt = await this.alertCtrl.create({
        header: "Remarks",
        backdropDismiss: false,
        inputs: [
          {
            placeholder: "remarks",
          },
        ],
        buttons: [
          {
            text: "Cancel",
            handler: (data) => {
              console.log("Cancel clicked");
              this.getVerificationCheckData[i].isSelectedClose = false;
              this.checkAvailSubsidy(i);
            },
          },
          {
            text: "Save",
            handler: (data) => {
              this.remarks = data[0];
              console.log("Saved clicked", this.remarks);
              console.log(this.ChecklistDetailList);
              this.ChecklistDetailList.push({
                ChecklistId: this.getVerificationCheckData[i].Id,
                IsChecked: isSelectedClose,
                Remarks: this.remarks,
              });
              this.checkAvailSubsidy(i);

              console.log(this.ChecklistDetailList);
            },
          },
        ],
      });
      await prompt.present();
    } else if (isSelectedClose == true) {
      for (var k = 0; k < this.ChecklistDetailList.length; k++) {
        if (
          this.ChecklistDetailList[k].ChecklistId ==
          this.getVerificationCheckData[i].Id
        ) {
          this.ChecklistDetailList.splice(k, 1);
        }
      }
      console.log(this.ChecklistDetailList);
    }

    this.getVerificationCheckData[i].isSelectedClose = !this
      .getVerificationCheckData[i].isSelectedClose;
  }

  checkAvailSubsidy(i) {
    var temp = [];
    // temp=this.ChecklistDetailList.filter((x)=> x.ChecklistId == "48" || "85");
    temp = this.ChecklistDetailList.filter((x) => x.ChecklistId == "48");
    if (temp.length > 0) {
      if (temp[0].IsChecked == true) {
        // this.availSubsidyFlag=true;
        this.prevAvailedSubsidyArray = [];
        this.prevAvailedSubsidyArray.push({
          ApplicationId: this.data.ApplicationId,
          SubsidyId: "",
          Year: "",
          LandArea: "",
          Amount: "",
          ProofDoc: "",
          IsDeductSubsidy: false,
        });
        console.log("prevAvailedSubsidyArray", this.prevAvailedSubsidyArray);
      } else {
        // this.availSubsidyFlag = false;
        this.prevAvailedSubsidyArray = [];
      }
    } else {
      // this.availSubsidyFlag = false;
      this.prevAvailedSubsidyArray = [];
    }
    console.log("this.ChecklistDetailList rv", this.ChecklistDetailList, i);
  }

  async addBill() {
    const modal = await this.modalController.create({
      component: HortiApplicationBillModelPage,
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data != null) {
        this.uploadBillDetails(data.data.enteredBillDetails);
      }
    });
    return await modal.present();
  }

  calculateTheTotalBillAmount() {
    this.totalAmountOfBill = 0;
    for (var i = 0; i < this.billArray.length; i++) {
      this.totalAmountOfBill =
        this.totalAmountOfBill + parseInt(this.billArray[i].BillAmount);
    }
  }

  deleteBill(index) {
    if (this.httpClient.isOffline) {
      this.dbService.storage
        .executeSql(
          "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
          [this.data.ApplicationId]
        )
        .then((res) => {
          var temp = JSON.parse(res.rows.item(0).applicationData);

          console.log("temp", temp);
          temp.billDetails.splice(index, 1);
          console.log("temp", temp);
          let data = [JSON.stringify(temp)];
          this.dbService.storage
            .executeSql(
              `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
              data
            )
            .then(() => {
              this.billArray.splice(index, 1);
              this.calculateTheTotalBillAmount();
            })
            .catch((e) => {
              console.log("error " + JSON.stringify(e));
            });
        })
        .catch((e) => {
          alert("error " + JSON.stringify(e));
        });
    } else {
      var self = this;
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "PostVerification",
          srvmethodnm: "DeleteBillDetails",
          srvparam: JSON.stringify({
            PostVerificationBillsId: this.billArray[index]
              .PostVerificationBillsId,
          }),
        },
      };
      self.httpClient.showLoading();
      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          self.httpClient.dismissLoading();
          if (res[0].status == 0) {
            self.billArray.splice(index, 1);
            self.calculateTheTotalBillAmount();
          } else {
            self.httpClient.showToast(res[0].data);
          }
        },
        (error) => {
          var errorRequestData = {
            obj: {
              usrnm: "rajkisan",
              psw: "rajkisan@123",
              srvresponce: error,
              userid: self.httpClient.userData.userid,
              srvnm: "PostVerification",
              srvmethodnm: "DeleteBillDetails",
              srvparam: JSON.stringify({
                PostVerificationBillsId:
                  self.billArray[index].PostVerificationBillsId,
              }),
            },
          };
          console.log("errorRequestData new", errorRequestData);
          self.httpClient.getErrorMobileLogs(errorRequestData);
          self.httpClient.showToastError();
        }
      );
    }
  }

  uploadBillDetails(enteredBillDetails) {
    if (this.httpClient.isOffline) {
      this.dbService.storage
        .executeSql(
          "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
          [this.data.ApplicationId]
        )
        .then((res) => {
          var temp = JSON.parse(res.rows.item(0).applicationData);
          if (!temp.billDetails) {
            temp.billDetails = [];
          }
          console.log("temp", temp);
          temp.billDetails.push(enteredBillDetails);
          console.log("temp", temp);
          let data = [JSON.stringify(temp)];
          this.dbService.storage
            .executeSql(
              `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
              data
            )
            .then(() => {
              this.billArray.push({
                BillNo: enteredBillDetails.BillNo,
                BillAmount: enteredBillDetails.BillAmount,
                BillImg: enteredBillDetails.BillImg,
                displayImage: enteredBillDetails.displayImage,
              });
              this.calculateTheTotalBillAmount();
            })
            .catch((e) => {
              console.log("error " + JSON.stringify(e));
            });
        })
        .catch((e) => {
          alert("error " + JSON.stringify(e));
        });
    } else {
      var self = this;
      self.httpClient.showLoading();
      console.log("enteredBillDetails", enteredBillDetails);
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "PostVerification",
          srvmethodnm: "AddPostVerificationBillOneByOne",
          srvparam: JSON.stringify({
            ApplicationId: this.data.ApplicationId,
            PostVerificationId: this.postVerificationId,
            userid: self.httpClient.userData.userid,
            SubsidySchemeId: this.data.SubsidySchemeId,
            BillNo: enteredBillDetails.BillNo,
            BillAmount: enteredBillDetails.BillAmount,
            BillImg: enteredBillDetails.BillImg,
            BillDate: enteredBillDetails.BillDate,
          }),
        },
      };
      console.log("sendRequestData", sendRequestData);
      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          self.httpClient.dismissLoading();
          if (res[0].status == 0) {
            self.billArray.push({
              BillNo: enteredBillDetails.BillNo,
              BillAmount: enteredBillDetails.BillAmount,
              BillImg: enteredBillDetails.BillImg,
              displayImage: enteredBillDetails.displayImage,
              AddStatus: res[0].data[0].AddStatus,
            });
            self.calculateTheTotalBillAmount();
          } else {
            self.httpClient.showToast(res[0].message);
          }
        },
        (error) => {
          self.httpClient.dismissLoading();
          var errorRequestData = {
            obj: {
              usrnm: "rajkisan",
              psw: "rajkisan@123",
              srvresponce: error,
              userid: self.httpClient.userData.userid,
              srvnm: "PostVerification",
              srvmethodnm: "AddPostVerificationBillOneByOne",
              srvparam: JSON.stringify({
                ApplicationId: self.data.ApplicationId,
                PostVerificationId: self.postVerificationId,
                userid: self.httpClient.userData.userid,
                SubsidySchemeId: self.data.SubsidySchemeId,
                BillNo: enteredBillDetails.BillNo,
                BillAmount: enteredBillDetails.BillAmount,
                BillImg: enteredBillDetails.BillImg,
                BillDate: enteredBillDetails.BillDate,
              }),
            },
          };
          console.log("errorRequestData new", errorRequestData);
          self.httpClient.getErrorMobileLogs(errorRequestData);
          self.httpClient.showToastError();
        }
      );
    }
  }

  submitFinalData() {
    this.btnFinalSubmit = true;
    var self = this;
    if (this.billArray.length == 0) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast("कृपया बिल अपलोड करें ");
      } else {
        this.httpClient.showToast("Please upload bills");
      }
      this.btnFinalSubmit = false;
    } else if (this.ImgFarmerWithOfficer == null) {
      if (this.httpClient.currentLanguage == "hindi") {
        this.httpClient.showToast(
          "अधिकारी और ड्रिप के साथ किसान की पहली तस्वीर।"
        );
      } else {
        this.httpClient.showToast(
          "First picture of farmer with officer and drip."
        );
      }
      this.btnFinalSubmit = false;
    } else if (this.ImgFarmerWithOfficer2 == null) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast(
          "Second picture of farmer with officer and drip."
        );
      } else {
        this.httpClient.showToast(
          "अधिकारी और ड्रिप के साथ किसान की दूसरी तस्वीर।"
        );
      }
      this.btnFinalSubmit = false;
    }
    // else if (this.ImgDripBrandName1 == null) {
    //     if (this.httpClient.currentLanguage == 'english') {
    //         this.httpClient.showToast(
    //             'First picture of drip with name of Brand Name/CML Number/ISI Mark/Batch No.'
    //         );
    //     } else {
    //         this.httpClient.showToast(
    //             'ब्रांड नाम / सीएमएल नंबर / आईएसआई मार्क / बैच नंबर के नाम के साथ ड्रिप की पहली तस्वीर।'
    //         );
    //     }
    //     this.btnFinalSubmit = false;
    // } else if (this.ImgDripBrandName2 == null) {
    //     if (this.httpClient.currentLanguage == 'english') {
    //         this.httpClient.showToast(
    //             'Second picture of drip with name of Brand Name/CML Number/ISI Mark/Batch No.'
    //         );
    //     } else {
    //         this.httpClient.showToast(
    //             'ब्रांड नाम / सीएमएल नंबर / आईएसआई मार्क / बैच नंबर के नाम के साथ ड्रिप की दूसरी तस्वीर।'
    //         );
    //     }
    //     this.btnFinalSubmit = false;
    // } else if (this.ImgWarrantyCard == null) {
    //     if (this.httpClient.currentLanguage == 'english') {
    //         this.httpClient.showToast('Picture of warranty card');
    //     } else {
    //         this.httpClient.showToast('वारंटी कार्ड की तस्वीर।');
    //     }
    //     this.btnFinalSubmit = false;
    // } else if (this.ImgTriPartyAgreement == null) {
    //     if (this.httpClient.currentLanguage == 'english') {
    //         this.httpClient.showToast(
    //             'Please upload Picture of Tri Party Agreement'
    //         );
    //     } else {
    //         this.httpClient.showToast('तीन पार्टी समझौता की तस्वीर अपलोड करें।');
    //     }
    //     this.btnFinalSubmit = false;
    // } else if (this.CompomnentTable == null) {
    //     if (this.httpClient.currentLanguage == 'english') {
    //         this.httpClient.showToast(
    //             'Please upload Picture of Component Table'
    //         );
    //     } else {
    //         this.httpClient.showToast('घटक तालिक की तस्वीर अपलोड करें।');
    //     }
    //     this.btnFinalSubmit = false;
    // }
    else {
      if (this.httpClient.isOffline) {
        this.dbService.storage
          .executeSql(
            "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
            [this.data.ApplicationId]
          )
          .then((res) => {
            var temp = JSON.parse(res.rows.item(0).applicationData);
            temp.finalSubmission = {
              obj: {
                usrnm: "rajkisan",
                psw: "rajkisan@123",
                srvnm: "PostVerification",
                srvmethodnm: "FinalSubmissionPostVerification",
                srvparam: JSON.stringify({
                  ApplicationId: this.data.ApplicationId,
                  UserId: self.httpClient.userData.userid,
                  RoleId: self.httpClient.userData.roleid,
                  SubsidySchemeId: this.data.SubsidySchemeId,
                }),
              },
            };
            let data = [JSON.stringify(temp)];
            this.dbService.storage
              .executeSql(
                `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                data
              )
              .then(() => {
                self.successAlertFinalSubmission();
              })
              .catch((e) => {
                this.btnFinalSubmit = false;
                console.log("error " + JSON.stringify(e));
              });
          })
          .catch((e) => {
            this.btnFinalSubmit = false;
            alert("error " + JSON.stringify(e));
          });
      } else {
        self.httpClient.showLoading();
        var sendRequestData = {
          obj: {
            usrnm: "rajkisan",
            psw: "rajkisan@123",
            srvnm: "PostVerification",
            srvmethodnm: "FinalSubmissionPostVerification",
            srvparam: JSON.stringify({
              ApplicationId: this.data.ApplicationId,
              UserId: self.httpClient.userData.userid,
              RoleId: self.httpClient.userData.roleid,
              SubsidySchemeId: this.data.SubsidySchemeId,
            }),
          },
        };

        console.log("sendRequestData", sendRequestData);
        this.httpClient.post(sendRequestData).subscribe(
          function (res: any) {
            self.httpClient.dismissLoading();
            if (res[0].status == 0) {
              console.log(res);
              // self.httpClient.showToast(res[0].message);
              self.successAlertFinalSubmission();
              // self.billArray.push({
              //     BillNo: enteredBillDetails.BillNo,
              //     BillAmount: enteredBillDetails.BillAmount,
              //     BillImg: enteredBillDetails.BillImg,
              //     displayImage: enteredBillDetails.displayImage,
              //     AddStatus: res[0].data[0].AddStatus,
              // });
              // self.calculateTheTotalBillAmount();
            } else {
              this.btnFinalSubmit = false;
              self.httpClient.showToast(res[0].data);
            }
          },
          (error) => {
            self.httpClient.dismissLoading();
            var errorRequestData = {
              obj: {
                usrnm: "rajkisan",
                psw: "rajkisan@123",
                srvresponce: error,
                userid: self.httpClient.userData.userid,
                srvnm: "PostVerification",
                srvmethodnm: "FinalSubmissionPostVerification",
                srvparam: JSON.stringify({
                  ApplicationId: self.data.ApplicationId,
                  UserId: self.httpClient.userData.userid,
                  RoleId: self.httpClient.userData.roleid,
                  SubsidySchemeId: self.data.SubsidySchemeId,
                }),
              },
            };
            this.btnFinalSubmit = false;
            console.log("errorRequestData new", errorRequestData);
            self.httpClient.getErrorMobileLogs(errorRequestData);
            self.httpClient.showToastError();
          }
        );
      }
    }
  }

  async successAlertFinalSubmission() {
    if (this.httpClient.currentLanguage == "english") {
      const alert = await this.alertCtrl.create({
        header: "Alert",
        subHeader: "Successfully Submitted.",
        backdropDismiss: false,
        buttons: [
          {
            text: "Okay",
            handler: () => {
              this.navCtrl.pop();
            },
          },
        ],
      });

      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Alert",
        subHeader: "सफलतापूर्वक जमा किया गया | ",
        backdropDismiss: false,
        buttons: [
          {
            text: "ओके ",
            handler: () => {
              this.navCtrl.pop();
            },
          },
        ],
      });

      await alert.present();
    }
  }

  getGetPVOptionalItemList() {
    if (this.httpClient.isOffline) {
      this.getPVOptionalItemListData = this.data.getPVOptionalItemListData;
    } else {
      var self = this;
      // self.httpClient.showLoading();
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "PostVerification",
          srvmethodnm: "GetPVOptionalItemList",
          srvparam: "{}",
        },
      };
      console.log("GetPVOptionalItemList - ", sendRequestData);

      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          console.log(" GetPVOptionalItemList res", res);
          self.httpClient.dismissLoading();

          if (res[0].status == 0) {
            self.getPVOptionalItemListData = res[0].data;
            console.log(
              "getPVOptionalItemListData ---RS----",
              self.getPVOptionalItemListData
            );
          } else {
            self.showPrompt(res[0].data);
          }
        },
        (error) => {
          // self.httpClient.dismissLoading();
          var errorRequestData = {
            obj: {
              usrnm: "rajkisan",
              psw: "rajkisan@123",
              srvresponce: error,
              userid: self.httpClient.userData.userid,
              srvnm: "PostVerification",
              srvmethodnm: "GetPVOptionalItemList",
              srvparam: "{}",
            },
          };
          console.log("errorRequestData new", errorRequestData);
          self.httpClient.getErrorMobileLogs(errorRequestData);
          self.httpClient.showToastError();
        }
      );
    }
  }

  getCapacitySizeData(optionalItemNameValue) {
    console.log("optionalItemNameValue", optionalItemNameValue);
    this.capacitySizeDataValue = "";
    this.unitCost = "";
    var capacitySizeData = this.getPVOptionalItemListData.filter(
      (x) => x.OptionalItemGroupId == optionalItemNameValue
    );
    console.log("capacitySizeData - ", capacitySizeData);
    this.capacitySizeData = capacitySizeData;
    // for(let i=0;i<capacitySizeData.length;i++) {
    //     this.capacitySizeData.push({
    //         HortiOptionalItemId: capacitySizeData[i].HortiOptionalItemId,
    //         CapacitySize:capacitySizeData[i].CapacitySize,
    //     });
    // }
  }

  getUnitCostValueData(HortiOptionalItemId) {
    console.log("capacitySizeDataValue", HortiOptionalItemId);
    var unitCostData = this.capacitySizeData.filter(
      (x) => x.HortiOptionalItemId == HortiOptionalItemId
    );
    console.log("unitCostData - ", unitCostData);
    this.unitCost = unitCostData[0].UnitCost;
  }

  getOptionalArray() {
    var optionalItemNameValue;
    var capacitySizeDataValue;
    for (let i = 0; i < this.optionalItemName.length; i++) {
      if (
        this.optionalItemNameValue == this.optionalItemName[i].optionalItemId
      ) {
        optionalItemNameValue = this.optionalItemName[i].optionalItemName;
      }
    }

    for (let j = 0; j < this.capacitySizeData.length; j++) {
      if (
        this.capacitySizeDataValue ==
        this.capacitySizeData[j].HortiOptionalItemId
      ) {
        capacitySizeDataValue = this.capacitySizeData[j].CapacitySize;
      }
    }

    this.optionalArray.push({
      optionalItemNameValue: optionalItemNameValue,
      HortiOptionalItemId: this.capacitySizeDataValue,
      capacitySizeDataValue: capacitySizeDataValue,
      unitCost: this.unitCost,
    });
    console.log("optionalArray", this.optionalArray);
  }

  deleteOptional(index) {
    this.optionalArray.splice(index, 1);
    console.log("this.optionalArray in deleteOptional", this.optionalArray);
  }

  test(ev, i) {
    console.log(ev.detail.value);
    this.prevAvailedSubsidyArray[i].Year = new Date(ev.detail.value)
      .getFullYear()
      .toString();
    console.log(this.prevAvailedSubsidyArray[i].Year);
  }

  getLand(i) {
    console.log("landArea", this.prevAvailedSubsidyArray[i].LandArea);
  }

  uploadDoc(i) {
    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            AppName: "capitalinvestment",
            IsDirectUpload: "True",
          },
        };

        if (this.httpClient.isOffline) {
          console.log("Image Offlibe Check", imageData);
          this.dbService.storage
            .executeSql(
              "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
              [this.data.ApplicationId]
            )
            .then((res) => {
              var temp = JSON.parse(res.rows.item(0).applicationData);
              temp.prevAvailedSubsidyArray = [];
              this.prevAvailedSubsidyArray[i].ProofDoc = imageData;
              temp.prevAvailedSubsidyArray = this.prevAvailedSubsidyArray;
              temp.OptionsOfProofDoc = options;

              let data = [JSON.stringify(temp)];
              this.dbService.storage
                .executeSql(
                  `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                  data
                )
                .then((res) => {
                  this.prevAvailedSubsidyArray[i].ProofDoc = imageData;

                  console.log(
                    "getRapidxImagesMasterData Index- Lat Long Check"
                  );
                })
                .catch((e) => {
                  console.log("error " + JSON.stringify(e));
                });
            })
            .catch((e) => {
              alert("Error " + e);
            });
        } else {
          this.showProgressBar();

          FileTransfer.create().onProgress((data) => {
            this.ngZone.run(() => {
              console.log("data.loaded - ", data.loaded);
              console.log("data.total - ", data.total);

              this.uploadPercent = Math.round((data.loaded / data.total) * 100);
              console.log("uploadPercent - ", this.uploadPercent);
              this.setPercentBar(this.uploadPercent);
            });
          });

          FileTransfer.create()
            .upload(imageData, this.httpClient.imageUploadUrl, options)
            .then(
              (data) => {
                this.httpClient.dismissLoading();

                // success
                var temp = JSON.parse(data.response);
                console.log("temp[0].data", temp[0].data);
                this.prevAvailedSubsidyArray[i].ProofDoc = temp[0].data;
                console.log(
                  "oldDocImgUrl prevAvailedSubsidyArray[i].ProofDoc",
                  this.prevAvailedSubsidyArray[i].ProofDoc
                );
              },
              (err) => {
                // error

                this.httpClient.dismissLoading();
                console.log("err", err);
              }
            );
        }
      },
      (err) => {
        // Handle error
        console.log("log 3", err);
      }
    );
  }

  setPercentBar(i) {
    setTimeout(() => {
      let apc = i / 100;
      console.log("apc- ", apc);
      this.p_bar_value = i;
      if (this.p_bar_value > 99) {
        this.hideProgressBar();
        this.p_bar_value = 0;
        this.uploadPercent = 0;
      }
    }, 100 * i);
  }

  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  addRow() {
    console.log("prevAvailedSubsidyArray Before", this.prevAvailedSubsidyArray);

    this.prevAvailedSubsidyArray.push({
      ApplicationId: this.data.ApplicationId,
      SubsidyId: "",
      Year: "",
      LandArea: "",
      Amount: "",
      ProofDoc: "",
      IsDeductSubsidy: false,
    });
    console.log("prevAvailedSubsidyArray after", this.prevAvailedSubsidyArray);
  }

  deleteRow(index) {
    this.prevAvailedSubsidyArray.splice(index, 1);
  }
  pickImage(sourceType, param, columnName) {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetWidth: 1500,
      targetHeight: 2000,
      sourceType: sourceType,
    };
    console.log(options);

    this.camera.getPicture(options).then(
      (imageData) => {
        let optionsCam: FileUploadOptions = {
          fileKey: "files",
          params: {
            id: this.postVerificationId,
            AppName: "PVapp",
            tableName: "FP_PostVerification",
            columnName: columnName,
            uniqueidcolumnname: "FP_PostVerificationId",
            IsDirectUpload: "False",
          },
        };
        console.log(optionsCam.params);

        if (this.httpClient.isOffline) {
          this.dbService.storage
            .executeSql(
              "SELECT * FROM postVerificationOfflineOfOnionStorage WHERE ApplicationId = ?",
              [this.data.ApplicationId]
            )
            .then((res) => {
              var temp = JSON.parse(res.rows.item(0).applicationData);

              temp.ImgTriPartyAgreement = imageData;
              temp.optionOfImgTriPartyAgreement = optionsCam;

              let data = [JSON.stringify(temp)];
              this.dbService.storage
                .executeSql(
                  `UPDATE postVerificationOfflineOfOnionStorage SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`,
                  data
                )
                .then(() => {
                  this.ImgTriPartyAgreement = imageData;
                })
                .catch((e) => {
                  console.log("error " + JSON.stringify(e));
                });
            })
            .catch((e) => {
              alert("error " + JSON.stringify(e));
            });
        } else {
          this.httpClient.showLoading();

          FileTransfer.create()
            .upload(imageData, this.httpClient.imageUploadUrl, optionsCam)
            .then(
              (data) => {
                this.httpClient.dismissLoading();
                var temp = JSON.parse(data.response);
                console.log("temp[0].data", temp[0].data);
                if (temp[0].data[0].URL) {
                  this.ImgTriPartyAgreement = temp[0].data;
                } else {
                  this.httpClient.showToastError();
                }
              },
              (err) => {
                this.httpClient.dismissLoading();
                console.log("err", err);
              }
            );
        }
      },
      (err) => {
        console.log("log 3", err);
      }
    );
  }

  async selectImage(param, columnName) {
    if (this.httpClient.currentLanguage == "hindi") {
      const actionSheet = await this.actionSheetController.create({
        header: "छवि स्रोत का चयन करें",
        buttons: [
          {
            text: "गैलरी का प्रयोग करें",
            handler: () => {
              this.pickImage(
                this.camera.PictureSourceType.PHOTOLIBRARY,
                param,
                columnName
              );
            },
          },
          {
            text: "कैमरा का प्रयोग करें",
            handler: () => {
              this.pickImage(
                this.camera.PictureSourceType.CAMERA,
                param,
                columnName
              );
            },
          },
          {
            text: "रद्द करें",
            role: "cancel",
          },
        ],
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [
          {
            text: "Use Gallery",
            handler: () => {
              this.pickImage(
                this.camera.PictureSourceType.PHOTOLIBRARY,
                param,
                columnName
              );
            },
          },
          {
            text: "Use Camera",
            handler: () => {
              this.pickImage(
                this.camera.PictureSourceType.CAMERA,
                param,
                columnName
              );
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
  }
}
