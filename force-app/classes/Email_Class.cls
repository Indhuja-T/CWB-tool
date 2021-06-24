public class Email_Class {
    Public string selectedProfilename{get;set;}
    Public string selectedSurveyname{get;set;}
    public string profile_name {get; set;}
    public string survey_ID {get; set;}
    
    Public List<Selectoption> getselectedaccnamefields(){
            List<Selectoption> lstnamesel = new List<selectoption>();
            lstnamesel.add(new selectOption('','- None -'));
            for(Profile pro :[SELECT Profile.Id, Profile.name FROM Profile]){
            lstnamesel.add(new selectoption(pro.Id,pro.name));
            }
            return lstnamesel; 
        }
        Public List<Selectoption> getselectedsurveyfields(){
            List<Selectoption> surveyid = new List<selectoption>();
            surveyid.add(new selectOption('', '- None -'));
            for(Survey svy :[SELECT Survey.Id, Survey.name FROM Survey]){
            surveyid.add(new selectoption(svy.Id,svy.name));
            }
            return surveyid; 
        }
    
	public void sendMail(){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();        
 		//Messaging.MassEmailMessage email = new Messaging.MassEmailMessage();
        
          
        
       
        string[] to = new string[] {profile_name};
        
          /* List<User> Requse = [Select id from User ];
 		   List<Id> Reqids= new List<Id>();
 			for(User u:Requse) {
 			 Reqids.add(u.id);
				 }*/
            List<User> Requser = [Select Email,Id from User where Profile.Id =:
                                  selectedProfilename];
        system.debug(selectedProfilename);
         List <string> Mail = new List<string> ();
         List <string> Mailid = new List<string> ();
         for(User u: Requser )
        {
            Mail.add(u.Email);
          
        }
		for(User u: Requser )
        {
            Mailid.add(u.Id);
          
        }        
        
        
       //  email.setTargetObjectIds(ReqIds);
 		//email.setSenderDisplayName('System Admin');
 		//email.setTemplateId(et.id);
 		

        email.setToAddresses(Mail);
       // email.toAddresses = new String[] {[Select Email from User where Profile.name = 'Standard Platform User']  };
               
        email.setSubject('Test Mail');
        
        email.setHtmlBody('Hello, <br/><br/>This is the test mail that you generated. <br/>Please click on the below link and fill out the survey. <br/> Survey Id : '+ selectedSurveyname + '<br/> User ID:'+ Mailid +
                          '<br/>Regards<br/> Developer');
        try{
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }catch(exception e){
            apexpages.addmessage(new apexpages.message(apexpages.severity.error,e.getMessage()));
        }
        
       
    }
}