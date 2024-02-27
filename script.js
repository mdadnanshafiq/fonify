const callData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
};

const phoneContainer = document.getElementById('phoneContainer');

const displayPhones = phones => {
    phones.forEach(phone => {

        let div = document.createElement('div');
        div.classList = `card w-80 bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.brand}</p>
            <div class="card-actions">
                <button
                    class="btn  text-white bg-sky-500 active:bg-sky-500 hover:bg-sky-500">Details</button>
            </div>
        </div>
        `
        console.log(phone);
        phoneContainer.appendChild(div);
    })
};



const searchText = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {

    if (searchText.value === '') {
        phoneContainer.innerHTML = '';
        callData('a');
        displayPhones(phones);
    } else {
        phoneContainer.innerHTML = '';
        callData(searchText.value);
        displayPhones(phones);
    }
})




callData('a');
