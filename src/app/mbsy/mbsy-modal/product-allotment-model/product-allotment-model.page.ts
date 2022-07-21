import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-product-allotment-model',
    templateUrl: './product-allotment-model.page.html',
    styleUrls: ['./product-allotment-model.page.scss'],
})
export class MbsyProductAllotmentModelPage implements OnInit {

    @ViewChild('ngOtpInput') ngOtpInputRef: any;
    otpNo: any;
    aadharNumber: any;
    transactionId: any;
    recTime: any = 0;
    resendOTPTimer: any;
    interval: any;
    otpSent: any = false;
    reSendBtn: any = true;
    alternateMobile: any;
    janAadhaarData: any;
    janAadhaarMember: any;
    memberList: any[] = [];
    selectedMembersList: any[] = [];
    finalJanAadharData: any;

    public groupData: any;
    public farmerData: any;
    public providedSeed: any;

    constructor(public httpClient: CommonService,
        public zone: NgZone,
        public modalController: ModalController,
        public navParams: NavParams) {
        this.groupData = this.navParams.data.group;
        this.farmerData = this.navParams.data.farmer;
        console.log("groupData : ", this.groupData);
        console.log("farmerData : ", this.farmerData);

        this.alternateMobile = this.farmerData && this.farmerData.MobileNo ? this.farmerData.MobileNo : "";
        this.aadharNumber = this.farmerData && this.farmerData.AadhaarNo ? this.farmerData.AadhaarNo : "";
    }

    ngOnInit() {
    }

    verifyOtp() {
        console.log("OTP enetered = " + this.otpNo);
        if (!this.otpNo) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया ओटीपी दर्ज करे।' : 'Please Enter the OTP first.');
        } else {
            var self = this;
            self.httpClient.showLoading();
            var newpwd = this.httpClient.encryptData(this.aadharNumber);
            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "Organic",
                    "srvmethodnm": "VerifyAadhaarOTP",
                    "srvparam": JSON.stringify({ otp: this.httpClient.encryptData(self.otpNo), txn: this.httpClient.encryptData(self.transactionId), Aadhaar: newpwd })
                }
            }
            console.log('sendRequestData', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Verify otp Res = ', JSON.stringify(res));
                self.httpClient.dismissLoading();
                if (res.status == '0' && res.message == 'success') {
                    res.data[0].status = 'success';
                    res.data[0].providedSeeds = self.providedSeed;
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

    sendOtp() {
        if (!this.aadharNumber) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'मोबाइल नंबर दर्ज करें' : 'Please Enter the mobile number');
        } else if (!this.providedSeed) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'प्रदान किया गया बीज दर्ज करें' : 'Please Enter the Provided Seed');
        } else {
            var self = this;
            self.httpClient.showLoading();
            var newpwd = this.httpClient.encryptData(this.aadharNumber);
            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "Organic",
                    "srvmethodnm": "SendOtpByAadharNo",
                    "srvparam": JSON.stringify({ 'Aadhaar': newpwd })
                }
            }
            console.log('sendRequestData', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(function (temp) {
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
                }
            }, (error) => {
                self.httpClient.dismissLoading();
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

}
