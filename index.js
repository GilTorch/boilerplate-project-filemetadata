require('dotenv').config();
var express = require('express');
var cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), async (req,res) => {
  const { filename: name, mimetype: type, size } = req.file;
  return res.json({ name: `${name}.${type.split("/")[1]}`, type, size })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
