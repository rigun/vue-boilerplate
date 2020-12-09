import {
    emailRegex,
    numberOnlyRegex,
    textOnlyRegex
} from './regex'

const validateForm = async(field,item,error,errorMsg, regexValidate = []) =>{
    
    var countError = 0
    for (var i = 0; i < field.length; i++){
        if(isEmpty(item[field[i]])){
            error[field[i]] = true
            errorMsg[field[i]] = 'Tidak boleh kosong'
            countError += 1;
        }else{
            error[field[i]] = false
        }
    }
    if(regexValidate.length == 0){
        return {countError, error, errorMsg}
    }else{
        return validateRegex(regexValidate,item,error,errorMsg,countError)
    }
}

const validateRegex = async(field,item,error,errorMsg,countError) =>{
    const temp = {
        email: {
            regex: emailRegex,
            msg: 'Email tidak valid'
        },
        numberOnly:{
            regex: numberOnlyRegex,
            msg: 'Hanya boleh angka'
        },
        textOnly:{
            regex: textOnlyRegex,
            msg: 'Hanya boleh huruf'
        }
    }
    for (var i = 0; i < field.length; i++){
        if(!error[field[i].name]){
            if(!RegExp(temp[field[i].regex].regex).test(item[field[i].name])){
                error[field[i].name] = true
                errorMsg[field[i].name] = temp[field[i].regex].msg
                countError += 1;
            }else{
                error[field[i].name] = false
            }
        }
    }
    return {countError, error, errorMsg}
}

const isEmpty = (value) =>{
    return value == null || value == ''
}

export {
    validateForm
}