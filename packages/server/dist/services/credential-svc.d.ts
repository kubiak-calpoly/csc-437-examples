import { Credential } from "../models";
declare function verify(username: string, password: string): Promise<string>;
declare function create(username: string, password: string): Promise<Credential>;
declare const _default: {
    create: typeof create;
    verify: typeof verify;
};
export default _default;
