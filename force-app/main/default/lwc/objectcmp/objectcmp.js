import { LightningElement, track, wire } from 'lwc';
import getobj from '@salesforce/apex/getinfo.getobj';
export default class Objectcmp extends LightningElement {
@track value = 'inProgress';
valueText = "Select Event";
@wire(getobj)
objectlist;

objectsSelected=[];

get eventOptions() {
    var returnOptions = [];
    if(this.objectlist.data){
        this.objectlist.data.forEach(ele =>{
            returnOptions.push({label:ele.SobjectType , value:ele.SobjectType});
        }); 
    }

    //console.log(JSON.stringify(returnOptions));
    return returnOptions;
}
@track allValues = [];
@track selvalue ;

handleChange(event){
    console.log("here");
    
    if(!this.allValues.includes(event.target.value)){
        this.allValues.push(event.target.value);
        this.valueText="Object Selected";
        
        this.objectsSelected.push(event.detail.value);
        
        console.log("NEW Array", this.objectsSelected );
        
        const selectedEvent = new CustomEvent('objectupdate', { detail: this.objectsSelected });
        this.dispatchEvent(selectedEvent); 

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
    return (this.objectlist.data.length > 0);
 }
 

}


