const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const config = require('./config');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [adminUser, simpleUser] = await User.create({
        username: "TatAdmin",
        password: "ta8na85",
        role: "admin",
        token: nanoid()
    }, {
        username: "simpleUser",
        password: "qwus7x2",
        role: "user",
        token: nanoid()
    });

    const [mettalicaArtist, threeDaysGraceArtist, kinoArtist] = await Artist.create({
        name: "Metallica",
        info: "Американская метал-группа, входит в «большую четвёрку трэш-метала».",
        photo: "EG05bDd2Y_UeUPXObYokE.jpg",
        published: true, 
        user: adminUser._id
    }, {
        name: "Three Days Grace",
        info: "Канадская рок-группа, исполняющая альтернативный метал и постгранж.",
        photo: "h8lHCW-f4K9TAXvsseHoy.jpg",
        published: false, 
        user: simpleUser._id
    }, {
        name: "Кино",
        info: "Популярная советская рок-группа 80-х годов в составе Ленинградского рок-клуба.",
        photo: "9TuiFDcCgKT4yZQ3IrUaO.jpg",
        published: false, 
        user: adminUser._id
    });

    const [masterOfPuppetsAlbum, blackAlbum, gruppaKroviAlbum, cherniyAlbum, threeDaysGraceAlbum, oneXAlbum] = await Album.create({
        title: "Master of Puppets",
        year: "1986",
        cover: "_rSej3M24xCzlwc49YZk9.jpg",
        artist: mettalicaArtist._id,
        published: false, 
        user: adminUser._id
    }, {
        title: "Black Album",
        year: "1991",
        cover: "Ixp2YFctxpBev32ygPszF.jpg",
        artist: mettalicaArtist._id,
        published: false, 
        user: adminUser._id
    }, {
        title: "Группа Крови",
        year: "1988",
        cover: "2uHt2phGvq5NtLMcF_zju.jpg",
        artist: kinoArtist._id,
        published: false, 
        user: adminUser._id
    }, {
        title: "Черный альбом",
        year: "1990",
        cover: "J0CvEAZzx2AD9-2QG-Plv.jpg",
        artist: kinoArtist._id,
        published: false, 
        user: adminUser._id
    }, {
        title: "Three Days Grace",
        year: "2003",
        cover: "9XX1JB8215MSMswgVshKe.jpg",
        artist: threeDaysGraceArtist._id,
        published: false, 
        user: simpleUser._id
    }, {
        title: "One-X",
        year: "2006",
        cover: "mDOe52kdLBhcgxF65GEi3.jpg",
        artist: threeDaysGraceArtist._id,
        published: false,
        user: adminUser._id
    });

    const [masterOfPuppetsTrack, batteryTrack, cureTrack, krasnoZheltieDniTrack, namSToboyTrack, konchitsyaLetoTrack,
        iHateEverythingTrack, burnTrack, justLikeYouTrack, enterSandmanTrack] = await Track.create({
            title: "Battery",
            duration: "5:12",
            number: "1",
            video: "https://www.youtube.com/embed/AoOIvgyp0mY",
            album: masterOfPuppetsAlbum._id,
            published: false, 
            user: adminUser._id
        }, {
            title: "Master of Puppets",
            duration: "8:35",
            number: "2",
            video: "https://www.youtube.com/embed/hx27NL_iqEM",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "The Thing That Should Not Be",
            duration: "6:37",
            number: "3",
            video: "https://www.youtube.com/embed/yCNees5_doE",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Welcome Home (Sanitarium)",
            duration: "6:28",
            number: "4",
            video: "https://www.youtube.com/embed/5F4p8cj2tYo",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Disposable Heroes",
            duration: "8:17",
            number: "5",
            video: "https://www.youtube.com/embed/qJqHjDsfKP0",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Leper Messiah",
            duration: "5:41",
            number: "6",
            video: "https://www.youtube.com/embed/DtFtEen7hDY",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Orion",
            duration: "8:28",
            number: "7",
            video: "https://www.youtube.com/embed/c8qrwON1-zE",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Damage, Inc.",
            duration: "5:30",
            number: "8",
            video: "https://www.youtube.com/embed/h7e9Ww_wowU",
            album: masterOfPuppetsAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Enter Sandman",
            duration: "5:32",
            number: "1",
            video: "https://www.youtube.com/embed/CD-E-LDc384",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Sad but True",
            duration: "5:25",
            number: "2",
            video: "https://www.youtube.com/embed/A8MO7fkZc5o",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Holier Than Thou",
            duration: "3:47",
            number: "3",
            video: "https://www.youtube.com/embed/pLu07aXTEKY",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "The Unforgiven",
            duration: "6:26",
            number: "4",
            video: "https://www.youtube.com/embed/DDGhKS6bSAE",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Wherever I May Roam",
            duration: "6:43",
            number: "5",
            video: "https://www.youtube.com/embed/dHUHxTiPFUU",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Don't Tread on Me",
            duration: "4:00",
            number: "6",
            video: "https://www.youtube.com/embed/fh-TKJTCtnw",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Through the Never",
            duration: "4:03",
            number: "7",
            video: "https://www.youtube.com/embed/EFbdYvolxRM",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Nothing Else Matters",
            duration: "6:27",
            number: "8",
            video: "https://www.youtube.com/embed/tAGnKpE4NCI",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Of Wolf & Man",
            duration: "4:16",
            number: "9",
            video: "https://www.youtube.com/embed/AuL4VIv9Tno",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "The God That Failed",
            duration: "5:07",
            number: "10",
            video: "https://www.youtube.com/embed/gbxaUyvIkEg",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "My Friend of Misery",
            duration: "6:48",
            number: "11",
            video: "https://www.youtube.com/embed/ODHhWcEdrvg",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "The Struggle Within",
            duration: "3:55",
            number: "12",
            video: "https://www.youtube.com/embed/SFdN3syFxeY",
            album: blackAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Группа крови",
            duration: "4:47",
            number: "1",
            video: "https://www.youtube.com/embed/ACAvBBMb6BM",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Закрой за мной дверь, я ухожу",
            duration: "4:17",
            number: "2",
            video: "https://www.youtube.com/embed/Baw0FllTr9w",
            album: gruppaKroviAlbum._id,
            published: false, 
            user: adminUser._id
        }, {
            title: "Война",
            duration: "4:05",
            number: "3",
            video: "https://www.youtube.com/embed/VIc0VHpdI3I",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Спокойная ночь",
            duration: "6:08",
            number: "4",
            video: "https://www.youtube.com/embed/r24FLJy0tXc",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Мама, мы все сошли с ума",
            duration: "4:08",
            number: "5",
            video: "https://www.youtube.com/embed/ZOZhU3Jh8MI",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Бошетунмай",
            duration: "4:09",
            number: "6",
            video: "https://www.youtube.com/embed/z-LpopB-ss8",
            album: gruppaKroviAlbum._id,
            published: false, 
            user: adminUser._id
        }, {
            title: "В наших глазах",
            duration: "3:34",
            number: "7",
            video: "https://www.youtube.com/embed/s2xyBcWNU9w",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Попробуй спеть вместе со мной",
            duration: "4:36",
            number: "8",
            video: "https://www.youtube.com/embed/U940ebIkP9U",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Прохожий",
            duration: "3:40",
            number: "9",
            video: "https://www.youtube.com/embed/bsy0wpmS0Fk",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Дальше действовать будем мы",
            duration: "3:57",
            number: "10",
            video: "https://www.youtube.com/embed/tnXtrCodJmU",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Легенда",
            duration: "4:09",
            number: "11",
            video: "https://www.youtube.com/embed/UKlw3Cok-dM",
            album: gruppaKroviAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Кончится лето",
            duration: "5:56",
            number: "1",
            video: "https://www.youtube.com/embed/qToTHW96XEQ",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Красно-жёлтые дни",
            duration: "5:56",
            number: "2",
            video: "https://www.youtube.com/embed/N_KQ9oDp0-c",
            album: cherniyAlbum._id,
            published: false, 
            user: adminUser._id
        }, {
            title: "Нам с тобой",
            duration: "4:50",
            number: "3",
            video: "https://www.youtube.com/embed/sc47le0Byq0",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Звезда",
            duration: "4:30",
            number: "4",
            video: "https://www.youtube.com/embed/oED4gk-LUyM",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Кукушка",
            duration: "6:40",
            number: "5",
            video: "https://www.youtube.com/embed/B1Nx3SU2izA",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Когда твоя девушка больна",
            duration: "4:21",
            number: "6",
            video: "https://www.youtube.com/embed/s6bj-jixn1w",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Муравейник",
            duration: "5:18",
            number: "7",
            video: "https://www.youtube.com/embed/MtalpBUyl5I",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Следи за собой",
            duration: "5:00",
            number: "8",
            video: "https://www.youtube.com/embed/-hSV94bDvL4",
            album: cherniyAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Burn",
            duration: "4:27",
            number: "1",
            video: "https://www.youtube.com/embed/_x-C7wvD0M4",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Just like You",
            duration: "3:07",
            number: "2",
            video: "https://www.youtube.com/embed/04fQTmvFfGo",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "I Hate Everything About You",
            duration: "3:52",
            number: "3",
            video: "https://www.youtube.com/embed/d8ekz_CSBVg",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Home",
            duration: "4:20",
            number: "4",
            video: "https://www.youtube.com/embed/7NQ8OCcQ3LA",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Scared",
            duration: "3:13",
            number: "5",
            video: "https://www.youtube.com/embed/_nB4boxf0LY",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Let You Down",
            duration: "3:44",
            number: "6",
            video: "https://www.youtube.com/embed/BAhxGZKJhXo",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Now or Never",
            duration: "3:01",
            number: "7",
            video: "https://www.youtube.com/embed/cf5ZllGfMBs",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Born Like This",
            duration: "3:32",
            number: "8",
            video: "https://www.youtube.com/embed/e2W_HcXhWEM",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Drown",
            duration: "3:28",
            number: "9",
            video: "https://www.youtube.com/embed/k8gCdlHU1IE",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Wake Up",
            duration: "3:24",
            number: "10",
            video: "https://www.youtube.com/embed/zzsVpgi9nJU",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "Take Me Under",
            duration: "4:18",
            number: "11",
            video: "https://www.youtube.com/embed/UalQCtkJXtY",
            album: threeDaysGraceAlbum._id,
            published: false, 
            user: simpleUser._id
        }, {
            title: "Overrated",
            duration: "3:30",
            number: "12",
            video: "https://www.youtube.com/embed/Y-E8AIvACqQ",
            album: threeDaysGraceAlbum._id,
            published: false,
            user: simpleUser._id
        }, {
            title: "It's All Over",
            duration: "4:02",
            number: "1",
            video: "https://www.youtube.com/embed/uiYwwL5LbBw",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Pain",
            duration: "3:23",
            number: "2",
            video: "https://www.youtube.com/embed/Ud4HuAzHEUc",
            album: oneXAlbum._id,
            published: false, 
            user: adminUser._id
        }, {
            title: "Animal I Have Become",
            duration: "3:51",
            number: "3",
            video: "https://www.youtube.com/embed/xqds0B_meys",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Never Too Late",
            duration: "3:29",
            number: "4",
            video: "https://www.youtube.com/embed/lL2ZwXj1tXM",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "On My Own",
            duration: "3:05",
            number: "5",
            video: "https://www.youtube.com/embed/sEvf9NZtAjk",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Riot",
            duration: "3:27",
            number: "6",
            video: "https://www.youtube.com/embed/hyRU_yUcrmk",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Get Out Alive",
            duration: "4:22",
            number: "7",
            video: "https://www.youtube.com/embed/eS5g5vAWlLI",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Let It Die",
            duration: "3:09",
            number: "8",
            video: "https://www.youtube.com/embed/xDxdwyq59oE",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Over And Over",
            duration: "3:11",
            number: "9",
            video: "https://www.youtube.com/embed/FoZuDe15_iA",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Time of Dying",
            duration: "3:08",
            number: "10",
            video: "https://www.youtube.com/embed/sdRJ6LQoVQI",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "Gone Forever",
            duration: "3:41",
            number: "11",
            video: "https://www.youtube.com/embed/rmlxSMjcIFM",
            album: oneXAlbum._id,
            published: false,
            user: adminUser._id
        }, {
            title: "One X",
            duration: "4:46",
            number: "12",
            video: "https://www.youtube.com/embed/g01HMti0MQA",
            album: oneXAlbum._id,
            published: false, 
            user: adminUser._id
        });



    db.close();
});