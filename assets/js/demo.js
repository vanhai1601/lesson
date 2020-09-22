
/*--------------Show product order--------------*/
var quantity = 0;
var dem = 0;
$(".content .btn").click(function () {
  quantity += parseInt($(this).parent().find(".my_spinner").val());
  $("#numbersp").val(quantity);
  // Render order-product html
  dem++;
  var sum  = $(".list-order-product").find("tr").find(".sum");
  var name_product = $(this).parent().parent().find(".card-title").text();
  var price = parseInt($(this).parent().parent().find(".card-text").find(".price_sale").text());
  var htmlProduct = 
    "<tr>"+
    "<th>"+dem+"</th>"+
    "<td>"+name_product+"</td>"+
    "<td>"+price+'$'+"</td>"+
    "<td>"+$(this).parent().find(".my_spinner").val()+"</td>"+
    "<td class='sum'>"+parseInt($(this).parent().find(".my_spinner").val())*price+'$'+"</td>"+
    "</tr>";
  $(".list-order-product").append(htmlProduct);

  var sum = $(".list-order-product").find("tr").find(".sum");
  var price_sum = 0;
  for( var i = 0; i< sum.length;i++){
    price_sum +=parseInt(sum.eq(i).text());
  }
  $("#sum_price").text("Tổng tiền cần thanh toán:"+" "+price_sum+"$");

});

$(".cart").click(function () {
  if ($("#numbersp").val() == 0) {
    alert("Không có sản phẩm");
  }
  else {
    $(this).attr("data-target","#exampleModal")
  }
});



/*--------------Search--------------*/
$("#search_product").click(function (e) {
  $("#home_active").text("Tìm kiếm sản phẩm");
  var input = $("#search").val().toUpperCase();
  var name = $(".content__all-product .card-title");
  var gia = $(".content__all-product .card-text");
  var dem = 0;
  if (input != "") {
    $(".content__product").eq(0).css("display", "none");
    $(".banner").eq(0).css("display", "none");
    $(".content__all-product").eq(0).css("display", "block");
  }
  for (var i = 0; i < name.length; i++) {
    var text = name.eq(i).text().toUpperCase();
    var gia_sp = gia.eq(i).text();
    if (text.indexOf(input) > -1 || gia_sp.indexOf(input) > -1) {
      $(".content__all-product .col-md-3").eq(i).show();
      dem += 1;
    } else {
      $(".content__all-product .col-md-3").eq(i).hide();
    }
  }
  if (name.text().toUpperCase().indexOf(input) == -1 &&gia.text().indexOf(input) == -1) {
    $("#demo").text("Không có sản phẩm nào");
    $("#demo").css("margin-bottom", "400px");
    $(".price_sort").eq(0).css("display","none");
  } else {
    $("#demo").text("Có " + dem + " " + "sản phẩm phù hợp");
    $("#demo").css("margin-bottom", "20px");
    $(".price_sort").eq(0).css("display","block");
  }
  if (input == "") {
    $("#demo").empty();
  }
});



/*-------------- Sort --------------*/
$("#selection-sort").change(function () {
  var arr = new Array();
  for (var i = 0; i < $(".content__all-product .card-title").length; i++) {
    arr[i] = [
      parseInt($(".content__all-product .card-text").find(".price_sale").eq(i).text()),
      $(".content__all-product .col-sm-4 img").eq(i).attr("src"),
      $(".content__all-product .card-title").eq(i).text(),
      $(".content__all-product .card-text").find(".card-text-sale").eq(i).text(),
    ];
  }
  var min;
  if ($("#selection-sort").val() == "1") {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i][0] > arr[j][0]) {
          min = arr[i];
          arr[i] = arr[j];
          arr[j] = min;
        }
      }
    }
  }
  else if ($("#selection-sort").val() == "2") {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i][0] < arr[j][0]) {
          min = arr[i];
          arr[i] = arr[j];
          arr[j] = min;
        }
      }
    }
  }
  for (var i = 0; i < arr.length; i++) {
    $(".content__all-product .col-sm-4 img").eq(i).attr("src", arr[i][1]);
    $(".content__all-product .card-title").eq(i).text(arr[i][2]);
    $(".content__all-product .card-text").find(".price_sale").eq(i).text(arr[i][0] + "$");
    $(".content__all-product .card-text").find(".card-text-sale").eq(i).text(arr[i][3]);

  }
});

/*--------------Auto complete--------------*/
var data = ["Giường", "Tủ", "Đệm", "Bàn", "Ghế"];
$("#search").autocomplete({
  delay: 100,
  source: data,
});



/*-------------- Quantity --------------*/
$(".my_spinner").spinner({
  min: 1,
  max: 999,
  step: 1,
});



/*reload*/
$("#login").click(function(){
  location.reload();
});
$("#register").click(function(){
  location.reload();
});
$("#show_room").click(function(){
  location.reload();
});