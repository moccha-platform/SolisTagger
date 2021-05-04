/**
 * @deprecated
 * Esta es la forma en la que antes se enviaba la información al renderizador.
 * Ahora se envía por flujo, esto hace que el proceso principal envíe
 * datos según le llegan, no cuando los tenga todos.
 * 
 * ver método searchOnce, evento newTag
 */
            searchItunes(this.currentFile)
            .then((a) => {
                format(a)
                .then((a) => {
                    this.data = a;
                    console.log(this.data);
                    searchDeezer(this.currentFile)
                    .then((a) => {
                        console.log(a);
                        for(let i of a.data) {
                            this.data.data.push(i);
                            this.data.total ++;
                        }
                        this.send('data', this.data);
                    })
                    .catch((err) => {
                        if (err == "no results") {
                            this.data.data = [];
                            this.data.total = 0;
                            this.send('data', this.data);
                        }
                    });
                })
                .catch((err) => {
                    console.log("Format",err);
                })
            })
            .catch((err) => {
                if (err == "Error: no results") {
                    this.data = {
                        data: [],
                        total: 0
                    };
                    console.log(this.data);
                    this.send('data', this.data)
                }
                console.log("iTunes",err);
            });