import { Component, OnInit, NgZone } from "@angular/core";
import { CommonService } from "../services/common.service";
import {
    AlertController,
    NavController,
    ActionSheetController,
    Platform,
} from "@ionic/angular";
import { DatabaseServiceService } from "../services/database-service.service";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
    Downloader,
    NotificationVisibility,
    DownloadRequest,
} from "@ionic-native/downloader/ngx";
import { File } from "@ionic-native/file/ngx";
import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";

@Component({
    selector: 'app-barbed-wire-fencing-pre-verification',
    templateUrl: './barbed-wire-fencing-pre-verification.page.html',
    styleUrls: ['./barbed-wire-fencing-pre-verification.page.scss'],
})
export class BarbedWireFencingPreVerificationPage implements OnInit {

    segmentSelected = "work";
    getPreVerificationData: any;
    farmerChoice: any = "yes";
    // farmerChoice: any;
    IsGroutroadcrossing: any = "no";
    Isconstructionoffencing: any = "no";
    Isreceivedgrantonwirebandi: any = "no";

    khasraNo: any;
    suitablekhasara: any;
    periPhesyRunningMeter: any;
    IsreceivedgrantonwirebandiLength: any;
    IsconstructionoffencingLength: any;
    preVerificationChecklistData: any = [];
    ChecklistDetailList: any = [];
    mainDataSubmittedFlag = false;
    najariyaNaksha: any;
    Fencing: any;
    imgFarmerAndOfficerWithFarmPondDateTime: any;
    imgFarmerAndOfficerWithFarmPond: any;
    najariyaNakshaDateTime: any;
    preVerificationId: any;
    farmerNonConsentLetter: any;
    imgFarmerWithOfficerNoCase: any;
    farmerNonConsentLetterDateTime: any;
    imgFarmerWithOfficerNoCaseDateTime: any;
    mobileToVerify: any;
    farmerid: any;
    lat: any;
    lng: any;
    offlineData: any;
    fileTransfer: any;

    constructor(
        public fileOpener: FileOpener,
        public downloader: Downloader,
        public dbService: DatabaseServiceService,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public camera: Camera,
        public router: Router,
        public geolocation: Geolocation,
        public route: ActivatedRoute,
        public httpClient: CommonService,
        public alertController: AlertController
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
        this.getPreVerificationData = JSON.parse(
            this.route.snapshot.paramMap.get("obj")
        );
        this.khasraNo = this.getPreVerificationData.KhasraNo;
        this.preVerificationId = this.getPreVerificationData.PreVerificationId;
        this.farmerid = this.getPreVerificationData.farmerid;
        console.log("this.getPreVerificationData", this.getPreVerificationData);
        if (parseInt(this.preVerificationId) > 0) {
            //alert( this.getPreVerificationData.IsFarmerAcceptance);
            this.mainDataSubmittedFlag = true;
            this.farmerChoice = this.getPreVerificationData.IsFarmerAcceptance;
            if (this.farmerChoice == "yes") {
                this.IsGroutroadcrossing = this.getPreVerificationData.IsGroutroadcrossing;
                this.periPhesyRunningMeter = this.getPreVerificationData.PeripheryRunningMeters;
                this.Isreceivedgrantonwirebandi = this.getPreVerificationData.IsalreadyTakensubsidykhasra;
                this.Isconstructionoffencing = this.getPreVerificationData.IsPeripheryConstructAreadyDone;
                if (this.Isreceivedgrantonwirebandi == "yes") {
                    this.IsreceivedgrantonwirebandiLength = this.getPreVerificationData.AlreadyTakensubsidykhasraLength;
                }
                if (this.Isconstructionoffencing == "yes") {
                    this.IsconstructionoffencingLength = this.getPreVerificationData.IsPeripheryConstructAreadyDoneLength;
                }

                this.najariyaNaksha = this.getPreVerificationData.ImgSignedMap;
                this.Fencing = this.getPreVerificationData.ImgfarmerWithOfficer;
            }
            if (this.farmerChoice == "no") {
                //ImgFarmerWithOfficer: this.imgFarmerWithOfficerNoCase,
                // NotAcceptanceDocPath: this.farmerNonConsentLetter,
                this.imgFarmerWithOfficerNoCase = this.getPreVerificationData.ImgfarmerWithOfficer;
                this.farmerNonConsentLetter = this.getPreVerificationData.NotAcceptanceDocPath;
            }

            console.log("thisfarmerch", this.farmerChoice);

            if (this.getPreVerificationData.ImgSignedMap != "") {
                this.najariyaNaksha = this.getPreVerificationData.ImgSignedMap;
                this.najariyaNakshaDateTime = new Date();
            }
            if (this.getPreVerificationData.ImgfarmerWithOfficer != "") {
                this.Fencing = this.getPreVerificationData.ImgfarmerWithOfficer;
                this.imgFarmerAndOfficerWithFarmPondDateTime = new Date();
            }
        } else {
            // this.farmerChoice = "no";
        }

        console.log(this.httpClient.userData);
        this.getCheckList();
        this.geolocation
            .getCurrentPosition({ timeout: 30000, enableHighAccuracy: true })
            .then((resp) => {
                this.httpClient.latitude = resp.coords.latitude;
                this.httpClient.longitude = resp.coords.longitude;
            })
            .catch((error) => {
            });
    }

    ngOnInit(): void {

    }

    IsNumeric(e) {
        console.log(e.target.value);
        var regex = /^[0-9 ]*$/;
        if (!regex.test(e.target.value)) {
            this.periPhesyRunningMeter = '';
            // (<HTMLInputElement>document.getElementById(e.target.id)).value= "";
            if (e.target.id == 'periPhesyRunningMeter') {
                // alert();
                this.periPhesyRunningMeter = '';
                this.httpClient.showToast('Only Numbers are Allow in this field');
            }
        }
    }

    IsNumeric3(e) {
        console.log(e.target.value);
        var regex = /^[0-9 ]*$/;
        if (!regex.test(e.target.value)) {
            this.IsreceivedgrantonwirebandiLength = '';
            // (<HTMLInputElement>document.getElementById(e.target.id)).value= "";
            if (e.target.id == 'IsreceivedgrantonwirebandiLength') {
                // alert();
                this.IsreceivedgrantonwirebandiLength = '';
                this.httpClient.showToast('Only Numbers are Allow in this field');
            }
        }
    }

    IsNumeric4(e) {
        console.log(e.target.value);
        var regex = /^[0-9 ]*$/;
        if (!regex.test(e.target.value)) {
            this.IsconstructionoffencingLength = '';
            // (<HTMLInputElement>document.getElementById(e.target.id)).value= "";
            if (e.target.id == 'IsconstructionoffencingLength') {
                // alert();
                this.IsconstructionoffencingLength = '';
                this.httpClient.showToast('Only Numbers are Allow in this field');
            }
        }
    }

    getLoc() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = this.httpClient.latitude = resp.coords.latitude;
            this.lng = this.httpClient.longitude = resp.coords.longitude;
            // this.httpClient.dismissLoading();
        }).catch((error) => {
            this.httpClient.dismissLoading();
            // console.log('Error getting location', error);
            // this.httpClient.showToast('Please Enable Location!!!');
        });
    }

    getCheckList() {
        if (this.httpClient.isOffline) {
            this.preVerificationChecklistData = this.getPreVerificationData.preVerificationChecklistData;
        } else {
            var self = this;
            self.httpClient.showLoadingImage();
            var sendRequestData = {
                obj: {
                    usrnm: "rajkisan",
                    psw: "i75Q7Q6nYgW3rgEitGndNA==",
                    srvnm: "PreVerification",
                    srvmethodnm: "VerificationChecklist",
                    srvparam:
                        "{'SchemeId':'" +
                        this.getPreVerificationData.SubsidySchemeId +
                        "', 'StepName':'Pre verification','ApplicationId':'" +
                        this.getPreVerificationData.ApplicationId + "','farmerid':'" +
                        this.farmerid +
                        "'}",
                },
            };
            this.httpClient.post(sendRequestData).subscribe(function (res: any) {
                console.log("res", res);
                if (res[0].status == 0) {
                    self.preVerificationChecklistData = res[0].data;
                    for (var i = 0; i < self.preVerificationChecklistData.length; i++) {
                        if (self.farmerChoice == "yes" && self.periPhesyRunningMeter) {
                            if (self.preVerificationChecklistData[i].IsChecked == "True") {
                                self.preVerificationChecklistData[i].isSelectedClose = false;
                                self.preVerificationChecklistData[i].isSelectedCheck = true;

                                //   //  for (var i = 0; i < this.ChecklistDetailList.length; i++) {
                                //   if (
                                //     self.preVerificationChecklistData[i].Id ==
                                //     self.ChecklistDetailList[i].ChecklistId
                                //   ) {
                                //     self.ChecklistDetailList.splice(i, 1);
                                //     self.preVerificationChecklistData[
                                //           i
                                //           ].isSelectedCheck = false;
                                //   }
                                //   //    }

                            } else {
                                self.preVerificationChecklistData[i].isSelectedClose = true;
                                self.preVerificationChecklistData[i].isSelectedCheck = false;

                                //// for (var m = 0; m < this.ChecklistDetailList.length; m++) {
                                // if (
                                //     self.preVerificationChecklistData[i].Id ==
                                //     self.ChecklistDetailList[i].ChecklistId
                                // ) {
                                //     self.ChecklistDetailList.splice(i, 1);
                                //     self.preVerificationChecklistData[
                                //         i
                                //         ].isSelectedCheck = false;
                                // }
                                //  // }

                            }

                            self.ChecklistDetailList.push({
                                ChecklistId: self.preVerificationChecklistData[i].Id,
                                IsChecked: self.preVerificationChecklistData[i].IsChecked,
                                Remarks: self.preVerificationChecklistData[i].Remarks,
                            });

                        } else {
                            self.preVerificationChecklistData[i].isSelectedClose = false;
                            self.preVerificationChecklistData[i].isSelectedCheck = false;
                        }

                    }

                } else {
                    if (res[0].data == "") {
                        self.httpClient.showToast(res[0].message);
                    } else {
                        self.httpClient.showToast(res[0].data);
                    }
                    // self.httpClient.showToast(res.message);
                }
                // self.httpClient.showToast(res.message);
                self.httpClient.dismissLoadingImage();
            }, error => {
                var errorRequestData = {
                    'obj': {
                        'usrnm': 'rajkisan',
                        'psw': 'rajkisan@123',
                        srvresponce: error,
                        userid: self.httpClient.userData.userid,
                        srvnm: "PostVerification",
                        srvmethodnm: "GetMicroIrrigationSystem",
                        srvparam: "{'AgriLovValuesCode':'MicroIrrigationAvailableInApp'}",
                    }
                };
                console.log('errorRequestData new', errorRequestData);
                self.httpClient.getErrorMobileLogs(errorRequestData);
                self.httpClient.showToastError();
            });
        }

        console.log(this.ChecklistDetailList);
    }

    async checkedClose(index, currentFlag) {
        if (!currentFlag) {
            var headerTitleOfAlert;
            var placeholderOfAlert;
            var okButtonText;
            var cancelButtonText;
            if (this.httpClient.currentLanguage == "english") {
                headerTitleOfAlert = "Remark";
                placeholderOfAlert = "Enter Remark";
                okButtonText = "Submit";
                cancelButtonText = "Cancel";
            } else {
                headerTitleOfAlert = "टिप्पणी";
                placeholderOfAlert = "टिप्पणी दर्ज करें";
                okButtonText = "जमा करे";
                cancelButtonText = "रद्द करे";
            }

            const alert = await this.alertController.create({
                header: headerTitleOfAlert,
                inputs: [
                    {
                        name: "remark",
                        type: "text",
                        placeholder: placeholderOfAlert,
                    },
                ],
                buttons: [
                    {
                        text: cancelButtonText,
                        role: "cancel",
                        handler: () => {
                            console.log("Confirm Cancel");
                        },
                    },
                    {
                        text: okButtonText,
                        handler: (data) => {
                            if (data.remark.length != 0) {
                                for (var i = 0; i < this.ChecklistDetailList.length; i++) {
                                    if (
                                        this.preVerificationChecklistData[index].Id ==
                                        this.ChecklistDetailList[i].ChecklistId
                                    ) {
                                        this.ChecklistDetailList.splice(i, 1);
                                        this.preVerificationChecklistData[
                                            i
                                        ].isSelectedCheck = false;
                                    }
                                }
                                this.ChecklistDetailList.push({
                                    ChecklistId: this.preVerificationChecklistData[index].Id,
                                    IsChecked: false,
                                    Remarks: data.remark,
                                });
                                this.preVerificationChecklistData[index].isSelectedClose = true;
                            }
                        },
                    },
                ],
            });

            await alert.present();
        } else {
            for (var i = 0; i < this.ChecklistDetailList.length; i++) {
                if (
                    this.preVerificationChecklistData[index].Id ==
                    this.ChecklistDetailList[i].ChecklistId
                ) {
                    console.log("in check");
                    this.ChecklistDetailList.splice(i, 1);
                    this.preVerificationChecklistData[index].isSelectedClose = false;
                    console.log("this.createdChecklist", this.ChecklistDetailList);
                }
            }
        }
    }

    checkedCheck(i, isSelectedCheck) {
        for (var j = 0; j < this.ChecklistDetailList.length; j++) {
            if (
                this.ChecklistDetailList[j].ChecklistId ==
                this.preVerificationChecklistData[i].Id
            ) {
                this.ChecklistDetailList.splice(j, 1);
            }
            this.preVerificationChecklistData[i].isSelectedClose = false;
        }
        if (isSelectedCheck == false) {
            this.ChecklistDetailList.push({
                ChecklistId: this.preVerificationChecklistData[i].Id,
                IsChecked: !isSelectedCheck,
                Remarks: "",
            });
            console.log(this.ChecklistDetailList);
        } else if (isSelectedCheck == true) {
            for (var l = 0; l < this.ChecklistDetailList.length; l++) {
                if (
                    this.ChecklistDetailList[l].ChecklistId ==
                    this.preVerificationChecklistData[i].Id
                ) {
                    this.ChecklistDetailList.splice(l, 1);
                }
            }
            console.log(this.ChecklistDetailList);
        }

        this.preVerificationChecklistData[i].isSelectedCheck = !this
            .preVerificationChecklistData[i].isSelectedCheck;
    }

    submitMainData() {
        this.getLoc();
        // alert(this.Isconstructionoffencing);
        //alert(this.IsconstructionoffencingLength);
        if (this.lat == null) {
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
            this.getLoc();
        } else if (this.lng == null) {
            if (this.httpClient.currentLanguage == "hindi") {
                this.httpClient.showToast(
                    "कृपया इस एप्लिकेशन के लिए लोकेशन  सक्षम करें फिर सबमिट करें"
                );
            } else {
                this.httpClient.showToast(
                    "Please enable the location for this application then submit"
                );
            }
        }
        else if (this.periPhesyRunningMeter == null) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast(
                    "Please enter The Periphery running meter"
                );
            } else {
                this.httpClient.showToast("कृपया पेरिफेरी रनिंग मीटर दर्ज करें");
            }
        }
        else if (
            this.preVerificationChecklistData.length !=
            this.ChecklistDetailList.length
        ) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast("Please select all item of checklist");
            } else {
                this.httpClient.showToast("कृपया चेकलिस्ट के सभी आइटम का चयन करें");
            }
        } else if (this.Isconstructionoffencing == 'yes' && !this.IsconstructionoffencingLength) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast(
                    "Please Enter Length of Barbed Wire Fencing/Pakki wall"
                );
            } else {
                this.httpClient.showToast("कृपया तारबंदी/पक्की दीवार की लंबाई दर्ज करें");
            }
        } else if (this.Isreceivedgrantonwirebandi == 'yes' && !this.IsreceivedgrantonwirebandiLength) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast(
                    "Please Enter Length of grant on Barbed Wire Fencing"
                );
            } else {
                this.httpClient.showToast("कृपया तारबंदी लगाने पर अनुदान की लंबाई दर्ज करें");
            }
        } else if (this.Fencing == null) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast(
                    "Please Upload Image of Periphery map of proposed Barbed Wire Fencing"
                );
            } else {
                this.httpClient.showToast("कृपया प्रस्तावित तारबंदी के परिधि मानचित्र की फ़ोटो अपलोड करें");
            }
        } else if (this.najariyaNaksha == null) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast(
                    "Please Upload Image of Barbed wire fencing along with farmer & officer"
                );
            } else {
                this.httpClient.showToast("कृपया किसान और अधिकारी के साथ तारबंदी की फ़ोटो अपलोड करें");
            }
        } else {
            var self = this;
            var tempOfflineFlag;
            if (this.httpClient.isOffline == true) {
                tempOfflineFlag = 1;
            } else {
                tempOfflineFlag = 0;
            }

            console.log(this.ChecklistDetailList)
            var sendRequestData = {
                obj: {
                    usrnm: "rajkisan",
                    psw: "rajkisan@123",
                    srvnm: "PreVerification",
                    srvmethodnm: "AddBarbedWireFencing",
                    srvparam: JSON.stringify({
                        ApplicationId: this.getPreVerificationData.ApplicationId,
                        userid: this.httpClient.userData.userid,
                        roleid: this.httpClient.userData.roleid,////
                        schemeid: this.getPreVerificationData.SubsidySchemeId,////
                        latitude: this.lat,
                        longitude: this.lng,
                        //  latitude: "3432",
                        //  longitude: "32424",
                        IsFarmerAcceptance: "Yes",
                        // InputValue: this.periPhesyRunningMeter,
                        periPhesyRunningMeter: this.periPhesyRunningMeter,
                        farmerid: this.farmerid,
                        IsGroutroadcrossing: this.IsGroutroadcrossing,
                        AppVersion: this.httpClient.currentAppVersion,
                        IsOnline_Offline: tempOfflineFlag,
                        // farmerNonConsentLetter: this.farmerNonConsentLetter,
                        //  image: this.najariyaNaksha
                        ImgFarmerWithOfficer: this.najariyaNaksha,
                        ImgSignedMap: this.Fencing,
                        //   ImgFarmerWithOfficer:"safs",
                        // ImgSignedMap:"jksfs",
                        IsPeripheryConstructAreadyDone: this.Isconstructionoffencing,
                        IsPeripheryConstructAreadyDoneLength: this.IsconstructionoffencingLength,
                        IsalreadyTakensubsidykhasra: this.Isreceivedgrantonwirebandi,
                        AlreadyTakensubsidykhasraLength: this.IsreceivedgrantonwirebandiLength,
                        //image:"utfut",
                        // ImgFarmerWithOfficer:"dsd",
                        NotAcceptanceDocPath: "",
                        ChecklistDetailList: this.ChecklistDetailList,
                    }),
                },
            };
            if (this.httpClient.isOffline) {
                var sendRequestDataOffline = {
                    obj: {
                        usrnm: "rajkisan",
                        psw: "rajkisan@123",
                        srvnm: "PreVerification",
                        srvmethodnm: "AddPreverificationBasicData",
                        srvparam: JSON.stringify({
                            IsFarmerAcceptance: "Yes",
                            mobileToVerify: this.mobileToVerify,
                            NotAcceptanceDocPath: "",
                            ApplicationId: this.getPreVerificationData.ApplicationId,
                            roleid: this.httpClient.userData.roleid,
                            userid: this.httpClient.userData.userid,
                            schemeid: this.getPreVerificationData.SubsidySchemeId,
                            KhasraNo: this.suitablekhasara,
                            latitude: this.httpClient.latitude,
                            longitude: this.httpClient.longitude,
                            AppVersion: this.httpClient.currentAppVersion,
                            IsOnline_Offline: tempOfflineFlag,
                            ChecklistDetailList: this.ChecklistDetailList,
                        }),
                    },
                };
                var temp = this.getPreVerificationData;
                temp.mainDataSubmit = sendRequestDataOffline;
                var query = this.dbService.storage
                    .executeSql(
                        `
          UPDATE preVerificationOfflineDiggi
          SET applicationSubmissionData = '${JSON.stringify(temp)}'
          WHERE ApplicationId = '${this.getPreVerificationData.ApplicationId}'
        `,
                        []
                    )
                    .then(() => {
                        this.successAlert();
                    })
                    .catch((e) => {
                        alert("error " + JSON.stringify(e));
                    });
            } else {
                self.httpClient.showLoading();
                this.httpClient.post(sendRequestData).subscribe(function (res: any) {
                    console.log("res", res);
                    if (res[0].status == 0) {
                        self.preVerificationId = res[0].data[0].AddStatus;
                        self.showPrompt2(res[0].message);
                        //    this.router.navigate(['barbed-wire-fencing', { subsidyId: this.getPreVerificationData.SubsidySchemeId }])
                    } else {
                        if (res[0].data == "") {
                            self.httpClient.showToast(res[0].message);
                        } else {
                            self.httpClient.showToast(res[0].data);
                        }
                        // self.httpClient.showToast(res.message);
                    }
                    // self.httpClient.showToast(res.message);
                    self.httpClient.dismissLoading();
                });
            }
        }
    }

    async successAlert() {
        if (this.httpClient.currentLanguage == "english") {
            const alert = await this.alertController.create({
                header: "Alert",
                subHeader:
                    "Successfully submitted now please submit the required photos",
                backdropDismiss: false,
                buttons: [
                    {
                        text: "Okay",
                        handler: () => {
                            // this.navCtrl.pop();
                            this.mainDataSubmittedFlag = true;
                        },
                    },
                ],
            });

            await alert.present();
        } else {
            const alert = await this.alertController.create({
                header: "Alert",
                subHeader: "सफलतापूर्वक जमा किया गया अब कृपया जरूरी फोटोज अपलोड करे ",
                backdropDismiss: false,
                buttons: [
                    {
                        text: "ओके ",
                        handler: () => {
                            this.mainDataSubmittedFlag = true;
                        },
                    },
                ],
            });

            await alert.present();
        }
    }
    addNewImageNEW2(photoFlag) {
        this.camera.getPicture(this.httpClient.options).then(
            (imageData) => {
                // this.httpClient.showLoading();
                // this.showProgressBar();
                //alert(imageData);
                let options: FileUploadOptions = {
                    fileKey: "files",
                    params: {
                        AppName: "PVapp",
                        IsDirectUpload: "True",
                    },
                };
                console.log("options", options);

                FileTransfer.create()
                    .upload(imageData, this.httpClient.imageUploadUrl, options)
                    .then(
                        (data) => {
                            this.httpClient.dismissLoading();
                            // success
                            var temp = JSON.parse(data.response);
                            console.log("temp[0].data", temp[0].data);
                            if (temp[0].status == "0") {
                                // this.uploadedImageList.push(temp[0].data);
                                this.Fencing = temp[0].data;
                                if (photoFlag == 0) {
                                    let locObj: any = new Object();
                                    locObj.lat = this.lat;
                                    locObj.lng = this.lng;
                                    //   this.storage.set('locObj', locObj).then(loc => { });
                                }
                            } else {
                                // this.httpClient.showToastError();
                                this.httpClient.showToast(temp[0].message);
                            }
                        },
                        (err) => {
                            // error
                            var errorRequestData = {};
                            console.log("errorRequestData new", errorRequestData);
                            this.httpClient.getErrorMobileLogs(errorRequestData);

                            console.log("err", err);
                        }
                    );
            },
            (err) => {
                // Handle error
            }
        );
    }

    addNewImageNEW(photoFlag) {
        this.camera.getPicture(this.httpClient.options).then(
            (imageData) => {
                // this.httpClient.showLoading();
                // this.showProgressBar();
                //alert(imageData);
                let options: FileUploadOptions = {
                    fileKey: "files",
                    params: {
                        AppName: "PVapp",
                        IsDirectUpload: "True",
                    },
                };
                console.log("options", options);

                FileTransfer.create()
                    .upload(imageData, this.httpClient.imageUploadUrl, options)
                    .then(
                        (data) => {
                            this.httpClient.dismissLoading();
                            // success
                            var temp = JSON.parse(data.response);
                            console.log("temp[0].data", temp[0].data);
                            if (temp[0].status == "0") {
                                // this.uploadedImageList.push(temp[0].data);
                                this.najariyaNaksha = temp[0].data;
                                if (photoFlag == 0) {
                                    let locObj: any = new Object();
                                    locObj.lat = this.lat;
                                    locObj.lng = this.lng;
                                    //   this.storage.set('locObj', locObj).then(loc => { });
                                }
                            } else {
                                // this.httpClient.showToastError();
                                this.httpClient.showToast(temp[0].message);
                            }
                        },
                        (err) => {
                            // error
                            var errorRequestData = {};
                            console.log("errorRequestData new", errorRequestData);
                            this.httpClient.getErrorMobileLogs(errorRequestData);

                            console.log("err", err);
                        }
                    );
            },
            (err) => {
                // Handle error
            }
        );
    }

    selectImage(flag, columnName) {
        var sendRequestData: any;
        var tempOfflineFlag;
        if (this.httpClient.isOffline == true) {
            tempOfflineFlag = 1;
        } else {
            tempOfflineFlag = 0;
        }

        this.camera.getPicture(this.httpClient.options).then(
            (imageData) => {

                let options: FileUploadOptions;
                if (flag == 0 || flag == 1) {
                    // if ( flag == 1) {
                    options = {
                        fileKey: "files",
                        params: {
                            id: this.preVerificationId,
                            AppName: "PVapp",
                            tableName: "Subsidy_PreVerificationDocList",
                            columnName: columnName,
                            uniqueidcolumnname: "PreVerificationDocListId",
                            IsDirectUpload: "False",
                        },
                    };
                } else {
                    options = {
                        fileKey: "files",
                        params: {
                            AppName: "PVapp",
                            IsDirectUpload: "True",
                        },
                    };
                }
                console.log("options", options);
                if (this.httpClient.isOffline) {

                    this.dbService.storage.executeSql("SELECT * FROM preVerificationOfflineDiggi WHERE ApplicationId = ?", [this.getPreVerificationData.ApplicationId]).then((res) => {
                        var temp = JSON.parse(res.rows.item(0).applicationSubmissionData);
                        if (flag == 0) {
                            temp.imageOFImgSignedMap = imageData;
                            temp.optionsOFImgSignedMap = options;
                            console.log("temp", temp);
                            let data = [JSON.stringify(temp)];
                            this.dbService.storage.executeSql(`UPDATE preVerificationOfflineDiggi SET applicationSubmissionData = ? WHERE ApplicationId = ${this.getPreVerificationData.ApplicationId}`, data)
                                .then(() => {
                                    this.najariyaNaksha = imageData;
                                })
                                .catch((e) => {
                                    console.log("error " + JSON.stringify(e));
                                });
                        } else if (flag == 1) {
                            temp.imageOFImgfarmerWithOfficer = imageData;
                            temp.optionsOFImgfarmerWithOfficer = options;
                            let data = [JSON.stringify(temp)];
                            this.dbService.storage.executeSql(`UPDATE preVerificationOfflineDiggi SET applicationSubmissionData = ? WHERE ApplicationId = ${this.getPreVerificationData.ApplicationId}`, data)
                                .then(() => {
                                    this.imgFarmerAndOfficerWithFarmPond = imageData;
                                })
                                .catch((e) => {
                                    alert("error " + JSON.stringify(e));
                                });
                            // this.imgFarmerAndOfficerWithFarmPond = temp[0].data;
                        } else if (flag == 2) {
                            temp.imageOFimgFarmerWithOfficerNoCase = imageData;
                            temp.optionsOFimgFarmerWithOfficerNoCase = options;
                            console.log("temp", temp);
                            let data = [JSON.stringify(temp)];
                            this.dbService.storage.executeSql(`UPDATE preVerificationOfflineDiggi SET applicationSubmissionData = ?
                               WHERE ApplicationId = ${this.getPreVerificationData.ApplicationId}`, data)
                                .then(() => {
                                    var date2 = new Date();
                                    this.imgFarmerAndOfficerWithFarmPondDateTime =
                                        date2.getFullYear() +
                                        "-" +
                                        (date2.getMonth() + 1) +
                                        "-" +
                                        date2.getDate() +
                                        " " +
                                        date2.getHours() +
                                        ":" +
                                        date2.getMinutes() +
                                        ":" +
                                        date2.getSeconds();
                                    this.imgFarmerWithOfficerNoCase = imageData;
                                })
                                .catch((e) => {
                                    console.log("error " + JSON.stringify(e));
                                });
                        } else if (flag == 3) {
                            temp.imageOFfarmerNonConsentLetter = imageData;
                            temp.optionsOFfarmerNonConsentLetter = options;
                            console.log("temp", temp);
                            let data = [JSON.stringify(temp)];
                            this.dbService.storage.executeSql(`UPDATE preVerificationOfflineDiggi SET applicationSubmissionData = ? WHERE ApplicationId = ${this.getPreVerificationData.ApplicationId}`, data)
                                .then(() => {

                                    var date1 = new Date();
                                    this.farmerNonConsentLetterDateTime =
                                        date1.getFullYear() +
                                        "-" +
                                        (date1.getMonth() + 1) +
                                        "-" +
                                        date1.getDate() +
                                        " " +
                                        date1.getHours() +
                                        ":" +
                                        date1.getMinutes() +
                                        ":" +
                                        date1.getSeconds();
                                    this.farmerNonConsentLetter = imageData;
                                })
                                .catch((e) => {
                                    console.log("error " + JSON.stringify(e));
                                });
                        }
                    })
                        .catch((e) => {
                            alert("error " + JSON.stringify(e));
                        });

                }
                else {
                    this.httpClient.showLoading();
                    FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, options).then((data) => {
                        this.httpClient.dismissLoading();
                        // success
                        var temp = JSON.parse(data.response);
                        console.log("temp[0].data", temp[0].data);
                        if (temp[0].data[0].URL) {
                            if (flag == 0) {
                                this.najariyaNaksha = temp[0].data;
                                var date = new Date();

                                var tempDateOfnajariyaNakshaDateTime;
                                tempDateOfnajariyaNakshaDateTime =
                                    date.getFullYear() +
                                    "-" +
                                    (date.getMonth() + 1) +
                                    "-" +
                                    date.getDate() +
                                    " " +
                                    date.getHours() +
                                    ":" +
                                    date.getMinutes() +
                                    ":" +
                                    date.getSeconds();
                            }
                            else if (flag == 1) {
                                this.imgFarmerAndOfficerWithFarmPond = temp[0].data;
                                var date1 = new Date();
                                var tempDateOfIimgFarmerAndOfficerWithFarmPondDateTime;
                                tempDateOfIimgFarmerAndOfficerWithFarmPondDateTime =
                                    date1.getFullYear() +
                                    "-" +
                                    (date1.getMonth() + 1) +
                                    "-" +
                                    date1.getDate() +
                                    " " +
                                    date1.getHours() +
                                    ":" +
                                    date1.getMinutes() +
                                    ":" +
                                    date1.getSeconds();
                            }
                        }
                        else if (temp[0].data) {
                            if (flag == 2) {
                                this.imgFarmerWithOfficerNoCase = temp[0].data;
                                var date2 = new Date();
                                this.imgFarmerWithOfficerNoCaseDateTime =
                                    date2.getFullYear() +
                                    "-" +
                                    (date2.getMonth() + 1) +
                                    "-" +
                                    date2.getDate() +
                                    " " +
                                    date2.getHours() +
                                    ":" +
                                    date2.getMinutes() +
                                    ":" +
                                    date2.getSeconds();
                                console.log(
                                    "imgFarmerWithOfficerNoCaseDateTime",
                                    this.imgFarmerWithOfficerNoCaseDateTime
                                );
                                console.log(
                                    "imgFarmerWithOfficerNoCase",
                                    this.imgFarmerWithOfficerNoCase
                                );
                            }
                            else if (flag == 3) {
                                this.farmerNonConsentLetter = temp[0].data;
                                var date1 = new Date();
                                this.farmerNonConsentLetterDateTime ==
                                    date1.getFullYear() +
                                    "-" +
                                    (date1.getMonth() + 1) +
                                    "-" +
                                    date1.getDate() +
                                    " " +
                                    date1.getHours() +
                                    ":" +
                                    date1.getMinutes() +
                                    ":" +
                                    date1.getSeconds();
                            } else {
                                this.httpClient.dismissLoading();
                                this.httpClient.showToastError();
                            }
                        } else {
                            this.httpClient.dismissLoading();
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
                // Handle error
            }
        );
    }

    submitImagesOfYesCase(sendRequestData, flag) {
        var self = this;
        self.httpClient.showLoading();
        this.httpClient.post(sendRequestData).subscribe(function (res: any) {
            console.log("res", res);

            self.httpClient.dismissLoading();
            if (res[0].status == 0) {
                if (flag == 0) {
                    self.najariyaNakshaDateTime = "uploaded";
                } else {
                    self.imgFarmerAndOfficerWithFarmPondDateTime = "uploaded";
                }
            } else {
                if (res[0].data == "") {
                    if (flag == 0) {
                        self.najariyaNakshaDateTime = null;
                        self.najariyaNaksha = null;
                    } else if (flag == 1) {
                        self.imgFarmerAndOfficerWithFarmPond = null;
                        self.imgFarmerAndOfficerWithFarmPondDateTime = null;
                    }
                    self.httpClient.showToast(res[0].message);
                } else {
                    if (flag == 0) {
                        self.najariyaNakshaDateTime = null;
                        self.najariyaNaksha = null;
                    } else if (flag == 1) {
                        self.imgFarmerAndOfficerWithFarmPond = null;
                        self.imgFarmerAndOfficerWithFarmPondDateTime = null;
                    }
                    self.httpClient.showToast(res[0].data);
                }
                // self.httpClient.showToast(res.message);
            }
            // self.httpClient.showToast(res.message);
        });
    }

    submitNoFormFinal() {
        this.getLoc();
        if (this.lat == null) {
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

        } else if (this.farmerNonConsentLetter == null) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast("Please upload Farmer non-consent letter");
            } else {
                this.httpClient.showToast("कृषक असहमति पत्र अपलोड करें");
            }
        } else if (this.imgFarmerWithOfficerNoCase == null) {
            if (this.httpClient.currentLanguage == "english") {
                this.httpClient.showToast("Please upload photo of farmer with officer");
            } else {
                this.httpClient.showToast(
                    "कृषक अधिकारी के साथ किसान का फोटो अपलोड करें"
                );
            }
        } else {
            var self = this;
            var tempOfflineFlag;
            if (this.httpClient.isOffline == true) {
                tempOfflineFlag = 1;
            } else {
                tempOfflineFlag = 0;
            }


            var sendRequestData = {
                obj: {
                    usrnm: "rajkisan",
                    psw: "rajkisan@123",
                    srvnm: "PreVerification",
                    srvmethodnm: "AddBarbedWireFencing",
                    srvparam: JSON.stringify({
                        ApplicationId: this.getPreVerificationData.ApplicationId,
                        userid: this.httpClient.userData.userid,
                        roleid: this.httpClient.userData.roleid,////
                        schemeid: this.getPreVerificationData.SubsidySchemeId,////
                        latitude: this.lat,
                        longitude: this.lng,
                        IsFarmerAcceptance: "No",
                        // InputValue: this.periPhesyRunningMeter,
                        // periPhesyRunningMeter: this.periPhesyRunningMeter,
                        periPhesyRunningMeter: "",
                        farmerid: self.farmerid,
                        // IsGroutroadcrossing: this.IsGroutroadcrossing,
                        IsGroutroadcrossing: "",
                        AppVersion: this.httpClient.currentAppVersion,
                        IsOnline_Offline: tempOfflineFlag,
                        // farmerNonConsentLetter: this.farmerNonConsentLetter,
                        //  image: this.najariyaNaksha
                        //image:"",
                        // ImgFarmerWithOfficer:"fcghfxgd",
                        //NotAcceptanceDocPath: "bhkfyt",
                        ImgFarmerWithOfficer: this.imgFarmerWithOfficerNoCase,
                        NotAcceptanceDocPath: this.farmerNonConsentLetter,
                        ImgSignedMap: "",
                        IsPeripheryConstructAreadyDone: "",
                        IsalreadyTakensubsidykhasra: "",
                        AlreadyTakensubsidykhasraLength: "",
                        IsPeripheryConstructAreadyDoneLength: "",
                        ChecklistDetailList: null,
                    }),
                },
            }
            console.log("sendRequestData", sendRequestData);
            if (this.httpClient.isOffline) {
                //
                var sendRequestDataOffline = {
                    IsFarmerAcceptance: "No",
                    NotAcceptanceDocPath: this.farmerNonConsentLetter,
                    ApplicationId: this.getPreVerificationData.ApplicationId,
                    ImgFarmerAndOfficerDateTime: this
                        .imgFarmerWithOfficerNoCaseDateTime,
                    roleid: this.httpClient.userData.roleid,
                    userid: this.httpClient.userData.userid,
                    schemeid: this.getPreVerificationData.SubsidySchemeId,
                    KhasraNo: "",
                    latitude: this.lat,
                    longitude: this.lng,
                    AppVersion: this.httpClient.currentAppVersion,
                    ImgFarmer: this.imgFarmerWithOfficerNoCase,
                    IsOnline_Offline: tempOfflineFlag,
                    mobileToVerify: this.mobileToVerify,
                }
                this.dbService.storage
                    .executeSql(
                        "SELECT * FROM preVerificationOfflineDiggi WHERE ApplicationId = ?",
                        [this.getPreVerificationData.ApplicationId]
                    ).then((rews) => {
                        var temp = JSON.parse(rews.rows.item(0).applicationSubmissionData);
                        temp.sendRequestDataFinal = sendRequestDataOffline;
                        let data = [JSON.stringify(temp)];
                        this.dbService.storage.executeSql(`UPDATE preVerificationOfflineDiggi SET applicationSubmissionData = ? WHERE ApplicationId = ${this.getPreVerificationData.ApplicationId}`, data)
                            .then(() => {
                                self.showPrompt("Successfully submitted!");
                            })
                            .catch((e) => {
                                alert("error " + JSON.stringify(e));
                            });
                    })
                    .catch((e) => {
                        alert("error " + JSON.stringify(e));
                    });
            } else {
                self.httpClient.showLoading();
                this.httpClient.post(sendRequestData).subscribe(function (res: any) {
                    console.log("res", res);
                    self.httpClient.dismissLoading();
                    if (res[0].status == 0) {
                        self.showPrompt2(res[0].message);
                        //  self.successAlert();
                        //   this.router.navigate(['barbed-wire-fencing', { subsidyId: this.getPreVerificationData.SubsidySchemeId }])
                        // self.preVerificationId=
                    } else {
                        self.farmerNonConsentLetter = null;
                        self.farmerNonConsentLetterDateTime = null;
                        self.imgFarmerWithOfficerNoCaseDateTime = null;
                        self.imgFarmerWithOfficerNoCase = null;
                        if (res[0].data == "") {
                            self.httpClient.showToast(res[0].message);
                        } else {
                            self.httpClient.showToast(res[0].data);
                        }
                        // self.httpClient.showToast(res.message);
                    }
                    // self.httpClient.showToast(res.message);
                    self.httpClient.dismissLoading();
                }, error => {
                    var errorRequestData = {
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': 'rajkisan@123',
                            srvresponce: error,
                            userid: self.httpClient.userData.userid,
                            srvnm: "PreVerification",
                            srvmethodnm: "AddPreverificationBasicData",
                            srvparam: JSON.stringify({
                                IsFarmerAcceptance: "No",
                                NotAcceptanceDocPath: self.farmerNonConsentLetter,
                                ApplicationId: self.getPreVerificationData.ApplicationId,
                                ImgFarmerAndOfficerDateTime: self.imgFarmerWithOfficerNoCaseDateTime,
                                roleid: self.httpClient.userData.roleid,
                                userid: self.httpClient.userData.userid,
                                schemeid: self.getPreVerificationData.SubsidySchemeId,
                                KhasraNo: "",
                                latitude: self.httpClient.latitude,
                                longitude: self.httpClient.longitude,
                                AppVersion: self.httpClient.currentAppVersion,
                                ImgFarmer: self.imgFarmerWithOfficerNoCase,
                                IsOnline_Offline: tempOfflineFlag,
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
    }

    submitFinal() {
        if (this.farmerChoice == "yes") {
            if (this.najariyaNaksha == null) {
                if (this.httpClient.currentLanguage == "english") {
                    this.httpClient.showToast("Please upload najariya naksha");
                } else {
                    this.httpClient.showToast("कृपया नजरिया नक्शा अपलोड करें ");
                }
            } else if (this.imgFarmerAndOfficerWithFarmPond == null) {
                if (this.httpClient.currentLanguage == "english") {
                    this.httpClient.showToast(
                        "Please upload photo Farmer and officer with diggi"
                    );
                } else {
                    this.httpClient.showToast(
                        "कृपया किसान और अधिकारी डिग्गी  के साथ फोटो अपलोड करें "
                    );
                }
            } else {
                var self = this;
                var sendRequestData = {
                    obj: {
                        usrnm: "rajkisan",
                        psw: "rajkisan@123",
                        srvnm: "PreVerification",
                        srvmethodnm: "ConfirmPreVerification",
                        srvparam: JSON.stringify({
                            ApplicationId: this.getPreVerificationData.ApplicationId,
                            userid: this.httpClient.userData.userid,
                            SubsidySchemeId: this.getPreVerificationData.SubsidySchemeId,
                            roleid: this.httpClient.userData.roleid,
                        }),
                    },
                };
                if (this.httpClient.isOffline) {
                    this.dbService.storage
                        .executeSql(
                            "SELECT * FROM preVerificationOfflineDiggi WHERE ApplicationId = ?",
                            [this.getPreVerificationData.ApplicationId]
                        )
                        .then((res) => {
                            var temp: any;
                            if (res.rows.length > 0) {
                                temp = JSON.parse(res.rows.item(0).applicationSubmissionData);
                                temp.sendRequestDataFinal = sendRequestData;
                                this.dbService.storage
                                    .executeSql(
                                        `
            UPDATE preVerificationOfflineDiggi
            SET applicationSubmissionData = '${JSON.stringify(temp)}'
            WHERE ApplicationId = '${this.getPreVerificationData.ApplicationId
                                        }'
          `,
                                        []
                                    )
                                    .then(() => {
                                        self.showPrompt("Successfully submitted!");
                                    })
                                    .catch((e) => {
                                        alert("error " + JSON.stringify(e));
                                    });
                            }
                        });
                } else {
                    self.httpClient.showLoading();
                    this.httpClient.post(sendRequestData).subscribe(function (res: any) {
                        console.log("res", res);

                        self.httpClient.dismissLoading();
                        if (res[0].status == 0) {
                            self.showPrompt(res[0].message);
                        } else {
                            if (res[0].data == "") {
                                self.httpClient.showToast(res[0].message);
                            } else {
                                self.httpClient.showToast(res[0].data);
                            }
                        }
                    }, error => {
                        var errorRequestData = {
                            'obj': {
                                'usrnm': 'rajkisan',
                                'psw': 'rajkisan@123',
                                srvresponce: error,
                                userid: self.httpClient.userData.userid,
                                srvnm: "PreVerification",
                                srvmethodnm: "ConfirmPreVerification",
                                srvparam: JSON.stringify({
                                    ApplicationId: self.getPreVerificationData.ApplicationId,
                                    userid: self.httpClient.userData.userid,
                                    SubsidySchemeId: self.getPreVerificationData.SubsidySchemeId,
                                    roleid: self.httpClient.userData.roleid,
                                }),
                            }
                        };
                        console.log('errorRequestData new', errorRequestData);
                        self.httpClient.getErrorMobileLogs(errorRequestData);
                        self.httpClient.showToastError();
                    });
                }
            }
        }
    }
    async showPrompt2(msg) {
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
                            //      this.navCtrl.pop();
                            this.router.navigate(['barbed-wire-fencing', { subsidyId: this.getPreVerificationData.SubsidySchemeId }])
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
                            this.router.navigate(['barbed-wire-fencing', { subsidyId: this.getPreVerificationData.SubsidySchemeId }])
                        },
                    },
                ],
            });
            await alert.present();
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
                            this.navCtrl.pop();
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
                            this.navCtrl.pop();
                        },
                    },
                ],
            });
            await alert.present();
        }
    }

    getExtensionNazaria(item) {
        var request: DownloadRequest = {
            uri: item,
            title: "MyDownload",
            description: "",
            mimeType: "",
            visibleInDownloadsUi: true,
            notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
            destinationInExternalFilesDir: {
                dirType: "Downloads",
                subPath: "MyFile.pdf",
            },
        };

        this.downloader
            .download(request)
            .then((location: string) => {
                console.log("File downloaded at:" + location);
                this.fileOpener
                    .showOpenWithDialog(location, "application/pdf")
                    .then(() => console.log("File is opened"))
                    .catch((e) => console.log("Error opening file", e));
            })
            .catch((error: any) => console.error(error));
    }

}
