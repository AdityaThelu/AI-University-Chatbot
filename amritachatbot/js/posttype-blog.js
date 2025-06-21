(function () {
  "use strict";

  jQuery(document).ready(function () {
    var ajaxurl = posttype_blog_obj.ajaxurl;

    $(".category-search-button").on("click", function (e) {
      e.preventDefault();
      $(".blog-search-loading").show();
      var searchValue = $(".category-search-field").val();
      var data = {
        action: "blog_search",
        searchkey: searchValue,
      };
      $.post(ajaxurl, data, function (response) {
        //console.log(response.html);
        $(".blog-search-loading").hide();
        $(".blog-container-flex").html(response.html);
        $(".pagination").html(response.pagenation);
      });
    });

    //Category Filter
    $(".category-filter").on("click", function (e) {
      e.preventDefault();
      $(".blog-search-loading").show();
      var categoryid = $(this).attr("data-id");
      var data = {
        action: "blog_search",
        categoryid: categoryid,
      };
      $.post(ajaxurl, data, function (response) {
        //console.log(response.html);
        $(".blog-search-loading").hide();
        $(".blog-container-flex").html(response.html);
        $(".pagination").html(response.pagenation);
      });
    });

    //Pagination
    $(".blog-paginate").on("click", "a", function (e) {
      e.preventDefault();
      $(".blog-search-loading").show();
      var page = $(this).attr("data-page");
      var pagecate = $(this).attr("data-cate");
      var pagesearch = $(this).attr("data-search");
      var data = {
        action: "blog_search",
        categoryid: pagecate,
        page: page,
        searchkey: pagesearch,
      };
      $.post(ajaxurl, data, function (response) {
        //console.log(response.html);
        $(".blog-search-loading").hide();
        $(".blog-container-flex").html(response.html);
        $(".pagination").html(response.pagenation);
      });
    });
  });
})();
