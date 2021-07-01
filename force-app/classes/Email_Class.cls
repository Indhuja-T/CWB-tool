public class Email_Class {
    
    Public string selectedProfilename{get;set;}
    Public string selectedSurveyname{get;set;}
    
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
        for(Survey__c svy :[SELECT User__c, Survey__c.Name FROM Survey__c]){
            surveyid.add(new selectoption(svy.Id,svy.name));
        }
        return surveyid; 
    }
    /////////////////////////////////////////
    
   
      public  String createEmailBody(List<User> u){
           String url = System.Label.My_Survey_Url;
              url = url + '/'  + selectedsurveyname; //append a parameter
        EmailTemplate tempID = [SELECT Id,Name,Body FROM EmailTemplate WHERE name = 'Survey_Template'];
        
        String emailBody = tempID.body;
        String ObjectId= u[0].Id;
      //  Integer ObjectSize= Integer.valueOf(u[0].name);
        //String expD = EC_Constants.BLANK;
        
      //  emailBody = emailBody.replace('Survey_ID', selectedSurveyname );
        
     //   if(u[0].Name != null) {
       //     emailBody = emailBody.replace('CONDITIONAL_TEXT_1',String.valueOf(ObjectSize));
        //}
        
      
        
        
       // emailBody = emailBody.replace('EMAIL_FOOTER',System.Label.EMAIL_FOOTER);
        
        return emailBody;
    }
    
    
    
    
    
    
    /////////////////////////////////////
    
    
    
    
    public void sendMail(){
        
        
        String url = System.Label.My_Survey_Url;
        
        //   url = url + '/'  + selectedsurveyname; //append a parameter
     /*   
        List<User> lstuser=[Select Email,Id from User where Profile.Id =: selectedProfilename];
        List<Id> lstIds= new List<Id>();
        for(User u:lstuser) {
            lstids.add(u.id);
        }
       // EmailTemplate et=[Select id from EmailTemplate where name = 'Survey_Email' limit 1];
        
      //  Messaging.MassEmailMessage message = new Messaging.MassEmailMessage();
        message.setTargetObjectIds(lstIds);
        message.setSenderDisplayName('System Admin');
     //   String templ = createEmailBody(lstuser);
       // et.body = templ;
        update et;
        message.setTemplateId(et.id);
        message.setSaveAsActivity(false);
        
        
      //    Messaging.sendEmail(new Messaging.MassEmailMessage[] { message });
     *///   
        
        
        List<User> Requser = [Select Email,Id,name from User where Profile.Id =: selectedProfilename];
        system.debug(selectedProfilename);
      
        List <string> Mailid = new List<string> ();
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();  
        for(User u: Requser )
        {
            List <string> Mail = new List<string> ();
            Mail.add(u.Email);
             email.setToAddresses(Mail);
            url = url + '?Id=' + selectedSurveyname + '?' + u.ID   ;
        
        email.setSubject('Test Mail');
        
        email.setHtmlBody('Hello, <br/><br/>This is the test mail that you generated. <br/>Please click on the below link and fill out the survey. <br/> Survey Id : '+ selectedSurveyname + '<br/> User ID:'+ u.Id +
                          '<br/>URL: ' + url + '<br/>Regards<br/> Name:' + u.name +  '');
      //     try{
Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
//}catch(exception e){
//apexpages.addmessage(new apexpages.message(apexpages.severity.error,e.getMessage()));
//}
        }
        
       
        
       
        
        
    }
}