import robot from 'robotjs';

export const up = (offset: number) => {
    const { x, y } = getPoints();

    robot.moveMouse(x, y - offset);
};
export const down = (offset: number) => {
    const { x, y } = getPoints();
    robot.moveMouse(x, y + offset);
};
export const left = (offset: number) => {
    const { x, y } = getPoints();
    robot.moveMouse(x - offset, y);
};
export const right = (offset: number) => {
    const { x, y } = getPoints();
    robot.moveMouse(x + offset, y);
};
export const position = (): string => {
    const { x, y } = getPoints();

    return `x:${x},y:${y}`;
};

export const getPoints = (): {
    x: number;
    y: number;
} => {
    return robot.getMousePos();
};
