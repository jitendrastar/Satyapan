import { Component, OnInit } from '@angular/core';

import {
    ActionSheetController,
    AlertController,
    ModalController,
    NavController,
    Platform,
    PopoverController,
    ToastController
} from '@ionic/angular';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Network } from "@ionic-native/network/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { DatabaseServiceService } from './services/database-service.service';
import { NetworkStatusService } from './services/network-status.service';

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
    public isConnected: boolean;
    alreadyShowed = true;
    networkConnected = true;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

    constructor(
        public network: Network,
        public platform: Platform,
        public splashScreen: SplashScreen,
        public statusBar: StatusBar,
        public storage: Storage,
        public httpClient: CommonService,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public toastController: ToastController,
        public actionSheet: ActionSheetController,
        public popover: PopoverController,
        public router: Router,
        public geolocation: Geolocation,
        public dbService: DatabaseServiceService,
        public netService: NetworkStatusService
    ) {
        this.platform.ready().then(() => {
            console.log(this.dbService.storage);
            this.storage.get('userData').then(value => {
                console.log("value", value);
                if (value) {
                    this.httpClient.userData = value;
                    console.log('userData', value);
                    if (navigator.onLine) {
                        if (value.userType == 'subsidy') {
                            this.navCtrl.navigateRoot('dashboard');
                        } else if (value.userType == 'license') {
                            this.navCtrl.navigateRoot('lic-sub-list');
                        } else if (value.userType == 'ksk-update') {
                            this.navCtrl.navigateRoot('ksk-update');
                        } else if (value.userType == 'event') {
                            this.navCtrl.navigateRoot('event-list');
                        } else if (value.userType == 'ppchemical') {
                            this.navCtrl.navigateRoot('pp-chemical-list');
                        }  else {
                            this.navCtrl.navigateRoot('login');
                        }
                    } else {
                        console.log("this.httpClient.isOffline = true");
                        this.httpClient.isOffline = true;
                        this.navCtrl.navigateRoot('offline-mode');
                    }
                } else {
                    this.navCtrl.navigateRoot('login');
                }

                this.storage.get('roleList').then(valueRole => {
                    if (valueRole) {
                        this.httpClient.userList = valueRole;
                    }
                });
            });

            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.splashScreen.hide();

            this.geolocation.getCurrentPosition().then((resp) => {
                this.httpClient.latitude = resp.coords.latitude;
                this.httpClient.longitude = resp.coords.longitude;
                console.log(
                    "location",
                    this.httpClient.latitude,
                    this.httpClient.longitude
                );
            }).catch((error) => {
                console.log("Error getting location", error);
            });

            this.network.onDisconnect().subscribe(() => {
                console.log('network was disconnected :-(');
                this.networkConnected = false;
                this.showToast('You are appear to be offline.', 'danger');
            });

            this.network.onConnect().subscribe(() => {
                console.log('network connected!');
                if (!this.networkConnected) {
                    this.networkConnected = true;
                    this.showToast('Network is connected back', 'success');
                }
            });

            this.backButtonEvent();
        });
    }

    ngOnInit() {

    }

    backButtonEvent() {
        this.platform.backButton.subscribeWithPriority(999, async () => {
            if (this.modalCtrl.getTop() || this.alertCtrl.getTop() || this.popover.getTop() || this.actionSheet.getTop() || this.toastController.getTop()) {
                const modal = await this.modalCtrl.getTop();
                const alert = await this.alertCtrl.getTop();
                const popover = await this.popover.getTop();
                const actionSheet = await this.actionSheet.getTop();
                const toastController = await this.toastController.getTop();
                console.log(modal)
                if (modal || alert || popover || toastController || actionSheet) {
                    this.modalCtrl.dismiss();
                    this.alertCtrl.dismiss();
                    this.popover.dismiss();
                    this.actionSheet.dismiss();
                    this.toastController.dismiss();
                    return;
                } else {
                    if (this.router.url == "/login" || this.router.url == "/offline-mode") {
                        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                            // this.platform.exitApp(); // Exit from app
                            navigator['app'].exitApp(); // work in ionic 4
                        } else {
                            const toast = await this.toastController.create({
                                message: 'Press back twice to exit App.',
                                duration: 2000,
                                position: 'bottom'
                            });
                            toast.present();
                            // console.log(JSON.stringify(toast));
                            this.lastTimeBackPress = new Date().getTime();
                        }
                    } else {
                        this.navCtrl.pop();
                    }
                }
            }
        });
    }

    async showToast(message, color) {
        this.toastController.dismiss();
        const toast = await this.toastController.create({
            message: message,
            color: color,
            duration: 3000,
            position: 'top',
        });
        toast.present();
    }


}
