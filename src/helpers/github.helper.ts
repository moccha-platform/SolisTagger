import axios from 'axios'
import { contributor, Ghuser } from '../interfaces/github.interface';

// TODO: definir función.
//axios.get('https://api.github.com/repos/solis-platform/SolisTagger/stats/contributors')
axios.get('https://api.github.com/repos/marcosrg9/YoutubeTV/stats/contributors',{ })
.then((a) => {
    
    const data:contributor[] = a.data

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].author.login)
        console.log(data[i].author.avatar_url)
    }
    
})