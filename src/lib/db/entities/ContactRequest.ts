import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("contact_requests")
export class ContactRequest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}

