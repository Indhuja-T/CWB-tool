import { LightningElement, track, wire } from "lwc";
import getPermissionsForObjects from "@salesforce/apex/PermissionSet_CWB.getPermissionsForObjects";
import getPermissionSetAssignmentDetails from "@salesforce/apex/PermissionSet_CWB.getPermissionSetAssignmentDetails";
import getPermissionSetModifiedDetails from "@salesforce/apex/PermissionSet_CWB.getPermissionSetModifiedDetails";
export default class ProPermissionChildReport extends LightningElement {
  selectedPermissionsSet = [];
  selectedObjects = [];
  lstAccounts = [
    {
      Id: 1,
      Title: "Basic Detail",
      Description:
        "Fetches read/edit permission details for each field in every object across all permission sets."
    },
    {
      Id: 2,
      Title: "Full Details",
      Description:
        "Fetches all the permission set details for Application Visibilities, Class Accesses, Custom Permissions, External DataSource Access, Field Permissions, Object Permissions, Page Access, RecordType Visibilities, TabSettings, and User License."
    },
    {
      Id: 3,
      Title: "Permission Set Assignment Detail",
      Description: "Fetches user wise permission set assignments."
    },
    {
      Id: 4,
      Title: "Permission Set Modified Detail",
      Description: "Explore who created or modified Permission Set."
    },
    {
      Id: 5,
      Title: "Tab Visibility Detail",
      Description: "Explore Tab Visibility in Profile."
    },

    {
      Id: 6,
      Title: "Permission Set Comparison",
      Description:
        "Compare Permission Sets based on Page Layouts, Custom permissions, Class access, Application visibilities, Field permissions, Object permissions, Page access, RecordType visibilities, Tab visibilities, and User permissions."
    },
    {
      Id: 7,
      Title: "Create Permission Set From Profile New!",
      Description:
        "Create Permission Set from Salesforce Profile. Copy User License,Application Visibilities,Class Accesses,Custom Permissions,Field Permissions,Object Permissions, Page Accesses,RecordType Visibilities,Tab Visibilities,User Permissions"
    }
  ];

  value = "";

  get opt() {
    return [
      { label: "In this Salesforce Org", value: "option1" },
      { label: "In other Salesforce Org", value: "option2" }
    ];
  }
  @track openModal = false;
  showModal() {
    this.openModal = true;
  }
  closeModal() {
    this.openModal = false;
  }

  ProfileUpdate(event) {
    this.selectedPermissionsSet = event.detail;
    console.log("CHanges in PROFILE parent", this.selectedPermissionsSet);
  }

  objectUpdate(event) {
    this.selectedObjects = event.detail;
    console.log("CHanges in Object parent", this.selectedObjects);
  }

  Download(event) {
    var key = event.currentTarget.getAttribute("data-item");
    if (key == 1) {
      getPermissionsForObjects({
        objects: this.selectedObjects,
        permissionSets: this.selectedPermissionsSet
      })
        .then((data) => {
          DownloadCSV(data);
        })
        .catch((error) => {
          console.log("error " + error.message);
        });
    } else if (key == 3) {
      getPermissionSetAssignmentDetails()
        .then((data) => {
          DownloadCSV(data);
        })
        .catch((error) => {
          console.log("error " + error.message);
        });
    } else if (key == 4) {
      getPermissionSetModifiedDetails()
        .then((data) => {
          
          DownloadCSV(data);
        })
        .catch((error) => {
          console.log("error " + error.message);
        });
    }

    //console.log("selectedProfiles", this.selectedPermissionsSet);
    //console.log("selectedObjects", this.selectedObjects);
  }
}
function DownloadCSV(data) {
  var blob = new Blob([data], { type: "application/octet-stream" });
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
}
