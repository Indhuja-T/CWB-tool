import { LightningElement, track,wire } from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';
export default class ObjectChildReport extends LightningElement {
lstAccounts =[{
    Id:1,
    Title:'Basic Details',
    Description:'Click here to download the basic details'
},
{
    Id:2,
    Title:'Full Details',
    Description:'Click here to download the full details'
},
{
Id:3,
Title:'Full Object And Field Details Only',
Description:'Download object and Field details in single worksheet'
},
{
Id:4,
Title:'Full DetailsObject Field Visibility on LayoutsNew!',
Description:'Deep dive into every other aspect of Object layout meta data details'
},
{
    Id:5,
    Title:'Object Page Layout Assignment',
    Description:'Explore Page layout Assigment with Profile(s).'
},
{
    Id:6,
    Title:'Custom Metadata',
    Description:'Deep dive into Custom Meta data'
},
{
    Id:7,
    Title:'Object Modified Detail!',
    Description:'For all objects (standard / custom), explore who Created & LastModified objects, with dates and time.'
},
{
    Id:8,
    Title:'Custom Field Modified detail',
    Description:'Explore who created or modified custom fields, with dates & time.'
},

];

showModal() {
    this.openModal = true;
}
closeModal() {
    this.openModal = false;
}

@track openModal = false;
openprofile=false;
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
}