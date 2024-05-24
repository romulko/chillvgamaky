import {
  AllowNull,
  Column,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'order' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Index
  @Column
  email: string;

  @AllowNull
  @Column
  placeId?: string;

  @AllowNull
  @Column
  startTime?: Date;

  @AllowNull
  @Column
  endTime?: Date;

  @AllowNull
  @Column
  canceled?: boolean;

  @AllowNull
  @Column({ type: DataType.JSON })
  monobankData?: any;

  @AllowNull
  @Index
  @Column
  paymentStatus?: string;
}
