export const key = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/privkey.pem');
export const cert = (process.env.NODE_ENV === 'development' ? '' : '/etc/letsencrypt/live/api.neekhaulas.eu/cert.pem');
export const origin = (process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'https://network.neekhaulas.eu');


export const awsAccessKey = 'AKIATPRDJNLKX3MAVZVB';
export const awsSecretAccessKey = '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';
export const bucket = 'network-video';