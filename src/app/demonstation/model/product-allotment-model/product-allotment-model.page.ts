import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-product-allotment-model',
    templateUrl: './product-allotment-model.page.html',
    styleUrls: ['./product-allotment-model.page.scss'],
})
export class ProductAllotmentModelPage implements OnInit {

    @ViewChild('ngOtpInput') ngOtpInputRef: any;
    otpNo: any;
    suvidhaGenerateOtpMobileData: any;
    suvidhaVerifyOtpMobileData: any;
    aadharNumber: any;
    transactionId: any;
    recTime: any = 0;
    interval: any;
    otpSent: any = false;
    reSendBtn: any = true;

    constructor(public httpClient: CommonService,
        public zone: NgZone,
        public modalController: ModalController,
        public navParams: NavParams) {
        this.aadharNumber = this.navParams.data.aadhaarId;
        if (this.aadharNumber) {
            console.log("Aadhaar No : ", this.aadharNumber);
            this.sendOtp();
        }
    }

    ngOnInit() {
    }

    verifyOtp() {
        console.log("OTP enetered = " + this.otpNo);
        if (!this.otpNo) {
            this.httpClient.showToast((this.httpClient.currentLanguage == 'hindi') ? 'कृपया ओ टी पी दर्ज करे ' : 'Please Enter the otp first');
        }
        else {
            var self = this;
            self.httpClient.showLoading();
            var newpwd = this.httpClient.encryptData(this.aadharNumber);
            var sendRequestData =
            {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "GeoTagging",
                    "srvmethodnm": "VerifyAadhaarOTP",
                    "srvparam": JSON.stringify({ 'otp': this.httpClient.encryptData(self.otpNo), txn: this.httpClient.encryptData(self.transactionId), Aadhaar: newpwd })
                }
            }
            console.log('sendRequestData', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(function (temp) {
                var res = temp[0];
                console.log('Verify otp Res = ', JSON.stringify(res));

                self.httpClient.dismissLoading();
                var userDetailData = res.data;
                if (res.status == '0') {
                    self.dismissModel(res.data[0]);
                }
                else {
                    self.httpClient.dismissLoading();
                    self.httpClient.showToast(res.message)

                }
            }
                , error => {
                    self.httpClient.dismissLoading();
                    var errorRequestData = {
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': self.httpClient.encryptData('rajkisan@123'),
                            'srvnm': 'GeoTagging',
                            "srvmethodnm": "VerifyAadhaarOTP",
                            "srvparam": JSON.stringify({ 'otp': this.httpClient.encryptData(self.otpNo), txn: this.httpClient.encryptData(self.transactionId), Aadhaar: newpwd }),
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
        }
        else {
            var self = this;
            self.httpClient.showLoading();
            // var pwd = this.httpClient.encryptData(this.mobileNumber);
            // var rno = this.httpClient.encryptData(this.data.rno);
            var newpwd = this.httpClient.encryptData(this.aadharNumber);
            var sendRequestData =
            {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "GeoTagging",
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
                    self.httpClient.showToast((self.httpClient.currentLanguage == 'hindi') ? 'रजिस्टर्ड मोबाइल नंबर पर ओ टी पी भेजा गया है कृपया ओ टी पी दर्ज करें ' : 'Please Enter the OTP sent on registered mobile number');
                }
                else {
                    self.httpClient.dismissLoading();
                    self.httpClient.showToast(res.message)

                }
            }
                , error => {
                    self.httpClient.dismissLoading();
                    var errorRequestData = {
                        'obj': {
                            'usrnm': 'rajkisan',
                            'psw': self.httpClient.encryptData('rajkisan@123'),
                            'srvnm': 'GeoTagging',
                            "srvmethodnm": "SendOtpByAadharNo",
                            "srvparam": JSON.stringify({ 'Aadhaar': self.aadharNumber }),
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
        this.recTime = 30;
        this.interval = setInterval(() => {
            this.zone.run(() => {
                this.recTime--;
                // console.log(this.recTime);
                if (this.recTime < 1) {
                    console.log("stop automatic");
                    clearInterval(this.interval);
                    this.reSendBtn = true;
                    // this.stopRecord = false;
                }
            });
        }, 1000);
        //this.setAudioPosition(true);
    }
    onOtpChange(ev) {
        console.log('ev', ev);
        this.otpNo = ev;
    }

    async dismissModel(data) {
        await this.modalController.dismiss(data);
    }

}
