import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import TokenProvider from '@modules/users/providers/TokenProvider/implementations/JsonWebToken';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
)

container.registerSingleton<IHashProvider>(
    'HashProvider',
    HashProvider,
)

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    TokenProvider,
)