import robot from 'robotjs';
export const up = (offset) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x, mouse.y - offset);
};
export const down = (offset) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x, mouse.y + offset);
};
export const left = (offset) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x - offset, mouse.y);
};
export const right = (offset) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + offset, mouse.y);
};
export const position = () => {
    let mouse = robot.getMousePos();
    return `x:${mouse.x}_y:${mouse.y}`;
};
