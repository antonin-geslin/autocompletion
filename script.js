var currentFocus;

$(document).ready(function() {
    function autocomplete(input, json) {
        input.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            var a = $("<div></div>").attr('id', input.id + 'autocomplete-list').addClass('autocomplete-items');
            $(input).after(a);
                $.ajax({
                    url: json,
                    dataType: 'json',
                    cache: false, 
                    success: function(data) {
                    for (i = 0; i < data.length; i++) {
                       if (data[i].nom.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                            b = $("<div></div>");
                            b.html("<strong>" + data[i].nom.toString().substr(0, val.length) + "</strong>");
                            b.append(data[i].nom.toString().substr(val.length));
                            b.append("<input type='hidden' value='" + data[i].nom.toString() + "'>");
                            a.append(b);
                            b.on("click", function(e) {
                                input.value = this.getElementsByTagName("input")[0].value;
                                closeAllLists();
                            });
                        }
                    }
                    b = $("<div class = separator></div>");
                    a.append(b);
                    for (i = 0; i < data.length; i++) {
                        if (data[i].nom.toUpperCase().indexOf(val.toUpperCase()) !== -1 && data[i].nom.toUpperCase().indexOf(val.toUpperCase()) !== 0) {
                            b = $("<div></div>");
                            b.html(data[i].nom.toString().substr(0,data[i].nom.toUpperCase().indexOf(val.toUpperCase())));
                            b.append("<strong>" + val.toLowerCase() + "</strong>");
                            b.append(data[i].nom.substr(data[i].nom.toUpperCase().indexOf(val.toUpperCase()) + val.length, data[i].nom.length))
                            b.append("<input type='hidden' value='" + data[i].nom.toString() + "'>");
                            a.append(b);
                            b.on("click", function(e) {
                                input.value = this.getElementsByTagName("input")[0].value;
                                closeAllLists();
                            });
                        }
                    }
                }
                });
        });
        input.addEventListener("keydown", function(e) {
            var x = $("#" + this.id + "autocomplete-list");
            if (x) x = $(x).find("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                console.log('test enter');
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

    }
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        $(x).eq(currentFocus).addClass("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            $(x).eq(i).removeClass("autocomplete-active");
        }
    }



    function closeAllLists(element) {
        var x = $(".autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != $("#myInput")[0]) {
                $(x[i]).remove();
            }
        }
    }


    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    autocomplete($("#myInput")[0], 'data.json');

    
});

