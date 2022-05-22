
let date_flexible = document.getElementById("date-flexible");
let date_range = document.getElementById("dates");
let checkin_month = document.getElementById("date_month");

let counter=1;

fetch("./places.json").then(function(response){
    return response.json();
}).then(data => add_dropdown_option(data)).catch(error => {
    console.log(error)
})

// Function to add places in dropdown box from json
function add_dropdown_option(data){
    let dropdown = document.getElementById('place_list');
    for (var i = 0;i < data["places"].length; i++){
        let option = document.createElement('option');
        option.text = data["places"][i]["name"];
        dropdown.appendChild(option);
    }
}

// Function to add room when clicked on '+' button
function add_room(){
    counter+=1;
    let delete_button = document.getElementById("delete");
    delete_button.style.display = "block";
    let form = document.getElementById("add_more_room");
    html = '<div id="room'+counter+'" class="add_room">\
                <label for="room1">Room '+counter+'</label>\
                <div class="flex-1">\
                <div class="adult">\
                    <i class="fa fa-user" aria-hidden="true"></i>\
                    <input\
                    type="number"\
                    id="no_of_adults'+counter+'"\
                    placeholder="No. of Adults"\
                    min="1"\
                    value="1"\
                    name="room_'+counter+'_adult"\
                    />\
                    <button\
                    type="button"\
                    onclick="increment(\'no_of_adults'+counter+'\')"\
                    value="fefe"\
                    >\
                    +\
                    </button>\
                    <button type="button" onclick="decrement(\'no_of_adults'+counter+'\')">\
                    -\
                    </button>\
                </div>\
                <div class="adult">\
                    <i class="fa fa-child" aria-hidden="true"></i>\
                    <input\
                    type="number"\
                    id="no_of_children'+counter+'"\
                    placeholder="No. of Children"\
                    min="0"\
                    value="0"\
                    name="room_'+counter+'_children"\
                    />\
                    <button type="button" onclick="increment(\'no_of_children'+counter+'\')">\
                    +\
                    </button>\
                    <button type="button" onclick="decrement(\'no_of_children'+counter+'\')">\
                    -\
                    </button>\
                </div>\
                </div>\
            </div>' 
    form.innerHTML+=html;
}

//function to print form data in json format
function submit_form(){
    let form = new FormData(document.getElementById("search_form"));
    let date_flexible = document.getElementById("date-flexible");
    let json = {}
    json["place"] = form.get("place");
    json["flexible_date"] = date_flexible.checked;
    if (date_flexible.checked){
        json["month"] = form.get("month");
    }
    else{
        json["checkin_date"] = form.get("checkin");
        json["checkout_date"] = form.get("checkin");
    }
    let room = [];
    for(let i=1;i<=counter;i++){
        room.push({
            ['room_'+i+'_adult']: form.get('room_'+i+'_adult'),
            ['room_'+i+'_children'] : form.get('room_'+i+'_children')
        })
    }
    json["room"] = room;
    console.log(json)

}

//function to remove a room from form
function remove(){
    let delete_button = document.getElementById("delete");
    if(counter>1){
        const room = document.getElementById("room"+counter);
        room.remove();       
        counter-=1;
        if(counter==1){   
            delete_button.style.display = "none";
        }
    }
    else{
        delete_button.style.display = "none";
    }
}

// function to enable either date range fields or month based selection field for booking hotel
function enable_daterange(){
    let date_flexible = document.getElementById("date-flexible");
    let date_range = document.getElementById("dates");
    let checkin_month = document.getElementById("date_month");
    if (date_flexible.checked){
        date_range.style.display="none"
        checkin_month.style.display="flex"
    }
    else{
        date_range.style.display="flex"
        checkin_month.style.display="none"
    }
}
// function to implement the property of increment on clicking '+' button
function increment(input_id){
    let input = document.getElementById(input_id);
    input.value = parseInt(input.value) + 1
}

// function to implement the property of decrement on clicking '-' button
function decrement(input_id){
    let input = document.getElementById(input_id);
    if (!((parseInt(input.value) - 1)< parseInt(input.min))){
        input.value = parseInt(input.value) - 1
    }
}

function check_month(){
    let form = new FormData(document.getElementById("search_form"));
    const d = new Date();
    let month = d.getMonth();
    console.log(Date.parse(form.get("month")).month)
    console.log(month)
    console.log(d)
}