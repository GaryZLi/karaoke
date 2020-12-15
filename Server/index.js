const fs = require('fs')
const youtubedl = require('youtube-dl')
const user = '';
const location = `C:/Users/${user}/Desktop/karaokeSongs`;

// // jia ge

if (!user.length) {
    console.log('enter user');
    process.exit(1);
}

const express = require('express');
const cors = require('cors');
const { default: Axios } = require('axios');
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    fs.readdir(location, (err, files) => {
        if (err) {
            return fs.writeFile('logs.txt', `[${new Date()}] - ` + JSON.stringify(err) + '\n', err => {
                if (err) {
                    fs.writeFile('logs.txt', `[${new Date()}] - ` + JSON.stringify(err) + '\n', err => {
                        if (err) throw err;
                    });
                }
            });
        }

        res.status(200).send(files);
    })
});

app.get('/:videoName', (req, res) => {
    if (!req.params.videoName) {
        // in this case it shuld try to redownload
        console.log('there is no vid')
        res.send();
    }

    const path = `${location}/${req.params.videoName}`;

    // const stat = fs.statSync(path);
    // const fileSize = stat.size;
    // const head = {
    //     'Content-Length': fileSize,
    //     'Content-Type': 'video/mp4',
    //     // 'Content-Range': 'bytes chunkStart-chunkEnd/chunkSize',
    //     // 'Accept-Ranges': 'bytes',
    // };

    // res.writeHead(200, head);
    // fs.createReadStream(path).pipe(res);

    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.post('/download', (req, res) => {
    const video = youtubedl(req.body.link,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function (info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)

        video.pipe(fs.createWriteStream(`${location}/${info._filename}`));

        fs.writeFile('links.txt', `[${info._filename}] - ${req.body.link}\n`, err => {
            if (err) throw err;
        });

        res.status(200).send(info._filename);
    })
});

app.listen(port, () => console.log('starting at', port));
