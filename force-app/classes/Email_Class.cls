public class Email_Class {

Public string selectedProfilename{get;set;}
Public string selectedSurveyname{get;set;}

<<<<<<< HEAD
//Function to get the Users Profile from VF Page//
Public List<Selectoption> getselectedprofile(){
List<Selectoption> profilesel = new List<selectoption>();
profilesel.add(new selectOption('','- None -'));
for(Profile pro :[SELECT Profile.Id, Profile.name FROM Profile]){
    profilesel.add(new selectoption(pro.Id,pro.name));
}
return profilesel; 
}


//Function to get the Respective Survey Id from VF Page//
Public List<Selectoption> getselectedsurveyfields(){
List<Selectoption> surveyid = new List<selectoption>();
surveyid.add(new selectOption('', '- None -'));
for(Survey__c svy :[SELECT Survey_Code__c, Survey__c.Name FROM Survey__c]){
    surveyid.add(new selectoption(svy.Survey_Code__c,svy.name));
}
return surveyid; 
}


//Function
public  String createEmailBody(){
String url = System.Label.My_Survey_Url;

EmailTemplate tempID = [SELECT Id,Name,HTMLValue FROM EmailTemplate WHERE name = 'Survey_Template'];

String emailBody = tempID.HTMLValue;



    emailBody = emailBody.replace('Survey_ID', selectedSurveyname );
    


return emailBody;
}


//Function to Send the email//
public void sendMail(){

// Sending Email using MassEmailMeassage Method   
List<User> Myuser=[Select Email,Id,User_Code__c from User where Profile.Id =: selectedProfilename];
List<Id> Myids= new List<Id>();

for(User u:Myuser) {
Myids.add(u.id);
}

Messaging.MassEmailMessage message = new Messaging.MassEmailMessage();
message.setTargetObjectIds(Myids);
message.setSenderDisplayName('System Admin');

String templ = createEmailBody();
EmailTemplate et=[Select id from EmailTemplate where name = 'Survey_Email' limit 1];
et.body = templ;
update et;

message.setTemplateId(et.id);
message.setSaveAsActivity(false);
Messaging.sendEmail(new Messaging.MassEmailMessage[] { message });


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



=======
/////////////////////////////////
Public List<Selectoption> getselectedemail(){
    List<Selectoption> lstnamesel = new List<selectoption>();
    lstnamesel.add(new selectOption('','- None -'));
    for(Profile pro :[SELECT Profile.Id, Profile.name FROM Profile]){
        lstnamesel.add(new selectoption(pro.Id,pro.name));
    }
    return lstnamesel; 
}
/////////////////////////////////
Public List<Selectoption> getselectedsurveyfields(){
    List<Selectoption> surveyid = new List<selectoption>();
    surveyid.add(new selectOption('', '- None -'));
    for(Survey__c svy :[SELECT Survey_Code__c, Survey__c.Name FROM Survey__c]){
        surveyid.add(new selectoption(svy.Survey_Code__c,svy.name));
    }
    return surveyid; 
}
/////////////////////////////////////////


public  String createEmailBody(){
    String url = System.Label.My_Survey_Url;
    // url = url + '?Id='  + selectedsurveyname + '?' + u; //append a parameter
    EmailTemplate tempID = [SELECT Id,Name,HTMLValue FROM EmailTemplate WHERE name = 'Survey_Template'];
    
    String emailBody = tempID.HTMLValue;
    
    
    
        emailBody = emailBody.replace('Survey_ID', selectedSurveyname );
        //emailBody = emailBody.replace('User_ID', u );
    // emailBody = emailBody.replace('URL', url );
    
    
    return emailBody;
}






/////////////////////////////////////




public void sendMail(){
    
    
    
    
        
List<User> Myuser=[Select Email,Id,User_Code__c from User where Profile.Id =: selectedProfilename];
        Messaging.MassEmailMessage message = new Messaging.MassEmailMessage();
List<Id> Myids= new List<Id>();

for(User u:Myuser) {
Myids.add(u.id);

}
    
message.setTargetObjectIds(Myids);
EmailTemplate et=[Select id from EmailTemplate where name = 'Survey_Email' limit 1];

message.setSenderDisplayName('System Admin');
    String templ = createEmailBody();
et.body = templ;
update et;
message.setTemplateId(et.id);
message.setSaveAsActivity(false);


Messaging.sendEmail(new Messaging.MassEmailMessage[] { message });




    
    /*
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
    
    
    
>>>>>>> 88b013dc260b5e1b633dd89a65d490bc8f04639b
}
}