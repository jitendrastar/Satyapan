import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
    selector: 'app-crop-disease-submitted-list',
    templateUrl: './crop-disease-submitted-list.page.html',
    styleUrls: ['./crop-disease-submitted-list.page.scss'],
})
export class CropDiseaseSubmittedListPage implements OnInit {

    public diseaseSubmittedList: any = [];
    public mobileNo: any;
    userid: any;

    constructor(public storage: Storage,
        public httpClient: CommonService,
        public navCtrl: NavController,
        public dbService: DatabaseServiceService,
        public alertCtrl: AlertController,
        public router: Router) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.storage.get("loggedMobileNo").then(res => {
            this.mobileNo = res;
            console.log("Mobile No = " + this.mobileNo);
            this.getCropDiseaseSubmittedList();
        });
    }

    changeRole() {
        this.navCtrl.navigateRoot(["selectrole"]);
    }

    home() {
        if (this.httpClient.userList.length == 0) {
            this.navCtrl.navigateRoot([
                "subsidy-lic-selection",
                { userData: JSON.stringify([this.httpClient.userData]) },
            ]);
        }
        else {
            this.navCtrl.navigateRoot([
                "subsidy-lic-selection",
                { userData: JSON.stringify(this.httpClient.userList) },
            ]);
        }
    }


    logoutPopUp() {
        if (this.httpClient.currentLanguage == 'english') {
            this.showPrompt('Are you sure you want to logout');

        } else {
            this.showPrompt('क्या आप लॉग आउट करना चाहते हैं');
        }
    }

    logout() {
        var self = this;
        self.httpClient.showLoading();
        var sendRequestData = {
            obj: {
                usrnm: "rajkisan",
                psw: "rajkisan@123",
                srvnm: "PreVerification",
                srvmethodnm: "logoutMobileuser",
                userid: self.userid,
                srvparam: JSON.stringify({ userid: self.userid }),
            },
        };
        this.httpClient.post(sendRequestData).subscribe(
            function (temp) {
                var res: any = temp[0];
                console.log("res", res);
                if (res.status == 0) {
                    self.dbService.emptyStorage();
                    // self.storage.clear();
                    self.storage.remove('userData');
                    self.storage.remove('roleList');
                    self.httpClient.userList = '';
                    self.navCtrl.navigateRoot("login");
                } else {
                    self.httpClient.showToast(res.message);
                }
                self.httpClient.dismissLoading();
            },
            (error) => {
                self.httpClient.dismissLoading();
                var errorRequestData = {
                    obj: {
                        usrnm: "rajkisan",
                        psw: "i75Q7Q6nYgW3rgEitGndNA==",
                        srvnm: "PreVerification",
                        srvmethodnm: "logoutMobileuser",
                        userid: self.userid,
                        srvparam: JSON.stringify({ userid: self.userid }),
                    },
                };
                console.log('errorRequestData new', errorRequestData);
                self.httpClient.getErrorMobileLogs(errorRequestData);
                self.httpClient.showToastError();
            }
        );
    }

    async showPrompt(msg) {
        if (this.httpClient.currentLanguage == "hindi") {
            const prompt = await this.alertCtrl.create({
                header: "लॉग आउट",
                message: msg,
                backdropDismiss: false,

                buttons: [
                    {
                        text: "रद्द करें",
                        role: "cancel",
                        handler: () => {
                        },
                    },
                    {
                        text: "ठीक है",
                        handler: (data) => {
                            console.log("Ok clicked");
                            this.logout();
                        },
                    },
                ],
            });
            await prompt.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: "Logout",
                message: msg,
                backdropDismiss: false,

                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: () => {
                        },
                    },
                    {
                        text: "OK",
                        handler: (data) => {
                            console.log("Ok clicked");
                            this.logout();
                        },
                    },
                ],
            });
            await alert.present();
        }
    }

    getCropDiseaseSubmittedList() {
        this.httpClient.showLoading();
        // console.log("sAVED mOBLE NO = "+this.httpClient.mobileNo);

        var self = this;
        var sendRequestData =
        {
            'obj': {
                'usrnm': 'rajkisan',
                'psw': 'rajkisan@123',
                'srvnm': 'InformaticApp',
                "userid": "0",
                'srvmethodnm': 'GetCropDiseasesTreatmentList',
                'srvparam': JSON.stringify({
                    // 'mobileNo':this.httpClient.userData.MobileNo
                    'mobileNo': self.mobileNo
                })

            }
        };
        self.httpClient.post(sendRequestData).subscribe(function (temp) {
            var res: any = temp[0];
            console.log('res', JSON.stringify(res));

            if (res.status == 0) {
                self.diseaseSubmittedList = res.data;
                self.httpClient.dismissLoading();
            } else {
                self.httpClient.showToast(res.message);
                self.httpClient.dismissLoading();
            }
        }
            , error => {
            });
    }

    openRequestDetailPage(item) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                requestData: JSON.stringify(item)
            }
        };
        this.router.navigate(['/crop-disease-request-detail'], navigationExtras);
    }

    openDiseaseRequestPage() {
        this.router.navigate(['/crop-disease-request']);
    }


}
