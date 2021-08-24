import { LightningElement,track,wire,api } from 'lwc';
import questionSelect from '@salesforce/apex/SurveyQuestion.questionSelect'
import getAddedQuestion from '@salesforce/apex/SurveyQuestion.getAddedQuestion'
import addToSurvey from '@salesforce/apex/SurveyQuestion.addToSurvey'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const COLS = [
    { label: 'Question Text', fieldName: 'Question_Text__c'},
    { label: 'Response Type', fieldName: 'Response_Type__c'},
    { label: 'Picklist Value', fieldName: 'Picklist_Values__c' }   
];

export default class QuestionSelect extends LightningElement {
    @track lstQue;
    @track questionAdded;
    @api recordId;
    columns = COLS;
    connectedCallback(){
        // console.log(this.recordId);
        // questionSelect({surveyId:this.recordId}).then(result =>{
        //     console.log(result);
        //     this.lstQue = result;
        // })
        // .catch(error => {
        //     console.log('error'+error.message);
        // });
        // getAddedQuestion({surveyId:this.recordId}).then(result =>{
        //     console.log(result+"11");
        //     this.questionAdded = result;
        // })
        // .catch(error => {
        //     console.log('error'+error.message);
        // });
        this.getTaskData();
    }
     showSuccessNotification() {
         console.log('Success');
        const evt = new ShowToastEvent({
            title: "Success",
            message: "Question successfully added",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    showSuccessRemoveNotification() {
        const evt = new ShowToastEvent({
            title: "Success",
            message: "Question successfully removed",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    getTaskData(){
        questionSelect({surveyId:this.recordId}).then(result =>{
            console.log(result);
            this.lstQue = result;
        })
        .catch(error => {
            console.log('error'+error.message);
        });
        getAddedQuestion({surveyId:this.recordId}).then(result =>{
            console.log(result+"11");
            this.questionAdded = result;
        })
        .catch(error => {
            console.log('error'+error.message);
        });
    }
        
    taskDragStart(event){
        const taskId = event.target.id.substr(0,18);
        //window.alert(taskId);
        this.dropTaskId = taskId;
        let draggableElement = this.template.querySelector('[data-id="' + taskId + '"]');
        draggableElement.classList.add('drag');
        this.handleTaskDrag(taskId);
    }

    taskDragEnd(event){
        const taskId = event.target.id.substr(0,18);
        //window.alert(taskId);
        let draggableElement = this.template.querySelector('[data-id="' + taskId + '"]');
        draggableElement.classList.remove('drag');
    }

    handleDropAdd(event){
        this.cancel(event);
        let taskNewStatus;
        if(this.template.querySelectorAll('div[id=InProgress]')){
            taskNewStatus = 'In Progress';
            console.log(taskNewStatus);
        }
       
        this.addSurvey(this.dropTaskId,taskNewStatus);
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');
    }
    handleDropRemove(event){
        this.cancel(event);
        let taskNewStatus;
        if(this.template.querySelectorAll('div[id=newTask]')){
            taskNewStatus = 'Not Started';
            console.log(taskNewStatus);
        }
        this.addSurvey(this.dropTaskId,taskNewStatus);
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');
    }
    handleDragEnter(event){
        this.cancel(event);
    }

    handleDragOver(event){
        this.cancel(event);
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.add('over');
    }

    handleDragLeave(event){
        this.cancel(event);
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');
    }

    handleTaskDrag(taskId){
        console.log('$$$TEst: '+ taskId);
    }
   
     addSurvey(taskId,taskStatus){
        addToSurvey({surveyId:this.recordId,questionId:taskId,status:taskStatus}).then(result =>{
            console.log(result+'22');
             this.getTaskData();
             if(taskStatus==='In Progress'){
                 console.log('In progress');
                this.showSuccessNotification(); 
             }
             if(taskStatus === 'Not Started'){
                console.log('Not Started');
                this.showSuccessRemoveNotification();
             }
             

        }).catch(error =>{
            console.log('$$$Test2:'+ JSON.stringify(error));
        })
    }
    cancel(event) {
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        return false;
    };
        
    
}
   
  
   
