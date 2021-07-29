import { LightningElement, track, wire } from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';
export default class Eventlist extends LightningElement {


@track value = 'inProgress';
valueText = "Select Profile";

@wire(getprofiles)
profilelist;





Profiles_selected = [];

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
@track selvalue ;

handleChange(event){
    if(!this.allValues.includes(event.target.value)){
        this.allValues.push(event.target.value);
        this.valueText="Event Selected";
    }
}



/*handleChange(event){
    if(!this.allValues.includes(event.detail.value))
    {
        this.selvalues.push(event.detail.value);
        console.log(' selvalues',this.selvalues);
    }
}*/
handleChange(event){
    console.log("here");
    if(!this.allValues.includes(event.target.value)){
        this.allValues.push(event.target.value);
        this.selvalue = event.detail.value;        
        this.valueText="Profile Selected";

        // selvalues = [];
        // if(this.selvalue!=null)
        // {
        //     this.selvalues.push(this.selvalue);
        // }

        //console.log(' selvalues',this.selvalues); 
        this.Profiles_selected.push(this.selvalue);
        console.log(' selvalue',this.selvalue);
        console.log("NEW Array", this.Profiles_selected ); 
        const selectedEvent = new CustomEvent('profileupdate', { detail: this.Profiles_selected });
        this.dispatchEvent(selectedEvent);
    }}
    
  
    //console.log('all values',this.allValues);
   



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
/*handlepillselection(event){
    const index = event.target.dataset.index;
    let selectedItem = this.allValues[index];
    this.selvalue =  selectedItem.label;
    console.log("selected ", selectedItem); 
 }*/
 



