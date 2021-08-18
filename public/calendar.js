"use strict";
(function iife() {
    const doctors = document.querySelector(".doctors-list");
    const appointments = document.querySelector('.appointments-list');
    const newFirstName = document.querySelector('.first-name');
    const newLastName = document.querySelector('.last-name');

    function renderDoctors( items ) {
        console.log("rend");
        const html = Object.values(items).map(
            (item) => `
                <li data-item-id="${item.doctorID}">
                    <span>${item.lastName}, ${item.firstName}</span>
                </li>
            `
        ).join('');
        console.log(html);
        doctors.innerHTML = html;
        console.log(doctors);
    }

    function renderAppointments( items ) {
        console.log("rend");
        const html = Object.values(items)[0]['appointments'].map(
            (item) => `
                <li data-item-id="${item.appID}">
                    <span>${item.appID}</span>
                    <span>${item.lastName}, ${item.firstName}</span>
                    <span>${item.date}</span>
                    <span>${item.time}</span>
                    <span>${item.kind}</span>
                    <button class="delete">X</button>
                </li>
            `
        ).join('');
        console.log(html);
        appointments.innerHTML = html;
    }

    function convertError(response) {
        if(response.ok) {
          return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    }

    function onLoad() {
        fetch('/data', {
            method: 'GET',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError )
        .then( items => {
            console.log(items);
            renderDoctors(items);
            renderAppointments(items);
        })
        .catch( err => {
            //console.log(err);
        });
    }


    function addAbilityToChangeItems() {

        appointments.addEventListener('click', (e) => {

            const currentItem = e.target.parentNode;
            const currentItemId = currentItem.dataset.itemId;

            if (e.target.classList.contains("delete")) {
                fetch(`/data/${currentItemId}`, {
                    method: 'DELETE',
                })
                .catch( () => Promise.reject( { error: 'network-error' }) )
                .then( convertError )
                .then( items => {
                    renderAppointments(items);
                })
                .catch( err => {
                    console.log(err);
                });
            }
        });
    }

    function addAbilityToAddNewItems() {
        add.addEventListener('click', () => {
            const newFirstName = newFirstName.value;
            const newLastName = newLastName.value;

            if(newFirstName && newLastName) {
                fetch(`/data/app/:doctorID`, {
                    method: 'POST',
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    body: JSON.stringify({ newFirstName, newLastName, date, time })
                })
                .catch( () => Promise.reject( { error: 'network-error' }) )
                .then( convertError)
                .then( items => {
                    newFirstName.value = '';
                    newLastName.value = '';
                    renderAppointments(items);
                })
                .catch( err => {
                    updateStatus(errMsgs[err.error] || err.error);
                });
            }
        });
    }

    onLoad();
    addAbilityToChangeItems();
    addAbilityToAddNewItems();
})();