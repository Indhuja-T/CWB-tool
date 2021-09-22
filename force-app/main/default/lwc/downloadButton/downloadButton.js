import { LightningElement, track,api} from 'lwc';
import reportDB from '@salesforce/apex/SurveyQuestion.reportDB'


// datatable columns
const cols = [
    { label: 'Employee Name', fieldName: 'Name'},
    { label: 'Question', fieldName: 'Question_Text__c' },
    { label: 'Response', fieldName: 'Response__c' } 
];

export default class ExportDataToCSVInLWC extends LightningElement {
    @track error;
    @track data;
    @track columns = cols;
    @track lstQueResponse;
        @api recordId;
           connectedCallback(){
          
            this.getTaskData();
        }
    
       getTaskData(){
            reportDB({surveyId:this.recordId}).then(result =>{
                let currentData = [];
                console.log(JSON.stringify(result));
                result.forEach((row) => {
                    let rowData = {};
                    rowData.Name = row.Survey_Response__r.Employee__r.Name;
                    rowData.Question_Text__c = row.Question_ID__r.Question_Text__c;
                    rowData.Response__c= row.Response__c;
                    console.log(row.Survey_Response__r.Employee__r.Name);
                    // if(!(row.Question_ID__r.Response_Type__c === 'Picklist')){
                        currentData.push(rowData);
                   // }
                    
            });
             this.lstQueResponse= currentData;     
            })
                .catch(error => {
                console.log('error'+error.message);
            });
        } 

    // this constructor invoke when component is created.
    // once component is created it will fetch the accounts
    

    // fetching accounts from server
    
    // this method validates the data and creates the csv file to download
    downloadCSVFile() {   
        let rowEnd = '\n';
        let csvString = '';
        // this set elminates the duplicates if have any duplicate keys
        let rowData = new Set();

        // getting keys from data
        this.lstQueResponse.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                rowData.add(key);
            });
        });

        // Array.from() method returns an Array object from any object with a length property or an iterable object.
        rowData = Array.from(rowData);
        
        // splitting using ','
        csvString += rowData.join(',');
        csvString += rowEnd;

        // main for loop to get the data based on key value
        for(let i=0; i < this.lstQueResponse.length; i++){
            let colValue = 0;

            // validating keys in data
            for(let key in rowData) {
                if(rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if(colValue > 0){
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = this.lstQueResponse[i][rowKey] === undefined ? '' : this.lstQueResponse[i][rowKey];
                    csvString += '"'+ value +'"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Survey Data.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click(); 
    }

}
