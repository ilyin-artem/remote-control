import robot from 'robotjs';
import * as mouse from './mouseActions.js';
export const circle = (width) => {
    const { x, y } = mouse.getPoints();
    const radius = width / 2;
    robot.moveMouse(x + radius, y);
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const pointX = x + radius * Math.cos(i);
        const pointY = y + radius * Math.sin(i);
        robot.moveMouse(pointX, pointY);
    }
    robot.mouseToggle('up');
};
export const rectangle = (width, height = width) => {
    const { x, y } = mouse.getPoints();
    const point1 = { x: x + width, y: y };
    const point2 = { x: point1.x, y: point1.y + height };
    const point3 = { x: point2.x - width, y: point2.y };
    const point4 = { x: point3.x, y: point3.y - height };
    robot.mouseToggle('down');
    for (let index = x; index < point1.x; index++) {
        robot.moveMouse(index, point1.y);
    }
    for (let index = y; index < point2.y; index++) {
        robot.moveMouse(point1.x, index);
    }
    for (let index = point2.x; index > point3.x; index--) {
        robot.moveMouse(index, point3.y);
    }
    for (let index = point3.y; index > point4.y; index--) {
        robot.moveMouse(point4.x, index);
    }
    robot.mouseToggle('up');
};
const mouseMove = () => {
    let mouse = robot.getMousePos();
    robot.setMouseDelay(1);
    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    let height = 100;
    let width = 100;
    let y = 0;
    for (var x = 0; x < width; x++) {
        robot.moveMouse(x, y);
    }
};
