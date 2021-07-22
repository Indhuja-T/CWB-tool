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
        
        //Arranging data to process earlier
        Map<String,Map<String,Map<String,Boolean>>> ObjectPermissions = new Map<String,Map<String,Map<String,Boolean>>>();
        for(FieldPermissions op : Permissions){
            //String Objectname = op.SobjectType;
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
        //Map<String,Map<String,Boolean>> fieldProperties = new Map<String,Map<String,Boolean>>();
        for(String o: objects){
            SObjectType objectType = Schema.getGlobalDescribe().get(o);
            //system.debug('objectType'+objectType);
            Map<String,Schema.SObjectField> fields= objectType.getDescribe().fields.getMap();
            objectFields.put(o,fields);
            /*for (String f : fields.keySet()){
Map<String,Boolean> properties = new Map<String,Boolean>();
Schema.SObjectField field = fields.get(f);
properties.put('Permissionable',field.getDescribe().isPermissionable());
properties.put('Nillable',field.getDescribe().isNillable());
properties.put('Updateable',field.getDescribe().isUpdateable());
fieldProperties.put(f,properties);
}*/
        }
        //system.debug(fieldProperties);
        String csvcontent = '';
        system.debug(objectFields);
        for(String o: objectFields.keySet()){
            
            
            Map<String,Schema.SObjectField> fields = objectFields.get(o);
            for (String f : fields.keySet()){
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
                        //system.debug('@@@@@@@@@@@@@@@@@@@@@');
                        //if(objectpermissions.get(key).get(ps)!=null){
                        if(Nillable && Permissionable){
                            //system.Debug('111111111111111');
                            csvcontent += String.valueOf(objectpermissions.get(key).get(ps).get('Readable')) + ',';
                            csvcontent += String.valueOf(objectpermissions.get(key).get(ps).get('Editable')) + ',';
                        }
                        //}
                    }
                    else if((!(Nillable || Permissionable)) || (Nillable == True && Permissionable == False)){
                        //system.Debug('222222222222222');
                        csvcontent += String.valueOf(True) + ',';
                        csvcontent += String.valueOf(Updateable) + ',';
                    }
                    else if(Nillable && Permissionable){
                        //system.Debug('333333333333333333');
                        csvcontent += String.valueOf(False) + ',';
                        csvcontent += String.valueOf(False) + ',';
                    }
                                        
                }
                csvcontent += '\n';
                
            }
            
        }
        
        //System.Debug(objectPermissions.get('Account.NaicsDesc'));
        system.debug(objectfields);
        //system.debug(objectfields.get('Account').get('accountnumber'));
        
        //System.debug(Headers);
        //System.debug(subheaders);
        //System.debug(csvcontent);
        String csvfile = Headers + subHeaders + csvcontent;
        system.debug(csvfile);
        return csvfile;
    }
}