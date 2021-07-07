import { LightningElement, wire , track } from 'lwc';
import GetObjectProfilePermission from '@salesforce/apex/RetrieveData.GetObjectProfilePermission';
export default class CSVDownload extends LightningElement {
    //data;
    //@track data;
    Download(event){
        console.log("here");
        
        var Profile = ["System Administrator","Marketing User","Standard User"];
        var objects = ["Account","Contact"];         
        GetObjectProfilePermission( {objects : objects, Profiles : Profile}).then(
            result => {
                console.log("here2");
                console.log(result);
                var blob = new Blob([result],{type: "application/octet-stream"});
                if (window.navigator.msSaveOrOpenBlob){
                    window.navigator.msSaveBlob(blob, "DemoCSV.csv");
                  }
                  else {
                    var a = window.document.createElement("a");
                
                    a.href = window.URL.createObjectURL(blob, {
                      type: "text/csv"
                    });
                    a.download = "DemoCSV.csv";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }
            }
        ).catch(
            error => {
                console.log('error'+error.message);
            }
        );
    }
}