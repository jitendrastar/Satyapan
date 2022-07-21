import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-product-allotment-model',
    templateUrl: './product-allotment-model.page.html',
    styleUrls: ['./product-allotment-model.page.scss'],
})
export class MiniKitProductAllotmentModelPage implements OnInit {

    @ViewChild('ngOtpInput') ngOtpInputRef: any;
    otpNo: any;
    suvidhaGenerateOtpMobileData: any;
    suvidhaVerifyOtpMobileData: any;
    aadharNumber: any;
    transactionId: any;
    recTime: any = 0;
    resendOTPTimer: any;
    interval: any;
    otpSent: any = false;
    reSendBtn: any = true;
    isAlterMobile: boolean = false;
    isAlterMobileSection: boolean = false;
    isSentOTPOnAlterMobile: boolean = false;
    alternateMobile: any;
    janAadhaarData: any;
    janAadhaarMember: any;
    alternateMobileRadio: any;
    memberList: any[] = [];
    selectedMembersList: any[] = [];
    displayImage: any = '';
    SubSchemeId: any;
    finalJanAadharData: any;

    constructor(public httpClient: CommonService,
        public zone: NgZone,
        public modalController: ModalController,
        public navParams: NavParams,
        
        public file: File,
        public sanitizer: DomSanitizer,
        public camera: Camera) {
        this.janAadhaarData = this.navParams.data.memberData;
        this.SubSchemeId = this.navParams.data.SubSchemeId;
        console.log("janAadhaarData : ", this.janAadhaarData);
        if (this.janAadhaarData && this.janAadhaarData.AADHAR_ID) {
            this.aadharNumber = this.janAadhaarData.AADHAR_ID;
            console.log("Aadhaar No : ", this.aadharNumber);
            if (this.janAadhaarData.IsVerifyAadhaar && this.janAadhaarData.IsVerifyAadhaar == '1') {
                this.sendOtp();
            } else {
                this.getJanAadhaarFamilyDetails();
            }
        }

        // this.getJanAadhaarFamilyDetails();
        // setTimeout(() => {
        //     this.isAlterMobileSection = true;
        // }, 300);
    }

    ngOnInit() {
    }

    verifyOtp() {
        console.log("OTP enetered = " + this.otpNo);
        if (this.janAadhaarData && this.janAadhaarData.IsPhotoRequired && this.janAadhaarData.IsPhotoRequired == '1' && !this.displayImage) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया मिनिकिट लाभार्थी का फोटो अपलोड करें।' : 'Please upload the photo of Minikit Beneficiary.');
        } else if (!this.otpNo) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया ओटीपी दर्ज करे।' : 'Please Enter the OTP first.');
        } else {
            var self = this;
            self.httpClient.showLoading();
            var newpwd = self.httpClient.encryptData(this.aadharNumber);

            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "GeoTagging",
                    "srvmethodnm": "VerifyAadhaarOTP",
                    "srvparam": JSON.stringify({ otp: self.httpClient.encryptData(self.otpNo), txn: self.httpClient.encryptData(self.transactionId), Aadhaar: newpwd, IsForMinikit: 1 })
                }
            }
            console.log('sendRequestData', sendRequestData);
            self.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Verify otp Res = ', JSON.stringify(res));
                self.httpClient.dismissLoading();
                if (res.message == 'success') {
                    res.data[0].image = self.displayImage;
                    res.data[0].otp = self.otpNo;
                    res.data[0].isAadhaarVerified = "True";
                    res.data[0].finalJanAadharData = self.finalJanAadharData;
                    self.dismissModel(res.data[0]);
                } else if (res.message == 'failed') {
                    self.isAlterMobileSection = true;
                } else {
                    self.httpClient.showToast(res.message);
                }
            }, (error) => {
                self.httpClient.dismissLoading();
                var errorRequestData = {
                    'obj': {
                        'usrnm': 'rajkisan',
                        'psw': self.httpClient.encryptData('rajkisan@123'),
                        'srvnm': 'GeoTagging',
                        "srvmethodnm": "VerifyAadhaarOTP",
                        "srvparam": JSON.stringify({ 'otp': self.httpClient.encryptData(self.otpNo), txn: self.httpClient.encryptData(self.transactionId), Aadhaar: newpwd, IsForMinikit: 1 }),
                        'srvresponce': error,
                        'userid': self.httpClient.userData.userid ? self.httpClient.userData.userid : '0',
                    }
                };
                console.log('errorRequestData new', errorRequestData);
                self.httpClient.getErrorMobileLogs(errorRequestData);
                self.httpClient.showToastError();
            });
        }
    }

    sendOtp() {
        if (!this.aadharNumber) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'मोबाइल नंबर दर्ज करें' : 'Please Enter the mobile number');
        } else {
            var self = this;
            self.httpClient.showLoading();
            var newpwd = self.httpClient.encryptData(self.aadharNumber);

            if (self.SubSchemeId && self.SubSchemeId == "88") {
                self.finalJanAadharData = self.janAadhaarMember;
            } else {
                let janAadhaarData: any = self.janAadhaarData;
                delete janAadhaarData.IsPhotoRequired;
                self.finalJanAadharData = janAadhaarData;
            }

            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "GeoTagging",
                    "srvmethodnm": "SendOtpByAadharNo",
                    "srvparam": JSON.stringify({ 'Aadhaar': newpwd, IsForMinikit: 1, janDetails: [self.finalJanAadharData] })
                }
            }
            console.log('sendRequestData', sendRequestData);
            self.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Send OTP Res = ', JSON.stringify(res));
                self.httpClient.dismissLoading();
                if (res.status == '0') {
                    self.transactionId = res.data;
                    self.reSendCount();
                    self.otpSent = true;
                    self.httpClient.showToast((self.httpClient.currentLanguage == 'hindi') ? 'रजिस्टर्ड मोबाइल नंबर पर ओटीपी भेजा गया है कृपया ओटीपी दर्ज करें ' : 'Please Enter the OTP sent on registered mobile number');
                } else {
                    self.httpClient.showToast(res.message);
                    // self.isAlterMobile = true;
                    self.isAlterMobileSection = true;
                    self.getJanAadhaarFamilyDetails();
                }
            }, (error) => {
                self.httpClient.dismissLoading();
                var errorRequestData = {
                    'obj': {
                        'usrnm': 'rajkisan',
                        'psw': self.httpClient.encryptData('rajkisan@123'),
                        'srvnm': 'GeoTagging',
                        "srvmethodnm": "SendOtpByAadharNo",
                        "srvparam": JSON.stringify({ 'Aadhaar': self.aadharNumber, IsForMinikit: 1 }),
                        'srvresponce': error,
                        'userid': self.httpClient.userData.userid ? self.httpClient.userData.userid : '0',
                    }
                };
                console.log('errorRequestData new', errorRequestData);
                self.httpClient.getErrorMobileLogs(errorRequestData);
                self.httpClient.showToastError();
            });
        }
    }

    reSendCount() {
        this.reSendBtn = false;
        this.recTime = 120;
        this.interval = setInterval(() => {
            this.zone.run(() => {
                this.recTime--;
                const minutes: number = Math.floor(this.recTime / 60);
                this.resendOTPTimer = '0' + minutes + ':' + (this.recTime - minutes * 60);
                if (this.recTime < 1) {
                    console.log("stop automatic");
                    this.reSendBtn = true;
                    clearInterval(this.interval);
                }
            });
        }, 1000);
    }

    onOtpChange(ev) {
        console.log('ev', ev);
        this.otpNo = ev;
    }

    async dismissModel(data?) {
        await this.modalController.dismiss(data);
    }

    radioGroupAlterMobile(event) {
        console.log('event', event);
        this.alternateMobileRadio = event.detail.value;
    }

    sendAlterMobileOtp() {
        if (this.janAadhaarMember == undefined) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'सदस्य चुनें' : 'Select Member');
            // } else if (this.alternateMobileRadio != 'yes' && (!this.janAadhaarMember.MOBILE_NO || this.janAadhaarMember.MOBILE_NO.toString().trim() == '')) {
            //     this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'इस सदस्य का जनाधार में मोबाइल नंबर उपलब्ध नहीं है, अन्य को चुनें ' : 'Mobile number of this member is not available in Janadhar, select other');
        } else if (this.alternateMobileRadio == 'yes' && (!this.alternateMobile || this.alternateMobile.length != 10)) {
            this.isAlterMobileSection = true;
            this.isSentOTPOnAlterMobile = false;
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया 10 अंकों का वैकल्पिक मोबाइल नंबर दर्ज करें' : 'Please enter 10 digit alternate mobile number');
        } else {
            var self = this;
            self.httpClient.showLoading();
            let mobileNo = self.alternateMobileRadio && self.alternateMobileRadio == 'yes' ? self.alternateMobile : self.janAadhaarMember.MOBILE_NO;

            if (self.SubSchemeId && self.SubSchemeId == "88") {
                self.finalJanAadharData = self.janAadhaarMember;
            } else {
                let janAadhaarData: any = self.janAadhaarData;
                delete janAadhaarData.IsPhotoRequired;
                self.finalJanAadharData = janAadhaarData;
            }
            
            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "Demonstration",
                    "srvmethodnm": "MiniKitFarmerGenerateOtpMobile",
                    "srvparam": JSON.stringify({ Aadhaar: self.httpClient.encryptData(self.aadharNumber), 'mobileNo': mobileNo, janDetails: [self.finalJanAadharData] })
                }
            }
            console.log('sendRequestData', sendRequestData);
            self.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Send OTP Res = ', JSON.stringify(res));
                self.httpClient.dismissLoading();
                self.isSentOTPOnAlterMobile = true;
                clearInterval(self.interval);
                if (res.status == '0') {
                    self.isSentOTPOnAlterMobile = true;
                    self.transactionId = res.data;
                    self.reSendCount();
                    self.otpSent = true;
                    self.httpClient.showToast((self.httpClient.currentLanguage == 'hindi') ? 'मोबाइल नंबर पर ओटीपी भेजा गया है, कृपया ओटीपी दर्ज करें' : 'Please Enter the OTP sent on given mobile number');
                } else {
                    self.httpClient.dismissLoading();
                    self.httpClient.showToast(res.message);
                }
            }, error => {
                self.httpClient.showToastError();
            });
        }
    }

    verifyAlterMobileOtp() {
        console.log("OTP enetered = " + this.otpNo);
        if (this.janAadhaarData && this.janAadhaarData.IsPhotoRequired && this.janAadhaarData.IsPhotoRequired == '1' && !this.displayImage) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया मिनिकिट लाभार्थी का फोटो अपलोड करें।' : 'Please upload the photo of Minikit Beneficiary.');
        } else if (!this.otpNo) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया ओटीपी दर्ज करे ' : 'Please Enter the OTP first');
        } else {
            var self = this;
            self.httpClient.showLoading();

            if (self.SubSchemeId && self.SubSchemeId == "88") {
                self.finalJanAadharData = self.janAadhaarMember;
            } else {
                let janAadhaarData: any = self.janAadhaarData;
                delete janAadhaarData.IsPhotoRequired;
                self.finalJanAadharData = janAadhaarData;
            }
            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "Demonstration",
                    "srvmethodnm": "MiniKitFarmerVerifyOtpMobile",
                    "srvparam": JSON.stringify({ 'mobileNo': self.alternateMobileRadio && self.alternateMobileRadio == 'yes' ? self.alternateMobile : self.janAadhaarMember.MOBILE_NO, 'otp': self.otpNo, JAN_MEMBER_ID: self.janAadhaarData.JAN_MEMBER_ID, JAN_AADHAR: self.finalJanAadharData.JAN_AADHAR, AppType: 'MiniKit' })
                }
            }
            console.log('sendRequestData', sendRequestData);
            self.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Verify otp Res = ', JSON.stringify(res));
                self.httpClient.dismissLoading();
                if (res.status == '0') {
                    res.data[0].MobNo = self.alternateMobileRadio && self.alternateMobileRadio == 'yes' ? self.alternateMobile : self.janAadhaarMember.MOBILE_NO;
                    res.data[0].image = self.displayImage;
                    res.data[0].otp = self.otpNo;
                    res.data[0].isAadhaarVerified = "False";
                    res.data[0].finalJanAadharData = self.finalJanAadharData;
                    self.dismissModel(res.data[0]);
                } else {
                    self.httpClient.showToast(res.message);
                }
            }, (error) => {
                self.httpClient.dismissLoading();
                self.httpClient.showToastError();
            });
        }
    }

    getJanAadhaarFamilyDetails() {
        this.httpClient.showLoading();
        let credObj: any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "Memberlist";
        let paramObj: any = new Object();
        paramObj.janaadhaarId = this.janAadhaarData.JAN_AADHAR;
        credObj.obj.srvparam = JSON.stringify(paramObj);
        this.httpClient.post(credObj).subscribe((res: any) => {
            console.log("member list data = " + JSON.stringify(res));
            this.httpClient.dismissLoading();
            if (res[0].status == 0) {
                this.memberList = res[0].data;
            } else {
                this.httpClient.showToast(res[0].message);
            }
            this.reSendBtn = true;
            this.isAlterMobileSection = true;
        });
    }

    radioGroupMemberChange(event) {
        console.log('event.detail.value : ', event.detail.value);
        // this.alternateMobileRadio = event?.detail?.value == 'other' ? 'yes' : undefined;
        if (event && event.detail && event.detail.value) {
            this.isSentOTPOnAlterMobile = false;
            this.reSendBtn = true;
            this.alternateMobile = '';
            clearInterval(this.interval);
            var filteredMember = this.memberList.filter((x) => x.JAN_MEMBER_ID == event.detail.value);
            console.log("Filtered JSON = " + JSON.stringify(filteredMember));
            this.janAadhaarMember = filteredMember[0];
        }
    }

    radioGroupOther(event) {
        console.log('event.detail.value : ', event.detail.value);
        this.alternateMobileRadio = event?.detail?.value == 'other' ? 'yes' : undefined;
        this.isSentOTPOnAlterMobile = false;
        this.reSendBtn = true;
        this.alternateMobile = '';
        clearInterval(this.interval);
    }

    async takePhoto() {
        this.camera.getPicture(this.httpClient.options).then((imageData) => {
            let options: FileUploadOptions = {
                fileKey: "files",
                params: {
                    AppName: "PVapp",
                    IsDirectUpload: "True",
                },
            };
            console.log('imageData : ', imageData);
            console.log("fileTransfer options : ", options);
            console.log("fileTransfer imageUploadUrl : ", this.httpClient.imageUploadUrl);
            this.httpClient.showLoading();
            
            FileTransfer.create().upload(imageData, this.httpClient.imageUploadUrl, options).then((data) => {
                console.log("data", data);
                var temp = JSON.parse(data.response);
                setTimeout(() => {
                    this.httpClient.dismissLoading();
                    this.displayImage = temp[0].data;
                    console.log("displayImage : ", this.displayImage);
                }, 1000);
            }, (err) => {
                console.log(err);
                this.httpClient.dismissLoading();
                this.httpClient.showToastError();
            });

        }, (err) => {
            console.log(err);
            this.httpClient.dismissLoading();
        });
    }
}
