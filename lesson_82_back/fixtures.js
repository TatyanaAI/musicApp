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

    const [adminUser] = await User.create({
        username: "TatAdmin",
        password: "ta8na85",
     
        token: nanoid()
    }, );

    const [mettalicaArtist] = await Artist.create({
        name: "Metallica",
        info: "Американская метал-группа, входит в «большую четвёрку трэш-метала».",
        photo: "EG05bDd2Y_UeUPXObYokE.jpg",
        published: true, 
        user: adminUser._id
    });

    const [masterOfPuppetsAlbum] = await Album.create({
        title: "Master of Puppets",
        year: "1986",
        cover: "_rSej3M24xCzlwc49YZk9.jpg",
        artist: mettalicaArtist._id,
        published: false, 
        user: adminUser._id
    });

 await Track.create({
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
        });



    db.close();
});