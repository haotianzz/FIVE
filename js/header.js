//固定导航栏
$(window).bind("scroll", function () {
    var top = $(this).scrollTop()
    if (top >= 20) {
        $('.main-top').css({
            'opacity': '0.8'
        })
        $('.h1').css({
            'background-color': 'black',
            'color': 'white'
        })
    }
});
$(window).bind("scroll", function () {
    var top = $(this).scrollTop()
    if (top < 20) {
        $('.main-top').css({
            'opacity': '1'

        })
        $('.h1').css({
            'background-color': 'white',
            'color': 'black'
        })
    }
});
