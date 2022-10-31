function addHandler() {
    x = $("#first").val();
    y = $("#second").val();
    x = Number(x)
    y = Number(y)

    result = `${x} + ${y} = ${x + y}`;
    coloredResult = `
    <span style="background-color:lightgrey"> 
    ${result}
    <button class="deleteBtn">Delete</button>
    <br>
    </span>`

    $("#result").html(result);
    $("#history").append(coloredResult);


}

function subtractHandler() {
    x = $("#first").val();
    y = $("#second").val();
    x = Number(x)
    y = Number(y)

    result = `${x} - ${y} = ${x - y}`;
    coloredResult = `
    <span style="background-color:lightblue"> 
    ${result}
    <button class="deleteBtn">Delete</button>
    <br>
    </span>`

    $("#result").html(result);
    $("#history").append(coloredResult);
}

function multiplyHandler() {
    x = $("#first").val();
    y = $("#second").val();
    x = Number(x)
    y = Number(y)

    result = `${x} * ${y} = ${x * y}`;
    coloredResult = `
    <span style="background-color:bisque"> 
    ${result}
    <button class="deleteBtn">Delete</button>
    <br>
    </span>`

    $("#result").html(result);
    $("#history").append(coloredResult);
}

function divideHandler() {
    x = $("#first").val();
    y = $("#second").val();
    x = Number(x)
    y = Number(y)

    result = `${x} / ${y} = ${x / y}`;
    coloredResult = `
    <span style="background-color:darksalmon"> 
    ${result}
    <button class="deleteBtn">Delete</button>
    <br>
    </span>`

    $("#result").html(result);
    $("#history").append(coloredResult);
}

function deleteHandler() {
    $(this).parent().remove();
}

function clearHandler() {
    $("#history").empty();
}

function setup() {
    $("#add").click(addHandler);
    $("#subtract").click(subtractHandler);
    $("#multiply").click(multiplyHandler);
    $("#divide").click(divideHandler);
    $("body").on("click", ".deleteBtn", deleteHandler)
    $("#clear").click(clearHandler)
}

$(document).ready(setup);