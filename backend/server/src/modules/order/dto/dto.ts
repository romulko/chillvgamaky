export class CreateOrderDto {
  email: string;

  placeId?: string;
}

export class UpdateOrderDto {
  id: string;

  startTime?: Date;

  endTime?: Date;
}
