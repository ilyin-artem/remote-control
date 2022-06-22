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
export const position = () => {
    let mouse = robot.getMousePos();
    // console.log(`${mouse.x}_${mouse.y}`);
    return `x:${mouse.x}_y:${mouse.y}`;
};
