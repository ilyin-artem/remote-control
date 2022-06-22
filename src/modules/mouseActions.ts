import robot from 'robotjs';

export const up = (offset: number) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x, mouse.y - offset);
};
export const down = (offset: number) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x, mouse.y + offset);
};
export const left = (offset: number) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x - offset, mouse.y);
};
export const right = (offset: number) => {
    let mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + offset, mouse.y);
};
