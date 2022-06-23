import robot from 'robotjs';

export const up = (offset: number) => {
    const { x, y } = getPoints();
    // console.log(`x=${x} y=${y}`);

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
export const position = () => {
    const { x, y } = getPoints();
    // console.log(`${x}_${y}`);
    return `x:${x},y:${y}`;
};
// export const smoothMove = (offset) => {
//     const mouse = robot.getMousePos();
//     console.log(`x=${x} y=${y}`);

//     robot.moveMouse(x, y - offset);
// // };
// export const smoothMove = async (callback, offset) => {
//     for (let i = 0; i < offset; i++) {
//         await callback(1);
//     }
// };

export const getPoints = () => {
    return robot.getMousePos();
};
