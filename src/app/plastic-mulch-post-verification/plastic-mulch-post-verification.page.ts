import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { HortiApplicationBillModelPage } from '../ManufacturerDealerFolder/horti-application-bill-model/horti-application-bill-model.page';
import { CommonService } from '../services/common.service';
import { DatabaseServiceService } from '../services/database-service.service';

@Component({
    selector: 'app-plastic-mulch-post-verification',
    templateUrl: './plastic-mulch-post-verification.page.html',
    styleUrls: ['./plastic-mulch-post-verification.page.scss'],
})
export class PlasticMulchPostVerificationPage implements OnInit {

    data: any;
    basicDataSubmitFlag = true;
    getHorticultureManufactureData: any = [];
    IsFarmerAcceptance: any = 'Yes';
    getVerificationCheckData: any = [];
    multiUserArray: any = [];
    prevAvailedSubsidyArray: any = [];
    landAreaList: any = [];
    brandData: any = [];
    imgSourceOfIrrigation: any;
    imgSourceOfIrrigationDateTime: any;
    imgSprinklerWithFarmer: any;
    imgSprinklerWithFarmeDateTime: any;
    sourceOfIrrigationLatitude: any;
    sourceOfIrrigationLongitude: any;
    sprinklerWithFarmerLatitude: any;
    sprinklerWithFarmerLongitude: any;
    billandPhotoFlag = false;
    postVerificationId: any;

    imgOfConsentLetter: any;
    selectedShareProvided = -1;
    ImgFarmerWithOfficer: any;
    ImgFarmerWithOfficer2: any;
    ImgSubsidyInstalledPlaceFarmerWithOfficer1: any;
    ImgSubsidyInstalledPlaceFarmerWithOfficer2: any;
    ImgSubsidyComponentFarmerWithOfficer1: any;
    ImgSubsidyComponentFarmerWithOfficer2: any;
    ImgInsuranceCertificateCopy: any;
    ImgFarmerSatisfactionConsentLetter: any;
    ImgPVChecklistDocument: any;
    ImgDripBrandName1: any;
    ImgDripBrandName2: any;
    ImgWarrantyCard: any;
    ImgTriPartyAgreement: any;
    billArray: any = [];
    // selectedLandArea:any;
    checkListClose = false;

    toggleCheckList() {
        this.checkListClose = !this.checkListClose;
    }

    ChecklistDetailList: any = [];
    remarks: any = '';

    khasaraFlag = true;
    fileTransfer: any;

    toggleKhasara() {
        console.log('test');
        this.khasaraFlag = !this.khasaraFlag;
    }

    btnAddSprinkler: boolean = false;
    manufacturerValue: any;
    selectedAccountOf: any;
    selectedKhasaraNumber: any;
    photoFarmerApprovalCertificate: any;
    photoFarmerApprovalCertificateDateTime: any;
    noCaseDateOfImgFarmer: any;
    noCaseDateOfImgLetter: any;
    lat: any;
    lng: any;
    photoFarmerWithOfficer: any;
    photoFarmerWithOfficerDateTime: any;
    isFarmerAcceptanceRemark: any = '';
    btnSubmitNoForm: boolean = false;
    btnFinalSubmit: boolean = false;
    totalAmountOfBill: any;
    latitude: any;
    longitude: any;
    CompomnentTable: any;
    uploadPhotosClose = false;
    uploadBillsClose = false;
    togglePhotos() {
        this.uploadPhotosClose = !this.uploadPhotosClose;
    }

    toggleBill() {
        this.uploadBillsClose = !this.uploadBillsClose;
    }
    cropName: any;
    fetchedCropName: any;
    addMoreCrops: boolean = false;

    constructor(public route: ActivatedRoute,
        public httpClient: CommonService,
        public alertCtrl: AlertController,
        public dbService: DatabaseServiceService,
        public camera: Camera,

        public file: File,
        public navCtrl: NavController,
        public geolocation: Geolocation,
        public modalController: ModalController,
        public actionSheetController: ActionSheetController) {

        this.geolocation
            .getCurrentPosition()
            .then((resp) => {
                this.latitude = this.lat = resp.coords.latitude;
                this.longitude = this.lng = resp.coords.longitude;
            })
            .catch((error) => {
                console.log("Error getting location", error);
            });
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.fetchedCropName = this.data.CropName;
        console.log('this.data drip post verification rs', this.data);
        if (!this.httpClient.isOffline) {
            this.brandData = JSON.parse(this.route.snapshot.paramMap.get('brandData'));
            if (parseInt(this.data.PostVerificationId) > 0) {
                this.basicDataSubmitFlag = false;
                this.billandPhotoFlag = true;
                this.postVerificationId = this.data.PostVerificationId;
                if (this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer1 != '') {
                    this.ImgSubsidyInstalledPlaceFarmerWithOfficer1 = this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer1;
                }
                if (this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer2 != '') {
                    this.ImgSubsidyInstalledPlaceFarmerWithOfficer2 = this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer2;
                }
                if (this.data.ImgSubsidyComponentFarmerWithOfficer1 != '') {
                    this.ImgSubsidyComponentFarmerWithOfficer1 = this.data.ImgSubsidyComponentFarmerWithOfficer1;
                }
                if (this.data.ImgFarmerWithOfficer != '') {
                    this.ImgFarmerWithOfficer = this.data.ImgFarmerWithOfficer;
                }
                if (this.data.ImgFarmerWithOfficer2 != '') {
                    this.ImgFarmerWithOfficer2 = this.data.ImgFarmerWithOfficer2;
                }
                if (this.data.ImgSubsidyComponentFarmerWithOfficer2 != '') {
                    this.ImgSubsidyComponentFarmerWithOfficer2 = this.data.ImgSubsidyComponentFarmerWithOfficer2;
                }
                if (this.data.ImgInsuranceCertificateCopy != '') {
                    this.ImgInsuranceCertificateCopy = this.data.ImgInsuranceCertificateCopy;
                }
                if (this.data.ImgFarmerSatisfactionConsentLetter != '') {
                    this.ImgFarmerSatisfactionConsentLetter = this.data.ImgFarmerSatisfactionConsentLetter;
                }
                if (this.ImgPVChecklistDocument != '') {
                    this.ImgPVChecklistDocument = this.data.ImgPVChecklistDocument;
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
                if (this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer1) {
                    this.ImgSubsidyInstalledPlaceFarmerWithOfficer1 = this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer1;
                }
                if (this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer2) {
                    this.ImgSubsidyInstalledPlaceFarmerWithOfficer2 = this.data.ImgSubsidyInstalledPlaceFarmerWithOfficer2;
                }
                if (this.data.ImgSubsidyComponentFarmerWithOfficer1) {
                    this.ImgSubsidyComponentFarmerWithOfficer1 = this.data.ImgSubsidyComponentFarmerWithOfficer1;
                }
                if (this.data.ImgSubsidyComponentFarmerWithOfficer2) {
                    this.ImgSubsidyComponentFarmerWithOfficer2 = this.data.ImgSubsidyComponentFarmerWithOfficer2;
                }
                if (this.data.ImgInsuranceCertificateCopy) {
                    this.ImgInsuranceCertificateCopy = this.data.ImgInsuranceCertificateCopy;
                }
                if (this.data.ImgFarmerSatisfactionConsentLetter) {
                    this.ImgFarmerSatisfactionConsentLetter = this.data.ImgFarmerSatisfactionConsentLetter;
                }
                if (this.data.ImgPVChecklistDocument) {
                    this.ImgPVChecklistDocument = this.data.ImgPVChecklistDocument;
                }
                if (this.data.billDetails) {
                    this.billArray = this.data.billDetails;
                }
                // 
            }
        }
        this.getHorticultureManufactureListData();
        this.getLandAreaListData();
        this.getVerificationChecklistData(this.data.ApplicationId);
    }

    ngOnInit() {
    }

    getBills() {
        var self = this;
        // self.httpClient.showLoading();
        var sendRequestData = {
            obj: {
                usrnm: 'rajkisan',
                psw: 'rajkisan@123',
                srvnm: 'PostVerification',
                srvmethodnm: 'GetPostVerificationBillDetails',
                srvparam: JSON.stringify({
                    ApplicationId: this.data.ApplicationId,
                    SubsidySchemeId: this.data.SubsidySchemeId,
                }),
            },
        };
        this.httpClient.post(sendRequestData).subscribe(
            function (res: any) {
                console.log('res', res);
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
                    'obj': {
                        'usrnm': 'rajkisan',
                        'psw': 'rajkisan@123',
                        srvresponce: error,
                        userid: self.httpClient.userData.userid,
                        srvnm: 'PostVerification',
                        srvmethodnm: 'GetPostVerificationBillDetails',
                        srvparam: JSON.stringify({
                            ApplicationId: self.data.ApplicationId,
                            SubsidySchemeId: self.data.SubsidySchemeId,
                        }),
                    }
                };
                console.log('errorRequestData new', errorRequestData);
                self.httpClient.getErrorMobileLogs(errorRequestData);
                self.httpClient.showToastError();
            }
        );
    }

    calculateTheTotalBillAmount() {
        this.totalAmountOfBill = 0;
        for (var i = 0; i < this.billArray.length; i++) {
            this.totalAmountOfBill =
                this.totalAmountOfBill + parseInt(this.billArray[i].BillAmount);
        }
    }

    getLandAreaListData() {
        if (this.httpClient.isOffline) {
            this.landAreaList = this.data.landAreaList;
        } else {
            var self = this;
            self.httpClient.showLoadingImage();
            var sendRequestData = {
                obj: {
                    usrnm: 'rajkisan',
                    psw: 'rajkisan@123',
                    srvnm: 'HortiSubsidy',
                    srvmethodnm: 'HortiLandAreaByApplicationId',
                    srvparam: JSON.stringify({
                        SubsidySchemeId: this.data.SubsidySchemeId,
                        ApplicationId: this.data.ApplicationId
                    }),
                },
            };
            console.log('Land Area Data - ', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(
                function (res: any) {
                    console.log('Land Area Data res', res);
                    self.httpClient.dismissLoadingImage();

                    if (res[0].status == 0) {
                        self.landAreaList = res[0].data;
                    } else {
                        self.showPrompt(res[0].data);
                    }
                },
                (error) => {
                    // self.httpClient.dismissLoading();
                    var errorRequestData = {
                        'obj': {
                            usrnm: 'rajkisan',
                            psw: 'rajkisan@123',
                            srvnm: 'HortiSubsidy',
                            srvmethodnm: 'HortiLandAreaBySubsidyId',
                            srvparam: JSON.stringify({
                                SubsidySchemeId: this.data.SubsidySchemeId
                            }),
                        }
                    };
                    console.log('errorRequestData new', errorRequestData);
                    self.httpClient.getErrorMobileLogs(errorRequestData);
                    self.httpClient.showToastError();
                }
            );
        }
    }

    getVerificationChecklistData(hortiSubsidyApplicationId) {
        if (this.httpClient.isOffline) {
            this.getVerificationCheckData = this.data.getVerificationCheckData;
        } else {
            var self = this;
            self.httpClient.showLoadingImage();
            var sendRequestData = {
                obj: {
                    usrnm: 'rajkisan',
                    psw: 'rajkisan@123',
                    srvnm: 'PostVerification',
                    srvmethodnm: 'VerificationChecklist',
                    srvparam: JSON.stringify({
                        schemeid: this.data.SubsidySchemeId,
                        StepName: 'Post Verification',
                        ApplicationId: this.data.ApplicationId,
                    }),
                },
            };
            console.log('VerificationChecklistt - ', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(
                function (res: any) {
                    console.log(' VerificationChecklist res', res);
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
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': 'rajkisan@123',
                            srvresponce: error,
                            userid: self.httpClient.userData.userid,
                            srvnm: 'PostVerification',
                            srvmethodnm: 'VerificationChecklist',
                            srvparam: JSON.stringify({
                                schemeid: self.data.SubsidySchemeId,
                                StepName: 'Post Verification',
                                ApplicationId: self.data.ApplicationId,
                            }),
                        }
                    };
                    console.log('errorRequestData new', errorRequestData);
                    self.httpClient.getErrorMobileLogs(errorRequestData);
                    self.httpClient.showToastError();
                }
            );
        }
    }

    getHorticultureManufactureListData() {
        if (this.httpClient.isOffline) {
            this.getHorticultureManufactureData = this.data.getHorticultureManufactureData;
        } else {
            var self = this;
            self.httpClient.showLoadingImage();
            var sendRequestData = {
                obj: {
                    usrnm: 'rajkisan',
                    psw: 'rajkisan@123',
                    srvnm: 'PostVerification',
                    srvmethodnm: 'GetHorticultureManufactureList',
                    srvparam: JSON.stringify({
                        SubsidySchemeId: this.data.SubsidySchemeId,
                    }),
                },
            };
            console.log('HorticultureManufactureList - ', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(
                function (res: any) {
                    console.log(' HorticultureManufactureList res', res);
                    self.httpClient.dismissLoadingImage();

                    if (res[0].status == 0) {
                        self.getHorticultureManufactureData = res[0].data;
                    } else {
                        self.showPrompt(res[0].data);
                    }
                },
                (error) => {
                    // self.httpClient.dismissLoading();
                    var errorRequestData = {
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': 'rajkisan@123',
                            srvresponce: error,
                            userid: self.httpClient.userData.userid,
                            srvnm: 'PostVerification',
                            srvmethodnm: 'GetHorticultureManufactureList',
                            srvparam: JSON.stringify({
                                SubsidySchemeId: this.data.SubsidySchemeId,
                            }),
                        }
                    };
                    console.log('errorRequestData new', errorRequestData);
                    self.httpClient.getErrorMobileLogs(errorRequestData);
                    self.httpClient.showToastError();
                }
            );
        }

    }

    async showPrompt(msg) {
        if (this.httpClient.currentLanguage == 'hindi') {
            const prompt = await this.alertCtrl.create({
                header: 'अलर्ट!',
                message: msg,
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'ठीक है',
                        handler: (data) => {
                            console.log('Ok clicked');
                            // this.navCtrl.pop();
                        },
                    },
                ],
            });
            await prompt.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Alert!',
                message: msg,
                backdropDismiss: false,

                buttons: [
                    {
                        text: 'OK',
                        handler: (data) => {
                            console.log('Ok clicked');
                            // this.navCtrl.pop();
                        },
                    },
                ],
            });
            await alert.present();
        }
    }

    getMenuPrototype(value) {

    }

    checkedCheck(i, isSelectedCheck) {
        for (var j = 0; j < this.ChecklistDetailList.length; j++) {
            if (this.ChecklistDetailList[j].ChecklistId == this.getVerificationCheckData[i].Id) {
                this.ChecklistDetailList.splice(j, 1);
            }
            this.getVerificationCheckData[i].isSelectedClose = false;
        }
        if (isSelectedCheck == false) {
            this.ChecklistDetailList.push({
                ChecklistId: this.getVerificationCheckData[i].Id,
                IsChecked: !isSelectedCheck,
                Remarks: '',
            });
            console.log(this.ChecklistDetailList);
        } else if (isSelectedCheck == true) {
            for (var l = 0; l < this.ChecklistDetailList.length; l++) {
                if (this.ChecklistDetailList[l].ChecklistId == this.getVerificationCheckData[i].Id) {
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
        console.log('isSelectedClose', isSelectedClose);
        if (isSelectedClose == false) {
            const prompt = await this.alertCtrl.create({
                header: 'Remarks',
                backdropDismiss: false,
                inputs: [
                    {
                        placeholder: 'remarks',
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: (data) => {
                            console.log('Cancel clicked');
                            this.getVerificationCheckData[i].isSelectedClose = false;
                            this.checkAvailSubsidy(i);

                        },
                    },
                    {
                        text: 'Save',
                        handler: (data) => {
                            this.remarks = data[0];
                            console.log('Saved clicked', this.remarks);
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

        this.getVerificationCheckData[i].isSelectedClose = !this.getVerificationCheckData[i].isSelectedClose;
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
                console.log('prevAvailedSubsidyArray', this.prevAvailedSubsidyArray);
            }
            else {
                // this.availSubsidyFlag = false;
                this.prevAvailedSubsidyArray = [];

            }
        }
        else {
            // this.availSubsidyFlag = false;
            this.prevAvailedSubsidyArray = [];

        }
        console.log("this.ChecklistDetailList rv", this.ChecklistDetailList, i);

    }

    takePhotoDirect() {
        this.camera.getPicture(this.httpClient.options).then(
            (imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                // this.billDetails.BillImg = imageData;

                // Upload Bill Details
                let options: FileUploadOptions = {
                    fileKey: 'files',
                    params: {
                        AppName: 'PVapp',
                        IsDirectUpload: 'True',
                    },
                };
                console.log('options.params', options.params);
                if (this.httpClient.isOffline) {
                    this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                        [this.data.ApplicationId]).then((res) => {
                            var temp = JSON.parse(res.rows.item(0).applicationData);
                            temp.imgOfConsentLetter = imageData;
                            temp.optionsOfimgOfConsentLetter = options;
                            let data = [JSON.stringify(temp)];
                            this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                                .then(() => {
                                    this.imgOfConsentLetter = imageData;
                                })
                                .catch((e) => {
                                    console.log('error ' + JSON.stringify(e));
                                });

                        })
                        .catch((e) => {
                            alert('error ' + JSON.stringify(e));
                        });
                } else {
                    this.httpClient.showLoading();
                    FileTransfer.create()
                        .upload(imageData, this.httpClient.imageUploadUrl, options)
                        .then(
                            (data) => {
                                console.log('data', data);
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

    ionViewWillEnter() {
        console.log("ionViewWillEnter AaoVerificationPage");
        this.getLoc();
    }
    getLoc() {
        this.geolocation
            .getCurrentPosition({ timeout: 30000, enableHighAccuracy: true })
            .then((resp) => {
                this.latitude = this.lat = resp.coords.latitude;
                this.longitude = this.lng = resp.coords.longitude;
                // this.isLocation = true;
            })
            .catch((error) => {
                // this.isLocation = true;
                console.log("error", error);
                /* if (this.httpClient.currentLanguage == "english") {
                     this.httpClient.showToast(
                         "You will have to enable the location or GPS permission for this app."
                     );
                 } else {
                     this.httpClient.showToast(
                         "आपको इस ऐप के लिए लोकेशन और GPS की अनुमति को सक्षम करना होगा।"
                     );
                 }*/
            });
    }

    getAddSprinklerPostVerification() {
        this.btnAddSprinkler = true;
        var test = this.prevAvailedSubsidyArray.filter((x) => x.SubsidyId == "");
        var test2 = this.prevAvailedSubsidyArray.filter((x) => x.Year == "");
        var test3 = this.prevAvailedSubsidyArray.filter((x) => x.LandArea == "");
        var test4 = this.prevAvailedSubsidyArray.filter((x) => x.Amount == "");
        var test5 = this.prevAvailedSubsidyArray.filter((x) => x.ProofDoc == "");


        console.log('PrevAvailedSubsidyArray', this.prevAvailedSubsidyArray);
        var checkArray = [];
        checkArray = this.prevAvailedSubsidyArray.filter((x) => x.IsDeductSubsidy == true)
        console.log(checkArray);

        var self = this;
        if (this.longitude == null || this.longitude == null || this.longitude == null) {
            this.getLoc();
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
            this.btnAddSprinkler = false;
        }
        else if (this.latitude == null || this.latitude == null || this.latitude == null) {
            this.getLoc();
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
            this.btnAddSprinkler = false;
        }

        else if (this.manufacturerValue == null) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast('कृपया निर्माता का चयन करें');
            } else {
                this.httpClient.showToast('Please select the manufacturer');
            }
            this.btnAddSprinkler = false;
        } else if (this.selectedAccountOf == null) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast(
                    'कृपया सब्सिडी किसके खाते में जाएगी का चयन करें'
                );
            } else {
                this.httpClient.showToast(
                    'Please select in whose account will the subsidy transfer'
                );
            }
            this.btnAddSprinkler = false;
        } else if (
            this.selectedAccountOf == '1' &&
            this.selectedShareProvided == -1
        ) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast(
                    'कृपया किसान शेयर उपलब्ध कराया गया है का चयन करें'
                );
            } else {
                this.httpClient.showToast(
                    'Please select whether farmer is share is provided'
                );
            }
            this.btnAddSprinkler = false;
        } else if (
            this.selectedAccountOf == '1' &&
            this.imgOfConsentLetter == null
        ) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast('कृपया सहमति पत्र अपलोड करें');
            } else {
                this.httpClient.showToast('Please upload the consent letter');
            }
            this.btnAddSprinkler = false;
        } else if (
            this.getVerificationCheckData.length != self.ChecklistDetailList.length
        ) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast('कृपया चेकलिस्ट को पूरा करें');
            } else {
                this.httpClient.showToast('Please complete the checklist');
            }
            this.btnAddSprinkler = false;
        }


        else if (
            test.length > 0 ||
            test2.length > 0 ||
            test3.length > 0 ||
            test4.length > 0 ||
            test5.length > 0
        ) {
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast("कृपया पहले प्राप्त सब्सिडी विवरण को पूरा करें");
            } else {
                this.httpClient.showToast("Please Complete Previous Availed Subsidy Detail");
            }
            this.btnAddSprinkler = false;

        }

        else {
            if (this.httpClient.isOffline) {
                this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                    [this.data.ApplicationId]).then((res) => {
                        var temp = JSON.parse(res.rows.item(0).applicationData);
                        temp.basicDataSubmission = {
                            IsFarmerAcceptance: this.IsFarmerAcceptance,
                            ApplicationId: this.data.ApplicationId,
                            latitude: this.latitude,
                            longitude: this.longitude,
                            ChecklistDetailList: self.ChecklistDetailList,
                            SprinklerComponentinfo: [],
                            UserId: self.httpClient.userData.userid,
                            Step: '1',
                            RoleId: self.httpClient.userData.roleid,
                            SubsidySchemeId: self.data.SubsidySchemeId,
                            AppVersion: self.httpClient.currentAppVersion,
                            IsOnline_Offline: '1',
                            mobilToVerify: '1',
                            KhasraNo: this.selectedKhasaraNumber,
                            ImgConsentLetter: this.imgOfConsentLetter,
                            ImgConsentLetterDateTime: new Date(),
                            BrandId: this.manufacturerValue,
                            dealerid: 0,
                            manufactureid: this.manufacturerValue,
                            SubsidyOnAccount: this.selectedAccountOf,
                            IsfarmerShare: this.selectedShareProvided,
                            HectareModel: this.cropName,
                            optionalArray: [],
                            PrevAvailedSubsidyArray: this.prevAvailedSubsidyArray,
                        };
                        let data = [JSON.stringify(temp)];
                        this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                            .then(() => {
                                self.basicDataSubmitFlag = false;
                                self.billandPhotoFlag = true;
                                self.httpClient.showToast('Basic data is save now upload the required photos and bills');


                            })
                            .catch((e) => {
                                this.btnAddSprinkler = false;
                                console.log('error ' + JSON.stringify(e));
                            });

                    })
                    .catch((e) => {
                        this.btnAddSprinkler = false;
                        alert('error ' + JSON.stringify(e));
                    });
            } else {
                self.httpClient.showLoading();
                var sendRequestData = {
                    obj: {
                        usrnm: 'rajkisan',
                        psw: 'rajkisan@123',
                        srvnm: 'PostVerification',
                        srvmethodnm: 'AddDripIrrigationPostVerification',
                        srvparam: JSON.stringify({
                            IsFarmerAcceptance: 'Yes',
                            ApplicationId: this.data.ApplicationId,
                            latitude: this.latitude,
                            longitude: this.longitude,
                            ChecklistDetailList: self.ChecklistDetailList,
                            SprinklerComponentinfo: [],
                            UserId: self.httpClient.userData.userid,
                            Step: '1',
                            RoleId: self.httpClient.userData.roleid,
                            SubsidySchemeId: self.data.SubsidySchemeId,
                            AppVersion: self.httpClient.currentAppVersion,
                            IsOnline_Offline: '1',
                            mobilToVerify: '1',
                            KhasraNo: this.selectedKhasaraNumber,
                            ImgConsentLetter: this.imgOfConsentLetter,
                            ImgConsentLetterDateTime: new Date(),
                            BrandId: this.manufacturerValue,
                            dealerid: 0,
                            manufactureid: this.manufacturerValue,
                            SubsidyOnAccount: this.selectedAccountOf,
                            IsfarmerShare: this.selectedShareProvided,
                            HectareModel: this.cropName,
                            optionalArray: [],
                            PrevAvailedSubsidyArray: this.prevAvailedSubsidyArray,
                        }),
                    },
                };
                console.log('AddSprinklerPostVerification - ', sendRequestData);
                this.httpClient.post(sendRequestData).subscribe(
                    function (res: any) {
                        console.log(' AddSprinklerPostVerification res', res);
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
                            'obj': {
                                'usrnm': 'rajkisan',
                                'psw': 'rajkisan@123',
                                srvresponce: error,
                                userid: self.httpClient.userData.userid,
                                srvnm: 'PostVerification',
                                srvmethodnm: 'AddDripIrrigationPostVerification',
                                srvparam: JSON.stringify({
                                    IsFarmerAcceptance: 'Yes',
                                    ApplicationId: self.data.ApplicationId,
                                    latitude: self.latitude,
                                    longitude: self.longitude,
                                    ChecklistDetailList: self.ChecklistDetailList,
                                    SprinklerComponentinfo: [],
                                    UserId: self.httpClient.userData.userid,
                                    Step: '1',
                                    RoleId: self.httpClient.userData.roleid,
                                    SubsidySchemeId: self.data.SubsidySchemeId,
                                    AppVersion: self.httpClient.currentAppVersion,
                                    IsOnline_Offline: '1',
                                    mobilToVerify: '1',
                                    KhasraNo: self.selectedKhasaraNumber,
                                    ImgConsentLetter: self.imgOfConsentLetter,
                                    ImgConsentLetterDateTime: new Date(),
                                    BrandId: self.manufacturerValue,
                                    dealerid: 0,
                                    manufactureid: self.manufacturerValue,
                                    SubsidyOnAccount: self.selectedAccountOf,
                                    IsfarmerShare: self.selectedShareProvided,
                                    HectareModel: this.cropName,
                                    optionalArray: [],
                                    PrevAvailedSubsidyArray: self.prevAvailedSubsidyArray,
                                }),
                            }
                        };
                        this.btnAddSprinkler = false;
                        console.log('errorRequestData new', errorRequestData);
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
                    this.dbService.storage.executeSql("SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?", [this.data.ApplicationId]).then((res) => {
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
                        this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch
          SET applicationData = '${JSON.stringify(data)}'
          WHERE ApplicationId = '${this.data.ApplicationId}'
        `, []
                        ).then(() => {

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
                    FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, options).then((data) => {
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
        console.log('isFarmerAcceptanceRemark', this.isFarmerAcceptanceRemark);
        console.log('photoFarmerApprovalCertificate', this.photoFarmerApprovalCertificate);
        console.log('noCaseDateOfImgLetter', this.noCaseDateOfImgLetter);
        console.log('photoFarmerWithOfficer', this.photoFarmerWithOfficer);
        console.log('noCaseDateOfImgFarmer', this.noCaseDateOfImgFarmer);
        if (this.longitude == null || this.longitude == null || this.longitude == null) {
            this.getLoc();
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
            this.btnSubmitNoForm = false;
        }
        else if (this.latitude == null || this.latitude == null || this.latitude == null) {
            this.getLoc();
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
            this.btnSubmitNoForm = false;
        }
        else if (this.photoFarmerWithOfficer == null) {
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
                        latitude: this.latitude,
                        longitude: this.longitude,
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
                    latitude: this.latitude,
                    longitude: this.longitude,
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
                this.dbService.storage.executeSql("SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?", [this.data.ApplicationId]).then((res) => {
                    var temp = JSON.parse(res.rows.item(0).applicationData);

                    temp.finalSubmission = noDataOffline;

                    console.log("temp", temp);
                    let data = [JSON.stringify(temp)];
                    this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
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
                            'obj': {
                                'usrnm': 'rajkisan',
                                'psw': 'rajkisan@123',
                                srvresponce: error,
                                userid: self.httpClient.userData.userid,
                                srvnm: "PostVerification",
                                srvmethodnm: "AddDripIrrigationPostVerification",
                                srvparam: JSON.stringify({
                                    ApplicationId: self.data.ApplicationId,
                                    userid: self.httpClient.userData.userid,
                                    WaterStorageType: "0",
                                    SubsidySchemeId: self.data.SubsidySchemeId,
                                    latitude: self.latitude,
                                    longitude: self.longitude,
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
                            }
                        };
                        this.btnSubmitNoForm = false;
                        console.log('errorRequestData new', errorRequestData);
                        self.httpClient.getErrorMobileLogs(errorRequestData);
                        self.httpClient.showToastError();
                    }
                );
            }
        }
    }

    async successAlertFinalSubmission() {
        if (this.httpClient.currentLanguage == 'english') {
            const alert = await this.alertCtrl.create({
                header: 'Alert',
                subHeader: 'Successfully Submitted.',
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                            this.navCtrl.pop();
                        },
                    },
                ],
            });

            await alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Alert',
                subHeader: 'सफलतापूर्वक जमा किया गया | ',
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'ओके ',
                        handler: () => {
                            this.navCtrl.pop();
                        },
                    },
                ],
            });

            await alert.present();
        }
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

    deleteBill(index) {
        if (this.httpClient.isOffline) {
            this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                [this.data.ApplicationId]).then((res) => {
                    var temp = JSON.parse(res.rows.item(0).applicationData);

                    console.log('temp', temp);
                    temp.billDetails.splice(index, 1);
                    console.log('temp', temp);
                    let data = [JSON.stringify(temp)];
                    this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                        .then(() => {
                            this.billArray.splice(index, 1);
                            this.calculateTheTotalBillAmount();
                        })
                        .catch((e) => {

                            console.log('error ' + JSON.stringify(e));
                        });

                })
                .catch((e) => {
                    alert('error ' + JSON.stringify(e));
                });
        } else {
            var self = this;
            var sendRequestData = {
                obj: {
                    usrnm: 'rajkisan',
                    psw: 'rajkisan@123',
                    srvnm: 'PostVerification',
                    srvmethodnm: 'DeleteBillDetails',
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
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': 'rajkisan@123',
                            srvresponce: error,
                            userid: self.httpClient.userData.userid,
                            srvnm: 'PostVerification',
                            srvmethodnm: 'DeleteBillDetails',
                            srvparam: JSON.stringify({
                                PostVerificationBillsId: self.billArray[index]
                                    .PostVerificationBillsId,
                            }),
                        }
                    };
                    console.log('errorRequestData new', errorRequestData);
                    self.httpClient.getErrorMobileLogs(errorRequestData);
                    self.httpClient.showToastError();
                }
            );
        }
    }

    uploadBillDetails(enteredBillDetails) {
        if (this.httpClient.isOffline) {
            this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                [this.data.ApplicationId]).then((res) => {
                    var temp = JSON.parse(res.rows.item(0).applicationData);
                    if (!temp.billDetails) {
                        temp.billDetails = [];
                    }
                    console.log('temp', temp);
                    temp.billDetails.push(enteredBillDetails);
                    console.log('temp', temp);
                    let data = [JSON.stringify(temp)];
                    this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                        .then(() => {
                            this.billArray.push({
                                BillNo: enteredBillDetails.BillNo,
                                BillAmount: enteredBillDetails.BillAmount,
                                BillImg: enteredBillDetails.BillImg,
                                displayImage: enteredBillDetails.displayImage
                            });
                            this.calculateTheTotalBillAmount();
                        })
                        .catch((e) => {

                            console.log('error ' + JSON.stringify(e));
                        });

                })
                .catch((e) => {
                    alert('error ' + JSON.stringify(e));
                });
        } else {
            var self = this;
            self.httpClient.showLoading();
            console.log('enteredBillDetails', enteredBillDetails);
            var sendRequestData = {
                obj: {
                    usrnm: 'rajkisan',
                    psw: 'rajkisan@123',
                    srvnm: 'PostVerification',
                    srvmethodnm: 'AddPostVerificationBillOneByOne',
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
            console.log('sendRequestData', sendRequestData);
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
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': 'rajkisan@123',
                            srvresponce: error,
                            userid: self.httpClient.userData.userid,
                            srvnm: 'PostVerification',
                            srvmethodnm: 'AddPostVerificationBillOneByOne',
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
                        }
                    };
                    console.log('errorRequestData new', errorRequestData);
                    self.httpClient.getErrorMobileLogs(errorRequestData);
                    self.httpClient.showToastError();
                }
            );
        }
    }

    takePhoto(param, columnName) {
        var self = this;

        this.camera.getPicture(this.httpClient.options).then(
            (imageData) => {
                let options: FileUploadOptions = {
                    fileKey: 'files',
                    params: {
                        id: this.postVerificationId,
                        AppName: 'PVapp',
                        tableName: 'FP_PostVerification',
                        columnName: columnName,
                        uniqueidcolumnname: 'FP_PostVerificationId',
                        IsDirectUpload: 'False',
                    },
                };
                console.log(options.params);
                if (this.httpClient.isOffline) {
                    this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                        [this.data.ApplicationId]).then((res) => {
                            var temp = JSON.parse(res.rows.item(0).applicationData);
                            if (param == 0) {
                                temp.ImgFarmerWithOfficer = imageData;
                                temp.optionOfImgFarmerWithOfficer = options;
                            } else if (param == 1) {
                                temp.ImgFarmerWithOfficer2 = imageData;
                                temp.optionOfImgFarmerWithOfficer2 = options;
                            } else if (param == 2) {
                                temp.ImgSubsidyInstalledPlaceFarmerWithOfficer1 = imageData;
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
                            this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
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
                                    console.log('error ' + JSON.stringify(e));
                                });

                        })
                        .catch((e) => {
                            alert('error ' + JSON.stringify(e));
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
                                console.log('temp[0].data', temp[0].data);
                                if (temp[0].data[0].URL) {
                                    if (param == 0) {
                                        this.ImgFarmerWithOfficer = temp[0].data;
                                    } else if (param == 1) {
                                        this.ImgFarmerWithOfficer2 = temp[0].data;
                                    } else if (param == 2) {
                                        this.ImgSubsidyInstalledPlaceFarmerWithOfficer1 = temp[0].data;
                                    } else if (param == 3) {
                                        this.ImgSubsidyInstalledPlaceFarmerWithOfficer2 = temp[0].data;
                                    } else if (param == 4) {
                                        this.ImgSubsidyComponentFarmerWithOfficer1 = temp[0].data;
                                    }
                                    else if (param == 5) {
                                        this.ImgSubsidyComponentFarmerWithOfficer2 = temp[0].data;
                                    }
                                    else if (param == 6) {
                                        this.ImgInsuranceCertificateCopy = temp[0].data;
                                    }
                                    else if (param == 7) {
                                        this.ImgFarmerSatisfactionConsentLetter = temp[0].data;
                                    } else if (param == 8) {
                                        this.ImgPVChecklistDocument = temp[0].data;
                                    }
                                    //
                                } else {
                                    this.httpClient.showToastError();
                                }
                            },
                            (err) => {
                                // error

                                this.httpClient.dismissLoading();
                                console.log('err', err);
                            }
                        );
                }
            },
            (err) => {
                // Handle error
            }
        );

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
            sourceType: sourceType
        }
        console.log(options);

        this.camera.getPicture(options).then((imageData) => {

            let optionsCam: FileUploadOptions = {
                fileKey: 'files',
                params: {
                    id: this.postVerificationId,
                    AppName: 'PVapp',
                    tableName: 'FP_PostVerification',
                    columnName: columnName,
                    uniqueidcolumnname: 'FP_PostVerificationId',
                    IsDirectUpload: 'False',
                },
            };
            console.log(optionsCam.params);

            if (this.httpClient.isOffline) {
                this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                    [this.data.ApplicationId]).then((res) => {
                        var temp = JSON.parse(res.rows.item(0).applicationData);

                        temp.ImgTriPartyAgreement = imageData;
                        temp.optionOfImgTriPartyAgreement = optionsCam;

                        let data = [JSON.stringify(temp)];
                        this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                            .then(() => {
                                this.ImgTriPartyAgreement = imageData;
                            })
                            .catch((e) => {
                                console.log('error ' + JSON.stringify(e));
                            });

                    })
                    .catch((e) => {
                        alert('error ' + JSON.stringify(e));
                    });
            } else {
                this.httpClient.showLoading();

                FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, optionsCam).then((data) => {
                    this.httpClient.dismissLoading();
                    var temp = JSON.parse(data.response);
                    console.log('temp[0].data', temp[0].data);
                    if (temp[0].data[0].URL) {
                        this.ImgTriPartyAgreement = temp[0].data;
                    } else {
                        this.httpClient.showToastError();
                    }


                }, (err) => {

                    this.httpClient.dismissLoading();
                    console.log('err', err);
                });
            }
        },
            (err) => {
                console.log('log 3', err);
            });
    }


    async selectImage(param, columnName) {
        if (this.httpClient.currentLanguage == 'hindi') {
            const actionSheet = await this.actionSheetController.create({
                header: "छवि स्रोत का चयन करें",
                buttons: [{
                    text: 'गैलरी का प्रयोग करें',
                    handler: () => {
                        this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, param, columnName);
                    }
                },
                {
                    text: 'कैमरा का प्रयोग करें',
                    handler: () => {
                        this.pickImage(this.camera.PictureSourceType.CAMERA, param, columnName);
                    }
                },
                {
                    text: 'रद्द करें',
                    role: 'cancel'
                }
                ]
            });
            await actionSheet.present();
        } else {
            const actionSheet = await this.actionSheetController.create({
                header: "Select Image source",
                buttons: [{
                    text: 'Use Gallery',
                    handler: () => {
                        this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, param, columnName);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.pickImage(this.camera.PictureSourceType.CAMERA, param, columnName);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
                ]
            });
            await actionSheet.present();
        }
    }


    submitFinalData() {
        this.btnFinalSubmit = true;
        var self = this;
        if (this.billArray.length == 0) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast('कृपया बिल अपलोड करें ');
            } else {
                this.httpClient.showToast('Please upload bills');
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgFarmerWithOfficer == null) {
            if (this.httpClient.currentLanguage == 'hindi') {
                this.httpClient.showToast(
                    'अधिकारी और ड्रिप के साथ किसान की पहली तस्वीर।'
                );
            } else {
                this.httpClient.showToast(
                    'First picture of farmer with officer and drip.'
                );
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgFarmerWithOfficer2 == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Second picture of farmer with officer and drip.'
                );
            } else {
                this.httpClient.showToast(
                    'अधिकारी और ड्रिप के साथ किसान की दूसरी तस्वीर।'
                );
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgSubsidyInstalledPlaceFarmerWithOfficer1 == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Picture 1 of green House from Inside with Officers, Farmer and Representative of Firm.'
                );
            } else {
                this.httpClient.showToast(
                    'अधिकारियों, किसान और फर्म के प्रतिनिधि के साथ अंदर से ग्रीन हाउस का चित्र 1।'
                );
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgSubsidyInstalledPlaceFarmerWithOfficer2 == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Picture 2 of green House from Inside with Officers, Farmer and Representative of Firm.'
                );
            } else {
                this.httpClient.showToast(
                    'अधिकारियों, किसान और फर्म के प्रतिनिधि के साथ अंदर से ग्रीन हाउस का चित्र 2।'
                );
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgSubsidyComponentFarmerWithOfficer1 == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast('Picture 1 with different main components of Green House with Officers, Farmer and Representative of Firm.');
            } else {
                this.httpClient.showToast('चित्र 1 ग्रीन हाउस के विभिन्न मुख्य घटकों के साथ अधिकारी, किसान और फर्म के प्रतिनिधि।');
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgSubsidyComponentFarmerWithOfficer2 == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Picture 2 with different main components of Green House with Officers, Farmer and Representative of Firm.'
                );
            } else {
                this.httpClient.showToast('चित्र 2 ग्रीन हाउस के विभिन्न मुख्य घटकों के साथ अधिकारी, किसान और फर्म के प्रतिनिधि।');
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgInsuranceCertificateCopy == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Upload Insurance Certificate Copy.'
                );
            } else {
                this.httpClient.showToast('बीमा प्रमाणपत्र की प्रति अपलोड करें।');
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgFarmerSatisfactionConsentLetter == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Upload Farmer satisfaction consent letter.'
                );
            } else {
                this.httpClient.showToast('किसान संतुष्टि सहमति पत्र अपलोड करें।');
            }
            this.btnFinalSubmit = false;
        } else if (this.ImgPVChecklistDocument == null) {
            if (this.httpClient.currentLanguage == 'english') {
                this.httpClient.showToast(
                    'Upload PV Checklist Documents.'
                );
            } else {
                this.httpClient.showToast('पीवी चेकलिस्ट दस्तावेज़ अपलोड करें।');
            }
            this.btnFinalSubmit = false;
        } else {
            if (this.httpClient.isOffline) {
                this.dbService.storage.executeSql('SELECT * FROM postVerificationOfflineOfPlasticMulch WHERE ApplicationId = ?',
                    [this.data.ApplicationId]).then((res) => {
                        var temp = JSON.parse(res.rows.item(0).applicationData);
                        temp.finalSubmission = {
                            obj: {
                                usrnm: 'rajkisan',
                                psw: 'rajkisan@123',
                                srvnm: 'PostVerification',
                                srvmethodnm: 'FinalSubmissionPostVerification',
                                srvparam: JSON.stringify({
                                    ApplicationId: this.data.ApplicationId,
                                    UserId: self.httpClient.userData.userid,
                                    RoleId: self.httpClient.userData.roleid,
                                    SubsidySchemeId: this.data.SubsidySchemeId,
                                }),
                            },
                        };
                        let data = [JSON.stringify(temp)];
                        this.dbService.storage.executeSql(`UPDATE postVerificationOfflineOfPlasticMulch SET applicationData = ? WHERE ApplicationId = ${this.data.ApplicationId}`, data)
                            .then(() => {
                                self.successAlertFinalSubmission();
                            })
                            .catch((e) => {
                                this.btnFinalSubmit = false;
                                console.log('error ' + JSON.stringify(e));
                            });

                    })
                    .catch((e) => {
                        this.btnFinalSubmit = false;
                        alert('error ' + JSON.stringify(e));
                    });
            } else {
                self.httpClient.showLoading();
                var sendRequestData = {
                    obj: {
                        usrnm: 'rajkisan',
                        psw: 'rajkisan@123',
                        srvnm: 'PostVerification',
                        srvmethodnm: 'FinalSubmissionPostVerification',
                        srvparam: JSON.stringify({
                            ApplicationId: this.data.ApplicationId,
                            UserId: self.httpClient.userData.userid,
                            RoleId: self.httpClient.userData.roleid,
                            SubsidySchemeId: this.data.SubsidySchemeId,
                        }),
                    },
                };

                console.log('sendRequestData', sendRequestData);
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
                            'obj': {
                                'usrnm': 'rajkisan',
                                'psw': 'rajkisan@123',
                                srvresponce: error,
                                userid: self.httpClient.userData.userid,
                                srvnm: 'PostVerification',
                                srvmethodnm: 'FinalSubmissionPostVerification',
                                srvparam: JSON.stringify({
                                    ApplicationId: self.data.ApplicationId,
                                    UserId: self.httpClient.userData.userid,
                                    RoleId: self.httpClient.userData.roleid,
                                    SubsidySchemeId: self.data.SubsidySchemeId,
                                }),
                            }
                        };
                        this.btnFinalSubmit = false;
                        console.log('errorRequestData new', errorRequestData);
                        self.httpClient.getErrorMobileLogs(errorRequestData);
                        self.httpClient.showToastError();
                    }
                );
            }
        }
    }


    /******** For Production Setup  ********/
    toggleMultiuserClose: any;
    subsidyList: any[] = [];
    oneYearFromNow: any;
    LandAreaArr: any[] = []

    toggleMultiuser() { }
    test(event, i) { }
    getLand(i) { }
    uploadDoc(i) { }
    deleteRow(i) { }
    addRow() { }


}
