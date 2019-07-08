export const key = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/privkey.pem');
export const cert = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/cert.pem');
export const origin = (process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'https://network.neekhaulas.eu');


export const awsAccessKey = 'SCWGWEWGTCDNPB5PTDRM';
export const awsSecretAccessKey = '1dbf1596-a53a-457b-946b-443e37a1699e';
export const bucket = 'network-video';
export const awsEndpoint = 's3.fr-par.scw.cloud';