public with sharing class PermissionSet_CWB {
    @AuraEnabled
    public static String getPermissionsForObjects(List<String> objects, List<String> permissionSets) {
        List<FieldPermissions> Permissions = RetrieveData.getPermissionSet(objects , permissionSets);
        system.debug(permissions);
        String Headers = 'Object, Fields,';
        For(String p : permissionSets){
            Headers += (p+',').repeat(2);
        }
        Headers += '\n';
        String SubHeaders = ' , ,'+'Readable ,Editable ,'.repeat(permissionSets.size());
        SubHeaders += '\n';
        
        //Arranging data to process Later
        Map<String,Map<String,Map<String,Boolean>>> ObjectPermissions = new Map<String,Map<String,Map<String,Boolean>>>();
        for(FieldPermissions op : Permissions){
            if(ObjectPermissions.get(op.Field) == null){
                Map<String,Map<String,Boolean>> temp = new Map<String,Map<String,Boolean>>();
                ObjectPermissions.put(op.Field,temp);
            }
            Map<String,Boolean> Permission = new Map<String,Boolean>();
            Permission.put('Readable',op.PermissionsRead);
            Permission.put('Editable',op.PermissionsEdit);
            ObjectPermissions.get(op.Field).put(op.Parent.Name,Permission);                   
        }
        System.debug(ObjectPermissions);
        
        Map<String,Map<String,Schema.SObjectField>> objectFields = new Map<String,Map<String,Schema.SObjectField>>(); 
        
        for(String o: objects){
            SObjectType objectType = Schema.getGlobalDescribe().get(o);
            Map<String,Schema.SObjectField> fields= objectType.getDescribe().fields.getMap();
            objectFields.put(o,fields);
        }
        String csvcontent = '';
        system.debug(objectFields);
        for(String o: objectFields.keySet()){
            Map<String,Schema.SObjectField> fields = objectFields.get(o);
            for(String f : fields.keySet()){
                csvcontent += o + ',';    
                Schema.SObjectField field = fields.get(f);
                string fieldName = field.getDescribe().getName();
                csvcontent += fieldname + ',';
                Boolean Permissionable = field.getDescribe().isPermissionable();
                Boolean Nillable = field.getDescribe().isNillable();
                Boolean Updateable = field.getDescribe().isUpdateable();           
                String key = o + '.' + fieldname;
                //System.debug('+++++++++++++ '+fieldname+String.valueOf(Permissionable)+String.valueOf(Nillable)+String.valueOf(Updateable));
                for(String ps: PermissionSets){
                    system.debug(ps);
                    if (objectpermissions.get(key)!=null && objectpermissions.get(key).get(ps)!=null){                        
                        if(Nillable && Permissionable){
                            
                            csvcontent += String.valueOf(objectpermissions.get(key).get(ps).get('Readable')) + ',';
                            csvcontent += String.valueOf(objectpermissions.get(key).get(ps).get('Editable')) + ',';
                        }
                    }
                    else if((!(Nillable || Permissionable)) || (Nillable == True && Permissionable == False)){
                        csvcontent += String.valueOf(True) + ',';
                        csvcontent += String.valueOf(Updateable) + ',';
                    }
                    else if(Nillable && Permissionable){
                        
                        csvcontent += String.valueOf(False) + ',';
                        csvcontent += String.valueOf(False) + ',';
                    }
                }
                csvcontent += '\n';                
            }          
        }
        system.debug(objectfields);
        String csvfile = Headers + subHeaders + csvcontent;
        system.debug(csvfile);
        return csvfile;
    }
    
    @AuraEnabled
    public static String getPermissionSetAssignmentDetails() {
        Map<ID,PermissionSet> allPermissionSets = RetrieveData.getPermissionSetMap();
        list<PermissionSetAssignment> permissionSetAssignments = RetrieveData.getPermissionSetAssignment();
        String Headers = 'Permission Set Id,Permission Set Name,Namespace Prefix,Total Assignment';        
        Headers += '\n';
        String csvString = Headers;
        Map<Id, Integer> permissionSetCount = new Map<Id, Integer>();
        for(ID i : allPermissionSets.keySet()){
            permissionSetCount.put(i,0);
        }
        system.debug(permissionSetCount);
        for(PermissionSetAssignment pa : permissionSetAssignments){
            Integer temp = permissionSetCount.get(pa.PermissionSet.Id);
            temp += 1;
            system.debug('temp='+temp);
            permissionSetCount.put(pa.PermissionSet.Id,temp);
        }
        
        System.Debug(permissionSetCount);
        
        for(ID i : allPermissionSets.keySet()){
            PermissionSet p = allPermissionSets.get(i);
            csvString += p.ID + ',';
            csvString += p.Label+ ',';
            csvString += p.NamespacePrefix + ',';
            csvString += permissionSetCount.get(i) + '\n';
        }
        system.debug(csvString);
        return csvString;
    }
}