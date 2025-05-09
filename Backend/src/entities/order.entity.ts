import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uniqueKey: string;

  @Column()
  name: string;

  @Column()
  fuelType: string;

  @Column()
  fuel: number;

  @Column()
  date: Date;

  @Column()
  status: string;
}