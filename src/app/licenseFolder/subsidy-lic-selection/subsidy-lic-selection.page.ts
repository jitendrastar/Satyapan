import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { AlertController, IonDatetime, NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-subsidy-lic-selection",
    templateUrl: "./subsidy-lic-selection.page.html",
    styleUrls: ["./subsidy-lic-selection.page.scss"],
})
export class SubsidyLicSelectionPage implements OnInit {
    userData: any = [];

    constructor(
        public httpClient: CommonService,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public storage: Storage,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.userData = JSON.parse(this.route.snapshot.paramMap.get("userData"));
        console.log("this.userData", JSON.parse(this.route.snapshot.paramMap.get("userData")));

    }

    ngOnInit() {
    }

    gotoSubsidy() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "subsidy";
            this.httpClient.userData = this.userData[0];
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["dashboard", { userDataDashboard: JSON.stringify(this.userData[0]) },]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "subsidy";
            }
            this.httpClient.userList = this.userData;
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

            // , {userData: JSON.stringify(this.userData), userType: "subsidy"},


        }
    }

    gotoLicense() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "license";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot([
                "lic-sub-list",
                { userDataDashboard: JSON.stringify(this.userData[0]) },
            ]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "license";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

        }
    }

    gotoWhether() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "wheather-update";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["wheather-update"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "wheather-update";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

        }
    }

    gotoKsk() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "ksk-update";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["ksk-update"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "ksk-update";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

        }
    }

    gotoDemonstration() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "demonstration";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["demonstration-dashboard"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "demonstration";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

        }
    }

    gotoCropDiseaseTreatment() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "crop-disease-treatment";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["crop-disease-submitted-list"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "crop-disease-treatment";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })

        }
    }

    gotoMiniKit() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "minikit";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["mini-kit-dashboard"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "minikit";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })
        }
    }

    gotoMBSY() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "mbsy";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["mbsy-dashboard"]);
        } else {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].userType = "mbsy";
            }
            this.storage.set('roleList', this.userData).then(value => {
                this.navCtrl.navigateRoot(["selectrole"]);
            })
        }
    }

    eventlist() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "event";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["event-list"]);
        } else {
            this.userData[0].userType = "event";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["event-list"]);
        }
    }
    gotoppchemical() {
        if (this.userData.length == 1) {
            this.userData[0].userType = "ppchemical";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["pp-chemical-list"]);
        } else {
            this.userData[0].userType = "ppchemical";
            this.httpClient.userData = this.userData[0];
            console.log("this.userData[0].userType", this.userData[0].userType);
            this.httpClient.login(this.userData[0]);
            this.navCtrl.navigateRoot(["pp-chemical-list"]);
        }
    }
}
