import fs from 'fs';
import path from 'path';

const FOLDER = path.join(process.cwd(), "firmados");

export function guardarDocumentoFirmado(nombreArchivo, contenidoBase64) {
    if (!fs.existsSync(FOLDER)) {
        fs.mkdirSync(FOLDER);
    }

    const filePath = path.join(FOLDER, nombreArchivo);

    fs.writeFileSync(filePath, Buffer.from(contenidoBase64, 'base64'));

    return {
        url: `/descargas/${nombreArchivo}`,
        path: filePath
    };
}
