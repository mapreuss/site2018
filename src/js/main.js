var randomQuotes = function (quotes) {
    var quote = "";

    $.each(quotes, function () {
        quote = this;
    });

    new TypeIt('#quotes', {
        strings: quote,
        breakLines: false,
        nextStringDelay: 10000,
        deleteSpeed: 100,
        loop: true,
        cursor: false
    });
}

var menu = function () {
    $("#menu-selected").click(function () {
        $(this).toggleClass("open");
        $("#main-menu").toggleClass("open");
        $("section").toggleClass("menu-opened");
    })
}

$(document).ready(function () {
    $.getJSON("../data/quotes.json", function(data){
        randomQuotes(data);
    });
    menu();
})