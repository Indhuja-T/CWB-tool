import { LightningElement,api,track } from 'lwc';

export default class ChildInputTypeComponent extends LightningElement {
    @api dt;
    @track tp;
    @track answers={};
    @api values = [] // "yes,no"
    @track answers ={};
    @api val;
    @track valueOption = []
    connectedCallback() {
        this.processOptions();
    }
    processOptions() {
        // logic to generate value option pair goes here
        if(this.val){
        this.valueOption = this.val
                      .split(',')
                      .map(el => {
                        return { label: el, value: el }
                      });}
    }
    get text(){
        if(this.dt.Question_ID__r.Response_Type__c === "Rich Text Area"){    
            return true;
        }
        return false;
    }
    get number(){
        if(this.dt.Question_ID__r.Response_Type__c === "Number"){  
            return true;
        }
        return false;
    }
    get picklist(){
        if(this.dt.Question_ID__r.Response_Type__c === "Picklist"){  
            return true;
        }
        return false;
    }
    get tel(){
        if(this.dt.Question_ID__r.Response_Type__c === "Phone"){  
            return true;
        }
        return false;
    }
    get date(){
        if(this.dt.Question_ID__r.Response_Type__c === "Date"){  
            return true;
        }
        return false;
    }
    get email(){
        if(this.dt.Question_ID__r.Response_Type__c === "Email"){  
            return true;
        }
        return false;
    }
   
    changeHandler(event){
        this.answers[event.target.name] = event.target.value; 
    console.log(event.target.name + ' now is set to ' + event.target.value);
        const selectedEvent = new CustomEvent("progressvaluechange", {
            detail: this.answers[event.target.name],
            value: event.target.name
          });
          this.dispatchEvent(selectedEvent);
    }
}