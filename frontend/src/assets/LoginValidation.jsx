function Validation(values) {
    let error = {}
  
    if(!values.identifier) {
      error.identifier = "L'identifiant est requis"
    } 
  
    if(!values.password) {
      error.password = "Le mot de passe est requis"
    } else if(values.password.length < 6) {
      error.password = "Le mot de passe doit contenir au moins 6 caractères"
    }
  
    return error
  }
  
  export default Validation