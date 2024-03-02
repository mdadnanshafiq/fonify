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
            <div class="card-actions ">
                <button id="${phone.slug.slice(-5)}" 
                    class="detail btn detailBtn text-white bg-sky-500 active:bg-sky-500 hover:bg-sky-500" onclick = "my_modal_5.showModal()">Details</button>
            </div>
        </div>
        `
        // console.log(phone);
        phoneContainer.appendChild(div);

        const modal = document.getElementById('modalBox');

        let detail = document.getElementById(`${phone.slug.slice(-5)}`).addEventListener('click', () => {
            // console.log('hello');
            modal.innerHTML = '';
            let pid = phone.slug;
            // event.stopPropagation();
            const callModal = async (pid) => {
                const url = `https://openapi.programming-hero.com/api/phone/${pid}`;
                const res = await fetch(url);
                const data = await res.json();
                const phone = data.data;
                console.log(phone);
                let { brand, image, mainFeatures: { chipSet, displaySize, memory, sensors, storage }, others: { GPS: gps }, name, releaseDate, slug } = phone;
                displayDetail(brand, image, chipSet, displaySize, memory, sensors, storage, name, releaseDate, slug, gps);
                console.log(brand, image, chipSet, displaySize, memory, sensors, storage, name, releaseDate, slug, gps);

            };

            const displayDetail = (brand, image, chipSet, displaySize, memory, sensors, storage, name, releaseDate, slug, gps) => {
                let div = document.createElement('div');
                div.innerHTML = `
                <div class="">
                    <div class="flex justify-center items-center bg-gray-100 rounded-lg py-10">
                        <div class="w-[150px]">
                            <img src="${image}" alt="">
                        </div>
                    </div>
                    <h3 class="font-bold text-2xl py-6">${name}</h3>
                    
                    <p><strong>Storage: </strong>${storage}</p>
                    <p><strong>Display Size: </strong>${displaySize}</p>
                    <p><strong>Chipset: </strong>${chipSet}</p>
                    <p><strong>Memory: </strong>${memory}</p>
                    <p><strong>Slug: </strong>${slug}</p>
                    <p><strong>Release Date: </strong>${releaseDate}</p>
                    <p><strong>Brand: </strong>${brand}</p>
                    <p><strong>GPS: </strong>${gps}</p>
                </div>
                <div class="modal-action">
                    <form method="dialog">

                        <button
                            class="btn text-white bg-red-400 hover:bg-red-400 active:bg-red-400">Close</button>
                    </form>
                </div>
                `
                modal.appendChild(div);


                // console.log(modalNew)
            };
            callModal(pid);
            // console.log(myPhone);
        })

        // for (let btn of detail) {
        //     btn.addEventListener('click', () => console.log(phone.slug));
        // };
        // console.log(pid)
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