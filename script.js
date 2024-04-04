const hello = (data) => {
    let maxExpense = 0;
    let totalExpense = 0;
    for(const expense of data){
        totalExpense += expense.amount;
        if(maxExpense < expense.amount){
            maxExpense = expense.amount;
        }
    }
    
    let str = totalExpense + '';
    let copyStr = '';
    for(let i=0; i<str.length; i++){
        if(str[i] === '.'){
            copyStr += str[i];
            copyStr += str[i+1];
            copyStr += str[i+2];
            break;
        }
        else{
            copyStr += str[i];
        }
    }
    document.querySelector('.totalExpense').innerHTML = copyStr;
    
    const chartContainer = document.querySelector('.charts');
    data.map((expense,i)=>{
        const chart = document.createElement('div');
        chart.classList.add('chart',`chart${i}`);
        const h1Tag = document.createElement('h4');
        h1Tag.innerHTML = `$${expense.amount}`;
        h1Tag.classList.add('topAmount','hidden');
        chart.appendChild(h1Tag);
        let chartHeight = (expense.amount / maxExpense) * 100;
        chart.style.height = chartHeight + '%';
        if(expense.amount === maxExpense){
            chart.style.backgroundColor = 'hsl(186, 34%, 60%)';
        }
        chartContainer.appendChild(chart);
    })
    HoverEffect();
}

const HoverEffect = () => {
    const allCharts = document.querySelectorAll('.chart');
    console.log(allCharts);

    allCharts.forEach((chart)=> {
        chart.addEventListener('mouseenter', (e)=>{
            const children = e.target.children;
            children[0].classList.remove('hidden');
        })
        chart.addEventListener('mouseleave', (e)=>{
            const children = e.target.children;
            children[0].classList.add('hidden');
        })


    })

}



const fetchData = () => {
    fetch('./data.json')
    .then(res => res.json())
    .then(data => hello(data));
}
fetchData();



