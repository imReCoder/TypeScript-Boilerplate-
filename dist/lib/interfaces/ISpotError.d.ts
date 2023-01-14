export default interface ISpotError {
    name: string;
    code: string;
    message: string | object;
    description?: string;
}
