function Validation(values) {
    let error = {}
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if(!values.username) {
      error.username = "Le pseudo est requis"
    } else if(values.username.length < 3) {
      error.username = "Le pseudo doit contenir au moins 3 caractères"
    }
  
    if(!values.email) {
      error.email = "L'email est requis"
    } else if(!regex.test(values.email)) {
      error.email = "L'email n'est pas valide"
    }
  
    if(!values.password) {
      error.password = "Le mot de passe est requis"
    } else if(values.password.length < 6) {
      error.password = "Le mot de passe doit contenir au moins 6 caractères"
    }
  
    if(!values.confirmPassword){
        error.confirmPassword = "Le mot de passe est requis";
    }else if(values.confirmPassword !== values.password ){
        error.confirmPassword = "Le mot de passe doit être identique";
    }
    return error
  }
  
  export default Validation