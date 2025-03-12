import * as pty from 'node-pty';
import { IPty } from 'node-pty';

export class TerminalManager {
    private sessions: {
        [key: string]: { terminal: IPty, replId: string }
    };

    constructor() {
        this.sessions = {};
    }

    createPty(id: string, replId: string, onData: (data: string) => void): IPty {
        const terminal = pty.spawn('bash', [], {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: "/workspace",
            env: process.env
        });

        this.sessions[id] = {
            terminal,
            replId,
        }

        terminal.onData((data: string) => {
            onData(data);
        });

        return terminal;
    }

    clearPty(id: string) {
        if (this.sessions[id]) {
            this.sessions[id].terminal.kill();
            delete this.sessions[id];
        }
    }

    writeToPty(id: string, data: string) {
        if (this.sessions[id]) {
            this.sessions[id].terminal.write(data);
        }
    }
}