var randomQuotes = function (quotes) {
    var totalQuotes = '';
    var quote = "";

    $.each(quotes, function () {
        totalQuotes = this.length;
        quote = this;
    });
    
    var quoteNumber = Math.floor((Math.random() * totalQuotes));
    
    $("#quotes").text(quote[quoteNumber]);
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