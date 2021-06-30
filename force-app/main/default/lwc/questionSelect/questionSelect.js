import { LightningElement,track,wire,api } from 'lwc';
import questionSelect from '@salesforce/apex/surveyQuestion.questionSelect'
import addToSurvey from '@salesforce/apex/surveyQuestion.addToSurvey'
import {  CurrentPageReference } from 'lightning/navigation';
const COLS = [
    { label: 'Question Text', fieldName: 'Question_Text__c'},
    { label: 'Response Type', fieldName: 'Response_Type__c'},
    { label: 'Picklist Value', fieldName: 'Picklist_Values__c' }   
];

export default class QuestionSelect extends LightningElement {
    @track lstQue;
    @api recordId;
    columns = COLS;
    connectedCallback(){
        console.log(this.recordId);
        questionSelect({Suid:this.recordId}).then(result =>{
            this.lstQue = result;
        })
        .catch(error => {
            console.log('error'+error.message);
        });
    }
        handleClick(){
            
        var el = this.template.querySelector('lightning-datatable');
        var selected = el.getSelectedRows();
        console.log(selected.length);
        
        addToSurvey({SurveyId:this.recordId,ql:selected}).then(result =>{
            this.data= result;
           window.location.reload();
            
        })
        .catch(error => {
            console.log('error'+error.message);
        });}
        @wire(CurrentPageReference)
        getpageRef(pageRef) {
            console.log('data => ', JSON.stringify(pageRef));
           
        }
        
    
        
    }
   
  
   
