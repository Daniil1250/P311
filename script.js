
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
        resultDiv.innerHTML = '<p style="text-align: center;">Введите название книги или авитора</p>';
        return;
    }
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    
    try{
            const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;
            console.log('Отправляем запрос: ', url);
            const response = await fetch(url);

            if(!response.ok){
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        const data = await response.json();
        console.log('Полученные данные: ', data);
        loadingDiv.style.display = 'none';

        if(!data.items || data.items.length === 0){
            resultDiv.innerHTML = '<p style="text-align: center;">Нечего не найдено.</p>';
            return;
        }
        displayCocktails(data.items);
    }catch(error){
        loadingDiv.style.display = 'none';
        showError(`Ошибка загрузки: ${error.message}`);
        console.error('AJAX Error: ', error);
    }
}

function displayCocktails(books){
    const html = books.map(book => {
        const valumeInfo = book.valumeInfo;
        const bookId = book.id;

        const title = valumeInfo.title || 'Без названия';
        const authors = valumeInfo.authors ? valumeInfo.authors.join(', ') : 'Автор не указан';
        const thumbnail = valumeInfo.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=No+Cover';
        const publishedDate = valumeInfo.publishedDate ? valumeInfo.publishedDate.slice(0, 4) : 'Год не указан';
        const categories = valumeInfo.categories ? valumeInfo.categories[0] : 'Разное';

        return `
            <div class="card" onclick="showDetails('${bookId}')">
                <img src="${thumbnail}" alt="${title}">
                <h3>${title.length > 40 ? title.slice(0, 40) + '...' : title}</h3>
                <p>${authors}</p>
                <p>${publishedDate} -+-  ${categories}</p>
        `;
    }).join('');
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
