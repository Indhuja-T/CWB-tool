import { LightningElement } from 'lwc';

import getselectedprofile  from '@salesforce/apex/EmailClass.getselectedprofile';
import getselectedsurveyfields  from '@salesforce/apex/EmailClass.getselectedsurveyfields';



export default class ComboboxBasic extends LightningElement {
    value = '';

    get options() {
        return [
            { }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}
