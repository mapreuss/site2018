var randomQuotes = function (quotes) {
    var quote = "";

    $.each(quotes, function () {
        quote = this;
    });

    quote.sort(function () { return 0.5 - Math.random() });
    
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
    });

    $(".menu-item").click(function (e) {
        e.preventDefault();
        var page = $(this).attr('data-action');
        $('.portfolio-area').hide();
        $('#' + page).show();
        $("#menu-selected").removeClass("open");
        $("#main-menu").removeClass("open");
        $("section").removeClass("menu-opened");
        $(".menu").text($(this).text());
    })
}

var details = function (e) {
    $(".show-details").click(function (e) {
        e.preventDefault();
        var project = $(this).attr("href");
        $(project).show();
    });

    $(".close").click(function (e) {
        e.preventDefault();
        $(this).parents().find(".details").hide();
    });
}

$(document).ready(function () {
    $.getJSON("../data/quotes.json", function(data){
        randomQuotes(data);
    });
    menu();
    details();
})