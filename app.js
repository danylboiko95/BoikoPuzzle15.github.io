/*
Хотя используется метод случайных перемещений, но игру можно собрать разными способами
, то есть 
1 5 9 13
2 6 10 14
3 7 11 15
4 8 12     тоже сработает
*/

/*
    Not bad actually
    Easy to read, easy to understand what is going on
*/

/*
    Chose better names for your variables
    Just 'arr' is not informative

    Objects and arrays are passed to functions by reference
    when you pass this array to your game instance and shuffle it
    for the first time you lose initial state - this array is changed!

    Better to use this array as starting pattern
    Not pass it constructor but use next statement in constructor and reset methods:

    this.array = arr.slice();
*/
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];

const area = document.querySelector('.area');
const reset = document.querySelector('.reset');
let count = 0;//количество шагов

class Game{
    constructor(array){
        this.array = array;
    }

    /*
        Not sure this will produce solvable puzzle
        Guess you need to take solved state and do real moves
        (swap with empty tile)
    */
    shuffleArray() {//метод случайных перемещений
        for (let i = this.array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }

    createGame(arr){
        
        /*
            I understand that you are lazy enough to
            create or populate elements in a loop 
            and want to use string interpolation
            but this template is a piece of hardcode
        */
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
        
        area.innerHTML = '';
        /*
            No need to use this method as far as you cleaned area content above
        */
        area.insertAdjacentHTML('afterbegin', markup);
        
    }
    
    resetGame(){
        /* 
            You clean area in the createGame method
            Excess instruction
        */
        area.innerHTML = '';
        count = 0;
        this.shuffleArray();
        /*
            No need to pass instance property
            to instance method :)

            You can change createGame signature to be parameterless
        */
        this.createGame(this.array);
    }

    /*
        Repanting whole grid not the most 
        elegant way to show the move

        Not in the curent case but this approach
        is worst for perfomance

        Don't neglect performance
        in the sake of code economy
        
        Feels like angular style :)
    */
    moveTile(id){
        let newArr = this.array;
        
        if(newArr[id+1] === ' ' && !((id+1)%4 == 0)){
            /*
                Repeating 4 times almost identical code
                I believe you can find regularity
                and move it to the separate method
            */
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

        } else if(newArr[id+4] === ' ' ){

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
        
        /*
            Win check runs on every click
            No matter the real move was done
        */
        this.winGame(newArr);
    }

    winGame(arr){
        let winLine1 = '123456789101112131415 ';//разные варианты победы
        let winLine2 = '159132610143711154812 ';
        let winLine3 = ' 123456789101112131415';
        /*
            Use trim and reduce winLines by 1 :)
        */
        let check = arr.join('');
        
        if((check === winLine1 || check === winLine2 || check === winLine3) && count !== 0){
            let markup = `
            <div class="winMess">
                <img src="./youwin.png" alt="" class="win">
                <div class="count">You have done it in ${count} steps!</div>
            </div>
            `
            area.innerHTML = '';
            /* 
                Same as above 
                You can just do: area.innerHTML = markup;
            */
            area.insertAdjacentHTML('afterbegin', markup);
        }
    }
}

const startGame = new Game(arr);//инициализируем новый прототип

startGame.createGame(arr);//можно добавить на событие load

reset.addEventListener('click', (e) => {
    startGame.resetGame();
});

area.addEventListener('click', (e) => { 
    startGame.moveTile(parseInt(e.target.id));//получаем значение id по клику
});