import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/services/common.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
    selector: 'app-crop-disease-request-detail',
    templateUrl: './crop-disease-request-detail.page.html',
    styleUrls: ['./crop-disease-request-detail.page.scss'],
})
export class CropDiseaseRequestDetailPage implements OnInit {

    public requestData: any;
    public upladedImgList: any = [];
    userid: any;

    constructor(public route: ActivatedRoute,
        public httpClient: CommonService,
        public navCtrl: NavController,
        public dbService: DatabaseServiceService,
        public storage: Storage,
        public alertCtrl: AlertController) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.requestData = JSON.parse(params['requestData']);
            console.log("Selected Request Data = " + JSON.stringify(this.requestData));
            for (let i = 0; i < this.requestData.IMG_FileName.split('@').length; i++) {
                this.upladedImgList.push(this.requestData.IMG_FileName.split('@')[i]);
                console.log("Image list = " + JSON.stringify(this.upladedImgList));
            }
        });
    }

    ionViewWillEnter() {

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



}
