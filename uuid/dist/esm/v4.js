import native from './native.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';
function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return unsafeStringify(rnds);
}
export default v4;
