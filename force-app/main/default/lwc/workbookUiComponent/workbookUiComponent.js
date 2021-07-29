import { LightningElement,track,wire} from 'lwc';
import getprofiles from '@salesforce/apex/getinfo.getprofiles';

export default class WorkbookUiComponent extends LightningElement {
   
    @track openModal = false;
    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }
    

}



