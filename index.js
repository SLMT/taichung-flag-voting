var max_size = 80;
var flag_grid = "col-sm-6 col-md-3";

$.getJSON( "data.json", function(json) {
  var tmp_str = "";
  // TODO: Boundary check
  var page_index = get_url_parameter("page_index");
  var total_page = Math.floor((json.length - 1) / max_size) + 1;
  page_index = (page_index == undefined)? 0 : parseInt(page_index);
  var start_index = max_size * page_index;

  // Update the buttons for going to the last page and the next page
  if (page_index > 0) {
    $("#last-page-btn").attr("href", "index.html?page_index=" + (page_index - 1));
  } else {
    $("#last-page-btn").addClass("disabled");
  }
  if (page_index < (total_page - 1)) {
    $("#next-page-btn").attr("href", "index.html?page_index=" + (page_index + 1))
  } else {
    $("#next-page-btn").addClass("disabled");
  }
  $("#page-index").text((page_index + 1) + " / " + total_page);

  // Display each flag
  for (var idx = start_index; idx < start_index + max_size; idx++) {
    if (idx % 4 == 0) {
      tmp_str = "<div class='row flag-row'>";
    }

    tmp_str += generate_flag_html(json[idx]);

    if (idx % 4 == 3) {
      tmp_str += "</div>";
      $("#album-container").append(tmp_str);
      tmp_str = "";
    }
  }
});

function generate_flag_html(data) {
  var img_url = "http://www.taichungflag.com.tw" + data["ImageUrl"];
  var detail_url = "http://www.taichungflag.com.tw/works#/Details/" + data["ID"];
  var name = data["FullName"];

  var tmp = "<div class='" + flag_grid + "'>";
  tmp += "<div class='flag'><div class='flag-container'>";

  tmp += "<a href='" + detail_url + "'>";
  tmp += "<img src='" + img_url + "' alt='" + name + "' />";
  tmp += "</a>";

  tmp += "</div></div></div>";

  return tmp;
}

function get_url_parameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
