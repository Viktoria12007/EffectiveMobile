import { CreateUserDto } from "./create-user.dto";

export type BlockUserDto = Pick<CreateUserDto, "isActive">;
