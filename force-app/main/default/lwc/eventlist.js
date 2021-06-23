import { LightningElement, track, wire } from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';
export default class Eventlist extends LightningElement {
 @track value = 'inProgress';
valueText = "Select Event";
@wire(getprofiles)
profilelist;


get eventOptions() {
    var returnOptions = [];
    if(this.profilelist.data){
        this.profilelist.data.forEach(ele =>{
            returnOptions.push({label:ele.Name , value:ele.Name});
        }); 
    }
    console.log(JSON.stringify(returnOptions));
    return returnOptions;
}
@track allValues = [];

handleChange(event){
    if(!this.allValues.includes(event.target.value)){
        this.allValues.push(event.target.value);
        this.valueText="Event Selected";
    }
}
handleRemove(event){
    const valueRemoved = event.target.name;
    this.allValues.splice(this.allValues.indexOf(valueRemoved), 1);
}
 /*handleEventMgrChange(event) {
    this.value = event.detail.value;
    this.valueText = "Event Selected";        
 }*/
 get hasResults() {
    return (this.profilelist.data.length > 0);
 }
 
}
