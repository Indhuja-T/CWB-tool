import { LightningElement, track, api,wire} from 'lwc';
import relatedQuestions from '@salesforce/apex/surveyQuestion.relatedQuestions'
import saveResponse from '@salesforce/apex/surveyQuestion.saveResponse'
import reportDB from '@salesforce/apex/surveyQuestion.reportDB'
import surveyDetails from '@salesforce/apex/surveyQuestion.surveyDetails'

const COLS = [
    { label: 'Survey Name', fieldName: 'Survey_Name__c'},
    { label: 'User Name', fieldName: 'Name'},
    { label: 'Question', fieldName: 'Question_Text__c' },
    { label: 'Response', fieldName: 'Response__c',  }
   
];

export default class QuestionPage extends LightningElement {
    @track surveyid;
    @track uid;
    @track answers={};
    @track lstQuestions;
    @track ID;
    @track lstQueResponse;
    @track showCard = true;
    @track showForm = false;
    @track showTable = false;
    columns = COLS;
   
    @track n=0;
    
 
    
    get responseReceived(){
        if(this.lstQuestions){
            return true;
         }
        return false;
    }
  
    changeHandler(event){
        this.surveyid=event.target.value;
        console.log(this.surveyid);  
    }
    userChangeHandler(event){
        this.uid=event.target.value;
        console.log(this.uid);  
    }
    
    
    confirmHandler(){
       
        relatedQuestions({surveyId:this.surveyid}).then(result =>{
           this.lstQuestions = result;
           this.n=result.length;
           console.log(result);
           console.log(this.n);
           
       })
       .catch(error => {
           console.log('error'+error.message);
       });
       this.showCard = false;
       this.showForm = true;
       
    }
   
        hanldeProgressValueChange(event) {
            // this.answers = event.target.name;
            // this.answers[event.target.name] = event.detail;
            this.answers[event.target.name]=event.detail;
            console.log(event.target.name + ' now is set to ' + event.detail);
          }
      
    
    // valueChangeHandler(event){
    //     this.answers[event.target.name] = event.target.value; 
    //     console.log(event.target.name + ' now is set to ' + event.target.value);
    //     }
    
    async saveHandler(){
      //  console.log(size(this.lstQuestion));
      this.showForm = false;
      this.showTable = true;
     
    await surveyDetails({Uid:this.uid,Sid:this.surveyid}).then(result=>{
         this.SurrId=result;
         console.log(this.SurrId);
     }).catch(error => {
        console.log('error'+error.message);
    });
    
     let i=0;
        for(i=0;i<this.n;i++){
            this.ID=this.lstQuestions[i].Question_ID__c;
          if(this.answers[this.ID] ){
            // (async function(){
            //     await asyncCall();
            // })();
        saveResponse({SrId:this.SurrId,Qid:this.lstQuestions[i].Question_ID__c,Rval:this.answers[this.ID]});}}
    reportDB({Sid:this.surveyid}).then(result =>{
        // 
        console.log(JSON.stringify(result));
        let currentData = [];

        result.forEach((row) => {

            let rowData = {};

            rowData.Response__c= row.Response__c;
           

            
            if (row.Survey_Response__r.Survey__r.Survey_Name__c) {
                rowData.Survey_Name__c = row.Survey_Response__r.Survey__r.Survey_Name__c;
               
            }

           
            if (row.Survey_Response__r.User__r.Name) {
                rowData.Name = row.Survey_Response__r.User__r.Name;
            }
            if (row.Question_ID__r) {
                rowData.Question_Text__c = row.Question_ID__r.Question_Text__c;
            }

            currentData.push(rowData);
        });

        this.lstQueResponse= currentData;
        
    })
    .catch(error => {
        console.log('error'+error.message);
    });
        
       /* createRecord({ apiName: QUESTION_RESPONSE_OBJECT.objectApiName, fields: getvalues() })
            .then(contact => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created from saveForm => ' + contact.id,
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });*/
           
        
    }
}