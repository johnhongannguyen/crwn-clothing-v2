import './sign-up-form.styles.scss'
import { useState, useContext } from "react";
import FormInput  from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';


const defaultFormFields ={
    displayName: '',
    email: '',
    password:'',
    confirmPassword:''
}




const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields;

    // pull up user from UserContext

    const {setCurrentUser} = useContext(UserContext)
    

    console.log('hit');

    
    
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert('Your password does not match')
            return;
        }
    
       try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);

            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user,{displayName});

            resetFormFields();
           
       }catch(error){
       if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
       }else{

           console.log('there is an error',error.message)
       }
       }
        

        
    }
    const handleChange = event =>{
        const {name,value} = event.target;

        setFormFields({...formFields,[name]:value})
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>   
            <span> Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
              
                <FormInput
                label='Display Name'
                type='text' 
                required 
                onChange={handleChange} 
                name='displayName' 
                value={displayName}/>

               <FormInput
                label='Email'
                type='email' 
                required 
                onChange={handleChange} 
                name='email' 
                autoComplete='username'
                value={email}/>
               <FormInput
                label='Password'
                type='password'
                required 
                onChange={handleChange} 
                name='password'
                autoComplete="new-password"
                value={password}/>
                <FormInput  
                label='Confirm Password' 
                type='password' 
                required onChange={handleChange} 
                name='confirmPassword' 
                autoComplete="new-password" 
                value={confirmPassword}/>

                <Button buttonType='default' type='submit' >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;