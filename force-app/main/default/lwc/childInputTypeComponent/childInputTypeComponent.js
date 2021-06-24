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
    get type(){
        console.log(this.dt.Question_ID__r.Response_Type__c);
        if(this.dt.Question_ID__r.Response_Type__c === "Number"){
            this.tp="number";
            return true;
        }
        if(this.dt.Question_ID__r.Response_Type__c === "Rich Text Area"){
            this.tp="text";
            return true;
        }
        return false;
    }
    // hanldeProgressValueChange(event) {
    //     // this.answers = event.target.name;
    //     // this.answers[event.target.name] = event.detail;
    //     this.answers[event.target.name]=event.detail;
    //     console.log(event.target.name + ' now is set to ' + event.detail);
    //   }
    //   valueChangeHandler(event){
    //     this.answers[event.target.name] = event.target.value; 
    //     console.log(event.target.name + ' now is set to ' + event.target.value);
    //     const selectedEvent = new CustomEvent("progressvaluechange", {
    //         detail: this.answers[event.target.name],
            
    //       });
    //     }
    changeHandler(event){
        this.answers[event.target.name] = event.target.value; 
    console.log(event.target.name + ' now is set to ' + event.target.value);
        const selectedEvent = new CustomEvent("progressvaluechange", {
            detail: this.answers[event.target.name],
            value: event.target.name
          });
      
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }
}