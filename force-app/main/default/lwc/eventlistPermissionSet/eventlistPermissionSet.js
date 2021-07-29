import { LightningElement, track, wire } from "lwc";
import getPermissionSets from "@salesforce/apex/getinfo.getPermissionSets";
export default class Eventlist extends LightningElement {
  @track value = "inProgress";
  valueText = "Select Permission Sets";
  @wire(getPermissionSets)
  permissionSetsList;

  Profiles_selected = [];

  get eventOptions() {
    var returnOptions = [];
    if (this.permissionSetsList.data) {
      this.permissionSetsList.data.forEach((ele) => {
        returnOptions.push({ label: ele.Name, value: ele.Name });
      });
    }
    return returnOptions;
  }
  @track allValues = [];
  @track selvalue;

  handleChange(event) {
    console.log("here");
    if (!this.allValues.includes(event.target.value)) {
      this.allValues.push(event.target.value);
      this.selvalue = event.detail.value;
      this.valueText = "Permission Set Selected";
      this.Profiles_selected.push(this.selvalue);
      console.log(" selvalue", this.selvalue);
      console.log("NEW Array", this.Profiles_selected);
      const selectedEvent = new CustomEvent("profileupdate", {
        detail: this.Profiles_selected
      });
      this.dispatchEvent(selectedEvent);
    }
  }

  handleRemove(event) {
    const valueRemoved = event.target.name;
    this.allValues.splice(this.allValues.indexOf(valueRemoved), 1);
  }
  get hasResults() {
    return this.permissionSetsList.data.length > 0;
  }
}
