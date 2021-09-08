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
        List<PermissionSet> PermissionSetlist  = [SELECT Label FROM PermissionSet WHERE IsOwnedByProfile=false]; 
        return PermissionSetlist; 
    }
    
    public static Map<ID,PermissionSet> getPermissionSetMap (){
        Map<ID,PermissionSet> PermissionSetlist  = new Map<ID,PermissionSet>([SELECT Label, Id, NamespacePrefix FROM PermissionSet WHERE IsOwnedByProfile=false]); 
        return PermissionSetlist; 
    }
    
    public static List<PermissionSetAssignment> getPermissionSetAssignment (){
        List<PermissionSetAssignment> PermissionSetlist  = [SELECT PermissionSet.Id FROM PermissionSetAssignment where PermissionSet.IsOwnedByProfile = false ];
        return PermissionSetlist; 
    }
    
    public static List<FieldPermissions> getPermissionSet (List<String> objects, List<String> permissionSets){
        List<FieldPermissions> PermissionSetlist  = [SELECT Parent.Name, Field,PermissionsRead,PermissionsEdit 
                                                     FROM FieldPermissions WHERE SObjectType IN :objects 
                                                     AND Parent.Label IN :permissionSets]; 
        return PermissionSetlist; 
    }
    public static List<PermissionSet> getPermissionSetModifiedDetail (){
        List<PermissionSet> PermissionSetlist  = [SELECT Label, Name, CreatedDate, CreatedBy.Name, LastModifiedDate, 
                                                  LastModifiedBy.Name FROM PermissionSet 
                                                  where IsOwnedByProfile = false]; 
        return PermissionSetlist; 
    }
    
    public static List<Profile> getModifiedprofiledetail (){
        List<Profile> modifiedprofiledetail = [SELECT Name, createddate,CreatedBy.Name,
                                                  lastmodifieddate,LastModifiedBy.Name 
                                                  FROM Profile];
    	return modifiedprofiledetail; 
    }
}