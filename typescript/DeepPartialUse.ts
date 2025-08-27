import type { DeepPartial } from "type-fest";

interface User {
  id: number;
  name: string;
  address: {
    city: string;
    zip: string;
  };
}

type PartialUser = DeepPartial<User>;
// 等价于：
// {
//   id?: number;
//   name?: string;
//   address?: {
//     city?: string;
//     zip?: string;
//   };
// }
