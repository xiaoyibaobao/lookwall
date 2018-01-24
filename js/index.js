$(function () {
    // $('.nav_bar').on('touchstart', 'img', function () {
    //     $('.img').each(function (i) {
    //         $(this).attr('src', 'image/' + (i + 1) + '.png');
    //     })
    //     var name = /\/[0-9]+\.png/.exec($(this).attr('src'));
    //     var num = /[0-9]/.exec(name);
    //     $(this).attr('src', 'image/' + num + '.' + num + '.png');

    // })
    function loaData() {
        $.ajax({
            tyoe: 'get',
            // url: 'http://can.host.45pai.com/stu/stu666.json',
            url:'./js/stu666.json',
            dataType: 'json',
            success: function (info) {
                var data = [];
                if (info.err == 0) {
                    data = info.msg.contents;
                    console.log(data);
                }
                var img = document.getElementsByClassName("imgs")[0].children[0];
                var desc = document.getElementsByClassName("chracter")[0].children[0];
                var audio = document.getElementsByClassName("audio")[0];
                var main = document.querySelector('.main');
                var writing = document.querySelector('.writing')
                var imgAll = document.querySelectorAll('.img')
                var span = document.querySelector('.title span')
                console.log(writing);
                var count = 0;
                audio.src = data[0].media;
                // 切换title
                span.innerHTML = info.msg.title;
                // 停止播放音乐
                var flag = true;/*true播放,false暂停*/

                var playMusic = function () {
                    if (count < data.length) {
                        if (data[count].type == 0) {
                            main.style.display = "block";
                            writing.style.display = "none";
                            audio.src = data[count].media;
                            img.src = data[count].img;
                            desc.innerHTML = data[count].desc;
                            var video = document.querySelector('video');
                            video.pause();
                            audio.play();
                        } else if (data[count].type == 1) {
                            main.style.display = "none";
                            writing.style.display = "block";
                            var video = document.querySelector('video');
                            video.src = data[count].media;
                            // console.log(video.src)
                            audio.pause();
                            video.play();
                            // img.parentElement.innerHTML="<video id='my_video_1' class='video-js vjs-default-skin' autoplay controls preload='auto' data-setup='{}'><source src='./src/edu/04.m3u8' type='application/x-mpegURL'></video>"
                        }

                        /**新增的改变图片*/
                        $('.img').each(function (j) {
                            $(this).attr('src', 'image/' + (j + 1) + '.png');
                        })
                        var name = /\/[0-9]+\.png/.exec($(imgAll[count]).attr('src'));
                        var num = /[0-9]/.exec(name);
                        $(imgAll[count]).attr('src', 'image/' + num + '.' + num + '.png');
                    }
                }

                playMusic();
                $('.music').click(function () {
                    flag = !flag;
                    flag ? $(this).attr('src', './image/radio_stop.png') : $(this).attr('src', './image/radio_play.png');
                    audio.paused ? audio.play() : audio.pause();
                })

                for (var i = 0; i < imgAll.length; i++) {
                    imgAll[i].onclick = function (i) {
                        return function () {
                            // 这个是切换图片的
                            $('.img').each(function (i) {
                                $(this).attr('src', 'image/' + (i + 1) + '.png');
                            })
                            var name = /\/[0-9]+\.png/.exec($(this).attr('src'));
                            var num = /[0-9]/.exec(name);
                            $(this).attr('src', 'image/' + num + '.' + num + '.png');
                            // 到这里都是切换图片的
                            img.src = data[i].img;
                            count = i;
                            desc.innerHTML = data[i].desc;
                            playMusic();
                        }
                    }(i);
                }


                audio.addEventListener("ended", function () {   /*音频监听是否播放完*/
                    count++;
                    playMusic();
                });

            }
        })
    }
    loaData();
})