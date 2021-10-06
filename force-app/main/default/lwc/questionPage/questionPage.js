import { LightningElement, track, api,wire} from 'lwc';
import relatedQuestions from '@salesforce/apex/SurveyQuestion.relatedQuestions'
import saveResponse from '@salesforce/apex/SurveyQuestion.saveResponse'
import reportDB from '@salesforce/apex/SurveyQuestion.reportDB'
import surveyDetails from '@salesforce/apex/SurveyQuestion.surveyDetails'
import getSurveyId from '@salesforce/apex/SurveyQuestion.getSurveyId'
//import getUserId from '@salesforce/apex/SurveyQuestion.getUserId'
import editResponse from '@salesforce/apex/SurveyQuestion.editResponse'
import matchUserID from '@salesforce/apex/SurveyQuestion.matchUserID'
import testGenerate from'@salesforce/apex/SurveyQuestion.testGenerator'
import checkOTP from '@salesforce/apex/SurveyQuestion.checkOTP'
import clearOTP from '@salesforce/apex/SurveyQuestion.clearOTP'


const COLS = [
    { label: 'Survey Name', fieldName: 'Survey_Name__c'},
    { label: 'User Name', fieldName: 'Name'},
    { label: 'Question', fieldName: 'Question_Text__c' },
    { label: 'Response', fieldName: 'Response__c' }
   
];

export default class QuestionPage extends LightningElement {
     connectedCallback() {
        const param = 'Id';
        const paramValue = this.getUrlParamValue(window.location.href, param);
        // console.log(paramValue);
        // let subString=paramValue.split('?');
        // this.SurveyCode= subString[0];
        // this.UserCode = subString[1];
        // console.log(this.SurveyCode,this.UserCode);
        // this.responseTime();
        this.SurveyCode=paramValue;
        console.log(this.SurveyCode);
        this.setIds();
        //Getting question for survey
        relatedQuestions({surveyCode:this.SurveyCode}).then(result =>{
            console.log(result);
            this.lstQuestions = result;
            this.n=result.length;
            this.getTitle();
            console.log(this.lstQuestions[0].Survey_ID__r.Active__c);
            if(this.lstQuestions[0].Survey_ID__r.Active__c){
                this.Active=true;
            }
            else{
                this.Active=false;
            }
          
        })
        .catch(error => {
            console.log('error'+error.message);
        });        
    }
   
    
 
    getTitle(){
        if(this.lstQuestions){
            console.log(this.lstQuestions[0].Survey_ID__r.Survey_Name__c);
            this.title=this.lstQuestions[0].Survey_ID__r.Survey_Name__c;
            return this.lstQuestions[0].Survey_ID__r.Survey_Name__c;
        }
    }
    //Calling function to set survey and user id
    setIds(){
        getSurveyId({surveyCode:this.SurveyCode}).then(result =>{
            this.SurveyID = result;
            console.log(result);
          
        })
        .catch(error => {
            console.log('error'+error.message);
        });

        // getUserId({userCode:this.UserCode}).then(result =>{
        //     this.UserID = result;
        //     console.log(result);
        // })
        // .catch(error => {
        //     console.log('error'+error.message);
        // });
        // console.log(this.SurveyID);
        // console.log(this.UserID);
    }
    //Retrieving user response for the survey
    // responseTime(){
    //     editResponse({UserCode:this.UserCode,SurveyCode:this.SurveyCode}).then(result =>{
    //         this.lstAnswers = result;
    //         if(this.lstAnswers.length>0){
    //             this.editTemplate = true;
    //         }
    //         else{
    //             this.editTemplate = false;
    //         }
            
          
    //     })
    //     .catch(error => {
    //         console.log('error'+error.message);
    //     });
    // }
    
    //getting surveyCode from url
    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }
    @track Active;
    @track surveyid;
    @track uid;
    @track answers={};
    @track lstQuestions;
    @track ID;
    @track lstQueResponse;
    @track showCard = false;
    @track showForm = false;
    @track showUser=true;
    @track showTable = false;
    @track editTemplate = false;
    @track editValues=false;
    @track lstAnswers;
    @track yesResponse = false;
    @track userDetails ={};
    @track title;
    @track pass;
    @track pwd;
    @track pressedSend=false;
    @track showStartBtn=false;
    @track confirmDisabler=false;
    @track timeVal = '5:00';
    columns = COLS;
   
   
    @track n=0;
    // Check whether questions are loaded
    async handleVerify(){
        console.log('Yes in verify');
        this.pressedSend = true;
        this.showStartBtn = true;
        var parentThis = this;
        var minute = 4;
        var sec = 60;
        var interval= setInterval(function () {
            parentThis.timeVal = minute + " : " + sec;   
            
            sec--;
            if (sec == '00'){
               minute--;
               sec = 60;
               if(  minute < 0){              
                clearInterval(interval);
               }
            }
         }, 1000);
         
             
       setTimeout(() => {
        this.showStartBtn = false;
        this.timeVal = '0:00';
        this.confirmDisabler = true;
        clearOTP({empID:this.userDetails['Employee_ID']});
       }, 300000);
        await  matchUserID({empID:this.userDetails['Employee_ID'],name:this.userDetails['Employee_Name'],email:this.userDetails['Email']}).then(result =>{
            this.currentUserID = result;
            console.log(this.currentUserID);
          
        })
        .catch(error => {
            console.log('error'+error.message);
        }); 

       testGenerate({empID:this.userDetails['Employee_ID']})
       
    //    sendMail({pwd:this.pwd,name:this.userDetails['Employee_Name'],emailId:this.userDetails['Email']}).then(result=>{
    //     console.log(this.pwd);
    //     console.log(result);
    //    }).catch(error =>{
    //     console.log('error'+error.message);
    //    })
   }
   handlePwdChange(event){
       this.pass=event.target.value;
       console.log(this.pass);
   }
    get responseReceived(){
        if(this.lstQuestions){
            return true;
         }
        return false;
    }
    //Handles user input value change
    hanldeProgressValueChange(event) {
        this.answers[event.target.name]=event.detail;
        console.log(event.target.name + ' now is set to ' + event.detail);
                       
     }
     //togglebuttom function
    toggleClick(){
        console.log(this.yesResponse);
            if(this.yesResponse === true){
                this.yesResponse = !this.yesResponse;
                console.log(this.yesResponse+'2');
            }
            if(this.yesResponse === false){
                this.yesResponse = !this.yesResponse;
                console.log(this.yesResponse+'3');
            } 
    }
     // check whether to show edit template    
    get wantResponse(){
        console.log(this.yesResponse+'1');
        return this.yesResponse;  
    }
    //Function for close modal
    closeModal(){
        this.editTemplate=false;
        this.yesResponse = false;
        this.showForm = false;
        this.showTable=true;
    }
    //Function for ok button in modal
    editResponseTemplate(){
        this.editValues=true;
        this.editTemplate=false;
        this.showForm=false;
    }
    showToast(){
        const event = new ShowToastEvent({
            title: 'Toast message',
            message: 'Toast Message',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
       }
    //function to store user details
    async confirmHandler(event) {
        if(this.pass){
        await checkOTP({empID:this.userDetails['Employee_ID'],pwd:this.pass}).then(result =>{
            this.verify = result;
            console.log(this.verify+'verify');
        })
        .catch(error =>{
            console.log('error'+error);
        })
        
        if(this.verify){
            clearOTP({empID:this.userDetails['Employee_ID']});
            this.showUser=false;
        this.showForm=true;
        this.pwd="";
        this.pass="";
            console.log("Password Matched");
            console.log(this.userDetails['Email']);
            // await  matchUserID({empID:this.userDetails['Employee_ID'],name:this.userDetails['Employee_Name'],email:this.userDetails['Email']}).then(result =>{
            //     this.currentUserID = result;
            //     console.log(this.currentUserID);
              
            // })
            // .catch(error => {
            //     console.log('error'+error.message);
            // });   
            //Returns already entered user data for survey
            editResponse({UserCode:this.currentUserID,SurveyCode:this.SurveyCode}).then(result =>{
                this.lstAnswers = result;
                console.log('baba');
                console.log(this.lstAnswers.length);
                console.log(this.lstAnswers);
                if(this.lstAnswers.length>0){
                    this.editTemplate = true;
                    console.log('hi');
                }
                else{
                    this.editTemplate = false;
                    console.log('Hello');
                } 
            })
            .catch(error => {
                console.log('error'+error.message);
            });     
        }
        else{
            console.log("OTP Mismatch");
           alert('Please Check the OTP sent using mail.');
        }
    }
    else{
        alert('Please enter the OTP');
    }
        
        
     }

     //Handles input change in user info input
     userChangeHandler(event) {
        this.userDetails[event.target.name]=event.target.value;
        console.log(event.target.name + ' now is set to ' + event.target.value);                
     }

     //Saves the user response    
    async saveHandler(event){
        // console.log(JSON.stringify( [this.template.querySelector('c-child-Input-Type-Component')]));
        // //if(allValid){  
        //  this.allValid = [this.template.querySelector('c-child-Input-Type-Component').play()]
        // // .reduce((validSoFar, inputCmp) => {
        // //             inputCmp.reportValidity();
        // //             return validSoFar && inputCmp.checkValidity();
                    
        // // }, true);
        // console.log(this.allValid+'yes');
        // console.log(JSON.stringify(this.allValid));//}
      
    //if (this.allValid) {
        this.fault=false;
        console.log(this.editValues+'this');
        if(this.editValues === false){
            console.log(this.editValues+'this');
            for(let i=0;i<this.n;i++){
                this.ID=this.lstQuestions[i].Question_ID__c;
                if(this.lstQuestions[i].Required__c === 'Yes'){
                    if(this.answers[this.ID] === undefined){
                        this.fault=true;
                        break;
                    }
                }
            }
        }
  
        if(this.fault === true){
                alert('Please fill the required field and try again.');
        }   
        else{
            this.editValues=false;
            this.showForm = false;
            this.showTable = true;
            
            //Getting survey Response detail 
            await surveyDetails({empId:this.currentUserID,surveyId:this.SurveyID}).then(result=>{
                this.SurrId=result;
                console.log(this.SurrId);
            }).catch(error => {
                console.log('error'+error.message);
            });
            //storing question response and retrieveing data fo report
                for(let i=0;i<this.n;i++){
                    this.ID=this.lstQuestions[i].Question_ID__c;
                    console.log(this.ID+'here in questionpage');
                    console.log(this.answers[this.ID]);
                        if(this.answers[this.ID] ){
                            saveResponse({surveyResponseId:this.SurrId,questionId:this.ID,userId:this.currentUserID,responseVal:this.answers[this.ID]});}
                        }
                        reportDB({surveyId:this.SurveyID}).then(result =>{
                           let currentData = [];
                           console.log(JSON.stringify(result));
                           result.forEach((row) => {
                                   let rowData = {};
                                   rowData.Response__c= row.Response__c;
                                   rowData.Survey_Name__c = row.Survey_Response__r.Survey__r.Survey_Name__c;
                                   console.log(row.Survey_Response__r.Employee__r.Name);
                                   rowData.Name = row.Survey_Response__r.Employee__r.Name;
                                   rowData.Question_Text__c = row.Question_ID__r.Question_Text__c;
                                   currentData.push(rowData);
                           });
                            this.lstQueResponse= currentData;     
                       })
                       .catch(error => {
                       console.log('error'+error.message);
                       });
           
        }    
     
    // } else {
    // alert('Please update the invalid form entries and try again.');
    // }   
    }
}