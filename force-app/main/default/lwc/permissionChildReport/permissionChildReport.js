import { LightningElement, track,wire } from 'lwc';

export default class ProPermissionChildReport extends LightningElement {
lstAccounts =[{
    Id:1,
    Title:'Basic Detail',
    Description:'Fetches read/edit permission details for each field in every object across all permission sets.'

},
{
    Id:2,
    Title:'Full Details',
    Description:'Fetches all the permission set details for Application Visibilities, Class Accesses, Custom Permissions, External DataSource Access, Field Permissions, Object Permissions, Page Access, RecordType Visibilities, TabSettings, and User License.'
},
    {
Id:3,
Title:'Permission Set Assignment Detail',
Description:'Fetches user wise permission set assignments.'
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
    Title:'Permission Set Comparison',
    Description:'Compare Permission Sets based on Page Layouts, Custom permissions, Class access, Application visibilities, Field permissions, Object permissions, Page access, RecordType visibilities, Tab visibilities, and User permissions.'

},
{
    Id:7,
    Title:'Create Permission Set From Profile New!',
    Description:'Create Permission Set from Salesforce Profile. Copy User License,Application Visibilities,Class Accesses,Custom Permissions,Field Permissions,Object Permissions, Page Accesses,RecordType Visibilities,Tab Visibilities,User Permissions'

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