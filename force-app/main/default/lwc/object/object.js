import { LightningElement, track,wire } from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';
export default class Object extends LightningElement {
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
@track openModal = false;
showModal() {
    this.openModal = true;
}
closeModal() {
    this.openModal = false;
}

}

