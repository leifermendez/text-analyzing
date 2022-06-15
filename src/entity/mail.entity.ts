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

  @Column("longtext")
  asunto: string;

  @Column("longtext")
  cuerpo: string;

  @Column("longtext")
  de_nombre: string;

  @Column("longtext")
  de_direccion: string;

  @Column("longtext")
  para_nombre: string;

  @Column("longtext")
  para_direccion: string;

  @Column("longtext")
  cc_nombre: string;

  @Column("longtext")
  cc_direccion: string;

  @Column("longtext")
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
