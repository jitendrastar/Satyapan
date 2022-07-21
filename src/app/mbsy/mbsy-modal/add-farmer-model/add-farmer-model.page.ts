import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-add-farmer-model',
    templateUrl: './add-farmer-model.page.html',
    styleUrls: ['./add-farmer-model.page.scss'],
})
export class AddFarmerModelPage implements OnInit {

    //Get value on ionChange on IonRadioGroup
    public selectedRadioGroup: any;
    public group: any;
    public memberList: any = [];
    public selectedMembersList: any = [];
    public memberCatList: any = [];
    public memberCatID: any;
    public villList: any[] = [];
    public selectedVillId: any;
    public janAadharNo: any;
    public isProspectiveAreaDisabled: boolean = false;
    public prospectiveArea1: any;
    public prospectiveArea2: any;
    public prospectiveAreaArray1: any[] = [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }, { value: "7" }, { value: "8" }, { value: "9" }, { value: "10" }];
    public prospectiveAreaArray2: any[] = [{ value: ".0" }, { value: ".1" }, { value: ".2" }, { value: ".3" }, { value: ".4" }, { value: ".5" }, { value: ".6" }, { value: ".7" }, { value: ".8" }, { value: ".9" }];
    public prospectiveArea: any;

    constructor(public navParams: NavParams,
        public modalController: ModalController,
        public httpClient: CommonService,
        public alertCtrl: AlertController,
        public cdRef: ChangeDetectorRef) {
        this.group = this.navParams.data.group;
        console.log("Group Data = ", this.group);
        this.getCategoryList();
    }

    ngOnInit() {

    }

    dismiss() {
        this.modalController.dismiss();
    }

    getJanAadhaarDetails() {
        if (!this.janAadharNo) {
            let msg = this.httpClient.currentLanguage == "english" ? "Enter Jan Aadhar Number" : "जन आधार संख्या दर्ज करें";
            this.httpClient.showToast(msg);
            return;
        } else if (this.janAadharNo.length != 10) {
            let msg = this.httpClient.currentLanguage == "english" ? "Invalid Jan Aadhar Number" : "अमान्य जन आधार संख्या";
            this.httpClient.showToast(msg);
            return;
        }
        this.memberList = [];
        this.httpClient.showLoading();
        let credObj: any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "Memberlist";
        let paramObj: any = new Object();
        paramObj.janaadhaarId = this.janAadharNo;
        credObj.obj.srvparam = JSON.stringify(paramObj);
        this.httpClient.post(credObj).subscribe((res: any) => {
            console.log("member list data = " + JSON.stringify(res));
            this.httpClient.dismissLoading();
            if (res[0].status == 0) {
                this.memberList = res[0].data;
            } else {
                this.httpClient.showToast(res[0].message);
            }
        });
    }

    radioGroupMemberChange(event) {
        this.selectedRadioGroup = event.detail;
        console.log("radioGroupChange", JSON.stringify(this.selectedRadioGroup));
        var filteredMember = this.memberList.filter((x) => x.JAN_MEMBER_ID == this.selectedRadioGroup.value);
        console.log("Filtered JSON = " + JSON.stringify(filteredMember));
        this.selectedMembersList = filteredMember[0];
    }

    radioGroupCategoryChange(event) {
        console.log("radioGroupCategoryChange", event.detail.value);
        this.memberCatID = event.detail;
    }

    changeProspectiveArea(event) {
        console.log("changeProspectiveArea : ", event.detail.value);
        if (this.prospectiveArea1 && this.prospectiveArea1 == "10") {
            this.prospectiveArea2 = "0";
            this.isProspectiveAreaDisabled = true;
        } else {
            this.isProspectiveAreaDisabled = false;
        }
    }

    async saveTargetToLocalList() {
        let msg: string = "";
        if (this.selectedMembersList.length <= 0) {
            msg = this.httpClient.currentLanguage == "english" ? "Select Member" : "सदस्य चुनें";
            this.httpClient.showToast(msg);
        } else if (!this.memberCatID) {
            msg = this.httpClient.currentLanguage == "english" ? "Select category of Member" : "सदस्य की श्रेणी चुनें";
            this.httpClient.showToast(msg);
        } else if (!this.prospectiveArea) {
            msg = this.httpClient.currentLanguage == "english" ? "Enter Prospective Area" : "संभावित क्षेत्र दर्ज करें";
            this.httpClient.showToast(msg);
        } else if (Number(this.prospectiveArea) <= 0) {
            msg = this.httpClient.currentLanguage == "english" ? "Invalid Prospective Area" : "अमान्य संभावित क्षेत्र";
            this.httpClient.showToast(msg);
        } else {
            this.httpClient.showLoading();
            var sendRequestData = {
                "obj": {
                    "usrnm": "rajkisan",
                    "psw": "rajkisan@123",
                    "srvnm": "MBSY",
                    "srvmethodnm": "MBSYInsertFarmerDetails",
                    "srvparam": JSON.stringify({ Aadhaar: this.httpClient.encryptData(this.selectedMembersList.AADHAR_ID), mobileNo: '', janDetails: [this.selectedMembersList] })
                }
            }
            console.log('sendRequestData', sendRequestData);
            this.httpClient.post(sendRequestData).subscribe(async (temp) => {
                var res = temp[0].data[0];
                this.httpClient.dismissLoading();
                if (res && res.FarmerDetailsId) {
                    this.showPromptAddFarmer(res);
                } else {
                    this.httpClient.showToast("Something went wrong. Please try again later.")
                }
            }, error => {
                this.httpClient.showToastError();
            });
        }

    }

    async showPromptAddFarmer(farmerDetails) {
        const prompt = await this.alertCtrl.create({
            header: this.httpClient.currentLanguage == "english" ? "Confirmation!" : "पुष्टीकरण!",
            message: this.httpClient.currentLanguage == "english" ? "Are you sure to add this farmer?" : "क्या आप इस किसान को जोड़ना सुनिश्चित करेंगे?",
            backdropDismiss: false,
            buttons: [{
                text: this.httpClient.currentLanguage == "english" ? "No" : "नहीं",
                role: "cancel",
                handler: () => {
                },
            }, {
                text: this.httpClient.currentLanguage == "english" ? "Yes" : "हाँ",
                handler: async (data) => {
                    console.log("Ok clicked");
                    const memberSelected: any = new Object();
                    memberSelected.selected_member = this.selectedMembersList;
                    memberSelected.memberCatId = this.memberCatID;
                    memberSelected.farmerDetails = farmerDetails;
                    // memberSelected.prospectiveArea = this.prospectiveArea1 ? this.prospectiveArea1 + "" + this.prospectiveArea2 : '';
                    memberSelected.prospectiveArea = this.prospectiveArea;
                    await this.modalController.dismiss(memberSelected);
                },
            }],
        });
        await prompt.present();
    }

    getCategoryList() {
        let credObj: any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "GetFarmerCategoryList";
        let paramObj: any = new Object();
        credObj.obj.srvparam = JSON.stringify(paramObj);
        this.httpClient.post(credObj).subscribe(res => {
            console.log("category list data = " + JSON.stringify(res));
            if (res[0].status == 0) {
                this.memberCatList = res[0].data;
                // this.getASAssignVillageList();
            }
        });
    }

    getASAssignVillageList() {
        let credObj: any = new Object();
        credObj.obj = new Object();
        credObj.obj.usrnm = "rajkisan";
        credObj.obj.psw = "rajkisan@123";
        credObj.obj.srvnm = "Demonstration";
        credObj.obj.srvmethodnm = "GetVillageListbyUserId";
        credObj.obj.srvparam = JSON.stringify({ userid: this.httpClient.userData.userid });
        this.httpClient.post(credObj).subscribe(res => {
            console.log("category list data = " + JSON.stringify(res));
            if (res[0].status == 0) {
                this.villList = res[0].data;
                if (this.memberList[0].Village_Eng && this.memberList[0].Village_Eng.toString().trim() != '') {
                    let filteredVillage = this.villList.filter((x) => x.GPNameEn.toString().trim() == this.memberList[0].Village_Eng.toString().trim());
                    if (filteredVillage && filteredVillage.length > 0) {
                        this.selectedVillId = filteredVillage[0].GPId;
                    }
                }
            }
        });
    }

    customDecimalChecker() {
        // this.cdRef.detectChanges();
        if (!/^\d{1,2}\.?\d{0,2}$/.test(this.prospectiveArea) || Number(this.prospectiveArea) > 10) {
            this.prospectiveArea = "";
            this.httpClient.showToast("Prospective Area should be between 0.1 - 10.0 HA");
            return;
        }
    }

}
