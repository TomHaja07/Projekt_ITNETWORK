// Webová aplikace pro ukládání pojištěnců//
    
// deklarace typu polí dat a vytvoření podmínek pro zadávání dat před odesláním //

function validateForm() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;

    if(name == "") {
    alert("Pole jméno nesmí být prázdné");
    return false;
    }

    if (surname == "") {
    alert("Pole příjmení nesmí být prázdné");
    return false;
    }

    if (age == "") {
    alert("Zadejte věk");
    return false;
    } 
    else if(age < 1) {
    alert("Věk nesmí být záporný");
    return false;
    }

    if (city == "") {
    alert("Pole adresy nesmí být prázdné");
    return false;
    }
    return true;
}

///// Funkce pro zobrazení uložených dat /////

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
    } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html ="";

    peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" +element.name + "</td>";
    html += "<td>" +element.surname + "</td>";
    html += "<td>" +element.age + "</td>";
    html += "<td>" +element.city + "</td>";
    html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Smazat</button><button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Upravit</button></td>';
    html +="</tr>";

    });
    
    document.querySelector("#tabulkaVypisu tbody").innerHTML = html;
}


// Načtení veškerých uložených dat po otevření stránky

    document.onload = showData(); 
   

// Funkce pro přidání dat // :

function AddData() {
    if(validateForm() == true){
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
    } 

        peopleList.push({
            name: name,
            surname: surname,
            age: age,
            city: city
        });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    toString();
       
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";

    }
}

// Funkce pro smazání údaje //
function deleteData(index){
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
    }  
    else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
    } 

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
            
}

// Funkce pro úpravu uložených dat //
   
function updateData(index) {
    // tlačítko "submit" bude při úpravě stávajícího subjektu skryto //

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("surname").value = peopleList[index].surname;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("city").value = peopleList[index].city;


    document.querySelector("#Update").onclick = function() {
    
    if (validateForm() == true) {
    peopleList[index].name = document.getElementById("name").value;
    peopleList[index].surname = document.getElementById("surname").value;
    peopleList[index].age = document.getElementById("age").value;
    peopleList[index].city = document.getElementById("city").value;

    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    showData();
    
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";

    // opačný případ než v řádku č. 122
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
    }
  }
}

// Funkce pro zobrazení uložených dat jako řetězce pod tabulkou
function toString() {
    var storedData = localStorage.getItem("peopleList");

    if (storedData) {

        var peopleList = JSON.parse(storedData);
        var dataAsString = "<strong>Seznam:</strong><br>";

        peopleList.forEach(function (element) {
            dataAsString += `<div>Jméno: ${element.name}, Přijmení: ${element.surname}, Věk: ${element.age}, Město: ${element.city}</div>`;
        });

        document.getElementById("toString").querySelector(".card-body").innerHTML = dataAsString;
    } else {
        document.getElementById("toString").querySelector(".card-body").innerHTML = "<p>Žádná uložená data.</p>";
    }
}

// Funkce pro aktualizaci dat při kliknutí na tlačítko v toString() a její volání po otevření stránky
function updateDataInToString() {
     showData();
     toString();
}

window.onload = function () {
     showData();
     toString();

     document.getElementById("updateButton").addEventListener("click", updateDataInToString);
};
