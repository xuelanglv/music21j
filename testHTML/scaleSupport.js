require(['music21'], () => {
    const scaleFunction = function() {
        const k2 = document.getElementById('key').value;
        console.log(k2);
        k = new music21.key.Key(k2);
        sc = k.getScale();
        mainSVG = $('#mainSVG')[0];
        s = new music21.stream.Stream();
        s.replaceDOM(mainSVG);
        s.append(k);
        tonic = sc.tonic;
        tonicString = tonic.name;
        const Interval = function(n1, n2) {
            this.n1 = n1;
            this.n2 = n2;
            this.size = n2.pitch.ps - n1.pitch.ps;
            this.generic = function() {
                let genericInterval;
                if (
                    this.n2.pitch.diatonicNoteNum
                    > this.n1.pitch.diatonicNoteNum
                ) {
                    genericInterval
                        = this.n2.pitch.diatonicNoteNum
                        - this.n1.pitch.diatonicNoteNum
                        + 1;
                } else if (
                    this.n1.pitch.diatonicNoteNum
                    > this.n2.pitch.diatonicNoteNum
                ) {
                    genericInterval
                        = this.n2.pitch.diatonicNoteNum
                        - this.n1.pitch.diatonicNoteNum
                        - 1;
                } else if (
                    this.n1.pitch.diatonicNoteNum
                    === this.n2.pitch.diatonicNoteNum
                ) {
                    genericInterval = 1;
                }
                return genericInterval;
            };
        };
        c5 = new music21.note.Note('C5');
        tNote = new music21.note.Note(tonicString + '4');
        intv = new Interval(tNote, c5);
        genericInterval = intv.generic();
        console.log(genericInterval);

        for (i = 0; i < sc.length; i++) {
            if (i < genericInterval - 1) {
                p = sc[i];
                pn = p.name;
                n = new music21.note.Note(pn);
                n.duration.type = 'quarter';
                s.append(n);
                s.replaceDOM();
            } else {
                p = sc[i];
                pn = p.name;
                n = new music21.note.Note(pn + '5');
                n.duration.type = 'quarter';
                s.append(n);
                s.replaceDOM();
            }
        }
    };
    const playStream = function() {
        s.playStream();
    };

    playButton = $('#playButton');
    playButton.click(playStream);
    submit = $('#submit');
    submit.click(scaleFunction);
});
