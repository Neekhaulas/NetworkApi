import {spawn} from 'child_process';

export function onUpdate(req: any, res: any) {
    spawn('sh', ['update.sh', '.']);
}