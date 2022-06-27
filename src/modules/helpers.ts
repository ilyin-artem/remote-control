export const splitMessage = (
    data: Buffer
): [string, string, number, number] => {
    const messageArr: string[] = data.toString().split(' ');
    const [action, command]: string[] = messageArr[0].split('_');
    const [arg1, arg2]: number[] = [
        Number(messageArr[1]) - 1,
        Number(messageArr[2]) - 1,
    ];
    return [action, command, arg1, arg2];
};
