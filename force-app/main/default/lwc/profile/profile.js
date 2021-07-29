import { LightningElement, track, wire } from "lwc";
//import getprofiles from "@salesforce/apex/getinfo.getprofiles";
import GetObjectProfilePermission from "@salesforce/apex/getinfo.GetObjectProfilePermission";

export default class Profile extends LightningElement {
  selectedProfiles = [];
  selectedObjects = [];

  lstAccounts = [
    {
      Id: 1,
      Title: "Basic Profile Details",
      Description:
        "Explore basic details about profile like apex classes, pages, object permissions, applications and general user permissions."
    },
    {
      Id: 2,
      Title: "Full Profile Details",
      Description:
        "On top of all the basic permissions in above report, this reports additionally offers field level security, record type and layout assignments, record type visibilities, tabs, and login IP range"
    },
    {
      Id: 3,
      Title: "Download Profile Users with permission set assignment",
      Description: ""
    },
    {
      Id: 4,
      Title: "Profile Modified Detail",
      Description: "Explore who created or modified Profile."
    },
    {
      Id: 5,
      Title: "Tab Visibility Detail",
      Description: "Explore Tab Visibility in Profile."
    },

    {
      Id: 6,
      Title: "Object or Field Permission Only",
      Description: ""
    }
  ];

  value = "";

  get opt() {
    return [
      { label: "In this Salesforce Org", value: "option1" },
      { label: "In other Salesforce Org", value: "option2" }
    ];
  }
  showModal() {
    this.openModal = true;
  }
  closeModal() {
    this.openModal = false;
  }

  ProfileUpdate(event) {
    //console.log("event h",event.detail);
    this.selectedProfiles = event.detail;
    console.log("CHanges in PROFILE parent", this.selectedProfiles);
  }

  objectUpdate(event) {
    this.selectedObjects = event.detail;
    console.log("CHanges in Object parent", this.selectedObjects);
  }

  @track openModal = false;

  Download(event) {
    var key = event.currentTarget.getAttribute("data-item");
    if (key == 1) {
      // 1st column call function
      GetObjectProfilePermission({
        objects: this.selectedObjects,
        Profiles: this.selectedProfiles
      })
        .then((result) => {
          console.log("here2");
          console.log(result);
          var blob = new Blob([result], { type: "application/octet-stream" });
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, "DemoCSV.csv");
          } else {
            var a = window.document.createElement("a");

            a.href = window.URL.createObjectURL(blob, {
              type: "text/csv"
            });
            a.download = "DemoCSV.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        })
        .catch((error) => {
          console.log("error " + error.message);
        });
    } else if (key == 2) {
      //call function
    }

    console.log("selectedProfiles", this.selectedProfiles);
    console.log("selectedObjects", this.selectedObjects);

  }

