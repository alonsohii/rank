function CamposJson(ids){
// '#firstName, #lastName,#phoneNumber,#address'
var $items = $(ids)
var obj = {}
$items.each(function() {
    obj[this.id] = $(this).val();
})

return obj;// JSON.stringify( obj);
}

  function validar(str,campo){
    if(str != null && str != ''){
        if(str.length < 41 &&  str.length > 1){
            return 'valid';
            
        }else{
            return 'El campo "'+campo+'" debe ser menor a 40 caracteres o mayor a 1.';
        }
    }else{
         return 'El campo "'+campo+'" no debe estar vacio.';
  }

}