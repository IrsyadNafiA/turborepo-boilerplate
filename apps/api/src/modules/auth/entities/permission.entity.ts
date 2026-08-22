import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  action!: string; // e.g., 'CREATE', 'READ', 'UPDATE', 'DELETE'

  @Column()
  resource!: string; // e.g., 'USERS', 'POSTS'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
