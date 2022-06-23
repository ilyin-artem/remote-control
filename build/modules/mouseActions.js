import robot from 'robotjs';
export const up = (offset) => {
    const { x, y } = getPoints();
    robot.moveMouse(x, y - offset);
};
export const down = (offset) => {
    const { x, y } = getPoints();
    robot.moveMouse(x, y + offset);
};
export const left = (offset) => {
    const { x, y } = getPoints();
    robot.moveMouse(x - offset, y);
};
export const right = (offset) => {
    const { x, y } = getPoints();
    robot.moveMouse(x + offset, y);
};
export const position = () => {
    const { x, y } = getPoints();
    return `x:${x},y:${y}`;
};
export const getPoints = () => {
    return robot.getMousePos();
};
