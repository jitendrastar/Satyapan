import { Component, OnInit } from "@angular/core";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { CommonService } from "../services/common.service";
import { Storage } from "@ionic/storage";
import { DatabaseServiceService } from "../services/database-service.service";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@awesome-cordova-plugins/file-transfer";
@Component({
  selector: "app-material-completed-details",
  templateUrl: "./material-completed-details.page.html",
  styleUrls: ["./material-completed-details.page.scss"],
})
export class MaterialCompletedDetailsPage implements OnInit {
  preVerificationChecklistData: any = [];
  createdChecklist: any = [];
  getPreVerificationData: any;
  workConfirmationDoc: any;
  actionType: any;
  
  constructor(
    
    public file: File,
    public alertController: AlertController,
    public dbService: DatabaseServiceService,
    public router: Router,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public storage: Storage,
    public alertCtrl: AlertController,
    public httpClient: CommonService,
    public callNumber: CallNumber,

    public camera: Camera
  ) {
    
    this.getPreVerificationData = JSON.parse(
      this.route.snapshot.paramMap.get("obj")
    );
    this.actionType = JSON.parse(
      this.route.snapshot.paramMap.get("actionType")
    );
    this.VerificationChecklist();
  }
  VerificationChecklist() {
    var self = this;
    // self.httpClient.showLoading();
    var sendRequestData = {
      obj: {
        usrnm: "rajkisan",
        psw: "rajkisan@123",
        srvnm: "HortiSubsidy",
        srvmethodnm: "VerificationChecklist",
        srvparam: JSON.stringify({
          SchemeId: this.getPreVerificationData.SubsidyId,
          StepName: "Material Verification",
          ApplicationId: this.getPreVerificationData.ApplicationId,
        }),
      },
    };
    this.httpClient.post(sendRequestData).subscribe(
      function (res: any) {
        console.log("res", res);
        if (res[0].status == 0) {
          self.preVerificationChecklistData = res[0].data;
          for (var i = 0; i < self.preVerificationChecklistData.length; i++) {
            if (self.preVerificationChecklistData[i].IsChecked == "true") {
              self.preVerificationChecklistData[i].isSelectedCheck = true;
            } else {
              self.preVerificationChecklistData[i].isSelectedClose = true;
            }

            //
          }
        } else {
          self.httpClient.showToast(res[0].data);
        }
        // self.httpClient.(res[0].message);
        // self.httpClient.dismissLoading();
      },
      (error) => {
        // self.httpClient.dismissLoading();
        var errorRequestData = {
          'obj': {
            'usrnm': 'rajkisan',
            'psw': 'rajkisan@123',
            srvresponce: error,
            userid: self.httpClient.userData.userid,
            srvnm: "HortiSubsidy",
            srvmethodnm: "VerificationChecklist",
            srvparam: JSON.stringify({
              SchemeId: self.getPreVerificationData.SubsidyId,
              StepName: "Material Verification",
              ApplicationId: self.getPreVerificationData.ApplicationId,
            })
          }
        };
        console.log('errorRequestData new', errorRequestData);
        self.httpClient.getErrorMobileLogs(errorRequestData);
        self.httpClient.showToastError();
      }
    );
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
                console.log(
                  "this.createdChecklist.length",
                  this.createdChecklist.length
                );
                for (var i = 0; i < this.createdChecklist.length; i++) {
                  if (
                    this.preVerificationChecklistData[index].Id ==
                    this.createdChecklist[i].ChecklistId
                  ) {
                    this.createdChecklist.splice(i, 1);
                    this.preVerificationChecklistData[
                      index
                    ].isSelectedCheck = false;
                  }
                }
                this.createdChecklist.push({
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
      for (var i = 0; i < this.createdChecklist.length; i++) {
        if (
          this.preVerificationChecklistData[index].Id ==
          this.createdChecklist[i].ChecklistId
        ) {
          console.log("in check");
          this.createdChecklist.splice(i, 1);
          this.preVerificationChecklistData[index].isSelectedClose = false;
          console.log("this.createdChecklist", this.createdChecklist);
        }
      }
    }
    console.log("this.createdChecklist", this.createdChecklist);
  }

  checkedCheck(index, currentFLag) {
    if (!currentFLag) {
      for (var i = 0; i < this.createdChecklist.length; i++) {
        if (
          this.preVerificationChecklistData[index].Id ==
          this.createdChecklist[i].ChecklistId
        ) {
          this.createdChecklist.splice(i, 1);
          this.preVerificationChecklistData[index].isSelectedClose = false;
        }
      }

      this.createdChecklist.push({
        ChecklistId: this.preVerificationChecklistData[index].Id,
        IsChecked: true,
        Remarks: "",
      });
      this.preVerificationChecklistData[index].isSelectedCheck = true;
      console.log("this.createdChecklist", this.createdChecklist);
    } else {
      for (var i = 0; i < this.createdChecklist.length; i++) {
        if (
          this.preVerificationChecklistData[index].Id ==
          this.createdChecklist[i].ChecklistId
        ) {
          console.log("in check");
          this.createdChecklist.splice(i, 1);
          this.preVerificationChecklistData[index].isSelectedCheck = false;
          console.log("this.createdChecklist", this.createdChecklist);
        }
      }
    }
    console.log("this.createdChecklist", this.createdChecklist);
  }
  async takePhoto() {
    this.camera.getPicture(this.httpClient.options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // this.billDetails.BillImg = imageData;

        // Upload Bill Details
        this.httpClient.showLoading();
        let options: FileUploadOptions = {
          fileKey: "files",
          params: {
            id: this.getPreVerificationData.ApplicationId,
            AppName:
              "workconfirmation/" + this.getPreVerificationData.SchemeNameEng,
            IsDirectUpload: "True",
          },
        };
        console.log("options.params", options.params);
        FileTransfer.create()
          .upload(imageData, this.httpClient.imageUploadUrl, options)
          .then(
            (data) => {
              console.log("data", data);
              this.httpClient.dismissLoading();
              // success
              var temp = JSON.parse(data.response);
              this.workConfirmationDoc = temp[0].data;
            },
            (err) => {
              // error
              this.httpClient.dismissLoading();
              this.httpClient.showToastError();
            }
          );

        console.log("this.this.workConfirmationDoc", this.workConfirmationDoc);
      },
      (err) => {
        // Handle error
      }
    );
  }
  workCompleted() {
    if (!this.workConfirmationDoc) {
      if (this.httpClient.currentLanguage == "english") {
        this.httpClient.showToast(
          "Please take photo of Work Confirmation Document"
        );
      } else {
        this.httpClient.showToast("कार्य पुष्टीकरण पत्र का फोटो लें ");
      }
    } else {
      var self = this;
      self.httpClient.showLoading();
      var sendRequestData = {
        obj: {
          usrnm: "rajkisan",
          psw: "rajkisan@123",
          srvnm: "HortiSubsidy",
          srvmethodnm: "HortiWorkCompleteConfirmByAO",
          srvparam: JSON.stringify({
            ApplicationId: this.getPreVerificationData.ApplicationId,
            userid: this.httpClient.userData.userid,
            schemeid: this.getPreVerificationData.SubsidyId,
            roleid: this.httpClient.userData.roleid,
            WorkConfirmationDocPath: this.workConfirmationDoc,
          }),
        },
      };
      this.httpClient.post(sendRequestData).subscribe(
        function (res: any) {
          self.httpClient.dismissLoading();
          if (res[0].status == 0) {
            self.navCtrl.back();
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
              srvnm: "HortiSubsidy",
              srvmethodnm: "HortiWorkCompleteConfirmByAO",
              srvparam: JSON.stringify({
                ApplicationId: self.getPreVerificationData.ApplicationId,
                userid: self.httpClient.userData.userid,
                schemeid: self.getPreVerificationData.SubsidyId,
                roleid: self.httpClient.userData.roleid,
                WorkConfirmationDocPath: self.workConfirmationDoc,
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
  ngOnInit() { }
}
