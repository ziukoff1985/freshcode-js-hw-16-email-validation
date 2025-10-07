'use strict';

import { inputConfigData, radioConfigData } from './configData.js';

// HW 24 Create form by JS
const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const form = document.createElement('form');
container.append(form);

const h1 = document.createElement('h1');
h1.textContent = 'CREATE AN ACCOUNT';
form.append(h1);

const formParagraph = document.createElement('p');
formParagraph.textContent =
    'We always keep your name and email address private';
form.append(formParagraph);

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

    const inputGroupDiv = document.createElement('div');
    inputGroupDiv.classList.add('input-group');
    inputWrapDiv.append(inputGroupDiv);
    inputGroupDiv.append(input);
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

// HW 26 Email validation
const emailInput = document.querySelector('input[name="email"]');
const inputGroupEmail = emailInput.closest('.input-group');

const emailRegex = /^\w+\.?-?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;

let isValidEmail = false;

const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
errorMessage.textContent = 'INVALID EMAIL FORMAT';
inputGroupEmail.append(errorMessage);

function validateEmail(event) {
    const email = event.target.value;
    const isValid = emailRegex.test(email);

    if (!isValid) {
        errorMessage.classList.add('visible');
        emailInput.classList.add('invalid');
        isValidEmail = false;
    } else {
        errorMessage.classList.remove('visible');
        emailInput.classList.remove('invalid');

        isValidEmail = true;
    }
}

emailInput.addEventListener('input', validateEmail);

// HW 25 Collect props
class Person {
    constructor(...args) {
        args.forEach(({ name, value }) => {
            this[name] = value.trim();
        });
    }
}

function onSubmitForm(event) {
    event.preventDefault();
    if (isValidEmail) {
        const formInputs = [...document.querySelectorAll('input')].filter(
            ({ name, value, type }) =>
                name && value.trim() && type !== 'checkbox' && type !== 'radio'
        );

        const person = new Person(...formInputs);

        if (!person.lastName) {
            console.log(
                'Cannot save: Last Name is required and cannot be empty'
            );
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
}

form.addEventListener('submit', onSubmitForm);
