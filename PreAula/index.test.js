const { expect } = require("chai");
const TestaMedia = require('./index')

describe('quando a media for menor que 7', function () {
    it('testa nota 4 media 7 retorna faltou 3 para alcançar a media', function () {
        const media = 7;
        const nota = 4;
        expect(TestaMedia(media, nota)).to.be.equals(`faltou ${media - nota} para alcançar a media`);
    })
});
