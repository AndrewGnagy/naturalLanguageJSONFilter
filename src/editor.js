window.jsel = JSONSelect;

$(document).ready(function() {
    var theDoc = JSON.parse($("pre.doc").text());

    function highlightMatches(ar) {
        /*This is currently incorrect.  If the selector matches "Match" it will simply
         * highlight all occurences of "Match" in the JSON, not just the one the user entered
        */

        var wrk = [];
        var html = $.trim(JSON.stringify(theDoc, undefined, 4));
        var ss = "<span class=\"selected\">";
        var es = "</span>";

        //Make matches unique
        var uniqueAr = [];
        $.each(ar, function(i, el){
            if($.inArray(el, uniqueAr) === -1) uniqueAr.push(el);
        });
        ar = uniqueAr;

        for (var i = 0; i < ar.length; i++) {
            var found = $.trim(JSON.stringify(ar[i], undefined, 4));
            // turn the string into a regex to handle indentation
            found = found.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&").replace(/\s+/gm, "\\s*");
            var re = new RegExp("(" + found + ")", "gm");
            html = html.replace(re, ss + "$1" + es); 
        }
        return html;
    }

    // when a selector is chosen, update the text box
    $(".selectors .selector").click(function() {
        $(".current input").val($(this).text()).keyup();
    });

    var lastSel;
    $(".current input").keyup(function () {
        try {
            var sel = $(".current input").val()
            if (lastSel === $.trim(sel)) return;
            lastSel = $.trim(sel);
            var ar = jsel.match(sel, theDoc);
            $(".current .results").text(ar.length + " match" + (ar.length == 1 ? "" : "es"))
                .removeClass("error");
            $("pre.doc").html(highlightMatches(ar));
            $("pre.doc .selected").hide().fadeIn(700);
        } catch(e) {
            $(".current .results").text(e.toString()).addClass("error");
            $("pre.doc").text($.trim(JSON.stringify(theDoc, undefined, 4)));
        }
        $(".selectors .selector").removeClass("inuse");
        $(".selectors div.selector").each(function() {
            if ($(this).text() === sel) $(this).addClass("inuse");
        });
    });
});

