public class RetrieveData {
    
    public static List<ObjectPermissions> getobjperm() {
        List<ObjectPermissions> objperm = [SELECT Id, SObjectType, PermissionsRead, PermissionsCreate,
                                           PermissionsEdit,PermissionsDelete,PermissionsModifyAllRecords, PermissionsViewAllRecords
                                           FROM ObjectPermissions
                                          ];
        return objperm;
    } 
    
    public static List<ObjectPermissions> getobj() {
        List<ObjectPermissions> obj = [SELECT Id,SobjectType FROM ObjectPermissions];
        return obj;
    }
    
    public static  List<AppMenuItem> getappperm(String recordId){
        List<AppMenuItem> appperm = [SELECT Id, Name, Label, IsAccessible, IsVisible
                                     FROM AppMenuItem
                                     WHERE Id =:recordId];
        return appperm;
    }
    
    public static List<ApexPageInfo> getpageperm(String recordId){
        List<ApexPageInfo> pageperm = [SELECT Id, MasterLabel,Name FROM ApexPageInfo
                                       WHERE Id =:recordId];
        return pageperm;
    }
    
    public static List<ApexClass> getclassperm(){
        List<ApexClass> classperm = [SELECT Id, Name,
                                     (SELECT Id, Parent.Name, Parent.Profile.Name
                                      FROM SetupEntityAccessItems)
                                     FROM ApexClass];
        return classperm;
    }
    
    public static List<user> getuserperm(String recordId){
        List<user> userperm = [select  profile.name,usertype from user];
        return userperm;
        //query for user data
        //SELECT Name, createddate,CreatedBy.FirstName,lastmodifieddate,LastModifiedBy.FirstName FROM Profile   
    }
    
    public static List<Profile> getprofiles (String recordId){
        List<Profile> pro = [SELECT Id,Name FROM Profile]; 
        return pro;
        
    }
    
    public static List<SetupAuditTrail> getaudit (String recordId){
        List<SetupAuditTrail> audit = [SELECT Id, Action, CreatedBy.Name, CreatedDate, Display, Section FROM SetupAuditTrail]; 
        return audit;
        
    }
    
    public static List<StaticResource> getstaticresources (){
        List<StaticResource> staticresources = [SELECT Id, Body, BodyLength, ContentType, 
                                                Description, Name FROM StaticResource]; 
        return staticresources;
        
    }
    
    public static List<ObjectPermissions> GetObjectProfilePermission(List<String> objects, List<String> Profiles){
        
        List<ObjectPermissions> Permissions = [SELECT Parent.Profile.Name, SobjectType, PermissionsCreate, 
                                              PermissionsRead, PermissionsEdit, PermissionsDelete, PermissionsModifyAllRecords, 
                                              PermissionsViewAllRecords FROM ObjectPermissions WHERE sObjectType 
                                              IN :objects AND Parent.Profile.Name IN :Profiles order by SobjectType];    
        return Permissions;

    }

    // Permission Set

    public static List<PermissionSet> getPermissionSet (String recordId){
        List<PermissionSet> PermissionSetlist  = [SELECT name FROM PermissionSet WHERE IsOwnedByProfile=false]; 
        return PermissionSetlist; 
    }

    public static List<FieldPermissions> getPermissionSet (List<String> objects, List<String> permissionSets){
        List<FieldPermissions> PermissionSetlist  = [SELECT Parent.Name, Field,PermissionsRead,PermissionsEdit 
                                                 FROM FieldPermissions WHERE SObjectType IN :objects 
                                                 AND Parent.Name IN :permissionSets]; 
        return PermissionSetlist; 
    }


}

