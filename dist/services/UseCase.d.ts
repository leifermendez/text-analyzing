import { Mail } from "../entity/mail.entity";
export declare class UseCase {
    mail: Mail;
    constructor();
    register(data: any): Promise<void>;
}
