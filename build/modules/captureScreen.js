var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jimp from 'jimp';
import robot from 'robotjs';
export const captureScreen = () => __awaiter(void 0, void 0, void 0, function* () {
    const { x, y } = robot.getMousePos();
    const image = new Jimp({
        data: robot.screen.capture(x, y, 200, 200).image,
        width: 200,
        height: 200,
    });
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        const temp = this.bitmap.data[idx + 0];
        this.bitmap.data[idx + 0] = this.bitmap.data[idx + 2];
        this.bitmap.data[idx + 2] = temp;
    });
    const base = yield image.getBase64Async(Jimp.MIME_PNG);
    return `prnt_scrn ${base.split(',')[1]}`;
});
