function processMatches(doc, ar) {
        
}

$(document).ready(function() {

    $("#jsonIn").val(JSON.stringify(JSON_BODY_DEFAULT, undefined, 4));
    $("#doc").text(JSON.stringify(JSON_BODY_DEFAULT, undefined, 4));

    // when a selector is chosen, update the text box
    $(".selector").click(function() {
        $(".current input").val($(this).text()).keyup();
    });

    var lastSel;
    $(".current input").keyup(function () {
        try {
            var theDoc = JSON.parse($("#jsonIn").val());
            var sel = $(".current input").val()
            if (lastSel === $.trim(sel)) return;
            lastSel = $.trim(sel);
            var ar = jsonpath.query(theDoc, sel);
            $(".current .results").text(ar.length + " match" + (ar.length == 1 ? "" : "es"))
                .removeClass("error");
            $("#doc").html(JSON.stringify(ar, undefined, 4));
            $("#doc .selected").hide().fadeIn(700);
        } catch(e) {
            //Display error
            $(".current .results").text(e.toString()).addClass("error");
            $("#doc").text($.trim(JSON.stringify(theDoc, undefined, 4)));
        }
        $(".selector").removeClass("inuse");
        $("div.selector").each(function() {
            if ($(this).text() === sel) $(this).addClass("inuse");
        });
    });

    $("#jsonIn").keyup(function () {
        var jsonBody = $("#jsonIn").val();
        $("#doc").html(jsonBody);
    });
});