import {
  AccountSchema,
  Account,
  AccountDocument,
} from '../schema/account.schema';
import { hashSync } from 'bcrypt';

export const AccountProvider = {
  name: Account.name,
  useFactory: () => {
    const schema = AccountSchema;

    schema.pre<AccountDocument>('save', function (next: any) {
      const user = this;

      if (user.password) {
        user.password = hashSync(user.password, process.env.SALT);
      }

      next();
    });

    return schema;
  },
};
