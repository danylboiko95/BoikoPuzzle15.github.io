/*
Хотя используется метод случайных перемещений, но игру можно собрать разными способами
, то есть 
1 5 9 13
2 6 10 14
3 7 11 15
4 8 12     тоже сработает
*/

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];

const area = document.querySelector('.area');
const reset = document.querySelector('.reset');
let count = 0;//количество шагов

class Game{
    constructor(array){
        this.array = array;
    }

    
    shuffleArray() {//метод случайных перемещений
        for (let i = this.array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }
    createGame(arr){
        
        area.innerHTML = '';
        const markup = `
        <div class="field">
            <div class="tile" id ="0">${arr[0]}</div>
            <div class="tile" id ="1">${arr[1]}</div>
            <div class="tile" id ="2">${arr[2]}</div>
            <div class="tile" id ="3">${arr[3]}</div>
            <div class="tile" id ="4">${arr[4]}</div>
            <div class="tile" id ="5">${arr[5]}</div>
            <div class="tile" id ="6">${arr[6]}</div>
            <div class="tile" id ="7">${arr[7]}</div>
            <div class="tile" id ="8">${arr[8]}</div>
            <div class="tile" id ="9">${arr[9]}</div>
            <div class="tile" id ="10">${arr[10]}</div>
            <div class="tile" id ="11">${arr[11]}</div>
            <div class="tile" id ="12">${arr[12]}</div>
            <div class="tile" id ="13">${arr[13]}</div>
            <div class="tile" id ="14">${arr[14]}</div>
            <div class="tile" id ="15">${arr[15]}</div>    
        </div>`
         
        area.insertAdjacentHTML('afterbegin', markup);
        
    }
    
    resetGame(){
        area.innerHTML = '';
        count = 0;
        this.shuffleArray();
        this.createGame(this.array);
    }

    
    moveTile(id){
        let newArr = this.array;
        
        if(newArr[id+1] === ' ' && !((id+1)%4 == 0)){
            
            let temp1 = newArr[id+1];
            newArr[id+1] = newArr[id];
            newArr[id] = temp1;
            count++;
            this.createGame(newArr);

        } else if(newArr[id-1] === ' ' && !(id%4 == 0)){

            let temp1 = newArr[id-1];
            newArr[id-1] = newArr[id];
            newArr[id] = temp1;
            count++;
            this.createGame(newArr);

        }else if(newArr[id+4] === ' ' ){

            let temp1 = newArr[id+4];
            newArr[id+4] = newArr[id];
            newArr[id] = temp1;
            count++;
            this.createGame(newArr);
        
        } else if(newArr[id-4] === ' '){

            let temp1 = newArr[id-4];
            newArr[id-4] = newArr[id];
            newArr[id] = temp1;
            count++;
            this.createGame(newArr);
        
        } 
        
        this.winGame(newArr);
           
        
    }
    winGame(arr){
        let winLine1 = '123456789101112131415 ';//разные варианты победы
        let winLine2 = '159132610143711154812 ';
        let winLine3 = ' 123456789101112131415';
        let check = arr.join('');
        
        
        if((check === winLine1 || check === winLine2 || check === winLine3) && count !==0){
            
                area.innerHTML = '';
                let markup = `
                <div class="winMess">
                    <img src="/youwin.png" alt="" class="win">
                    <div class="count">You have done it in ${count} steps!</div>
                </div>
                `
                area.insertAdjacentHTML('afterbegin', markup);
                
        }
        
    }
}
const startGame = new Game(arr);//инициализируем новый прототип
startGame.createGame(arr);//можно добавить на событие load
reset.addEventListener('click', (e)=>{
    startGame.resetGame();
});
area.addEventListener('click', (e)=>{ 
    startGame.moveTile(parseInt(e.target.id));//получаем значение id по клику
});