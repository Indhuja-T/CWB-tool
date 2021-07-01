public without sharing class surveyQuestion {
    @AuraEnabled
    public static List<Survey_Question__c> relatedQuestions(Id surveyId){
        try {
            List<Survey_Question__c> ql = [Select Question_ID__c,Question_ID__r.Question_Text__c,Question_ID__r.Response_Type__c,Question_ID__r.Picklist_Values__c from Survey_Question__c where Survey_ID__c =: surveyId];
            return ql;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static ID surveyDetails(Id Uid,Id Sid){
        try {
            Survey_Response__c res=new Survey_Response__c();
            res.User__c=Uid;
            res.Survey__c=Sid;
            insert res;
            return res.ID;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static boolean saveResponse(Id SrId,Id Qid,String Rval){
        try {
            Question_Response__c data= new Question_Response__c();
            data.Survey_Response__c = SrId;
            data.Question_ID__c=Qid;
            data.Response__c=Rval;
            insert data;
            return true;
            
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
    public static string addToSurvey(Id SurveyId,List<Question__c> ql){
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
        return 'true';
    }
         catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}