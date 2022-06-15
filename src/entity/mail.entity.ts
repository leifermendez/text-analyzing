import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("mails")
export class Mail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asunto: string;

  @Column("longtext")
  cuerpo: string;

  @Column()
  de_nombre: string;

  @Column()
  de_direccion: string;

  @Column()
  para_nombre: string;

  @Column()
  para_direccion: string;

  @Column()
  cc_nombre: string;

  @Column()
  cc_direccion: string;

  @Column()
  score: string;

  @Column("longtext")
  event: string;

  @Column("longtext")
  person: string;

  @Column("longtext")
  location: string;

  @Column("longtext")
  other: string;

  @Column("longtext")
  date: string;
}
