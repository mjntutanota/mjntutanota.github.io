<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="\assets\js\Meting.min.js"></script>define([], function () {
        return {
            page: 1,
            offset: 20,
            init: function () {
                var that = this;
                $.getJSON("/photo/output.json", function (data) {
                    that.render(that.page, data);

                    that.scroll(data);
                });
            },

            render: function (page, data) {
                var begin = (page - 1) * this.offset;
                var end = page * this.offset;
                if (begin >= data.length) return;
                var html, li = "";
                for (var i = begin; i < end && i < data.length; i++) {
                    li += '<li><div class="img-box">' +
                        '<a class="img-bg" rel="noopener" href="https://github.com/lwzhang/blog/blob/master/photos/' + data[i] + '?raw=true" target="_blank"></a>' +
                        '<img lazy-src="https://github.com/lwzhang/blog/blob/master/photos/' + data[i] + '?raw=true">' +
                        '</div></li>';
                }

                $(".img-box-ul").append(li);
                $(".img-box-ul").lazyload();
                $("a[rel=example_group]").fancybox();
            },

            scroll: function (data) {
                var that = this;
                $(window).scroll(function() {
                    var windowPageYOffset = window.pageYOffset;
                    var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                    var sensitivity = 0;

                    var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                    if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                        that.render(++that.page, data);
                    }
                })
            }
        }
    })