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
        
    // handleClick(){
            
    //     var el = this.template.querySelector('lightning-datatable');
    //     var selected = el.getSelectedRows();
    //     console.log(selected.length);
        
    //     addToSurvey({SurveyId:this.recordId,questionList:selected}).then(result =>{
    //         this.data= result;
    //        window.location.reload();
            
    //     })
    // //     .catch(error => {
    // //         console.log('error'+error.message);
    // //     });
    // // }
    // //get page reference
    // @wire(CurrentPageReference) pageRef;
    
    // constructor() {
    //     super();
    //     //register dragover event to the template
    //     this.template.addEventListener('dragover', this.handleDragOver.bind(this));
    // }
    
    // //retrieve account records from database via Apex class
    // // @wire(questionSelect,{surveyId:'$recordId'}) wiredRecordsMethod({ error, data }) {
    // //     if (data) {
    // //         console.log(JSON.stringify(data));
    // //         this.lstQue  = data;
            
    // //     } else if (error) {
    // //         this.error = error;
            
    // //     }
        
    // //}

    // //when drag is start this method fires
    // handleDragStart(event) {
    //     event.dataTransfer.dropEffect = 'move';
        
    //     //retrieve AccountId from div
    //     questionSelectedId = event.target.dataset.item;
    //     //console.log('event.target.dataset.item=' + event.target.dataset.item);

    //     //loop the array, match the AccountId and retrieve the account record
    //     for(i=0; i<this.lstQue.data.length; i++) {
    //         if(lstQue!==null && questionSelectedId === this.lstQue.data[i].Id){
    //             selectedQuestion = this.lstQue.data[i]; 
    //             console.log(selectQuestion);              
    //         }                                                         
    //     } 

    //     //fire an event to the subscribers
    //     //fireEvent(this.pageRef, 'selectedAccountDrop', selectedAccount);
    // }

    // handleDragOver(event){
    //     event.dataTransfer.dropEffect = 'move';
    //     event.preventDefault();       
    // }    

    // drag(event){
    //     event.dataTransfer.setData("divId", event.target.id);
    // }
    // allowDrop(event){
    //     event.preventDefault();
    // }
    // drop(event){
    //     event.preventDefault();
    //     var divId = event.dataTransfer.getData("divId");
    //     var draggedElement = this.template.querySelector('#' +divId);
    //     draggedElement.classList.add('completed'); 
    //     event.target.appendChild(draggedElement);
    // }
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
       
        //window.alert(columnUsed + ' & '+ taskNewStatus);
        // const columnUsed = event.currentTarget.id;
        // console.log(event.target.id +'id');
        // console.log(columnUsed.includes('InProgress'));
        // console.log(columnUsed.includes('newTask'));
        // if(columnUsed.includes('InProgress')){
        //     taskNewStatus = 'In Progress';
        // }else if(columnUsed.includes('newTask')){
        //     taskNewStatus = 'Not Started';
        // }else if(columnUsed.includes('completed')){
        //     taskNewStatus = 'Completed';
        // }
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
   
     addSurvey(taskId,taskStatus)
     {
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
  /*  cancel(event){
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        return false;
    };
       
    */


