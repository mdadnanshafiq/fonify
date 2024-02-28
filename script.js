let dataLength = 0;

const callData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    dataLength = phones.length;
    if (dataLength < 1) {
        alert('No match found!');
    }
    displayPhones(phones);
};

const phoneContainer = document.getElementById('phoneContainer');

const displayPhones = phones => {

    if (phones.length < 12) {
        document.getElementById('seeAll').classList.add('hidden');
    } else {
        document.getElementById('seeAll').classList.remove('hidden');
    }
    phones = phones.slice(0, 12);

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
        // console.log(phone);
        phoneContainer.appendChild(div);
    })
    document.getElementById('loading').classList.add('hidden');
};



const searchText = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    document.getElementById('loading').classList.remove('hidden');
    if (searchText.value === '') {
        phoneContainer.innerHTML = '';
        callData('a');
    } else {
        phoneContainer.innerHTML = '';
        callData(searchText.value);
    }
})




callData('a');
