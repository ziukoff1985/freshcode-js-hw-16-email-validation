'use strict';

import { inputConfigData, radioConfigData } from './configData.js';

// DOM - elements creation
const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const form = document.createElement('form');
container.append(form);

const h1 = document.createElement('h1');
h1.textContent = 'CREATE AN ACCOUNT';
form.append(h1);

const inputWrapDiv = document.createElement('div');
inputWrapDiv.classList.add('inputs-wrapper');
form.append(inputWrapDiv);

inputConfigData.forEach(({ type, name, placeholder, attributes }) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('aria-label', placeholder);

    if (attributes) {
        for (const key in attributes) {
            input.setAttribute(key, attributes[key]);
        }
    }

    inputWrapDiv.append(input);
});

radioConfigData.forEach(({ id, label, paragraphText }) => {
    const radioWrapDiv = document.createElement('div');
    radioWrapDiv.classList.add('radio-wrapper');
    form.append(radioWrapDiv);

    const radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', 'join-as');
    radioInput.setAttribute('id', id);
    radioWrapDiv.append(radioInput);

    const radioContentDiv = document.createElement('div');
    radioContentDiv.classList.add('radio-content');
    radioWrapDiv.append(radioContentDiv);

    const radioContentLabel = document.createElement('label');
    radioContentLabel.setAttribute('for', id);
    radioContentLabel.textContent = label;
    radioContentDiv.append(radioContentLabel);

    const radioContentParagraph = document.createElement('p');
    radioContentParagraph.classList.add('radio-text');
    radioContentParagraph.textContent = paragraphText;
    radioContentDiv.append(radioContentParagraph);
});

const checkboxWrapDiv = document.createElement('div');
checkboxWrapDiv.classList.add('checkbox-wrapper');
form.append(checkboxWrapDiv);

const checkboxInput = document.createElement('input');
checkboxInput.setAttribute('type', 'checkbox');
checkboxInput.setAttribute('name', 'terms');
checkboxInput.setAttribute('id', 'terms');
checkboxWrapDiv.append(checkboxInput);

const checkboxInputLabel = document.createElement('label');
checkboxInputLabel.setAttribute('for', 'terms');
checkboxInputLabel.textContent =
    'Allow Squadhelp to send marketing/promotional offers from time to time';
checkboxWrapDiv.append(checkboxInputLabel);

const btnWrapDiv = document.createElement('div');
btnWrapDiv.classList.add('btn-wrapper');
form.append(btnWrapDiv);

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Submit';
btnWrapDiv.append(submitButton);

const cancelButton = document.createElement('button');
cancelButton.setAttribute('type', 'reset');
cancelButton.textContent = 'Cancel';
btnWrapDiv.append(cancelButton);

// DOM - events creation

class Person {
    constructor(...args) {
        args.forEach(({ name, value }) => {
            this[name] = value.trim();
        });
    }
}

function onSubmitForm(event) {
    event.preventDefault();
    const formInputs = [...document.querySelectorAll('input')].filter(
        ({ name, value, type }) =>
            name && value.trim() && type !== 'checkbox' && type !== 'radio'
    );

    const person = new Person(...formInputs);

    if (!person.lastName) {
        console.log('Cannot save: Last Name is required and cannot be empty');
        return;
    }

    const personJson = JSON.stringify(
        person,
        (key, value) =>
            key === 'password' || key === 'passwordConfirmation'
                ? undefined
                : value,
        2
    );

    localStorage.setItem(person.lastName, personJson);
    form.reset();
}

form.addEventListener('submit', onSubmitForm);

// const form = document.querySelector('form');

// * Version with dynamic props collection
// class Person {
//     constructor(
//         firstName = 'Not provided',
//         lastName,
//         nickName = 'Not provided',
//         email = 'Not provided'
//     ) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.nickName = nickName;
//         this.email = email;
//     }
// }

// function onSubmitForm(event) {
//     event.preventDefault();
//     const formElements = form.elements;

//     const person = new Person();

//     for (const { name, value, tagName } of formElements) {
//         if (name && tagName === 'INPUT' && value.trim()) {
//             person[name] = value.trim();
//         }
//     }

//     if (!person.lastName) {
//         console.log('Cannot save: Last Name is required and cannot be empty');
//         return;
//     }

//     localStorage.setItem(person.lastName, JSON.stringify(person));
//     form.reset();
// }

// form.addEventListener('submit', onSubmitForm);

// * Version with event.target.elements

// class Person {
//     constructor(firstName, lastName, nickName, email) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.nickName = nickName;
//         this.email = email;
//     }
// }

// function onSubmit(event) {
//     event.preventDefault();
//     const formElements = event.target.elements;

//     const firstNameValue = formElements.firstName.value.trim();
//     const lastNameValue = formElements.lastName.value.trim();
//     const nickNameValue = formElements.nickName.value.trim();
//     const emailValue = formElements.email.value.trim();

//     if (!lastNameValue) {
//         console.log('Cannot save: Last Name is required as a key');
//         form.reset();
//         return;
//     }

//     const person = new Person(
//         firstNameValue || 'Not provided',
//         lastNameValue || 'Not provided',
//         nickNameValue || 'Not provided',
//         emailValue || 'Not provided'
//     );

//     localStorage.setItem(lastNameValue, JSON.stringify(person));

//     form.reset();
// }

// form.addEventListener('submit', onSubmit);

// * Version with direct input.value

// const firstName = document.querySelector('input[name="first-name"]');
// const lastName = document.querySelector('input[name="last-name"]');
// const nickName = document.querySelector('input[name="nick-name"]');
// const email = document.querySelector('input[name="email"]');

// class Person {
//     constructor(firstName, lastName, nickName, email) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.nickName = nickName;
//         this.email = email;
//     }
// }

// function onSubmit(event) {
//     event.preventDefault();
//     const firstNameValue = firstName.value || 'Value does not provided';
//     const lastNameValue = lastName.value || 'Value does not provided';
//     const nickNameValue = nickName.value || 'Value does not provided';
//     const emailValue = email.value || 'Value does not provided';

//     localStorage.setItem(
//         lastNameValue,
//         JSON.stringify(
//             new Person(firstNameValue, lastNameValue, nickNameValue, emailValue)
//         )
//     );
// }

// const buttonSubmit = document.querySelector('button[type="submit"]');
// buttonSubmit.addEventListener('click', onSubmit);
