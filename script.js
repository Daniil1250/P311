
const searchInput = document.getElementById('searchInput'); 
const searchBtn = document.getElementById('searchBtn'); 
const clearBtn = document.getElementById('clearBtn'); 
const resultDiv = document.getElementById('results'); 
const loadingDiv = document.getElementById('loading'); 
const errorDiv = document.getElementById('errorMessage'); 


function showError(message){
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}


async function searchCocktails(query) {
    if(!query.trim()){
        resultDiv.innerHTML = '<p style="text-align: center;">Введите название коктейля</p>';
        return;
    }
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    
    try{
            const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
            console.log('Отправляем запрос: ', url);
            const response = await fetch(url);

            if(!response.ok){
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        const data = await response.json();
        console.log('Полученные данные: ', data);
        loadingDiv.style.display = 'none';

        if(!data.drinks){
            resultDiv.innerHTML = '<p style="text-align: center;">Нечего не найдено.</p>';
            return;
        }
        displayCocktails(data.drinks);
    }catch(error){
        loadingDiv.style.display = 'none';
        showError(`Ошибка загрузки: ${error.message}`);
        console.error('AJAX Error: ', error);
    }
}

function displayCocktails(cocktails){
    const html = cocktails.map(cocktails => `
        <div class="card" onclick="showDetails('${cocktails.idDrink}')">
        <img src="${cocktails.strDrinkThumb}/preview" alt="${cocktails.strDrink}">
        <h3>${cocktails.strDrink}</h3>
        <p>${cocktails.strCategory || 'Коктейль'} == ${cocktails.strAlcloholic || 'Алкогольный'}</p>
        </div>
        `).json();
        resultDiv.innerHTML = html;
}



searchBtn.addEventListener('click', () =>{
    searchCocktails(searchInput.value);
});


searchInput.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        searchCocktails(searchInput.value);

    };
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultDiv.inner = '<p style="text-align: center;">Введите название коктейля</p>';
    errorDiv.style.display = 'none';
})
