import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { CommonService } from "../services/common.service";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DatabaseServiceService } from "../services/database-service.service";
import { FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-pp-chemical',
  templateUrl: './add-pp-chemical.page.html',
  styleUrls: ['./add-pp-chemical.page.scss'],
})
export class AddPpChemicalPage implements OnInit {
  FarmerCategory: any;
  Areahectare: any;
  CropCategory: any;
  constructor(public dbService: DatabaseServiceService,
    public navCtrl: NavController,
    public router: Router,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public storage: Storage,
    public platform: Platform,
    public camera: Camera,

    public geolocation: Geolocation) { }

  ngOnInit() {
  }
  getvalue_farmer(){

  }
}
