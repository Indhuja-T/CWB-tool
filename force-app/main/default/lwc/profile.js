import { LightningElement, track,wire } from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';
export default class Profile extends LightningElement {
lstAccounts =[{
    Id:1,
    Title:'Basic Profile Details',
    Description:'Explore basic details about profile like apex classes, pages, object permissions, applications and general user permissions.'
},
{
    Id:2,
    Title:'Full Profile Details',
    Description:'On top of all the basic permissions in above report, this reports additionally offers field level security, record type and layout assignments, record type visibilities, tabs, and login IP range'
},
{
Id:3,
Title:'Download Profile Users with permission set assignment',
Description:''
},
{
Id:4,
Title:'Profile Modified Detail',
Description:'Explore who created or modified Profile.'
},
{
    Id:5,
    Title:'Tab Visibility Detail',
    Description:'Explore Tab Visibility in Profile.'
},

{
    Id:6,
    Title:'Object or Field Permission Only',
    Description:''
},

]

value = '';

get opt() {
    return [
        { label: 'In this Salesforce Org', value: 'option1' },
        { label: 'In other Salesforce Org', value: 'option2' },
    ];
}
showModal() {
    this.openModal = true;
}
closeModal() {
    this.openModal = false;
}

@track openModal = false;
/*openprofile=false;
@track val='abc';
picklistValues;
error;
@wire(getprofiles) 
wiredprofiles({data, error}){
if(data){
this.picklistValues=data.values;
console.log('data', data.values);
this.error=undefined;
}
if(error)
{
    this.picklistValues=undefined;
    this.error=error;   
}
}
handleValueChange(event)
{
    console.log(JSON.stringify(event.detail));
}
}*/
}

/*get opt() {
    var returnOptions = [];
    if(this.profilelist.data){
        this.profilelist.data.forEach(ele =>{
            returnOptions.push({label:ele.Name , value:ele.Name});
        }); 
    }
    console.log(JSON.stringify(returnOptions));
    return returnOptions;
}
handleChange(event) {
    this.val = event.detail.val;
}
get hasResults() {
    return (this.profilelist.data.length > 0);
 }*/
