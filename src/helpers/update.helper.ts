import axios from 'axios';
import { version as currentV } from '../../package.json';

export const checkVersion = () => {
    /* return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ pending: true, current: currentV, remote: "0.0.2", higher: false })
        }, 3000);
    }) */
    return axios.get('https://raw.githubusercontent.com/solis-platform/SolisTagger/master/package.json')
    //return axios.get('http://localhost:4000/updates/')
    .then(a => {
        const { version, changelog, developerInfo } = <any>a.data;

        const check = compareVersion(currentV, version);
        console.log(check)
        if (check === 'h')      return { pending: false, current: currentV, remote: version, higher: true, changelog, developerInfo }
        else if (check === 'l') return { pending: true, current: currentV, remote: version, higher: false, changelog, developerInfo }
        else if (check === 'e') return { pending: false, current: currentV, remote: version, higher: false, changelog, developerInfo }
    })
    .catch()

    
}
/**
 * Compara una versión con otra y devuelve una cadena según la comprobación.
 * 
 * ```h``` - Indica higher (mayor).
 * ```l``` - Indica lower (menor).
 * ```e``` - Indica equal (igual).
 * 
 * @param {string}current - Versión actual.
 * @param {string}next - Versión a comparar.
 * @returns string
 */
const compareVersion = (current: string, next: string) => {
    const cv = current.split('.');
    const nv = next.split('.');
  
    const length = Math.max(cv.length, nv.length);
  
    for (let i = 0; i < length; i++) {
      const v1 = parseInt(cv[i]) | 0;
      const v2 = parseInt(nv[i]) | 0;
  
      if (v1 > v2) return 'h';
      if (v1 < v2) return 'l';
    }
  
    return 'e';
  };