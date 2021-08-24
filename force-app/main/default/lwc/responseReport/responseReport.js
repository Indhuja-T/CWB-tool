import { LightningElement,track,api } from 'lwc';
import reportDB from '@salesforce/apex/SurveyQuestion.reportDB'
import testGenerate from'@salesforce/apex/trial.testGenerate'
const COLS = [
    { label: 'Survey Name', fieldName: 'Survey_Name__c'},
    { label: 'User Name', fieldName: 'Name'},
    { label: 'Question', fieldName: 'Question_Text__c' },
    { label: 'Response', fieldName: 'Response__c' }
   
];
export default class ResponseReport extends LightningElement {
    @track pass;
    @track pwd;
//     @track lstQueResponse;
//     @api recordId;
//     columns = COLS;
//     connectedCallback(){
//         this.getTaskData();
//     }

//    getTaskData(){
//         reportDB({surveyId:this.recordId}).then(result =>{
//             let currentData = [];
//             console.log(JSON.stringify(result));
//             result.forEach((row) => {
//                 let rowData = {};
//                 rowData.Response__c= row.Response__c;
//                 rowData.Survey_Name__c = row.Survey_Response__r.Survey__r.Survey_Name__c;
//                 console.log(row.Survey_Response__r.Employee__r.Name);
//                 rowData.Name = row.Survey_Response__r.Employee__r.Name;
//                 rowData.Question_Text__c = row.Question_ID__r.Question_Text__c;
//                 if(!(row.Question_ID__r.Response_Type__c === 'Picklist')){
//                     currentData.push(rowData);
//                 }
                
//         });
//          this.lstQueResponse= currentData;     
//         })
//             .catch(error => {
//             console.log('error'+error.message);
//         });
//     } 

handleVerify(){
     
    
     testGenerate().then(result =>{
        console.log(result);
        this.pwd = result;
        console.log(this.pwd);
    })
    .catch(error => {
        console.log('error'+error.message);
    });
}
handlePwdChange(event){
    this.pass=event.target.value;
    console.log(this.pass);
}
handleLogin(){
    console.log(this.pwd);
    console.log(this.pass);
    if(this.pass === this.pwd){
        console.log("Password Matched");
    }
    else{
        console.log("Password Mismatch");
    }
    this.pwd="";
    this.pass="";
}
}