
const cpf=document.getElementById("cpf")
const pass=document.getElementById("senha")
const error=document.getElementById("error")
const botao=document.getElementById("botao")
botao.addEventListener('click',validar)

async function validar(){
    const url=`http://localhost:8081/api/usuario/${cpf.value}`

    fetch(url)
    .then(resp=>resp.json())
    .then(data=>{
        const dados=data.result
        if(dados.cpf!==cpf.value || dados.senha!==pass.value){
            error.innerText="Dados inválidos."
        }else{
            error.innerText="Dados ok."
            window.location.assign(`http://localhost:8081/conta/${cpf.value}`);
    }
    })
}
