import { LightningElement,api,track } from 'lwc';

export default class ChildInputTypeComponent extends LightningElement {
    @api dt;
    @track value;
    @track tp;
    @api value;
    @track answers={};
    @api values = []; // "yes,no"
    @api val;
    @track valueOption = [];
    valueList=[];
    
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
    
    get requirement(){
        if(this.dt.Required__c === 'Yes'){
            return true;
        }
        if(this.dt.Required__c === 'No'){
            return false;
        }

    }
    get answer(){
        if(this.value){
        for(let i=0;i<this.value.length;i++){
            
            console.log(this.dt.Question_ID__c+'11');
            console.log(this.value[i].Question_ID__c+'22');
                if(this.dt.Question_ID__c === this.value[i].Question_ID__c ){
                 //this.answer=this.value[i].Response__c;
                    console.log(this.value.Response__c+'33');
                    return this.value[i].Response__c;
                
                }
        }
                
    }
            

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
    get multipicklist(){
        if(this.dt.Question_ID__r.Response_Type__c === "Multi-Picklist"){ 
            this.pick=true; 
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
        if(!this.pick){
        this.answers[event.target.name] = event.target.value; 
        console.log(event.target.name + ' now is set to ' + event.target.value+'in child');
        console.log( this.answers[event.target.name]);
        const selectedEvent = new CustomEvent("progressvaluechange", {
          
            detail: this.answers[event.target.name],
            value: event.target.name
          });
          this.dispatchEvent(selectedEvent);
       }
         if(this.pick){
            console.log('inside picklist');
            this.answers[event.target.name]=event.detail.value.join(',');
            console.log(event.target.name + ' now is set to ' +event.detail.value+'in child');
            console.log(this.answers[event.target.name]);
            const selectedEvent = new CustomEvent("progressvaluechange", {
              
                detail:this.answers[event.target.name],
                value: event.target.name
              });
              this.dispatchEvent(selectedEvent);
        }
    }
    
   
      
}