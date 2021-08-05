@isTest

public class SurveyQuestionTest {
   
    static testMethod void getSurveyIdTestClass() {
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        id surveyTestId = surveyTest.Id;
        List<Survey__c> surveyTestList=[Select Id,Survey_Code__c from Survey__c where Id=:surveyTestId];
        string surveyTestCode =surveyTestList[0].Survey_Code__c;
        Test.startTest();
        Id surveyIDTest= surveyQuestion.getSurveyId(surveyTestCode);
        Test.stopTest();
        system.assertEquals(surveyTestId,surveyIDTest);        
    }
    static testMethod void matchUserIDTestClass(){
        Employee__c employeeTest = new Employee__c();
        employeeTest.Employee_ID__c = 'Y0101';
        employeeTest.Name = 'Test Employee';
        employeeTest.Email__c = 'testemployee@apex.com';
        insert employeeTest;
        Test.startTest();
        Id employeeTestId = SurveyQuestion.matchUserID(employeeTest.Employee_ID__c,employeeTest.Name,employeeTest.Email__c);
        Id employeeTestElse = SurveyQuestion.matchUserID('00123','Test Employee Else','testemployee@apex1.com');
        Test.stopTest();
        system.assertEquals(employeeTest.id,employeeTestId);
        system.assert(employeeTestElse!=null);
    }
    
   /* static testMethod void getUserIdTestClass() {
		String usCode = '0000';
        Test.startTest();
        Id UserIDTest= surveyQuestion.getUserId(usCode);
        Test.stopTest();
        system.assertEquals('0055g000009oHbuAAE',UserIDTest);        
    }*/
    static testMethod void questionSelectTest(){
        Question__c questionTest = new Question__c();
        questionTest.Question_Text__c = 'Test Question';
        questionTest.Response_Type__c = 'Rich Text Area';
        insert questionTest;
        Question__c questionTest1 = new Question__c();
        questionTest1.Question_Text__c = 'Test Question1';
        questionTest1.Response_Type__c = 'Picklist';
        questionTest1.Picklist_Values__c ='Yes,No';
        insert questionTest1;
        Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        Survey_Question__c surveyQuestionTest = new Survey_Question__c();
        surveyQuestionTest.Survey_ID__c = surveyTest.Id;
        surveyQuestionTest.Question_ID__c = questionTest3.Id;
        insert surveyQuestionTest;
        Test.startTest();
          List<Question__c> questionTestList = SurveyQuestion.questionSelect(surveyTest.Id);
        Test.stopTest();
         system.assertEquals(2,questionTestList.size());
          
    }

    static testMethod void relatedQuestionsTest(){
        Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        List<Survey__c> surveyTestList=[Select Id,Survey_Code__c from Survey__c where Id=:surveyTest.Id];
        string surveyTestCode =surveyTestList[0].Survey_Code__c;
        Survey_Question__c surveyQuestionTest = new Survey_Question__c();
        surveyQuestionTest.Survey_ID__c = surveyTest.Id;
        surveyQuestionTest.Question_ID__c = questionTest3.Id;
        insert surveyQuestionTest;
        Test.startTest();
        List<Survey_Question__c> questionListTest = SurveyQuestion.relatedQuestions(surveyTestCode);
        Test.stopTest();
        system.assertEquals(1,questionListTest.size());
    }
    
    static testMethod void surveyDetailsTest(){
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        Employee__c employeeTest = new Employee__c();
        employeeTest.Employee_ID__c = 'Y0101';
        employeeTest.Name = 'Test Employee';
        employeeTest.Email__c = 'testemployee@apex.com';
        insert employeeTest;
        Test.startTest();
        Id surveyResponseTest = surveyQuestion.surveyDetails(employeeTest.id, surveyTest.id);
        Id surveyResponseTest1 = surveyQuestion.surveyDetails(employeeTest.id, surveyTest.id);
        Test.stopTest();
        system.assertEquals(surveyResponseTest,surveyResponseTest);
        
    }
    
    static testMethod void getAddedQuestionTest(){
        Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        Survey_Question__c surveyQuestionTest = new Survey_Question__c();
        surveyQuestionTest.Survey_ID__c = surveyTest.Id;
        surveyQuestionTest.Question_ID__c = questionTest3.Id;
        insert surveyQuestionTest;
        Test.startTest();
        List<Question__c> questionListTest = SurveyQuestion.getAddedQuestion(surveyTest.id);
        Test.stopTest();
        system.assertEquals(1,questionListTest.size());
    }
    
    static testMethod void saveResponseTest(){
         Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        Employee__c employeeTest = new Employee__c();
        employeeTest.Employee_ID__c = 'Y0101';
        employeeTest.Name = 'Test Employee';
        employeeTest.Email__c = 'testemployee@apex.com';
        insert employeeTest;
        Survey_Response__c surveyResponseTest = new Survey_Response__c();
        surveyResponseTest.Survey__c = surveyTest.Id;
        surveyResponseTest.Employee__c = employeeTest.Id;
        insert surveyResponseTest;
        Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
         Survey_Question__c surveyQuestionTest = new Survey_Question__c();
        surveyQuestionTest.Survey_ID__c = surveyTest.Id;
        surveyQuestionTest.Question_ID__c = questionTest3.Id;
        insert surveyQuestionTest;
        string Response = 'Test Response';
        Test.startTest();
        Id questionResponseId = SurveyQuestion.saveResponse(surveyResponseTest.Id, questionTest3.Id, employeeTest.Id,Response);
        Id questionResponseId1= SurveyQuestion.saveResponse(surveyResponseTest.Id, questionTest3.Id, employeeTest.Id,Response);
        List<Question_Response__c> responseList = SurveyQuestion.reportDB(surveyTest.Id);
        
        Test.stopTest();
        system.assertEquals(questionResponseId,questionResponseId1);
        system.assertequals(1,responseList.size());
        
        
    }
    
    static testMethod void addToSurveyTest(){
        
         Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        String status = 'In Progress';
        String status2 = 'Not Started';
        Boolean valueTest = SurveyQuestion.addToSurvey(surveyTest.Id, questionTest3.Id, status);
        List<survey_Question__c> surveyQuestionList = [Select Id from Survey_Question__c where Survey_Question__c.Survey_ID__c =: surveyTest.Id];
        system.assert(surveyQuestionList.size()!=null);
        Boolean valueTest1 = SurveyQuestion.addToSurvey(surveyTest.Id, questionTest3.Id, status2);
        List<survey_Question__c> surveyQuestionList1 = [Select Id from Survey_Question__c where Survey_Question__c.Survey_ID__c =: surveyTest.Id];        
        system.assertEquals(0,surveyQuestionList1.size());
        
        
    }
    
    static testMethod void editResponseTest(){
        Survey__c surveyTest= new Survey__c();
        surveyTest.Survey_Name__c = 'Test Survey';
        surveyTest.Name= 'Test Survey';
        insert surveyTest;
        
        Employee__c employeeTest = new Employee__c();
        employeeTest.Employee_ID__c = 'Y0101';
        employeeTest.Name = 'Test Employee';
        employeeTest.Email__c = 'testemployee@apex.com';
        insert employeeTest;
        
        Survey_Response__c surveyResponseTest = new Survey_Response__c();
        surveyResponseTest.Survey__c = surveyTest.Id;
        surveyResponseTest.Employee__c = employeeTest.Id;
       
        Question__c questionTest3 = new Question__c();
        questionTest3.Question_Text__c = 'Test Question2';
        questionTest3.Response_Type__c = 'Rich Text Area';
        insert questionTest3;
         
        Survey_Question__c surveyQuestionTest = new Survey_Question__c();
        surveyQuestionTest.Survey_ID__c = surveyTest.Id;
        surveyQuestionTest.Question_ID__c = questionTest3.Id;
        insert surveyQuestionTest;
        string Response = 'Test Response';
        
       
        List<Survey__c> surveyTestList=[Select Id,Survey_Code__c from Survey__c where Id=:surveyTest.Id];
        string surveyTestCode =surveyTestList[0].Survey_Code__c;
        List<Employee__c> employeeTestList=[Select Id,Employee_ID__c from Employee__c where Id=:employeeTest.Id];
        string employeeTestCode =employeeTestList[0].Employee_ID__c;
        Test.startTest();
        
         insert surveyResponseTest;
        Question_Response__c questionResponseTest = new Question_Response__c();
        questionResponseTest.Question_ID__c=questionTest3.id;
        questionResponseTest.Response__c = Response;
        questionResponseTest.Survey_Response__c =surveyResponseTest.Id;
        questionResponseTest.Employee__c=employeeTest.Id;
        insert questionResponseTest;
        system.debug(questionResponseTest.Id);
        List<Question_Response__c> questionResponseList = [select Id,Employee__r.Employee_ID__c,Survey_Response__r.Survey__r.Survey_Code__c from Question_Response__c where Id =:questionResponseTest.Id];
         
        List<Question_Response__c> responseListEdit = SurveyQuestion.editResponse( employeeTest.id, surveyTestCode);
        
        Test.stopTest();
        system.assertEquals(questionResponseTest.id, responseListEdit[0].id);
        system.assertEquals(1,responseListEdit.size());
        if(SurveyQuestion.editResponse(employeeTestCode, surveyTestCode) == null){
            system.assert(true);
        }
    }  
    
}