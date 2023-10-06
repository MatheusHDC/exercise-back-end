function TestaMedia(media, nota) {
    if(nota >= media) {
        return 'passou';
    }
    return `faltou ${media - nota} para alcançar a media`;
}

module.exports =  TestaMedia;