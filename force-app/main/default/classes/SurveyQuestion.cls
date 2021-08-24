public without sharing class SurveyQuestion {
    //Finding survey id
    @AuraEnabled
    public static Id getSurveyId(String surveyCode){
        try {
            List<Survey__c> Survey1 = [Select Id,Survey_Code__c from Survey__c where Survey_Code__c=:surveyCode ];
            Id SurveyId=Survey1[0].Id;
            system.debug(SurveyId);
            return SurveyId;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Finding user id
    // @AuraEnabled
    // public static Id getUserId(String userCode){
    //     try {
           
    //         List<User> User1=[Select Id,User_Code__c from User where User_Code__c=:userCode ];
    //         Id UserId= User1[0].Id;
    //         system.debug(UserId);
    //         return UserId;
            
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    //Matching user id
    @AuraEnabled
    public static Id matchUserID(String empID,String name,String email){
        try {
                String EmployeeId = empID.toUppercase();
                List<Employee__c> currentUser=[Select Id, Employee_ID__c from Employee__c where Employee_ID__c=:EmployeeId ];
                if(currentUser.size()>0)
                {
                    Id currentUserId= currentUser[0].Id;
                    system.debug(currentUserId);
                    return currentUserId; 
                }
                else{
                    Employee__c newUser = new Employee__c();
                    newUser.Employee_ID__c = EmployeeId;
                    newUser.Name = name;
                    newUser.Email__c = email;
                    insert newUser;
                    return newUser.Id;
                }
            } 
            catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
    }
    //Getting questions for the survey
    @AuraEnabled
    public static List<Survey_Question__c> relatedQuestions(String surveyCode){
        try {
            List<Survey_Question__c> surveyQuestionList = [Select Id,Survey_ID__r.Survey_Name__c,Question_ID__c,Question_ID__r.Question_Text__c,Question_ID__r.Response_Type__c,Question_ID__r.Picklist_Values__c,Required__c,Survey_ID__r.Active__c from Survey_Question__c where Survey_ID__r.Survey_Code__c =: surveyCode];
            system.debug(surveyQuestionList);
            return surveyQuestionList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Finding surveyresponse/Creating userresponse for survey in survey response
    @AuraEnabled
    public static ID surveyDetails(Id empId,Id surveyId){
        try {
           
             List<Survey_Response__c> surveyResponseList =[Select Id,Employee__c,Survey__c from Survey_Response__c where Survey__c=:surveyId and Employee__c=:empId];
            if(surveyResponseList.size()>0){
                return surveyResponseList[0].Id;
            }
            else{
                Survey_Response__c res=new Survey_Response__c();
            res.Employee__c=empId;
            res.Survey__c=surveyId;
            insert res;
            return res.ID;

            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Storing user response in question response
    @AuraEnabled
    public static Id saveResponse(Id surveyResponseId,Id questionId,Id userId,String responseVal){
        try {
            List<Question_Response__c> questionResponseList=[select id,Survey_Response__c,Question_ID__c,Response__c from Question_Response__c where Survey_Response__c=:surveyResponseId and Question_ID__c=:questionId];
            if(questionResponseList.size()>0){
                questionResponseList[0].Response__c=responseVal;
                update questionResponseList;
                return questionResponseList[0].Id;
            }
            else{
                Question_Response__c data= new Question_Response__c();
            data.Survey_Response__c = surveyResponseId;
            data.Question_ID__c=questionId;
            data.Response__c=responseVal;
            data.Employee__c=userId;
            insert data;
            return data.Id;

            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Retrieving other user data for report
    @AuraEnabled(cacheable=true)
    public static List<Question_Response__c> reportDB(Id surveyId){
        try {
<<<<<<< HEAD
            List<Question_Response__c> questionResponseList = [Select Id,Survey_Response__r.Survey__r.Survey_Name__c,Survey_Response__r.Employee__r.Name,Question_ID__r.Question_Text__c,Question_ID__r.Response_Type__c,Response__c from Question_Response__c Where Survey_Response__r.Survey__c=: surveyId and Survey_Response__r.Employee__c!=null LIMIT 50];
=======
            List<Question_Response__c> questionResponseList = [Select Id,Survey_Response__r.Survey__r.Survey_Name__c,Survey_Response__r.Employee__r.Name,Question_ID__r.Question_Text__c,Response__c from Question_Response__c Where Survey_Response__r.Survey__c=: surveyId and Survey_Response__r.Employee__c!=null LIMIT 50];
>>>>>>> eb2b2577d581d3c0213906034c11f5eb86f02279
            system.debug(questionResponseList);
            return questionResponseList;
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Selecting question for survey from survey page
    @AuraEnabled
    public static List<Question__c> questionSelect(Id surveyId){
        try {
                Set<Id> questionId=new Set<Id>();
                List<Survey_Question__c> surveyQuestionList = [Select Question_ID__c from Survey_Question__c where Survey_ID__c=: surveyId];
                for(Survey_Question__c q: surveyQuestionList){
                     questionId.add(q.Question_ID__c);
                }
                List<Question__c> questionList=[select ID,Question_Text__c,Response_Type__c,Picklist_Values__c from Question__c where ID Not in: questionId];
                system.debug(questionList);
                return questionList;
            }
            
         catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Question__c> getAddedQuestion(Id surveyId){
        try {
            Set<Id> questionId=new Set<Id>();
            List<Survey_Question__c> surveyQuestionList = [Select Question_ID__c from Survey_Question__c where Survey_ID__c=: surveyId];
            for(Survey_Question__c q: surveyQuestionList){
                 questionId.add(q.Question_ID__c);
            }
            List<Question__c> questionList=[select ID,Question_Text__c,Response_Type__c,Picklist_Values__c from Question__c where ID  in: questionId];
            system.debug(questionList);
            return questionList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Adding selected questions to survey
    // @AuraEnabled
    // public static boolean addToSurvey(Id QuestionId,List<Question__c> questionList){
    //     try {
    //         List<Survey_Question__c> sqId = new List<Survey_Question__c>();
    //         system.debug(SurveyId);
    //         system.debug(questionList);
    //     for(Question__c q: questionList){
    //         Survey_Question__c a=new Survey_Question__c();
    //         a.Survey_ID__c =SurveyId;
    //         a.Question_ID__c=q.Id;
    //         sqId.add(a);
    //         system.debug(sqId);
    //     }
    //     insert sqId;
    //     return true;
    // }
    //      catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    @AuraEnabled
    public static boolean addToSurvey(Id surveyId,Id questionId,String status){
        try {
            system.debug(surveyId);
            system.debug(questionId);
            system.debug(status);
            Set<Id> questionIdSet=new Set<Id>();
            List<Survey_Question__c> surveyQuestionList = [Select Question_ID__c from Survey_Question__c where Survey_ID__c=: surveyId];
            for(Survey_Question__c q: surveyQuestionList){
                 questionIdSet.add(q.Question_ID__c);
            }
            if(status == 'Not Started'){
                system.debug('in notstarted');
                if(questionIdSet.contains(questionId )){
                    delete[Select Question_ID__c from Survey_Question__c where Survey_ID__c=: surveyId and Question_ID__c=:questionId];
                }
            }
            if(status == 'In Progress'){
                system.debug(!(questionIdSet.contains(questionId )));
                if(!(questionIdSet.contains(questionId ))){
                    system.debug('in inprogress');
                Survey_Question__c a=new Survey_Question__c();
                a.Survey_ID__c =surveyId;
                a.Question_ID__c=questionId;
                insert a;
                }   
            }
            return true;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Retrieving user's previous data  for the survey
    @AuraEnabled
    public static List<Question_Response__c> editResponse(String UserCode,String SurveyCode){
        try {
            List<Survey_Response__c> surveyResponse = [Select Id,Survey__c,Employee__c from Survey_Response__c where Survey__r.Survey_Code__c =:SurveyCode and Employee__c=:UserCode];
            List<Question_Response__c> questionResponse = [Select Id,Question_ID__c,Response__c,Survey_Response__c from Question_Response__c where Survey_Response__c IN: surveyResponse];
            if(questionResponse.size()>0){
                system.debug(surveyResponse);
                return questionResponse;
            }
            else{
                return null;
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}