import { LightningElement, track, api,wire} from 'lwc';
import relatedQuestions from '@salesforce/apex/surveyQuestion.relatedQuestions'
import saveResponse from '@salesforce/apex/surveyQuestion.saveResponse'
import reportDB from '@salesforce/apex/surveyQuestion.reportDB'
import surveyDetails from '@salesforce/apex/surveyQuestion.surveyDetails'
import getSurveyId from '@salesforce/apex/surveyQuestion.getSurveyId'
import getUserId from '@salesforce/apex/surveyQuestion.getUserId'
import editResponse from '@salesforce/apex/surveyQuestion.editResponse'


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
        console.log(paramValue);
        let subString=paramValue.split('?');
        this.SurveyCode= subString[0];
        this.UserCode = subString[1];
        console.log(this.SurveyCode,this.UserCode);
        this.responseTime();
        this.setIds();
        relatedQuestions({surveyId:this.SurveyCode}).then(result =>{
            this.lstQuestions = result;
            this.n=result.length;
            console.log(result);
            console.log(this.n);
            
        })
        .catch(error => {
            console.log('error'+error.message);
        });        
    }
    setIds(){
        getSurveyId({suc:this.SurveyCode}).then(result =>{
            this.SurveyID = result;
            console.log(result);
          
        })
        .catch(error => {
            console.log('error'+error.message);
        });
        getUserId({usc:this.UserCode}).then(result =>{
            this.UserID = result;
            console.log(result);
        })
        .catch(error => {
            console.log('error'+error.message);
        });
        console.log(this.SurveyID);
        console.log(this.UserID);
    }
    responseTime(){
        editResponse({UserCode:this.UserCode,SurveyCode:this.SurveyCode}).then(result =>{
            this.lstAnswers = result;
            console.log(JSON.stringify(this.lstAnswers)+'2');
            if(this.lstAnswers.length>0){
                this.editTemplate = true;
            }
            else{
                this.editTemplate = false;
            }
            
          
        })
        .catch(error => {
            console.log('error'+error.message);
        });
    }
    
    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }
   
    @track surveyid;
    @track uid;
    @track answers={};
    @track lstQuestions;
    @track ID;
    @track lstQueResponse;
    @track showCard = false;
    @track showForm = true;
    @track showTable = false;
    @track yesResponse ;
    @track editTemplate = false;
    @track editValues=false;
    @track lstAnswers;
    columns = COLS;
   
   
    @track n=0; 
    get responseReceived(){
        if(this.lstQuestions){
            return true;
         }
        return false;
    }
        hanldeProgressValueChange(event) {
            this.answers[event.target.name]=event.detail;
            console.log(event.target.name + ' now is set to ' + event.detail);
          }
          toggleClick(){
            this.yesResponse = true;
          }
          closeModal(){
            this.editTemplate=false;
            this.yesResponse = false;
            this.showForm = false;
            this.showTable=true;
          }
          editResponseTemplate(){
              this.editValues=true;
              this.editTemplate=false;
              this.showForm=false;
          }
    async saveHandler(){
        this.editValues=false;
      this.showForm = false;
      this.showTable = true;
     
    await surveyDetails({Uid:this.UserID,Sid:this.SurveyID}).then(result=>{
         this.SurrId=result;
         console.log(this.SurrId);
     }).catch(error => {
        console.log('error'+error.message);
    });
    
        
        console.log(this.n);
        for(let i=0;i<this.n;i++){
            this.ID=this.lstQuestions[i].Question_ID__c;
          if(this.answers[this.ID] ){
           
        saveResponse({SrId:this.SurrId,Qid:this.ID,Rval:this.answers[this.ID]});}}
     
    reportDB({Sid:this.SurveyID}).then(result =>{
        // 
        console.log(JSON.stringify(result));
        let currentData = [];

        result.forEach((row) => {
            let rowData = {};
            rowData.Response__c= row.Response__c;
            rowData.Survey_Name__c = row.Survey_Response__r.Survey__r.Survey_Name__c;
            rowData.Name = row.Survey_Response__r.User__r.Name;
            rowData.Question_Text__c = row.Question_ID__r.Question_Text__c;
            currentData.push(rowData);
        });
        this.lstQueResponse= currentData;     
    })
    .catch(error => {
        console.log('error'+error.message);
    });
        
    }
}