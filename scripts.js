const mainDiv = document.getElementById('game-container');
const user1Div = document.getElementById('user1');
const user2Div = document.getElementById('user2');
const errortag = document.getElementById('errors');
const winner = document.getElementById('winner');
const yourTurn = `<p class='green'>Your Turn</p>`;


const user1arr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const user2arr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

function validate(matrix){

    console.log(matrix);
    let dia = 0;
    let adia = 0;
    for(let i = 0; i < matrix.length; i++){
        dia += matrix[i][i];
        adia += matrix[i][matrix.length-1 - i ];

        let row = 0;
        let col = 0;
        for(let j = 0; j < matrix.length; j++){
            row += matrix[i][j];
            col += matrix[j][i];
        }
        if(row === 3 || col === 3)return true;
    }
    if(dia === 3 || adia === 3)return true;
    return false;

}

const displayResults = (winr)=>{

    let list = mainDiv.children;
    for(let i = 0; i < list.length; i++){
        let child = list[i];
        child.disabled = true;
    }
    if(winr === 'user1'){
        winner.innerHTML = `Winner: <span style="color:tomato;">User 1</span>`;
    }
    else if(winr === 'user2'){
        winner.innerHTML = `Winner: <span style="color:rgb(83, 186, 249);">User 2</span>`;
    }
    else{
        winner.innerHTML = `<span style="color:grey;">It's a draw</span>`;
    }
}

let next = 'user1';
let clicksNum = 0;
const handleClick = (e)=>{
    const ele = e.target
    if(ele.classList.contains('cross') || ele.classList.contains('circle')){
        errortag.innerText = 'Select a different square!!';
        setTimeout(()=>{
            errortag.innerText = "";
        }, 1500);
    }else{
        clicksNum++;
        let row = parseInt(ele.id[0]);
        let col = parseInt(ele.id[1]);
        if(next === 'user1'){
            ele.classList.add('cross');
            user1arr[row][col] = 1;
            
            if(clicksNum > 4){
                let result = validate(user1arr);
                if(result){
                    return displayResults(next);
                }
            }
            //removing the your turn
            user1Div.classList.remove('green-border');
            user1Div.removeChild(user1Div.lastElementChild);
            
            //addind the your turn
            user2Div.classList.add('green-border');
            user2Div.innerHTML += yourTurn;
            next = 'user2';
        }else{
            ele.classList.add('circle');
            user2arr[row][col] = 1;

            if(clicksNum > 4){
                let result = validate(user2arr);
                if(result)return displayResults(next);
            }

            //removing the your turn
            user2Div.classList.remove('green-border');
            user2Div.removeChild(user2Div.lastElementChild);
            
            //addind the your turn
            user1Div.classList.add('green-border');
            user1Div.innerHTML += yourTurn;
            next = 'user1'
        }
        if(clicksNum === 9){
            displayResults('draw');
        }
    }
}


mainDiv.addEventListener('click', handleClick);