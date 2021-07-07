public with sharing class getinfo {
    @AuraEnabled(cacheable=true)
    public static List<ObjectPermissions> getobjperm(String recordId) {
        return RetrieveData.getobjperm();
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ObjectPermissions> getobj(String recordId) {
        
        return RetrieveData.getobj();
    }
    /*
public static List<ObjectPermissions> objectProfilePermisions (List<String> objects, List<String> Profiles){
return [SELECT Parent.Profile.Name, SobjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsModifyAllRecords, PermissionsViewAllRecords FROM ObjectPermissions WHERE sObjectType IN :objects AND Parent.Profile.Name IN :Profiles order by SobjectType];    
}*/
    
    @AuraEnabled(cacheable=true)
    public static  List<AppMenuItem> getappperm(String recordId){
        
        return RetrieveData.getappperm(recordId);
    }   
    
    @AuraEnabled(cacheable=true)
    public static List<ApexPageInfo> getpageperm(String recordId){
        
        return RetrieveData.getpageperm(recordId);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ApexClass> getclassperm(String recordId){
        
        return RetrieveData.getclassperm();
    }
    
    @AuraEnabled(cacheable=true)
    public static List<user> getuserperm(String recordId){
        
        return RetrieveData.getuserperm(recordId);
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Profile> getprofiles (String recordId){
        return RetrieveData.getprofiles(recordId);
        
    }
    @AuraEnabled(cacheable=true)
    public static List<SetupAuditTrail> getaudit (String recordId){
        return RetrieveData.getaudit(recordId);
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<StaticResource> getstaticresources (){
        return RetrieveData.getstaticresources();
    }

    @AuraEnabled
    public static String GetObjectProfilePermission(List<String> objects, List<String> Profiles){
        
        List<ObjectPermissions> Permissions = RetrieveData.GetObjectProfilePermission(objects , Profiles);
        String Headers = 'Object,';
        For(String p : Profiles){
            Headers += (p+',').repeat(6);
        }
        Headers += '\n';
        String SubHeaders = ' ,'+'Create ,Read ,Edit ,Delete ,ModifyAllRecords ,ViewAllRecords ,'.repeat(Profiles.size());
        SubHeaders += '\n';
        
        Map<String,Map<String,Map<String,Boolean>>> ObjectPermissions = new Map<String,Map<String,Map<String,Boolean>>>();
        for(ObjectPermissions op : Permissions){
            String Objectname = op.SobjectType;
            if(ObjectPermissions.get(objectname)!=null) {
                Map<String,Boolean> Permission = new Map<String,Boolean>();
                Permission.put('Create',op.PermissionsCreate);
                Permission.put('Read',op.PermissionsRead);
                Permission.put('Edit',op.PermissionsEdit);
                Permission.put('Delete',op.PermissionsDelete);
                Permission.put('ViewAll',op.PermissionsViewAllRecords);
                Permission.put('ModifyAll',op.PermissionsModifyAllRecords);
                ObjectPermissions.get(objectname).put(op.Parent.Profile.Name,Permission);     
            }
            else{
                Map<String,Map<String,Boolean>> temp = new Map<String,Map<String,Boolean>>();
                ObjectPermissions.put(op.SobjectType,temp);
            }
        }
        String csvcontent = '';
        System.debug(ObjectPermissions);
        for(string obj : ObjectPermissions.keySet()){
            csvcontent += obj;
            for( string p : Profiles){
                system.debug(obj);
                system.debug(p);
                if(ObjectPermissions.get(obj).get(p)!=null){
                    Map<String,Boolean> PermissionSet = ObjectPermissions.get(obj).get(p);
                    csvcontent += ',' + String.valueOf(PermissionSet.get('Create')) + ', ' ;
                    csvcontent += String.valueOf(PermissionSet.get('Read')) + ', ' ;
                    csvcontent += String.valueOf(PermissionSet.get('Edit')) + ', ' ;
                    csvcontent += String.valueOf(PermissionSet.get('Delete')) + ', ' ;
                    csvcontent += String.valueOf(PermissionSet.get('ViewAll')) + ', ' ;
                    csvcontent += String.valueOf(PermissionSet.get('ModifyAll')) ;
                }
                else{
                    csvcontent += ',NA'.repeat(6);
                    break;
                }
                
            }
            csvcontent += '\n';
        }
        System.debug(Headers);
        System.debug(subheaders);
        System.debug(csvcontent);
        String csvfile = Headers + subHeaders + csvcontent;
        system.debug(csvfile);
        return csvfile;
    }

    
    //Queries with Tooling Api
    
    /* @AuraEnabled(cacheable=true)
public static List<WorkflowRule> getworkflow (String recordId){
List<WorkflowRule> workflow = [SELECT Id, Name, TableEnumOrId, Metadata from WorkflowRule ]; 
return workflow;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<WorkflowAlert> getworkflowalert (String recordId){
List<WorkflowAlert> workflowalert = [SELECT Id, FullName, Description, SenderType from WorkflowAlert  ]; 
return workflowalert;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<WorkflowTask> getworkflowtask (String recordId){
List<WorkflowTask> workflowtask = [SELECT id, FullName, Priority, Status, Subject from WorkflowTask   ]; 
return workflowtask;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<WorkflowFieldUpdate> getworkflowfield (String recordId){
List<WorkflowFieldUpdate> workflowfield = [SELECT id, FullName, SourceTableEnumOrId, EntityDefinitionId from WorkflowFieldUpdate  ]; 
return workflowfield;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<WorkflowOutboundMessage> getworkflowoutboundmsg (String recordId){
List<WorkflowOutboundMessage> workflowoutboundmsg = [SELECT id, FullName, Name, EntityDefinitionId, IntegrationUserId from WorkflowOutboundMessage   ]; 
return workflowoutboundmsg;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<LightningComponentBundle> getlwc (String recordId){
List<LightningComponentBundle> lwc = [SELECT Id, Description, FullName, Language, MasterLabel, TargetConfigs FROM LightningComponentBundle]; 
return lwc;*/
    
    /* @AuraEnabled(cacheable=true)
public static List<AuraDefinitionBundle> getaura (String recordId){
List<AuraDefinitionBundle> aura = [SELECT Id, MasterLabel, DeveloperName, APIVersion, CreatedBy.Name, LastModifiedBy.Name, CreatedDate, LastModifiedDate FROM AuraDefinitionBundle]; 
return aura;*/
    
}