import { BaseEntity } from "typeorm";
export declare class Mail extends BaseEntity {
    id: number;
    asunto: string;
    cuerpo: string;
    de_nombre: string;
    de_direccion: string;
    para_nombre: string;
    para_direccion: string;
    cc_nombre: string;
    cc_direccion: string;
    score: string;
    event: string;
    person: string;
    location: string;
    other: string;
    date: string;
}
