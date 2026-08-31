import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ name: "parent_id", nullable: true })
  parentId: string | null;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parent_id" })
  parentCategory: Category | null;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories: Category[];
}
