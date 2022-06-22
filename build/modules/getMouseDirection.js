import robot from 'robotjs';
let mouse = robot.getMousePos();
let x = mouse.x;
let y = mouse.y;
export const getMouseDirection = () => {
    mouse = robot.getMousePos();
    if (mouse.x > x) {
        x = mouse.x;
        return 'mouse_right';
    }
    if (mouse.x < x) {
        x = mouse.x;
        return 'mouse_left';
    }
    if (mouse.y < y) {
        y = mouse.y;
        return 'mouse_up';
    }
    if (mouse.y > y) {
        y = mouse.y;
        return 'mouse_down';
    }
};
