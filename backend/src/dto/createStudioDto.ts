import { AddressOptions, AddressVO } from "../domain/address.js";

export interface CreateStudioDto {
  ownerId: string;
  name: string;
  address: AddressOptions | AddressVO;
}
