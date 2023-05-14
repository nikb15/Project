class Calculator{
    constructor(previousoperandTextElement, currentOperandTextElement)
    {
        this.previousoperandTextElement = previousoperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }


    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operand=undefined // no operator



    }

    delete(){
        this.currentOperand =this.currentOperand.toString().slice(0,-1);

    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return; // if more than one decimal observed 
        this.currentOperand= this.currentOperand.toString()+number.toString()
    }

    choseOperation(operation){
        if(this.currentOperand==='')return;
        if(this.previousOperand!=''){
            this.compute;
        }
        this.operation=operation;
        this.previousOperand= this.currentOperand
        this.currentOperand='';
    }

    compute(){
        let computation
        const prev =parseFloat(this.previousOperand);
        const curr= parseFloat(this.currentOperand);
        if(isNaN(curr) || isNaN(prev))
        return ;
        switch(this.operation)
        {
            case '+':
                computation=prev+curr;
                break;
            case '-':
                compute= prev-curr;
                break;
            case '*':
                    computation=prev*curr;
                    break;
            case '/':
                    computation= prev/curr;
                    break;
            default:
                return;
        }
        this.currentOperand= computation;
        this.operation=undefined;
        this.previousOperand='';
    }

    updateDisplay(){
            this.currentOperandTextElement.innerText= (this.currentOperand);
            if(this.operation!=null){
                this.previousoperandTextElement.innerText= `${(this.previousOperand)} ${this.operation}`;
            }
    }


    getDisplayNumber(number)
    {
        const floatNumber = parseFloat(number);
        if(floatNumber===NaN) return '';
        return floatNumber.toLocaleString('en');
    }

}


const numberButton = document.querySelectorAll('[data-number]');
const operationButton= document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equal]');
const previousOperandText=document.querySelector('[data-previous-operand]');
const currentOperandText=document.querySelector('[data-current-operand]');


const calculator= new Calculator(previousOperandText, currentOperandText);
numberButton.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})



operationButton.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.choseOperation(button.innerText);
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click',button=>{
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click',button =>{
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click',button =>{
    calculator.delete();
    calculator.updateDisplay();
})