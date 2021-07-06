public without sharing class surveyQuestion {
    @AuraEnabled
    public static Id getSurveyId(String suc){
        try {
            List<Survey__c> Survey1 = [Select Id,Survey_Code__c from Survey__c where Survey_Code__c=:suc ];
            Id SurveyId=Survey1[0].Id;
            system.debug(SurveyId);
            return SurveyId;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Id getUserId(String usc){
        try {
           
            List<User> User1=[Select Id,User_Code__c from User where User_Code__c=:usc ];
            Id UserId= User1[0].Id;
            system.debug(UserId);
            return UserId;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Survey_Question__c> relatedQuestions(String surveyId){
        try {
            List<Survey_Question__c> ql = [Select Question_ID__c,Question_ID__r.Question_Text__c,Question_ID__r.Response_Type__c,Question_ID__r.Picklist_Values__c from Survey_Question__c where Survey_ID__r.Survey_Code__c =: surveyId];
            return ql;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static ID surveyDetails(Id Uid,Id Sid){
        try {
           
            List<Survey_Response__c> srList =[Select Id,User__c,Survey__c from Survey_Response__c where Survey__c=:Sid and User__c=:Uid];
            if(srList.size()>0){
                return srList[0].Id;
            }
            else{
                Survey_Response__c res=new Survey_Response__c();
            res.User__c=Uid;
            res.Survey__c=Sid;
            insert res;
            return res.ID;

            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Id saveResponse(Id SrId,Id Qid,String Rval){
        try {
            List<Question_Response__c> qrlist=[select id,Survey_Response__c,Question_ID__c,Response__c from Question_Response__c where Survey_Response__c=:SrId and Question_Id__c=:Qid];
            if(qrlist.size()>0){
                qrlist[0].Response__c=Rval;
                update qrlist;
                return qrlist[0].Id;
            }
            else{
                Question_Response__c data= new Question_Response__c();
            data.Survey_Response__c = SrId;
            data.Question_ID__c=Qid;
            data.Response__c=Rval;
            insert data;
            return data.Id;

            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Question_Response__c> reportDB(Id Sid){
        try {
            List<Question_Response__c> qrl = [Select Id,Survey_Response__r.Survey__r.Survey_Name__c,Survey_Response__r.User__r.Name,Question_ID__r.Question_Text__c,Response__c from Question_Response__c Where Survey_Response__r.Survey__c=: Sid LIMIT 50];
            return qrl;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Question__c> questionSelect(Id Suid){
        try {
                Set<Id> qid=new Set<Id>();
                List<Survey_Question__c> sqId = [Select Question_ID__c from Survey_Question__c where Survey_ID__c=: Suid];
                for(Survey_Question__c q: sqId){
                     qid.add(q.Question_ID__c);
                }
                List<Question__c> ql=[select ID,Question_Text__c,Response_Type__c,Picklist_Values__c from Question__c where ID Not in: qid];
                return ql;
            }
            
         catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static boolean addToSurvey(Id SurveyId,List<Question__c> ql){
        try {
            List<Survey_Question__c> sqId = new List<Survey_Question__c>();
            system.debug(SurveyId);
            system.debug(ql);
        for(Question__c q: ql){
            Survey_Question__c a=new Survey_Question__c();
            a.Survey_ID__c =SurveyId;
            a.Question_ID__c=q.Id;
            sqId.add(a);
            system.debug(sqId);
        }
        insert sqId;
        return true;
    }
         catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Question_Response__c> editResponse(String UserCode,String SurveyCode){
        try {
            List<Survey_Response__c> srr = [Select Id,Survey__c,User__c from Survey_Response__c where Survey__r.Survey_Code__c =:SurveyCode and User__r.User_Code__c=:UserCode];
            List<Question_Response__c> qrr = [Select Id,Question_ID__c,Response__c,Survey_Response__c from Question_Response__c where Survey_Response__c IN: srr];
            if(qrr.size()>0){
                system.debug(srr);
                return qrr;
            }
            else{
                return null;
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}