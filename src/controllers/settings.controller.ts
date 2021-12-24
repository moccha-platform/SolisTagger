import { arch, platform } from 'os';

import { compareTwoStrings } from 'string-similarity';
import { renderer } from '../../renderer/renderer';
import { settingsUpdate } from '../interfaces/settings.interface';

import { version, buildDate } from '../../package.json';
import { ipcMain } from 'electron';
import { checkVersion } from '../helpers/update.helper';
import axios from 'axios';

export const comparer = (string1: string, string2: string) => {
    const dice = compareTwoStrings(string1, string2);
    renderer.process.webContents.send('stringSimilarity', dice);
}

export const update = (settings: settingsUpdate) => {
    renderer.database.settings.updateSettings(settings)
        .then(a => {
            console.log('Guardado!')
            console.log(a)
        })
        .catch(err => {
            console.error(err);
        })
}

export const sendSettings = () => {
    renderer.database.settings.params.then(a => {
        renderer.process.webContents.send('settings', a);
        console.log(a);
    })
}

export const appInfo = () => {
    const info = {
        app: { version, buildDate },
        system: { arch: arch(), platform: platform() }
    }

    renderer.process.webContents.send('appInfo', info);
}

export const checkUpdates = () => {
    checkVersion()
    .then(a => {
        renderer.process.webContents.send('updateChecks', a);
    })
    .catch(err => {
        renderer.process.webContents.send('updateChecks', { err });
    })
}

export const getContributors = () => {
    const contributors = 'https://api.github.com/repos/solis-platform/SolisTagger/stats/contributors';

    return axios.get(contributors)
    .then(a => {
        return a.data
    })
    .catch(err => {
        err
    })
}