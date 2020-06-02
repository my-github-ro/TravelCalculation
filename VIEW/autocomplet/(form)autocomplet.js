//autocomplet-box form
var key = "AjUW9ZYC-mBKc73TLIDkPAPyGC-3MKFkCg4e0TwirOkYdcSY29TbFk39EOEYQEjg";
var url= "http://dev.virtualearth.net/REST/v1/Locations";

$(document).ready(function () {
    $("#example1,#example2").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: url,
                dataType: "jsonp",
                data: {
                    key: key,
                    q: request.term
                },
                jsonp: "jsonp",
                success: function (data) {
                    var result = data.resourceSets[0];
                    if (result) {
                        if (result.estimatedTotal > 0) {
                            response($.map(result.resources, function (item) {
                                return {
                                    data: item,
                                    label: item.name ,
                                    value: item.name
                                }

                            }));
                        }
                    }
                }
            });
        },
        minLength: 1
    });
});
