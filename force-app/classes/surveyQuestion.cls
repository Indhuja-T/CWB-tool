public with sharing class surveyQuestion {
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
    public static boolean saveResponse(Id Uid,Id Sid, Id Qid,String Rval){
        try {
            Question_Response__c data= new Question_Response__c();
            data.User_ID__c= Uid;
            data.Survey_ID__c=Sid;
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
            List<Question_Response__c> qrl = [Select Id,Survey_ID__r.Survey_Name__c,User_ID__r.Name,Question_ID__r.Question_Text__c,Response__c from Question_Response__c Where Survey_ID__c=: Sid LIMIT 50];
            return qrl;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}