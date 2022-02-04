const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const cd = $('.cd');
const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playbtn = $('.btn-toggle-play');
const player = $('.player');
const input = $('.progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const controlTimeLeft = $('.controlTime-left');
const controlTimeRight = $('.controlTime-right');
const app = {

    isPlaying: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Cánh Đồng Yêu Thương',
            singer: 'Trung Quân',
            path: './assets/music/vietnamese/canhdongyeuthuong.mp3',
            image: './assets/image/trungquan.jpg',

        },
        {
            name: 'TÌnh Nào Không Như TÌnh Đầu',
            singer: 'Trung Quân',
            path: './assets/music/vietnamese/TinhNaoKhongNhuTinhDau-TrungQuanIdol-6588171.mp3',
            image: './assets/image/trungquan.jpg',

        },
        {
            name: 'Về Quê Ăn Tết',
            singer: 'PhuSaf',
            path: './assets/music/vietnamese/VeQueAnTet-PhuSaFMBand-6201051.mp3',
            image: './assets//image/antet.jpg',

        },
        {
            name: 'Cầu Hôn',
            singer: 'Văn Mai Hương',
            path: './assets/music/vietnamese/cauhon.mp3',
            image: './assets/image/vanmaihuong.jpg',

        },
        {
            name: 'Chia Tay',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/vietnamese/chiatay.mp3',
            image: './assets/image/anhtuan.jpg',

        },
        {
            name: 'Cô Gái Ngày Hôm Qua',
            singer: 'Vũ Cát Tường',
            path: './assets/music/vietnamese/cogaingayhomqua.mp3',
            image: './assets/image/vucactuong.jpg',

        },
        {
            name: 'Cưới Thoi',
            singer: 'Masew - Bray',
            path: './assets/music/vietnamese/cuoithoi.mp3',
            image: './assets/image/bray.jpg',

        },
        {
            name: 'Đế Vương',
            singer: 'Đình Dũng ACV',
            path: './assets/music/vietnamese/devuong.mp3',
            image: './assets/image/antet.jpg',

        },
        {
            name: 'Đường Một Chiều',
            singer: 'Huỳnh Tú',
            path: './assets/music/vietnamese/duong1chieu.mp3',
            image: './assets/image/huynhtu.jpg',

        },
        {
            name: 'Nghe Nói Anh Sắp Kết Hôn Rồi',
            singer: 'Văn Mai Hương - Bùi Anh Tuấn',
            path: './assets/music/vietnamese/NgheNoiAnhSapKetHon-VanMaiHuongBuiAnhTuan-6129764.mp3',
            image: './assets/image/vanmaihuong.jpg',

        },
        {
            name: 'Nơi Tình Yêu Bắt Đầu',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/vietnamese/NoiTinhYeuBatDau-BuiAnhTuan-1915267.mp3',
            image: './assets/image/anhtuan.jpg',

        },
        {
            name: 'Thuận Theo Ý Trời',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/vietnamese/ThuanTheoYTroi-BuiAnhTuan-6150266.mp3',
            image: './assets/image/anhtuan.jpg',

        },
        {
            name: 'Vết Mưa',
            singer: 'Vũ Cát Tường',
            path: './assets/music/vietnamese/VetMua-VuCatTuong-5959421.mp3',
            image: './assets/image/vucactuong.jpg',

        },


    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    //render and scoll top
    handleEvents: function () {

        const _this = this;
        const cdWidth = cd.offsetWidth;

        //xử lý CD Quay và Dừng
        //xử lý phóng to thu nhỏ CD
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)',

            }
        ], {
            duration: 10000,//10 giây
            iterations: Infinity
        });
        cdThumbAnimate.pause();
        //
        document.onscroll = function () {
            //bắt sự kiện scoll của tình duyệt
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scroll;

            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;


        }

        //xử lý khi click play
        playbtn.onclick = function () {
            if (_this.isPlaying) {

                audio.pause();

            } else {

                audio.play();

            }


        }
        //khi muốn thực hiện 1 hành động gì đó thì xem phần medthod
        //khi muốn lấy 1 giá trị gì đây thì xem phần properties.
        //khi muốn lắng nghe sự kiện thì vào phần event
        //khi bài hát dc play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        //khi bài hát dc pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            //currentTime trả lại số giây mà bài hát đang phát
            //duration trả về tổng thời giàn bài hát để 
            //curentTime / duration để tính phần trăm thời lượng bài háy
            if (audio.duration) {
                const propressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                input.value = propressPercent;

                //gán time cho 2 đầu input
                //bên trái
                var time = Math.floor(audio.currentTime);
                var second = time % 60;
                var minute = Math.floor(time / 60);
                if (second < 10) {
                    var c = 0;
                } else c = '';
                controlTimeLeft.textContent = '0' + minute + ':' + c + second;
                //bên phải
                var timeR = Math.floor(audio.duration);
                var secondR = timeR % 60;
                var minuteR = Math.floor(timeR / 60);
                if (secondR < 10) {
                    var cR = 0;
                } else cR = '';
                controlTimeRight.textContent = '0' + minuteR + ':' + cR + secondR;
            }




        }

        //xử lý khi tua bài hát

        input.oninput = function (e) {
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
        }
        // khi next bái hát
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();

            } else {
                _this.nextSong();

            }
            audio.play();
            _this.render();
            _this.scolltoActiveSong();
        }
        //khi muốn quay lại bài hát trước đó
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {

                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scolltoActiveSong();

        }

        //random bài hát
        btnRandom.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            //togle nếu đối số thứ 2 truyền vào là true thì nó sẽ thêm class nếu là true nó sẽ xóa
            btnRandom.classList.toggle('active', _this.isRandom);
            _this.setConfig('isRandom', _this.isRandom);


        }

        //xử lý phát lại 1 bài hát 
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle('active', _this.isRepeat);
            _this.setConfig('isRepeat', _this.isRepeat);


        }
        //xử lý bài hát next song khi kết thúc
        audio.onended = function () {
            //tự động click btnNext khi hết bài
            if (_this.isRepeat) {
                //nếu xài load là khi hết bài nó sẽ dừng và khi bấm hát nó mới tải lại bài hát và nghe
                //còn play là khi hết nmos không dừng mà nó phạt tiếp bài hát vùa nghe
                audio.play();
            } else {

                btnNext.click();
            }
        }
        //lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                //xử lý khi click váo song
                if (songNode) {
                    //songNode.getAttribute('data-index') lấy vị trí element dc click
                    //or songNode.dataset.index
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();

                }
                //khi click vào option
                if (e.target.closest('.option')) {

                }
            }
        }

    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;

    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    indexSongs: [],
    playRandomSong: function () {
        let newIndex;

        if (this.indexSongs.length === this.songs.length) {
            this.indexSongs = [];
        }

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.indexSongs.push(newIndex);
        this.loadCurrentSong();
    },
    scolltoActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',

            });

        }, 100)
    },

    start: function () {
        //Gán cấu hình từ config vào object
        this.loadConfig();

        //định nghĩa các thuộc tính cho oject
        this.defineProperties();

        //lắng nghe / xử lý các sự kiện (DOM event)
        this.handleEvents();


        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playList
        this.render();

        //hiển thị trạng thái ban đầu cảu button repeat và random
        btnRandom.classList.toggle('active', this.isRandom);
        btnRepeat.classList.toggle('active', this.isRepeat);

    }
}

app.start();