let select_option = document.getElementById('select_option');
let input_descriotion = document.getElementById('inupt_description');
let input_value = document.getElementById('input_value');
let ul_income_description_value = document.getElementById('income_description_value');
let ul_expenses_description_value = document.getElementById('expenses_description_value');
let income_sum = 0, expenses_sum = 0, balance=0, pesenteg = 0;
let p_income = document.getElementById('p_sum_income');
let p_balance = document.getElementById('p_balance');
let p_expence = document.getElementById('p_sum_expenses');
let expenses_persenteg = document.getElementById('exp_persenteg');

function color_change_with_selector() {
    if (select_option.value == "plus") {
        input_descriotion.style = "border: 3px solid green;"
        input_value.style = "border:3px solid green;"
    }
    else if (select_option.value == "minus") {
        input_descriotion.style = "border:3px solid red;"
        input_value.style = "border:3px solid red;"
    }
}

function clickButton_to_add_discription() {
    if (!validate_input()) {
        return;
    }
    color_change_with_selector();

    if (select_option.value == "plus") {
        percenteg();

        let number_input_value = Number(input_value.value);
        income_sum = Number(income_sum);
        income_sum += number_input_value;
        p_income.innerHTML = (`+${income_sum}`);
        let ul_item_income = document.createElement('li');
        ul_income_description_value.appendChild(ul_item_income);
        let income_description = document.createElement('span');
        income_description.classList.add('description_decoration')
        ul_item_income.appendChild(income_description);
        let income_value = document.createElement('span');
        income_value.classList.add('income_expenses_decoration');
        ul_item_income.appendChild(income_value);
        income_description.innerText = input_descriotion.value;
        income_value.innerText = input_value.value;
        delete_button = document.createElement('i');
        ul_item_income.appendChild(delete_button);
        delete_button.classList.add('far');
        delete_button.classList.add('fa-times-circle');
        percenteg();
        expense_percenteg_from_sumIncome()
        updateBalance();

        delete_button.onclick = function () {
            ul_income_description_value.removeChild(this.parentElement);
            income_sum -= Number(this.previousSibling.innerHTML);
            p_income.innerText = (`+${income_sum}`);
            updateBalance();
            percenteg();
            expense_percenteg_from_sumIncome()
        }
    }
    else if (select_option.value == "minus") {
     
        let number_input_value = Number(input_value.value);
        expenses_sum = Number(expenses_sum);
        expenses_sum += number_input_value;
        p_expence.innerHTML = (`-${expenses_sum}`);
        let ul_item_expence = document.createElement('li');
        ul_expenses_description_value.appendChild(ul_item_expence);
        let expense_description = document.createElement('span');
        expense_description.classList.add('description_decoration')
        ul_item_expence.appendChild(expense_description);
        let expense_value = document.createElement('span');
        expense_value.classList.add('income_expenses_decoration');
        ul_item_expence.appendChild(expense_value);
        let expence_percenteg = document.createElement('span');
        expence_percenteg.classList.add('small_persentege_expense');
        ul_item_expence.appendChild(expence_percenteg);
        expense_description.innerHTML = input_descriotion.value;
        
        expense_value.innerText = input_value.value;
        let delete_button = document.createElement('i');
        ul_item_expence.appendChild(delete_button);
        delete_button.classList.add('fa-times-circle');
        delete_button.classList.add('far');

        percenteg();
        expense_percenteg_from_sumIncome();
        updateBalance();

        delete_button.onclick = function () {
            ul_expenses_description_value.removeChild(this.parentElement);
            expenses_sum -= Number(this.previousSibling.previousSibling.innerHTML);
            p_expence.innerText = (`-${expenses_sum}`);
            updateBalance();
            percenteg(); 
        }
    }
    function percenteg() {
        pesenteg = Math.floor((((expenses_sum) / (income_sum)) * 100));
        if (pesenteg == Infinity || isNaN(pesenteg) ||expenses_sum == 0 || income_sum == 0) {
            pesenteg = 0;
            expenses_persenteg.innerHTML = (`${pesenteg}${"%"}`);
        } else {
            expenses_persenteg.innerHTML = (`${pesenteg}${"%"}`);   
        }  
    }
}

function updateBalance() {
    balance = (income_sum) - (expenses_sum);
    p_balance.innerHTML = balance;
}

function validate_input() {
    if (!input_descriotion.value || !input_value.value || isNaN(input_value.value)) {
        return false;
    }
    if (input_value.value < 0) {
        return false;
    }
    return true;
}
let month;
let monthOfYear = new Date().getMonth();
switch (monthOfYear) {
    case 0:
        month = "January"
        break;
    case 1:
        month = "February"
        break;
    case 2:
        month = "March"
        break;
    case 3:
        month = "April"
        break;
    case 4:
        month = "May"
        break;
    case 5:
        month = "June"
        break;
    case 6:
        month = "July"
        break;
    case 7:
        month = "August"
        break;
    case 8:
        month = "September"
        break;
    case 9:
        month = "October"
        break;
    case 10:
        month = "November"
        break;
    case 11:
        month = "December"
        break;

    default:
        break;
}
let date = new Date();

let p_date_month = document.getElementById('p_date_month');

let p_date_year = document.getElementById('p_date_year');

let year = date.getFullYear();

p_date_month.innerHTML = (`Available Budget in ${month}`);
p_date_year.innerHTML = year;

function expense_percenteg_from_sumIncome(){
    let all_li_expenses = document.querySelectorAll('#expenses_description_value li');
    // console.log(`all li expenses: ${all_li_expenses}`)    /////
    for (let index = 0; index < all_li_expenses.length; index++) {
        const element = all_li_expenses[index];
     let li_expenses_small_percenteg = Math.floor(( Number(element.children[1].innerText)/ income_sum)*100);
     
     if(li_expenses_small_percenteg == Infinity || isNaN(li_expenses_small_percenteg)){
        element.children[2].innerText = "0%";
     }
     else{
        element.children[2].innerText = (`${li_expenses_small_percenteg}%`);
     }
   
    }
}
