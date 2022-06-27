import Jimp from 'jimp';
import robot from 'robotjs';

export const captureScreen = async () => {
    const { x, y } = robot.getMousePos();
    const image = new Jimp({
        data: robot.screen.capture(x, y, 200, 200).image,
        width: 200,
        height: 200,
    });

    image.scan(
        0,
        0,
        image.bitmap.width,
        image.bitmap.height,
        function (x, y, idx) {
            const temp = this.bitmap.data[idx + 0];
            this.bitmap.data[idx + 0] = this.bitmap.data[idx + 2];
            this.bitmap.data[idx + 2] = temp;
        }
    );

    const base = await image.getBase64Async(Jimp.MIME_PNG);
    return `prnt_scrn ${base.split(',')[1]}`;
};
