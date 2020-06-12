const express = require('express');
const router = express.Router();
const translit = require('iso_9/translit')


const exceptionList = [
    {
        name: 'Иванов Иван Иваныч',
        result: 'Ivanov Ivan Ivanych'
    }
]

let exceptionWord;
let translitedWord;

router.get('/', function (req, res) {
    const word = req.param('word');
    const type = req.param('type');

    exceptionWord = word.toLowerCase();

    exceptionWord = exceptionList.find(el => {
        return el.name.toLowerCase() === exceptionWord
    });

    translitedWord = translit(word, type === 'ru' ? -5 : 5);
    res.json({
        answer: exceptionWord ? exceptionWord.result : translitedWord
    })
})

module.exports = router;
