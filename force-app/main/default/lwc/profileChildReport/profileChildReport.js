import { LightningElement, track, wire } from "lwc";
import getprofiles from "@salesforce/apex/getinfo.getprofiles";
import GetObjectProfilePermission from "@salesforce/apex/getinfo.GetObjectProfilePermission";

export default class ObjectChildReport extends LightningElement {
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
  @track openModal = false;
  value = "";
  showModal() {
    this.openModal = true;
  }
  closeModal() {
    this.openModal = false;
  }

  Download(event) {
    console.log("here");

    var Profile = ["System Administrator", "Marketing User", "Standard User"];
    var objects = ["Account", "Contact"];
    GetObjectProfilePermission({ objects: objects, Profiles: Profile })
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
        console.log("error" + error.message);
      });
  }

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

  @track openModal = false;
  openprofile = false;
  @track val = "abc";
  picklistValues;
  error;
  @wire(getprofiles)
  wiredprofiles({ data, error }) {
    if (data) {
      this.picklistValues = data.values;
      console.log("data", data.values);
      this.error = undefined;
    }
    if (error) {
      this.picklistValues = undefined;
      this.error = error;
    }
  }
  handleValueChange(event) {
    console.log(JSON.stringify(event.detail));
  }
}
