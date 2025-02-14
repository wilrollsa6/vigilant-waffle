document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('incidentForm').addEventListener('submit', saveReport);
});

function addPerson() {
    const peopleInvolvedDiv = document.getElementById('peopleInvolved');
    const personDiv = document.createElement('div');
    personDiv.innerHTML = `
        <label>Name: <input type="text" name="personName"></label>
        <label>Role: <input type="text" name="personRole"></label>
    `;
    peopleInvolvedDiv.appendChild(personDiv);
}

function addSection() {
    const customSectionsDiv = document.getElementById('customSections');
    const sectionDiv = document.createElement('div');
    sectionDiv.innerHTML = `
        <h4>Section</h4>
        <label>Section Title: <input type="text" name="sectionTitle"></label>
        <button type="button" onclick="addElement(this)">Add Element</button>
        <div class="elements"></div>
    `;
    customSectionsDiv.appendChild(sectionDiv);
}

function addElement(button) {
    const elementsDiv = button.nextElementSibling;
    const elementDiv = document.createElement('div');
    elementDiv.innerHTML = `
        <label>Element Type: 
            <select name="elementType" onchange="selectElementType(this)">
                <option value="text">Text</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="reference">Reference Person</option>
            </select>
        </label>
        <div class="elementConfig"></div>
    `;
    elementsDiv.appendChild(elementDiv);
}

function selectElementType(select) {
    const elementConfigDiv = select.nextElementSibling;
    elementConfigDiv.innerHTML = '';
    switch (select.value) {
        case 'dropdown':
            elementConfigDiv.innerHTML = `
                <label>Options (comma-separated): <input type="text" name="dropdownOptions"></label>
            `;
            break;
        case 'checkbox':
            elementConfigDiv.innerHTML = `
                <label>Label: <input type="text" name="checkboxLabel"></label>
            `;
            break;
        case 'reference':
            elementConfigDiv.innerHTML = `
                <label>Reference Person: <select name="referencePerson"></select></label>
            `;
            populateReferenceOptions(elementConfigDiv.querySelector('select'));
            break;
        default:
            elementConfigDiv.innerHTML = `
                <label>Label: <input type="text" name="textLabel"></label>
            `;
            break;
    }
}

function populateReferenceOptions(select) {
    const peopleInvolved = document.querySelectorAll('#peopleInvolved input[name="personName"]');
    peopleInvolved.forEach(person => {
        const option = document.createElement('option');
        option.value = person.value;
        option.textContent = person.value;
        select.appendChild(option);
    });
}

function saveReport(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reportData = {};
    formData.forEach((value, key) => {
        if (!reportData[key]) {
            reportData[key] = [];
        }
        reportData[key].push(value);
    });
    localStorage.setItem('incidentReport', JSON.stringify(reportData));
    alert('Report saved locally.');
}
