export const key = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/privkey.pem');
export const cert = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/cert.pem');
export const origin = (process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'https://network.neekhaulas.eu');


export const awsAccessKey = '';
export const awsSecretAccessKey = '';
export const bucket = '';
export const awsEndpoint = '';
