// =================== 換頁 ===================
  // 指定頁面
  $("li").click(function(){
    var idx=$(this).index();
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $("#page").val(idx+1);
    render();
  });
  // 前一頁
  $(".pre").click(function(){
    if($(".active").index() !== 0){
      $(".active").prev("li").addClass("active");
      $(".active:last").removeClass("active");
      var idx = $(".active").index();
      $("#page").val(idx+1);
      render();
    }
  });
  // 後一頁
  $(".next").click(function(){
    if($(".active").index() !== $(".page li").length-1){
      $(".active").next("li").addClass("active");
      $(".active:first").removeClass("active");
      var idx = $(".active").index();
      $("#page").val(idx+1);
      render();
    }
  });


// =================== input改動即時刷新 ===================
$("body ").bind("input propertychange", function () {
  render();
});

// =================== sort改動跳到page1 ===================
$("#sort").bind("input propertychange", function () {
  $("li:first").addClass("active");
  $("li:first").siblings().removeClass("active");
  $("#page").val(1);
  render();
});

// =========================== render() ===========================
render();
function render(){

  // ====== 使用$.get()傳收scraper.php的json資料 ======
  const jsonUrl = 'http://interview.tripresso.com/tour/search?';
  // page=1&row_per_page=10&sort=rating_desc

  $.get(jsonUrl,
        {page:$("#page").val(), row_per_page: $("#row_per_page").val(), sort: $("select[name='sort']").val()},
        function(data){
          jsonData = data.data.tour_list;
          displayData(jsonData);
        }, "json");

}

// ====================== displayData(data) ============================
function displayData(data) {

  let str = '';

  data.forEach((item) => {


      // ========== tags關鍵字的部分 =========
      var strTags = '';
      var itemTags = item.tags;
      itemTags.forEach((item) => {
        strTags += `<span>${item}</span>`;
      });

      // ========== group出團日期的部分 =========
      var strGroup = '';
      var itemGroup = item.group;
      itemGroup.forEach((item) => {
        strGroup += `<span>${item.date}</span>`;
      });

      // ========== 生成本體的部分 =========
      str += `<div class='box'><div class='pic'><a href='${item.tour_detail_url}'><img src='${item.image_url}
      '></a></div>  <div class='text'><div class='row row1'><p>${item.agency}
        <span class='bright'>${item.rating}
      </span> 顆星</p> <h3><a href='${item.tour_detail_url}
      '>${item.title}(${item.id})</a></h3></div> <div class='row row2'><p class='tags'>${strTags}</p></div> <div class='row row3'><p class='group'>${strGroup}</p><p><span class='bright'>${item.tour_days}</span> 天 <span class='bright'>${item.min_price}</span> 起</p></div> </div></div>`;

  });

  success.innerHTML = str;

}
