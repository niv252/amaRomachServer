import * as nconf from 'nconf';

export const initConfig = () => {
    nconf.add('config', { type: 'file', file: './configuration/config.json' });
}