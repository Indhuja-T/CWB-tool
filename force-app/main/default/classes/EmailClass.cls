public class EmailClass {

    public string selectedProfilename{get;set;}
    public string selectedSurveyname{get;set;}

//Function to get the Users Profile from VF Page//
    public List<Selectoption> getselectedprofile(){
        List<Selectoption> profilesel = new List<selectoption>();
        profilesel.add(new selectOption('','- None -'));
        for(Profile pro :[SELECT Profile.Id, Profile.name FROM Profile]){
            profilesel.add(new selectoption(pro.Id,pro.name));
        }
        return profilesel; 
    }


//Function to get the Respective Survey Id from VF Page//
    public List<Selectoption> getselectedsurveyfields(){
        List<Selectoption> surveyid = new List<selectoption>();
        surveyid.add(new selectOption('', '- None -'));
        for(Survey__c svy :[SELECT Survey_Code__c, Survey__c.Name FROM Survey__c]){
            surveyid.add(new selectoption(svy.Survey_Code__c,svy.name));
        }
        return surveyid; 
    }


//Function to create Email content
    public  String createEmailBody(){
        String url = System.Label.My_Survey_Url;
        EmailTemplate tempID = [SELECT Id,HTMLValue FROM EmailTemplate WHERE name = 'Survey_Template'];
        String emailBody = tempID.HTMLValue;
        emailBody = emailBody.replace('Survey_ID', selectedSurveyname );
        return emailBody;
    }


//Function to Send the email//
    public void sendMail(){

// Sending Email using MassEmailMeassage Method   
        List<User> mailReceivers=[Select Email,Id,User_Code__c from User where Profile.Id =: selectedProfilename];
        List<Id> mailReceiverIds= new List<Id>();
        for(User u:mailReceivers) {
            mailReceiverIds.add(u.id);
        }
        Messaging.MassEmailMessage message = new Messaging.MassEmailMessage();
        message.setTargetObjectIds(mailReceiverIds);
        message.setSenderDisplayName('System Admin');
        String templ = createEmailBody();
        EmailTemplate emailSurveyTemplate=[Select id from EmailTemplate where name = 'Survey_Email' limit 1];
        emailSurveyTemplate.body = templ;
        update emailSurveyTemplate;

        message.setTemplateId(emailSurveyTemplate.id);
        message.setSaveAsActivity(false);
        Messaging.sendEmail(new Messaging.MassEmailMessage[] { message });
    }

/* Sending Email using SingleEmailMessage method
List<User> Requser = [Select Email,Id,name,User_Code__c from User where Profile.Id =: selectedProfilename];
system.debug(selectedProfilename);

List <string> Mailid = new List<string> ();
Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();  
for(User u: Requser )
{
List <string> Mail = new List<string> ();
Mail.add(u.Email);
email.setToAddresses(Mail);
String url = System.Label.My_Survey_Url;

url = url + '?Id=' + selectedSurveyname + '?' + u.User_Code__c   ;

email.setSubject('Test Mail');

email.setHtmlBody('Hi ' + u.name + ', <br/><br/>We would like you to fill out a survey. <br/>Please click <a href=' + url + '>here</a> and fill out the survey. <br/>Thank you for your time<br/>');

Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
}


*/
}