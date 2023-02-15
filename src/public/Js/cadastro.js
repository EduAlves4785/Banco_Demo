const form=document.getElementById("form")
const cpf=document.getElementById("cpf")
const nome=document.getElementById("nome")
const email=document.getElementById("email")
const senha=document.getElementById("senha")

const botao=document.getElementById("botao")
const btnLogin=document.getElementById("btnlogin")
const url=`http://localhost:8081/api/cadastro`

const erro1=document.getElementById("erro1")
const erro2=document.getElementById("erro2")
const erro3=document.getElementById("erro3")
const erro4=document.getElementById("erro4")

function CPFValidate(){
    if(cpf.value.length>11 || cpf.value.length<11 || typeof cpf===String){
        erro1.innerText="CPF inválido!"
        cpf.style.border=".5px solid red" 
    }else{
        erro1.innerText=" "
        cpf.style.border=".5px solid green"
    }
}

function nomeValidate(){
    if(!nome.value || nome.value==" "){
        erro2.innerText="Nome inválido!"
        nome.style.border=".5px solid red"

    }else{
        erro2.innerText=" "
        nome.style.border=".5px solid green"
    }
}

function emailValidate(){
    if(!email.value || email.value==" "){
        erro3.innerText="Email inválido!"
        email.style.border=".5px solid red" 
    }else{
        erro3.innerText=" "
        email.style.border=".5px solid green"
    }
}

function senhaValidate(){
    if(senha.value.length<4 || senha.value==" "){
        erro4.innerText="A senha deve ter no mínimo 4 digitos!"
        senha.style.border=".5px solid red" 
    }else{
        erro4.innerText=" "
        senha.style.border=".5px solid green"
    }
}

botao.addEventListener('click',(event)=>{
    event.preventDefault();
    const isvalid=true

    CPFValidate()
    nomeValidate()
    emailValidate()
    senhaValidate()

    if(isvalid){
        fetch(url,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
                cpf:cpf.value,
                nome:nome.value,
                email:email.value,
                senha:senha.value
            }),
        }).then((resp)=>{resp.json()})
        .then(()=>window.alert("Cadastro concluído!"))
        .catch((e)=>console.log("Erro no servidor: "+e))
    }

    botao.style.display="none"
    btnLogin.addEventListener('click',()=>{
        window.location.href="http://localhost:8081/login"
    })

    
})
    