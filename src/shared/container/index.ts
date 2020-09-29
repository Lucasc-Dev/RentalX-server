import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/users/providers/HashProvider';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/VehiclesRepository';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
)

container.registerSingleton<IVehiclesRepository>(
    'VehiclesRepository',
    VehiclesRepository,
)

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository,
)