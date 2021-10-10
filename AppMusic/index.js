const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Điểm Sáng',
            singer: 'Tiêu Chiến',
            path: './assets/Music/DiemSang-TieuChienXiaoZhan-6266825.mp3',
            image: './assets/Image/diemsang.jpg'
        },
        {
            name: 'Khánh Dư Niên',
            singer: 'Tiêu Chiến',
            path: './assets/Music/DuNienKhanhDuNienOST-TieuChienXiaoZhan-6151146.mp3',
            image: './assets/Image/khanhdunien.jpg'
        },
        {
            name: 'Thiên Địa Vô Sương',
            singer: 'Đặng Luân',
            path: './assets/Music/ThienDiaVoSuongHuongMatTuaKhoiSuongOST-DangLuan-5582784.mp3',
            image: './assets/Image/dangluan.jpg'
        },
        {
            name: 'Khúc Tận Trần Tình',
            singer: 'Tiêu Chiến',
            path: './assets/Music/KhucTanTranTinhTranTinhLenhOst-TieuChienXiaoZhan-6038365.mp3',
            image: './assets/Image/khuctantrantinh.jpg'
        },
        {
            name: 'Ngôi sao sáng nhất bầu trời đêm',
            singer: 'Tiêu Chiến',
            path: './assets/Music/NgoiSaoSangNhatBauTroiDemLive-TieuChienXiaoZhan-6759141.mp3',
            image: './assets/Image/tieuchienloatanhmoimung29tuoi9_xjql.jpg'
        },
        {
            name: 'Vô Ki',
            singer: 'Tiêu Chiến ft Vương Nhất Bác',
            path: './assets/Music/VongTienTranTinhLenhOST-VuongNhatBacWangYiboTieuChienXiaoZhan-6010920.mp3',
            image: './assets/Image/voki.jpg'
        },
        {
            name: 'Lạnh Lẽo',
            singer: 'Trương Bích Thần ft Dương Tống Vỹ',
            path: './assets/Music/LanhLeoTamSinhTamTheThapLyDaoHoaOst-AskaYangDuongTongVyZhangBiChenTruongBichThan-4744167.mp3',
            image: './assets/Image/lanhleo.jpg'
        }
    ],

    render: function() {
        const htmls = this.songs.map((song) => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}');">

                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvent: function() {
        document.onscroll = function() {
            const _this = this;
            const cdWidth = cd.offsetWidth
            // xử lí cd quay/dừng
            const cdThumbAnimated = cdThumb.animate([
                {transform: 'rotate(360deg)'}
            ], {
                duration: 10000,
                iterations: Infinity
            });
            cdThumbAnimated.pause();

            // xử lí phóng to thu nhở cd
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCdWidth = cdWidth - scrollTop ;
                
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }
            
            // xử lí khi click play
            playBtn.onclick = function() {
                if(_this.isPlaying){
                    audio.pause();
                }
                else {
                    audio.play();
                }

                // khi song được play
                audio.onplay = function () {
                     _this.isPlaying = true
                     player.classList.add('playing');
                     cdThumbAnimated.play();
                }

                // khi song pause 
                audio.onpause = function () {
                    _this.isPlaying = false
                    player.classList.remove('playing');
                    cdThumbAnimated.pause();
                }

                // khi tiến độ bài hát thay đổi
                audio.ontimeupdate = function() {
                    if(audio.duration) {
                        const progressPercent = audio.currentTime / audio.duration * 100;
                        progress.value = progressPercent
                    }
                }

                // xử lí khi tua
                progress.onchange = function(e) {
                    const seekTime = audio.duration/ 100 * e.target.value
                    audio.currentTime = seekTime;
                }

                // khi next songs
                nextBtn.onclick = function() {
                    _this.nextSong()
                    audio.play()
                   
                }
            }
        }
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;

        console.log(heading,cdThumb,audio);
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
          this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    
    start: function() {
        // đn các thuộc tính cho obj
        this.defineProperties();

        // lắng nghe và xử lí các xư kiện
        this.handleEvent();
        
        // tải thông tin bài hát đầu tiên vào ui khi run
        this.loadCurrentSong();

        // render playlist
        this.render();
    }
}
app.start();
